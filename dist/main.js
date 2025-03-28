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
                tokens.push(new Token('text', line));
            }
        });
        return tokens;
    }
}
const tokenizer = new Tokenizer();
tokenizer.addStrategy(new HeaderStrategy());
const res1 = tokenizer.tokenize('# Header1');
const res2 = tokenizer.tokenize('* List Item 1');
console.log(res1, res2);
//# sourceMappingURL=main.js.map
