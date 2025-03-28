declare class Token {
    type: string;
    value: string;
    constructor(type: string, value: string);
}
interface TokenizationStrategy {
    matches(line: string): boolean;
    tokenize(line: string): Token;
}
declare class HeaderStrategy implements TokenizationStrategy {
    private regex;
    matches(line: string): boolean;
    tokenize(line: string): Token;
}
declare class Tokenizer {
    strategies: TokenizationStrategy[];
    addStrategy(strategy: TokenizationStrategy): void;
    tokenize(markdown: string): Token[];
}
declare const tokenizer: Tokenizer;
declare const res1: Token[];
declare const res2: Token[];
