export type termType = 'operator' | 'number' | 'grouper'
export type numbers = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
export type operators = '+' | '-' | '/' | '*' | '×' | '÷' | '^' | '√'
export type utilities = 'DEL' | 'AC' | '.' | 'SIGN' | '='

export type ValuesAndTerms = WCTTerm | ValuesAndTerms[];
export interface WCTTerm {
    value : string;
    type : termType;
}

export interface WCTGroup {
    open : number
    close : number
}