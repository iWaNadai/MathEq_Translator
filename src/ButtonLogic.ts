import { termType, WCTTerm } from "./types"

const TRANSLATION_INDEX : {[key:string]:Function} = {
    '+' : (addend1 : string, addend2 : string, parenthesisMode : boolean = false) => {       
        if (addend1 === undefined || addend2 === undefined) {
            return 
        }

        const translation = (parenthesisMode) ? [`the sum of ${addend1} and ${addend2}`] : [`${addend1} added to ${addend2}`,`${addend1} increased by ${addend2}`,`${addend1} combined with ${addend2}`,`${addend1} together with ${addend2}`]
        return translation[Math.floor(Math.random() * translation.length)]
    },
    '-' : (minuend : string, subtrahend : string, parenthesisMode : boolean = false) => {
        if (minuend === undefined || subtrahend === undefined) {
            return 
        }
        
        const translation = (parenthesisMode) ? [`the difference of ${minuend} and ${subtrahend}`] : [`${minuend} reduced by ${subtrahend}`,`${minuend} decreased by ${subtrahend}`]
        return translation[Math.floor(Math.random() * translation.length)]
    },
    '×' : (multiplicand : string, multiplier : string, parenthesisMode : boolean = false) => {
        if (multiplicand === undefined || multiplier === undefined) {
            return 
        }
        
        const translation = (parenthesisMode) ? [`the product of ${multiplicand} and ${multiplier}`] : [`${multiplicand} multiplied by ${multiplier}`,`${multiplicand} times ${multiplier}`]
        return translation[Math.floor(Math.random() * translation.length)]
    },
    '÷' : (dividend : string, divisor : string, parenthesisMode : boolean = false) => {
        if (dividend === undefined || divisor === undefined) {
            return 
        }
        
        const translation = (parenthesisMode) ? [`the quotient of ${dividend} and ${divisor}`] : [`${dividend} divided by ${divisor}`,`${dividend} grouped by ${divisor}`,`${dividend} grouped into ${divisor}`]

        return translation[Math.floor(Math.random() * translation.length)]

    },
    '/' : (numerator : string, denominator : string) => {
        if (numerator === undefined || denominator === undefined) {
            return 
        }
        
        const translation = [`${numerator} over ${denominator}`];

        return translation[Math.floor(Math.random() * translation.length)]
    },
    '=' : (value1 : string, value2 : string) => {
        if (value1 === undefined || value2 === undefined) {
            return 
        }

        const translation = [`${value1} is equal to ${value2}`,`${value1}, and ${value2} are equal`]
        return translation[Math.floor(Math.random() * translation.length)]
    },
    '^' : (base : string, exponent : string) => {
        if (base === undefined || exponent === undefined) {
            return 
        }

        let translation : string[] = [`${base} to the power ${exponent}`]

        switch (true) {
            case (exponent === '2'):
                translation = translation.concat([`${base} squared`,`${base} to the ${exponent}nd power`])
                break;
            case (exponent === '3'):
                translation = translation.concat([`${base} cubed`,`${base} to the ${exponent}rd power`])
                break;
            case (exponent.charAt(exponent.length - 1) === '1'):
                translation = translation.concat([`${base} to the ${exponent}st power`])
                break;
            case (exponent.charAt(exponent.length - 1) === '2'):
                translation = translation.concat([`${base} to the ${exponent}nd power`])
                break;
            case (exponent.charAt(exponent.length - 1) === '3'):
                translation = translation.concat([`${base} to the ${exponent}rd power`])
                break;
            default:
                translation = translation.concat([`${base} to the ${exponent}th power`])
                break;
        }

        return translation[Math.floor(Math.random() * translation.length)]

    }
}

const EQUATION_ELEMENT = document.querySelector(`#equation`) as HTMLDivElement
const TRANSLATION_ELEMENT = document.querySelector(`#translation`) as HTMLElement

let currentIndex : number = -1;
const colors : string[] = [];

export const SEQUENCE : WCTTerm[] = [];

function AddTerm(val : string, type : termType) {
    let element = document.createElement('p')
        element.textContent = val;
    let term : WCTTerm = {
        value : val,
        type : type,
        element : element
    }
    SEQUENCE.push(term)

    EQUATION_ELEMENT.append(element)
    currentIndex++
}

function CorrectDecimal(term : WCTTerm) {
    if (!term.value.includes('.')) return

    if (term.value.includes('(-')) {
        let number = term.value.substring(2, term.value.length - 1)
        term.value = `(-${number}0)`
        term.element.textContent = term.value
    }
    else {
        term.value = `${term.value}0`;
        term.element.textContent = term.value
    }
}

