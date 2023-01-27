import { WCTTerm } from "./types"

const TRANSLATION_INDEX : {[key:string]:Function} = {
    '+' : (addend1 : string, addend2 : string) => {       
        if (addend1 === undefined || addend2 === undefined) {
            return 
        }

        const translation = [`${addend1} added to ${addend2}`,`${addend1} increased by ${addend2}`,`${addend1} combined with ${addend2}`,`${addend1} together with ${addend2}`]
        return translation[Math.floor(Math.random() * translation.length)]
    },
    '-' : (minuend : string, subtrahend : string) => {
        if (minuend === undefined || subtrahend === undefined) {
            return 
        }
        
        const translation = [`${minuend} reduced by ${subtrahend}`,`${minuend} decreased by ${subtrahend}`]
        return translation[Math.floor(Math.random() * translation.length)]
    },
    '•' : (multiplicand : string, multiplier : string) => {
        if (multiplicand === undefined || multiplier === undefined) {
            return 
        }
        
        const translation = [`${multiplicand} multiplied by ${multiplier}`,`${multiplicand} times ${multiplier}`,`the product of ${multiplicand} and ${multiplier}`]
        return translation[Math.floor(Math.random() * translation.length)]
    },
    '÷' : (dividend : string, divisor : string) => {
        if (dividend === undefined || divisor === undefined) {
            return 
        }
        
        const translation = [`${dividend} divided by ${divisor}`,`${dividend} grouped by ${divisor}`,`${dividend} grouped into ${divisor}`,`the quotient of ${dividend} and ${divisor}`]
        return translation[Math.floor(Math.random() * translation.length)]

    },
    '/' : (numerator : string | undefined, denominator : string | undefined) => {
        if (numerator === undefined || denominator === undefined) {
            return 
        }
        
        const translation = [`${numerator} over ${denominator}`];

        return translation[Math.floor(Math.random() * translation.length)]
    },
    '=' : (value1 : string | undefined, value2 : string | undefined) => {
        if (value1 === undefined || value2 === undefined) {
            return 
        }

        const translation = [`${value1} is equal to ${value2}`,`${value1}, and ${value2} are equal`]
        return translation[Math.floor(Math.random() * translation.length)]
    },
    '^' : (base : string | undefined, exponent : string | undefined) => {
        if (base === undefined || exponent === undefined) {
            return 
        }

        let translation : string[] = [`${base} to the power ${exponent}`]

        switch (exponent.charAt(exponent.length - 1)) {
            case '1':
                translation = translation.concat([`${base} to the ${exponent}st power`])
                break;
            case '2':
                translation = translation.concat([`${base} to the ${exponent}nd power`,`${base} squared`])
                break;
            case '3':
                translation = translation.concat([`${base} to the ${exponent}rd power`,`${base} cubed`])
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
const EQUATION_STRING : {val : string, type : ('number'|'operator'), element : HTMLElement}[] = []
const SEQUENCE : WCTTerm[] = [];

function AddTerm(val : string, type : 'operator' | 'number') {
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
    if (term.value.charAt(term.value.length - 1) !== '.') return

    term.value = `${term.value}0`;
    term.element.textContent = term.value
}

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


export function Decimal(e : Event) {
    const input = (e.target as HTMLElement).dataset.value as string

    //if current number is operator or there is nothing
        //add 0.
    if (currentIndex === -1 || EQUATION_STRING[currentIndex].type === 'operator') {
        const element = document.createElement('p')
            element.textContent = `0${input}`
        
        EQUATION_STRING.push({
            val: `0${input}`,
            type: 'number',
            element: element
        })
        
        EQUATION_ELEMENT.append(element)
        currentIndex++
    }
    //if current index is number
        //add decimal to number
    if (EQUATION_STRING[currentIndex].type === 'number' && !(EQUATION_STRING[currentIndex].val as string).includes('.')) {
        EQUATION_STRING[currentIndex].val += '.'
        EQUATION_STRING[currentIndex].element.textContent += '.'
    }
}

export function Equal(e : Event) {
    if (EQUATION_STRING[currentIndex].type !== 'number') return

    const input = (e.target as HTMLElement).dataset.value as string;
    const element = document.createElement('p')
        element.textContent = (e.target as HTMLElement).dataset.value as string
    EQUATION_STRING.push({
        val: input,
        type: 'operator',
        element: element
    })

    EQUATION_ELEMENT.append(element)
    currentIndex++
}
export function Exponent(e : Event) {
    if (EQUATION_STRING[currentIndex].type !== 'number') return

    const input = (e.target as HTMLElement).dataset.value as string;
    const element = document.createElement('p')
        element.textContent = (e.target as HTMLElement).dataset.value as string
    EQUATION_STRING.push({
        val: input,
        type: 'operator',
        element: element
    })

    EQUATION_ELEMENT.append(element)
    currentIndex++
}

export function Translate() {
    const OUTPUT_STRING : string[] = EQUATION_STRING.map(a => a.val)

    while (OUTPUT_STRING.indexOf('^') > -1) {
        //find indexes of all subtraction operators
        const index = OUTPUT_STRING.indexOf('^')
        //offset both sides by 1 (a - 1 && a + 1)
        const base = OUTPUT_STRING[index - 1];
        const exponent = OUTPUT_STRING[index + 1];

        //use function 
        //splice translation
        OUTPUT_STRING.splice(index - 1, 3, TRANSLATION_INDEX['^'](base, exponent))
    }
        
    while (OUTPUT_STRING.indexOf('/') > -1) {
        //find indexes of all fraction operators
        const index = OUTPUT_STRING.indexOf('/')
        //offset both sides by 1 (a - 1 && a + 1)
        const numerator = OUTPUT_STRING[index - 1] 
        const denominator = OUTPUT_STRING[index + 1]
        
        //use function 
        //splice translation
        OUTPUT_STRING.splice(index - 1, 3, TRANSLATION_INDEX['/'](numerator, denominator))
    }
        
    while (OUTPUT_STRING.indexOf('•') > -1) {
        //find indexes of all multiplication operators
        const index = OUTPUT_STRING.indexOf('•')
        //offset both sides by 1 (a - 1 && a + 1)
        const multiplicand = OUTPUT_STRING[index - 1];
        const multiplier = OUTPUT_STRING[index + 1];

        //use function 
        //splice translation
        OUTPUT_STRING.splice(index - 1, 3, TRANSLATION_INDEX['•'](multiplicand, multiplier))

    }

    while (OUTPUT_STRING.indexOf('÷') > -1) {
        //find indexes of all division  operators
        const index = OUTPUT_STRING.indexOf('÷')
        //offset both sides by 1 (a - 1 && a + 1)
        const dividend = OUTPUT_STRING[index - 1];
        const divisor = OUTPUT_STRING[index + 1];

        //use function 
        //splice translation
        OUTPUT_STRING.splice(index - 1, 3, TRANSLATION_INDEX['÷'](dividend, divisor))

    }

    while (OUTPUT_STRING.indexOf('+') > -1) {
        //find indexes of all addition operators
        const index = OUTPUT_STRING.indexOf('+')
        //offset both sides by 1 (a - 1 && a + 1)
        const addend1 = OUTPUT_STRING[index - 1];
        const addend2 = OUTPUT_STRING[index + 1];

        //use function 
        //splice translation
        OUTPUT_STRING.splice(index - 1, 3, TRANSLATION_INDEX['+'](addend1, addend2))
    }

    while (OUTPUT_STRING.indexOf('-') > -1) {
        //find indexes of all subtraction operators
        const index = OUTPUT_STRING.indexOf('-')
        //offset both sides by 1 (a - 1 && a + 1)
        const minuend = OUTPUT_STRING[index - 1];
        const subtrahend = OUTPUT_STRING[index + 1];

        //use function 
        //splice translation
        OUTPUT_STRING.splice(index - 1, 3, TRANSLATION_INDEX['-'](minuend, subtrahend))
    }

    while (OUTPUT_STRING.indexOf('=') > -1) {
        //find indexes of all subtraction operators
        const index = OUTPUT_STRING.indexOf('=')
        //offset both sides by 1 (a - 1 && a + 1)
        const term1 = OUTPUT_STRING[index - 1];
        const term2 = OUTPUT_STRING[index + 1];

        //use function 
        //splice translation
        OUTPUT_STRING.splice(index - 1, 3, TRANSLATION_INDEX['='](term1, term2))
    }

    TRANSLATION_ELEMENT.textContent = OUTPUT_STRING.join(' ')

}