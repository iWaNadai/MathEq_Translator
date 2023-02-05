const TRANSLATION_INDEX = {
    '+': (addend1, addend2, parenthesisMode = false) => {
        if (addend1 === undefined || addend2 === undefined) {
            return;
        }
        const translation = (parenthesisMode) ? [`the sum of ${addend1} and ${addend2}`] : [`${addend1} added to ${addend2}`, `${addend1} increased by ${addend2}`, `${addend1} combined with ${addend2}`, `${addend1} together with ${addend2}`];
        return translation[Math.floor(Math.random() * translation.length)];
    },
    '-': (minuend, subtrahend, parenthesisMode = false) => {
        if (minuend === undefined || subtrahend === undefined) {
            return;
        }
        const translation = (parenthesisMode) ? [`the difference of ${minuend} and ${subtrahend}`] : [`${minuend} reduced by ${subtrahend}`, `${minuend} decreased by ${subtrahend}`];
        return translation[Math.floor(Math.random() * translation.length)];
    },
    '×': (multiplicand, multiplier, parenthesisMode = false) => {
        if (multiplicand === undefined || multiplier === undefined) {
            return;
        }
        const translation = (parenthesisMode) ? [`the product of ${multiplicand} and ${multiplier}`] : [`${multiplicand} multiplied by ${multiplier}`, `${multiplicand} times ${multiplier}`];
        return translation[Math.floor(Math.random() * translation.length)];
    },
    '÷': (dividend, divisor, parenthesisMode = false) => {
        if (dividend === undefined || divisor === undefined) {
            return;
        }
        const translation = (parenthesisMode) ? [`the quotient of ${dividend} and ${divisor}`] : [`${dividend} divided by ${divisor}`, `${dividend} grouped by ${divisor}`, `${dividend} grouped into ${divisor}`];
        return translation[Math.floor(Math.random() * translation.length)];
    },
    '/': (numerator, denominator) => {
        if (numerator === undefined || denominator === undefined) {
            return;
        }
        const translation = [`${numerator} over ${denominator}`];
        return translation[Math.floor(Math.random() * translation.length)];
    },
    '=': (value1, value2) => {
        if (value1 === undefined || value2 === undefined) {
            return;
        }
        const translation = [`${value1} is equal to ${value2}`, `${value1}, and ${value2} are equal`];
        return translation[Math.floor(Math.random() * translation.length)];
    },
    '^': (base, exponent) => {
        if (base === undefined || exponent === undefined) {
            return;
        }
        let translation = [`${base} to the power ${exponent}`];
        switch (true) {
            case (exponent === '2'):
                translation = translation.concat([`${base} squared`, `${base} to the ${exponent}nd power`]);
                break;
            case (exponent === '3'):
                translation = translation.concat([`${base} cubed`, `${base} to the ${exponent}rd power`]);
                break;
            case (exponent.charAt(exponent.length - 1) === '1'):
                translation = translation.concat([`${base} to the ${exponent}st power`]);
                break;
            case (exponent.charAt(exponent.length - 1) === '2'):
                translation = translation.concat([`${base} to the ${exponent}nd power`]);
                break;
            case (exponent.charAt(exponent.length - 1) === '3'):
                translation = translation.concat([`${base} to the ${exponent}rd power`]);
                break;
            default:
                translation = translation.concat([`${base} to the ${exponent}th power`]);
                break;
        }
        return translation[Math.floor(Math.random() * translation.length)];
    }
};
const EQUATION_ELEMENT = document.querySelector(`#equation`);
const TRANSLATION_ELEMENT = document.querySelector(`#translation`);
let currentIndex = -1;
const colors = [];
export const SEQUENCE = [];
function AddTerm(val, type) {
    let element = document.createElement('p');
    element.textContent = val;
    let term = {
        value: val,
        type: type,
        element: element
    };
    SEQUENCE.push(term);
    EQUATION_ELEMENT.append(element);
    currentIndex++;
}
function CorrectDecimal(term) {
    if (!term.value.includes('.'))
        return;
    if (term.value.includes('(-')) {
        let number = term.value.substring(2, term.value.length - 1);
        term.value = `(-${number}0)`;
        term.element.textContent = term.value;
    }
    else {
        term.value = `${term.value}0`;
        term.element.textContent = term.value;
    }
}
export function ButtonNumber(event) {
    let input = event.target.dataset.value;
    let lastTerm = SEQUENCE[currentIndex];
    if (currentIndex === -1 || lastTerm.type === 'operator') {
        AddTerm(input, 'number');
    }
    else if (lastTerm.type === 'number') {
        if (lastTerm.value.includes(')')) {
            let number = lastTerm.value.substring(0, lastTerm.value.length - 1);
            lastTerm.value = `${number}${input})`;
            lastTerm.element.textContent = lastTerm.value;
        }
        else {
            lastTerm.value += input;
            lastTerm.element.textContent = lastTerm.value;
        }
    }
}
export function ButtonOperatorArith(event) {
    let input = event.target.dataset.value;
    let lastTerm = SEQUENCE[currentIndex];
    if (lastTerm.type === 'number') {
        CorrectDecimal(lastTerm);
        AddTerm(input, 'operator');
    }
}
export function ButtonSign() {
    let lastTerm = SEQUENCE[currentIndex];
    if (currentIndex === -1 || lastTerm.type === 'operator') {
        AddTerm('(-)', 'number');
    }
    else if (lastTerm.type === 'number') {
        if (lastTerm.value.includes('(-')) {
            lastTerm.value = lastTerm.value.substring(2, lastTerm.value.length - 1);
            lastTerm.element.textContent = lastTerm.value;
        }
        else {
            lastTerm.value = `(-${lastTerm.value})`;
            lastTerm.element.textContent = lastTerm.value;
        }
    }
}
export function ButtonDelete() {
    let lastTerm = SEQUENCE[currentIndex];
    if (lastTerm === undefined)
        return;
    if (lastTerm.type === 'operator') {
        lastTerm.element.remove();
        SEQUENCE.pop();
        currentIndex--;
    }
    else if (lastTerm.type === 'number') {
        if (lastTerm.value.includes('(-') && lastTerm.value.length === 3) {
            lastTerm.element.remove();
            SEQUENCE.pop();
            currentIndex--;
        }
        else if (lastTerm.value.includes('(-') && lastTerm.value.length > 3) {
            let number = lastTerm.value.substring(0, lastTerm.value.length - 2);
            lastTerm.value = `${number})`;
            lastTerm.element.textContent = lastTerm.value;
        }
        if (!lastTerm.value.includes('(-') && lastTerm.value.length === 1) {
            lastTerm.element.remove();
            SEQUENCE.pop();
            currentIndex--;
        }
        else if (!lastTerm.value.includes('(-') && lastTerm.value.length > 1) {
            let number = lastTerm.value.substring(0, lastTerm.value.length - 1);
            lastTerm.value = number;
            lastTerm.element.textContent = lastTerm.value;
        }
    }
}
export function ButtonDecimal() {
    let lastTerm = SEQUENCE[currentIndex];
    if (currentIndex === -1 || lastTerm.type === 'operator') {
        AddTerm('0.', 'number');
    }
    else if (lastTerm.type === 'number' && !lastTerm.value.includes('.')) {
        if (lastTerm.value.includes('(-')) {
            let number = lastTerm.value.substring(2, lastTerm.value.length - 1);
            (number.length >= 1) ? lastTerm.value = `(-${number}.)` : lastTerm.value = `(-${number}0.)`;
            lastTerm.element.textContent = lastTerm.value;
        }
        else if (!lastTerm.value.includes('(-')) {
            lastTerm.value = `${lastTerm.value}.`;
            lastTerm.element.textContent = lastTerm.value;
        }
    }
}
export function ButtonEqual() {
    let lastTerm = SEQUENCE[currentIndex];
    if (lastTerm === undefined)
        return;
    if (lastTerm.type === 'number') {
        CorrectDecimal(lastTerm);
        AddTerm('=', 'operator');
    }
}
export function ButtonExponent() {
    let lastTerm = SEQUENCE[currentIndex];
    if (lastTerm.type === 'number') {
        CorrectDecimal(lastTerm);
        AddTerm('^', 'operator');
    }
}
export function ButtonParenthesis(event) {
    let input = event.target.dataset.value;
    if (input === '(') {
        console.log(colors);
    }
    else if (input === ')') {
    }
}
export function TranslateSequence(sequence = SEQUENCE, parenthesisMode = false) {
    let sequenceVals = sequence.map(a => a.value);
    while (sequenceVals.indexOf('^') !== -1) {
        let opIndex = sequenceVals.indexOf('^');
        let base = sequenceVals[opIndex - 1];
        let exponent = sequenceVals[opIndex + 1];
        sequenceVals.splice(opIndex - 1, 3, TRANSLATION_INDEX['^'](base, exponent));
    }
    while (sequenceVals.indexOf('/') !== -1) {
        let opIndex = sequenceVals.indexOf('/');
        let numerator = sequenceVals[opIndex - 1];
        let denominator = sequenceVals[opIndex + 1];
        sequenceVals.splice(opIndex - 1, 3, TRANSLATION_INDEX['/'](numerator, denominator));
    }
    while (sequenceVals.indexOf('×') !== -1 || sequenceVals.indexOf('÷') !== -1) {
        let firstMult = (sequenceVals.indexOf('×') !== -1) ? sequenceVals.indexOf('×') : Infinity;
        let firstDiv = (sequenceVals.indexOf('÷') !== -1) ? sequenceVals.indexOf('÷') : Infinity;
        let opIndex = Math.min(firstMult, firstDiv);
        let operation = ['×', '÷'][(firstMult < firstDiv) ? 0 : 1];
        let term1 = sequenceVals[opIndex - 1];
        let term2 = sequenceVals[opIndex + 1];
        if (sequenceVals.length === 3) {
            sequenceVals.splice(opIndex - 1, 3, TRANSLATION_INDEX[operation](term1, term2, parenthesisMode));
        }
        else {
            sequenceVals.splice(opIndex - 1, 3, TRANSLATION_INDEX[operation](term1, term2));
        }
    }
    while (sequenceVals.indexOf('+') !== -1 || sequenceVals.indexOf('-') !== -1) {
        let firstAdd = (sequenceVals.indexOf('+') !== -1) ? sequenceVals.indexOf('+') : Infinity;
        let firstSub = (sequenceVals.indexOf('-') !== -1) ? sequenceVals.indexOf('-') : Infinity;
        let opIndex = Math.min(firstAdd, firstSub);
        let operation = ['+', '-'][(firstAdd < firstSub) ? 0 : 1];
        let term1 = sequenceVals[opIndex - 1];
        let term2 = sequenceVals[opIndex + 1];
        if (sequenceVals.length === 3) {
            sequenceVals.splice(opIndex - 1, 3, TRANSLATION_INDEX[operation](term1, term2, parenthesisMode));
        }
        else {
            sequenceVals.splice(opIndex - 1, 3, TRANSLATION_INDEX[operation](term1, term2));
        }
    }
    while (sequenceVals.indexOf('=') !== -1) {
        let opIndex = sequenceVals.indexOf('=');
        let term1 = sequenceVals[opIndex - 1];
        let term2 = sequenceVals[opIndex + 1];
        sequenceVals.splice(opIndex - 1, 3, TRANSLATION_INDEX['='](term1, term2));
    }
    TRANSLATION_ELEMENT.textContent = sequenceVals.join(' ');
}