//NUMBER BUTTON LOGIC
//if sequence is empty or of last term is operator
    //add number term
//if last term is number
    //if last term is negative
        //add number inside parenthesis
    //if last number is positive
        //add number to last term
export function ButtonNumber(event: Event) {
    let input = (event.target as HTMLElement).dataset.value as string;
    let lastTerm = SEQUENCE[currentIndex]
    
      //if sequence is empty or if last term is operator
    if (currentIndex === -1 || lastTerm.type === 'operator') {
        AddTerm(input, 'number')
    }
           //if last term is number
    else if (lastTerm.type === 'number') {
        if (lastTerm.value.includes(')')) {
            let number = lastTerm.value.substring(0,  lastTerm.value.length - 1)

            lastTerm.value = `${number}${input})`
            lastTerm.element.textContent = lastTerm.value
        }
        else {
            lastTerm.value += input;
            lastTerm.element.textContent = lastTerm.value    
        }
    } 
}

//ARITHMETIC OPERATOR BUTTON
//if last term is number
    //add operator
export function ButtonOperatorArith(event: Event) {
    let input = (event.target as HTMLElement).dataset.value as string;
    let lastTerm = SEQUENCE[currentIndex]

    //if sequence is empty or if last term is operator
    if (lastTerm.type === 'number') {
        CorrectDecimal(lastTerm)
        AddTerm(input, 'operator')
    }
}

//SIGN BUTTON LOGIC
//if sequence is empty or if last term is operators
    //add '(-)'
//if last term is number
    //if last term is negative
        //make last term positive
    //if last term is positive
        //make last term negative
export function ButtonSign() {
    let lastTerm = SEQUENCE[currentIndex];

    //if sequence is empty
    if (currentIndex === -1 || lastTerm.type === 'operator') {
        AddTerm('(-)', 'number')
    }
    //if sequence has number
    else if (lastTerm.type === 'number') {
        if (lastTerm.value.includes('(-')) {
            lastTerm.value = lastTerm.value.substring(2, lastTerm.value.length - 1)
            lastTerm.element.textContent = lastTerm.value
        } else {
            lastTerm.value = `(-${lastTerm.value})`
            lastTerm.element.textContent = lastTerm.value
        }
    }
}

//DELETE BUTTON LOGIC
//if lastTerm is operator
        //delete whole term
//if last term is number
    //if number is negative && length === 3
        //delete whole term
    //if number is negative && length < 3
        //delete last number only
    //if number is positive && length === 1
        //delete whole term
    //if number is positive && length < 1
        //delete last number
export function ButtonDelete() {
    let lastTerm = SEQUENCE[currentIndex]

    if (lastTerm === undefined) return

    if (lastTerm.type === 'operator') {
        lastTerm.element.remove()
        SEQUENCE.pop()
        currentIndex--
    }
    else if (lastTerm.type === 'number') {
        if (lastTerm.value.includes('(-') && lastTerm.value.length === 3) {
            lastTerm.element.remove()
            SEQUENCE.pop()
            currentIndex--
        }
        else if (lastTerm.value.includes('(-') && lastTerm.value.length > 3){
            let number = lastTerm.value.substring(0, lastTerm.value.length - 2)

            lastTerm.value = `${number})`
            lastTerm.element.textContent = lastTerm.value

        }
        if (!lastTerm.value.includes('(-') && lastTerm.value.length === 1) {
            lastTerm.element.remove()
            SEQUENCE.pop()
            currentIndex--
        }
        else if (!lastTerm.value.includes('(-') && lastTerm.value.length > 1){
            let number = lastTerm.value.substring(0, lastTerm.value.length - 1)

            lastTerm.value = number
            lastTerm.element.textContent = lastTerm.value
        }
    }
}

//DECIMAL BUTTON LOGIC
//if sequence is empty or last term is operator
    //add number term '0.'
//if last term is number and does not include '.'
    //if last term is negative
        //add decimal to end of number
    //if last term is positive
        //add decimal to end of term
export function ButtonDecimal() {
    let lastTerm = SEQUENCE[currentIndex]

    if (currentIndex === -1 || lastTerm.type === 'operator') {
        AddTerm('0.', 'number')
    }
    else if (lastTerm.type === 'number' && !lastTerm.value.includes('.')) {
        if (lastTerm.value.includes('(-')) {
            let number = lastTerm.value.substring(2, lastTerm.value.length - 1);

            (number.length >= 1) ? lastTerm.value = `(-${number}.)` : lastTerm.value = `(-${number}0.)`;
            lastTerm.element.textContent = lastTerm.value
        }
        else if (!lastTerm.value.includes('(-')) {
            lastTerm.value = `${lastTerm.value}.`
            lastTerm.element.textContent = lastTerm.value
        }
    }
}

