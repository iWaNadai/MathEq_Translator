export type termType = 'operator' | 'number' | 'grouper'
export interface WCTTerm {
    value : string;
    element : HTMLElement;
    type : termType
}