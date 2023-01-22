const TRANSLATION_INDEX = {
    '+': (addend1, addend2) => {
        if (addend1 === undefined || addend2 === undefined) {
            return;
        }
        const translation = [`${addend1} added to ${addend2}`, `${addend1} increased by ${addend2}`, `${addend1} combined with ${addend2}`, `${addend1} together with ${addend2}`];
        return translation[Math.floor(Math.random() * translation.length)];
    },
    '-': (minuend, subtrahend) => {
        if (minuend === undefined || subtrahend === undefined) {
            return;
        }
        const translation = [`${minuend} reduced by ${subtrahend}`, `${minuend} decreased by ${subtrahend}`];
        return translation[Math.floor(Math.random() * translation.length)];
    },
    '•': (multiplicand, multiplier) => {
        if (multiplicand === undefined || multiplier === undefined) {
            return;
        }
        const translation = [`${multiplicand} multiplied by ${multiplier}`, `${multiplicand} times ${multiplier}`, `the product of ${multiplicand} and ${multiplier}`];
        return translation[Math.floor(Math.random() * translation.length)];
    },
    '÷': (dividend, divisor) => {
        if (dividend === undefined || divisor === undefined) {
            return;
        }
        const translation = [`${dividend} divided by ${divisor}`, `${dividend} grouped by ${divisor}`, `${dividend} grouped into ${divisor}`, `the quotient of ${dividend} and ${divisor}`];
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
        switch (exponent.charAt(exponent.length - 1)) {
            case '1':
                translation = translation.concat([`${base} to the ${exponent}st power`]);
                break;
            case '2':
                translation = translation.concat([`${base} to the ${exponent}nd power`, `${base} squared`]);
                break;
            case '3':
                translation = translation.concat([`${base} to the ${exponent}rd power`, `${base} cubed`]);
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
const EQUATION_STRING = [];
export function Number(e) {
    const input = e.target.dataset.value;
    if (!EQUATION_STRING[currentIndex] || EQUATION_STRING[currentIndex].type === 'operator') {
        const element = document.createElement('p');
        element.textContent = e.target.dataset.value;
        EQUATION_STRING.push({
            val: input,
            type: 'number',
            element: element
        });
        EQUATION_ELEMENT.append(element);
        currentIndex++;
        return;
    }
    if (EQUATION_STRING[currentIndex].type === 'number') {
        EQUATION_STRING[currentIndex].val += e.target.dataset.value;
        EQUATION_STRING[currentIndex].element.textContent = `${EQUATION_STRING[currentIndex].element.textContent}${input}`;
        return;
    }
}
export function ArithOperator(e) {
    const input = e.target.dataset.value;
    if (EQUATION_STRING[currentIndex].type === 'number') {
        if (Array.from(EQUATION_STRING[currentIndex].val)[EQUATION_STRING[currentIndex].val.length - 1] === '.') {
            EQUATION_STRING[currentIndex].val += '0';
            EQUATION_STRING[currentIndex].element.textContent += '0';
        }
        if (EQUATION_STRING[currentIndex].val.includes('(-') && !EQUATION_STRING[currentIndex].val.includes(')')) {
            EQUATION_STRING[currentIndex].val += ')';
            EQUATION_STRING[currentIndex].element.textContent += ')';
        }
        const element = document.createElement('p');
        element.textContent = input;
        EQUATION_STRING.push({
            val: input,
            type: 'operator',
            element: element
        });
        EQUATION_ELEMENT.append(element);
        currentIndex++;
    }
}
export function Decimal(e) {
    const input = e.target.dataset.value;
    //if current number is operator or there is nothing
    //add 0.
    if (currentIndex === -1 || EQUATION_STRING[currentIndex].type === 'operator') {
        const element = document.createElement('p');
        element.textContent = `0${input}`;
        EQUATION_STRING.push({
            val: `0${input}`,
            type: 'number',
            element: element
        });
        EQUATION_ELEMENT.append(element);
        currentIndex++;
    }
    //if current index is number
    //add decimal to number
    if (EQUATION_STRING[currentIndex].type === 'number' && !EQUATION_STRING[currentIndex].val.includes('.')) {
        EQUATION_STRING[currentIndex].val += '.';
        EQUATION_STRING[currentIndex].element.textContent += '.';
    }
}
export function Delete() {
    //if current index is valid
    //if current index is number, and length is > 1
    //delete last char if string
    if (currentIndex > -1) {
        if (EQUATION_STRING[currentIndex].type === 'number' && EQUATION_STRING[currentIndex].val.length > 1) {
            console.log(EQUATION_STRING);
            const value = EQUATION_STRING[currentIndex].val.substring(0, EQUATION_STRING[currentIndex].val.length - 1);
            EQUATION_STRING[currentIndex].val = value;
            EQUATION_STRING[currentIndex].element.textContent = value;
        }
        else {
            EQUATION_STRING[currentIndex].element.remove();
            EQUATION_STRING.pop();
            currentIndex--;
        }
    }
}
export function Sign() {
    //if there is no number, add a negative sign
    //if there is a number, reverse its sign
    var _a, _b;
    if (EQUATION_STRING[currentIndex] && EQUATION_STRING[currentIndex].type === 'number') {
        if (EQUATION_STRING[currentIndex].val.includes('(-')) {
            EQUATION_STRING[currentIndex].val = EQUATION_STRING[currentIndex].val.substring(2, EQUATION_STRING[currentIndex].val.length);
            EQUATION_STRING[currentIndex].element.textContent = (_a = EQUATION_STRING[currentIndex].element.textContent) === null || _a === void 0 ? void 0 : _a.substring(2, (_b = EQUATION_STRING[currentIndex].element.textContent) === null || _b === void 0 ? void 0 : _b.length);
        }
        else {
            EQUATION_STRING[currentIndex].val = `(-${EQUATION_STRING[currentIndex].val}`;
            EQUATION_STRING[currentIndex].element.textContent = `(-${EQUATION_STRING[currentIndex].element.textContent}`;
        }
    }
    else {
        const element = document.createElement('p');
        element.textContent = '(-';
        EQUATION_STRING.push({
            val: '(-',
            type: 'number',
            element: element
        });
        EQUATION_ELEMENT.append(element);
        currentIndex++;
        return;
    }
}
export function Equal(e) {
    if (EQUATION_STRING[currentIndex].type !== 'number')
        return;
    const input = e.target.dataset.value;
    const element = document.createElement('p');
    element.textContent = e.target.dataset.value;
    EQUATION_STRING.push({
        val: input,
        type: 'operator',
        element: element
    });
    EQUATION_ELEMENT.append(element);
    currentIndex++;
}
export function Exponent(e) {
    if (EQUATION_STRING[currentIndex].type !== 'number')
        return;
    const input = e.target.dataset.value;
    const element = document.createElement('p');
    element.textContent = e.target.dataset.value;
    EQUATION_STRING.push({
        val: input,
        type: 'operator',
        element: element
    });
    EQUATION_ELEMENT.append(element);
    currentIndex++;
}
export function Translate() {
    const OUTPUT_STRING = EQUATION_STRING.map(a => a.val);
    while (OUTPUT_STRING.indexOf('^') > -1) {
        //find indexes of all subtraction operators
        const index = OUTPUT_STRING.indexOf('^');
        //offset both sides by 1 (a - 1 && a + 1)
        const base = OUTPUT_STRING[index - 1];
        const exponent = OUTPUT_STRING[index + 1];
        //use function 
        //splice translation
        OUTPUT_STRING.splice(index - 1, 3, TRANSLATION_INDEX['^'](base, exponent));
    }
    while (OUTPUT_STRING.indexOf('/') > -1) {
        //find indexes of all fraction operators
        const index = OUTPUT_STRING.indexOf('/');
        //offset both sides by 1 (a - 1 && a + 1)
        const numerator = OUTPUT_STRING[index - 1];
        const denominator = OUTPUT_STRING[index + 1];
        //use function 
        //splice translation
        OUTPUT_STRING.splice(index - 1, 3, TRANSLATION_INDEX['/'](numerator, denominator));
    }
    while (OUTPUT_STRING.indexOf('•') > -1) {
        //find indexes of all multiplication operators
        const index = OUTPUT_STRING.indexOf('•');
        //offset both sides by 1 (a - 1 && a + 1)
        const multiplicand = OUTPUT_STRING[index - 1];
        const multiplier = OUTPUT_STRING[index + 1];
        //use function 
        //splice translation
        OUTPUT_STRING.splice(index - 1, 3, TRANSLATION_INDEX['•'](multiplicand, multiplier));
    }
    while (OUTPUT_STRING.indexOf('÷') > -1) {
        //find indexes of all division  operators
        const index = OUTPUT_STRING.indexOf('÷');
        //offset both sides by 1 (a - 1 && a + 1)
        const dividend = OUTPUT_STRING[index - 1];
        const divisor = OUTPUT_STRING[index + 1];
        //use function 
        //splice translation
        OUTPUT_STRING.splice(index - 1, 3, TRANSLATION_INDEX['÷'](dividend, divisor));
    }
    while (OUTPUT_STRING.indexOf('+') > -1) {
        //find indexes of all addition operators
        const index = OUTPUT_STRING.indexOf('+');
        //offset both sides by 1 (a - 1 && a + 1)
        const addend1 = OUTPUT_STRING[index - 1];
        const addend2 = OUTPUT_STRING[index + 1];
        //use function 
        //splice translation
        OUTPUT_STRING.splice(index - 1, 3, TRANSLATION_INDEX['+'](addend1, addend2));
    }
    while (OUTPUT_STRING.indexOf('-') > -1) {
        //find indexes of all subtraction operators
        const index = OUTPUT_STRING.indexOf('-');
        //offset both sides by 1 (a - 1 && a + 1)
        const minuend = OUTPUT_STRING[index - 1];
        const subtrahend = OUTPUT_STRING[index + 1];
        //use function 
        //splice translation
        OUTPUT_STRING.splice(index - 1, 3, TRANSLATION_INDEX['-'](minuend, subtrahend));
    }
    while (OUTPUT_STRING.indexOf('=') > -1) {
        //find indexes of all subtraction operators
        const index = OUTPUT_STRING.indexOf('=');
        //offset both sides by 1 (a - 1 && a + 1)
        const term1 = OUTPUT_STRING[index - 1];
        const term2 = OUTPUT_STRING[index + 1];
        //use function 
        //splice translation
        OUTPUT_STRING.splice(index - 1, 3, TRANSLATION_INDEX['='](term1, term2));
    }
    TRANSLATION_ELEMENT.textContent = OUTPUT_STRING.join(' ');
}