//EQUALS BUTTON LOGIC
//if last term is number
    //add equal sign
export function ButtonEqual() {
    let lastTerm = SEQUENCE[currentIndex]

    if (lastTerm === undefined) return

    if (lastTerm.type === 'number') {
        CorrectDecimal(lastTerm)
        AddTerm('=', 'operator')
    }
}
//EXPONENT BUTTON LOGIC
//if last term is number
    //add operator
export function ButtonExponent() {
    let lastTerm = SEQUENCE[currentIndex]

    if (lastTerm.type === 'number') {
        CorrectDecimal(lastTerm)
        AddTerm('^', 'operator')
    }
}

//PARENTHESES BUTTON LOGIC
//check if open or close

//if open
    //generate new color
    //generate new term, match it to new generated color
//if close
    //get closest parenthesis, get its color
    //match it to received color
export function ButtonParenthesis(event: Event) {
    let input = (event.target as HTMLElement).dataset.value as string;

    if (input === '(') {
        console.log(colors)
    }
    else if (input === ')') {

    }
}


//TRANSLATION LOGIC
//have given sequence array
//loop through sequence and translate all exponents
//loop through sequence and translate all fractions
//loop through sequence and translate all divisions and multiplication
//loop through sequence and translate all addition and subtraction
//loop through sequence and translate all equal operators
export function TranslateSequence(sequence : WCTTerm[] = SEQUENCE, parenthesisMode : boolean = false) {
    let sequenceVals = sequence.map(a => a.value)

    while (sequenceVals.indexOf('^') !== -1) {
        let opIndex = sequenceVals.indexOf('^')

        let base = sequenceVals[opIndex - 1]
        let exponent = sequenceVals[opIndex + 1]

        sequenceVals.splice(opIndex - 1, 3, TRANSLATION_INDEX['^'](base, exponent))
    }

    while (sequenceVals.indexOf('/') !== -1) {
        let opIndex = sequenceVals.indexOf('/')

        let numerator = sequenceVals[opIndex - 1]
        let denominator = sequenceVals[opIndex + 1]

        sequenceVals.splice(opIndex - 1, 3, TRANSLATION_INDEX['/'](numerator, denominator))
    }

    while (sequenceVals.indexOf('×') !== -1 || sequenceVals.indexOf('÷') !== -1) {
        let firstMult = (sequenceVals.indexOf('×') !== -1) ? sequenceVals.indexOf('×') : Infinity
        let firstDiv = (sequenceVals.indexOf('÷') !== -1) ? sequenceVals.indexOf('÷') : Infinity

        let opIndex = Math.min(firstMult, firstDiv);

        let operation = ['×','÷'][(firstMult < firstDiv) ? 0 : 1]

        let term1 = sequenceVals[opIndex - 1]
        let term2 = sequenceVals[opIndex + 1]
        
        if (sequenceVals.length === 3) {
            sequenceVals.splice(opIndex - 1, 3, TRANSLATION_INDEX[operation](term1, term2, parenthesisMode))
        } else {
            sequenceVals.splice(opIndex - 1, 3, TRANSLATION_INDEX[operation](term1, term2))
        }
    }

    while (sequenceVals.indexOf('+') !== -1 || sequenceVals.indexOf('-') !== -1) {
        let firstAdd = (sequenceVals.indexOf('+') !== -1) ? sequenceVals.indexOf('+') : Infinity
        let firstSub = (sequenceVals.indexOf('-') !== -1) ? sequenceVals.indexOf('-') : Infinity

        let opIndex = Math.min(firstAdd, firstSub);

        let operation = ['+','-'][(firstAdd < firstSub) ? 0 : 1]

        let term1 = sequenceVals[opIndex - 1]
        let term2 = sequenceVals[opIndex + 1]

        if (sequenceVals.length === 3) {
            sequenceVals.splice(opIndex - 1, 3, TRANSLATION_INDEX[operation](term1, term2, parenthesisMode))
        } else {
            sequenceVals.splice(opIndex - 1, 3, TRANSLATION_INDEX[operation](term1, term2))
        }    
    }

    while (sequenceVals.indexOf('=') !== -1) {
        let opIndex = sequenceVals.indexOf('=');

        let term1 = sequenceVals[opIndex - 1];
        let term2 = sequenceVals[opIndex + 1];

        sequenceVals.splice(opIndex - 1, 3, TRANSLATION_INDEX['='](term1, term2))
    }

    TRANSLATION_ELEMENT.textContent = sequenceVals.join(' ')
}