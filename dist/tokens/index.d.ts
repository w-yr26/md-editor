/**
 * md 编辑器思路：
 * 1. string -> token
 * 2. token -> ast
 * 3. ast -> render
 */
declare class Token {
    type: string;
    value: string;
    constructor(type: string, value: string);
}
interface TokenizationStrategy {
    matches(line: string): boolean;
    tokenize(line: string): Token;
}
declare class Tokenizer {
    strategies: TokenizationStrategy[];
    addStrategy(strategy: TokenizationStrategy): void;
    tokenize(markdown: string): Token[];
}
declare const tokenizer: Tokenizer;
export { tokenizer, Token };
