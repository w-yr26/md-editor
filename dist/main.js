/**
 * md 编辑器思路：
 * 1. string -> token
 * 2. token -> ast
 * 3. ast -> render
 */
class Token {
    type;
    value;
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}
// 1～4级标题
class HeaderStrategy {
    regex = /^(#{1,4})\s+(.*)$/;
    matches(line) {
        return this.regex.test(line);
    }
    tokenize(line) {
        const match = line.match(this.regex);
        console.log(match);
        return new Token(`header${match[1].length}`, match[2]);
    }
}
class Tokenizer {
    strategies = [];
    addStrategy(strategy) {
        this.strategies.push(strategy);
    }
    tokenize(markdown) {
        const tokens = [];
        const lines = markdown.split('\n');
        lines.forEach((line) => {
            let matched = false;
            for (const val of this.strategies) {
                if (val.matches(line)) {
                    tokens.push(val.tokenize(line));
                    matched = true;
                    break;
                }
            }
            if (!matched) {
                tokens.push(new Token('paragraph', line));
            }
        });
        return tokens;
    }
}
const tokenizer = new Tokenizer();
// 为md语法添加解析策略
tokenizer.addStrategy(new HeaderStrategy());

// ASTNode 类
class ASTNode {
    type = '';
    children = [];
    value = '';
    constructor(type, value) {
        this.type = type;
        this.value = value;
        this.children = [];
    }
    addChild(node) {
        this.children.push(node);
    }
    // 递归打印 AST
    print(depth = 0) {
        console.log('  '.repeat(depth) + `${this.type}: ${this.value}`);
        this.children.forEach((child) => child.print(depth + 1));
    }
}
// MarkDownNode 类 -> 此处看似与ASTNode无差，但可用于后续扩展(比如标题锚点ID、文本缩进等)
class MarkdownNode extends ASTNode {
    constructor(type, value) {
        super(type, value);
    }
}
// ASTNode工厂类
class ASTNodeFactory {
    static createNode(type, value) {
        return new MarkdownNode(type, value);
    }
}
class HeaderNodeHandler {
    handle(token) {
        return new MarkdownNode(token.type, token.value);
    }
}
class ParagraphNodeHandler {
    handle(token) {
        return new MarkdownNode(token.type, token.value);
    }
}
// 创建处理器注册表
class NodeHandlerRegistry {
    handlers = new Map();
    registerHandler(type, handler) {
        this.handlers.set(type, handler);
    }
    getHandler(type) {
        return this.handlers.get(type);
    }
}
// 注册对应的事件
const nodeHandlerRegistry = new NodeHandlerRegistry();
nodeHandlerRegistry.registerHandler('header1', new HeaderNodeHandler());
nodeHandlerRegistry.registerHandler('header2', new HeaderNodeHandler());
nodeHandlerRegistry.registerHandler('header3', new HeaderNodeHandler());
nodeHandlerRegistry.registerHandler('header4', new HeaderNodeHandler());
nodeHandlerRegistry.registerHandler('paragraph', new ParagraphNodeHandler());
// 构建 AST
const buildAST = (tokens) => {
    const root = ASTNodeFactory.createNode('root');
    let currentNode = root;
    tokens.forEach((token) => {
        const handler = nodeHandlerRegistry.getHandler(token.type);
        if (handler) {
            const newNode = handler.handle(token);
            currentNode.addChild(newNode);
        }
        else {
            const textHandler = nodeHandlerRegistry.getHandler('paragraph');
            const textNode = textHandler.handle(token);
            if (textNode)
                currentNode.addChild(textNode);
        }
    });
    return root;
};

/**
 * MarkdownNode: {
 *  type: xxx,
 *  value: xxx,
 *  children: [MarkdownNode1, MarkdownNode2]
 * }
 */
class HTMLRender {
    visit(node) {
        switch (node.type) {
            case 'header1':
                return `<h1>${node.value}</h1>`;
            case 'header2':
                return `<h2>${node.value}</h2>`;
            case 'header3':
                return `<h3>${node.value}</h3>`;
            case 'header4':
                return `<h4>${node.value}</h4>`;
            case 'paragraph':
                return `${node.value}`;
            default:
                return node.children.map((child) => this.visit(child)).join('');
        }
    }
}
const renderAST = (node, renderer) => {
    const toHtmlDOM = () => {
        return renderer.visit(node);
    };
    const htmlStr = toHtmlDOM();
    return htmlStr;
};

export { ASTNode, HTMLRender, Token, buildAST, renderAST, tokenizer };
//# sourceMappingURL=main.js.map
