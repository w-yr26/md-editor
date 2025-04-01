import { Token } from '../tokens/index';
export declare class ASTNode {
    type: string;
    children: ASTNode[];
    value?: string;
    constructor(type: string, value?: string);
    addChild(node: ASTNode): void;
    print(depth?: number): void;
}
export declare const buildAST: (tokens: Token[]) => ASTNode;
