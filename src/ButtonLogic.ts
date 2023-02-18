import { termType, WCTTerm } from "./types"


const EQUATION_ELEMENT = document.querySelector(`#equation`) as HTMLDivElement
const TRANSLATION_ELEMENT = document.querySelector(`#translation`) as HTMLElement

let currentIndex : number = -1;
export let sequence : WCTTerm[] = [];

function AddTerm(val : string, type : termType, id? : number) {
    let element = document.createElement('p')
        element.textContent = val;
    let term : WCTTerm = {
        value : val,
        type : type,
        element : element,
        id : id
    }
    sequence.push(term)

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

function CorrectInteger(term : WCTTerm, ) {
    if (term.value === '(-)') {
        term.value = '0';
        term.element.textContent = term.value;
    }
}

function* ParenthesesIdGenerator() : Generator<(string | WCTTerm), never, ('(' | ')' | 'resolve' | 'del (' | 'del )')> {
    let lastOpen: number = 0;
    let lastClose: number = 0;
    let input : (string | WCTTerm) = '';
    while (true) {
        input = yield input //equal to param

        if (input === '(') {
            AddTerm('(', 'grouper', lastOpen)
            lastOpen++        
    
            yield sequence[currentIndex]
        } else if (input === ')') {
            if (lastOpen > lastClose) {
                AddTerm(')', 'grouper', lastClose)
                lastClose++         
            }

            yield sequence[currentIndex]
        } 
        else if (input === 'del (' || input === 'del )') {
            (input.includes('(')) ? lastOpen-- : lastClose--
            yield sequence[currentIndex]
        }

    }
}let Generator = ParenthesesIdGenerator()
Generator.next()

export function ButtonNumber(event: Event) {
    let input = (event.target as HTMLElement).dataset.value as string;
    let lastTerm = sequence[currentIndex]
    
    if (currentIndex === -1 || lastTerm.type === 'operator' || lastTerm.type === 'grouper' && lastTerm.value === '(') {
        AddTerm(input, 'number')
    }
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

export function ButtonOperatorArith(event: Event) {
    let input = (event.target as HTMLElement).dataset.value as string;
    let lastTerm = sequence[currentIndex]

    //if sequence is empty or if last term is operator
    if (lastTerm.type === 'number') {
        CorrectDecimal(lastTerm)
        CorrectInteger(lastTerm)
        AddTerm(input, 'operator')
    }
    else if (lastTerm.type === 'grouper' && lastTerm.value === ')') {
        AddTerm(input, 'operator')
    }
}

export function ButtonSign() {
    let lastTerm = sequence[currentIndex];

    if (currentIndex === -1 || lastTerm.type === 'operator') {
        AddTerm('(-)', 'number')
    }
    else if (lastTerm.type === 'number') {
        if (lastTerm.value === '(-)') {
            lastTerm.element.remove()
            sequence.pop()
            currentIndex--    
        }
        else if (lastTerm.value.includes('(-')) {
            lastTerm.value = lastTerm.value.substring(2, lastTerm.value.length - 1)
            lastTerm.element.textContent = lastTerm.value
        } else {
            lastTerm.value = `(-${lastTerm.value})`
            lastTerm.element.textContent = lastTerm.value
        }
    }
}

export function ButtonDelete() {
    let lastTerm = sequence[currentIndex]

    if (lastTerm === undefined) return

    if (lastTerm.type === 'operator') {
        lastTerm.element.remove()
        sequence.pop()
        currentIndex--
    }
    else if (lastTerm.type === 'grouper') {
        if (lastTerm.value === '(') {
            Generator.next('del (')
        }
        else if (lastTerm.value === ')') {
            Generator.next('del )')
        }
        Generator.next()
        lastTerm.element.remove()
        sequence.pop()
        currentIndex--
    }
    else if (lastTerm.type === 'number') {
        if (lastTerm.value.includes('(-') && lastTerm.value.length === 3) {
            lastTerm.element.remove()
            sequence.pop()
            currentIndex--
        }
        else if (lastTerm.value.includes('(-') && lastTerm.value.length > 3){
            let number = lastTerm.value.substring(0, lastTerm.value.length - 2)

            lastTerm.value = `${number})`
            lastTerm.element.textContent = lastTerm.value

        }
        if (!lastTerm.value.includes('(-') && lastTerm.value.length === 1) {
            lastTerm.element.remove()
            sequence.pop()
            currentIndex--
        }
        else if (!lastTerm.value.includes('(-') && lastTerm.value.length > 1){
            let number = lastTerm.value.substring(0, lastTerm.value.length - 1)

            lastTerm.value = number
            lastTerm.element.textContent = lastTerm.value
        }
    }
}

export function ButtonDecimal() {
    let lastTerm = sequence[currentIndex]

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

export function ButtonExponent() {
    let lastTerm = sequence[currentIndex]

    if (lastTerm.type === 'number') {
        CorrectDecimal(lastTerm)
        AddTerm('^', 'operator')
    }
}

export function ButtonParenthesis(event: Event) {
    let input = (event.target as HTMLElement).dataset.value as string;
    let lastTerm = sequence[currentIndex]

    if (input === '(') {
        if (lastTerm !== undefined && lastTerm.type === 'number') return

        Generator.next('(')
        Generator.next()
    } else if (input === ')') {
        Generator.next(')')
        Generator.next()
    }
}

export function ButtonClear() {
    sequence = [];
    Generator = ParenthesesIdGenerator();
    Generator.next()
    EQUATION_ELEMENT.innerHTML = '';
    console.log(TRANSLATION_ELEMENT.innerHTML)
    TRANSLATION_ELEMENT.innerHTML = 'Awaiting input...';
    currentIndex = -1
}

export function ButtonRadical() {
    let lastTerm : undefined | WCTTerm = sequence[currentIndex]

    if (lastTerm === undefined) {
        AddTerm('2','operator');
        AddTerm('√','operator');
    } else {
        AddTerm('√','operator');
    }
}

export function Translator( Sequence : WCTTerm[] = sequence, isTerm : boolean = false) {
    let sequenceToTranslate = Sequence.map(a => a.value);

    console.table(sequence)
    
    let operatorInFocus : number;
    let textToSpeak = '';

    sequenceToTranslate = sequenceToTranslate.map(a => {
        if (typeof Number(a.substring(1, a.length - 1)) === 'number' && Number(a.substring(1, a.length - 1)) < 0) {
            return 'negative ' + Number(a.substring(2, a.length - 1)).toLocaleString()
        }else if (isNaN(Number(a))) {
            return a
        } else {
            return Number(a).toLocaleString()
        }
    })

    const translationTemplates = (a : string = 'n', b : string = 'n', operator : string) => {
        
        if (operator === '^' && isNaN(Number(b))) {
            operator = '^x';
        } else if (operator === '^' && Number(b) === 1) {
            operator = '^1';
        } else if (operator === '^' && Number(b) === 2) {
            operator = '^2|';
        } else if (operator === '^' && Number(b) === 3) {
            operator = '^3|';
        } else if (operator === '^' && b.endsWith('2')) {
            operator = '^2';
        } else if (operator === '^' && b.endsWith('3')) {
            operator = '^3';
        } else if (operator === '√' && a.endsWith('1')) {
            operator = '1√';
        } else if (operator === '√' && a.endsWith('2')) {
            operator = '2√';
        } else if (operator === '√' && a.endsWith('3')) {
            operator = '3√';
        } else if (operator === '√' && Number(a) === 2) {
            operator = '2|√';
        } else if (operator === '√' && Number(a) === 3) {
            operator = '3|√';
        }

        if (b.endsWith(';')) {
            b = b.replace(';','')
        }

        if (isNaN(Number(b))) b = `: ${b}`;
        else b = ` ${b}`;

        const Templates : {[key:string] : string[]} = {
            '^x' : [`${a} to the power of${b}`],
            '^' : [`${a} to the power of${b}`, `${a} to the ${b}th power`],
            '^1' : [`${a} to the power of${b}`, `${a} to the ${b}st power`],
            '^2' : [`${a} to the power of${b}`, `${a} to the ${b}nd power`],
            '^3' : [`${a} to the power of${b}`, `${a} to the ${b}rd power`],
            '^2|' : [`${a} to the power of${b}`, `${a} to the ${b}nd power`, `${a} squared`],
            '^3|' : [`${a} to the power of${b}`, `${a} to the ${b}rd power`, `${a} cubed`],
            '√' : [`${a}th root of${b}`],
            '1√' : [`${a}st root of${b}`],
            '2√' : [`${a}nd root of${b}`],
            '3√' : [`${a}rd root of${b}`],
            '2|√' : [`${a}nd root of${b}`, `square root of${b}`],
            '3|√' : [`${a}rd root of${b}`, `cubed root of${b}`],
            '/' : [`${a} over${b}`],
            '×' : [`${a} multiplied by${b}`, `${a} times${b}`],
            '÷' : [`${a} divided by${b}`, `${a} grouped into${b}`],
            '+' : [`${a} added to${b}`, `${a} increased by${b}`, `${a} combined with${b}`],
            '-' : [`${a} reduced by${b}`, `${a} subtracted by${b}`]
        }

        const phraseIndex = Math.floor(Math.random() * Templates[operator].length);

        console.log('translation: ',a, b, Templates[operator][phraseIndex])

        return Templates[operator][phraseIndex]
    }

    //GROUPS

    operatorInFocus = sequenceToTranslate.indexOf('^')
    while (operatorInFocus !== -1) {
        let [a,,b] = sequenceToTranslate.slice(operatorInFocus - 1, operatorInFocus + 2)

        sequenceToTranslate.splice(operatorInFocus - 1, 3, translationTemplates(a,b,'^') + ';')

        operatorInFocus = sequenceToTranslate.indexOf('^')
    }

    operatorInFocus = sequenceToTranslate.indexOf('√')
    while (operatorInFocus !== -1) {
        let [a,,b] = sequenceToTranslate.slice(operatorInFocus - 1, operatorInFocus + 2)

        sequenceToTranslate.splice(operatorInFocus - 1, 3, translationTemplates(a,b,'√') + ';')

        operatorInFocus = sequenceToTranslate.indexOf('√')
    }

    operatorInFocus = sequenceToTranslate.indexOf('/')
    while (operatorInFocus !== -1) {
        let [a,,b] = sequenceToTranslate.slice(operatorInFocus - 1, operatorInFocus + 2)

        sequenceToTranslate.splice(operatorInFocus - 1, 3, translationTemplates(a,b,'/') + ';')

        operatorInFocus = sequenceToTranslate.indexOf('/')
    }

    let aOperator = (sequenceToTranslate.indexOf('×') !== -1) ? sequenceToTranslate.indexOf('×') : Infinity;
    let bOperator = (sequenceToTranslate.indexOf('÷') !== -1) ? sequenceToTranslate.indexOf('÷') : Infinity;
    operatorInFocus = Math.min(aOperator, bOperator)
    while (operatorInFocus !== Infinity) {
        let [a,operator,b] = sequenceToTranslate.slice(operatorInFocus - 1, operatorInFocus + 2)

        let translation = translationTemplates(a,b,operator)
        let nextOpIsInverse = sequenceToTranslate[operatorInFocus + 2] === '×' || sequenceToTranslate[operatorInFocus + 2] === '÷';

        let equationLength = 3
        let endOperator = operatorInFocus;

        while (nextOpIsInverse) {
            endOperator += 2;
            equationLength += 2;
            operator = sequenceToTranslate[endOperator]
            a = translation + ','
            b = sequenceToTranslate[endOperator + 1]

            translation = translationTemplates(a,b,operator);

            nextOpIsInverse = sequenceToTranslate[endOperator + 2] === '×' || sequenceToTranslate[endOperator + 2] === '÷';
        }

        sequenceToTranslate.splice(operatorInFocus - 1, equationLength, translation + ';')

        aOperator = (sequenceToTranslate.indexOf('×') !== -1) ? sequenceToTranslate.indexOf('×') : Infinity;
        bOperator = (sequenceToTranslate.indexOf('÷') !== -1) ? sequenceToTranslate.indexOf('÷') : Infinity;
        operatorInFocus = Math.min(aOperator, bOperator)
    
    }

    aOperator = (sequenceToTranslate.indexOf('+') !== -1) ? sequenceToTranslate.indexOf('+') : Infinity;
    bOperator = (sequenceToTranslate.indexOf('-') !== -1) ? sequenceToTranslate.indexOf('-') : Infinity;
    operatorInFocus = Math.min(aOperator, bOperator)
    while (operatorInFocus !== Infinity) {
        let [a,operator,b] = sequenceToTranslate.slice(operatorInFocus - 1, operatorInFocus + 2)

        let translation = translationTemplates(a,b,operator)
        let nextOpIsInverse = sequenceToTranslate[operatorInFocus + 2] === '+' || sequenceToTranslate[operatorInFocus + 2] === '-';

        let equationLength = 3
        let endOperator = operatorInFocus;

        while (nextOpIsInverse) {
            endOperator += 2;
            equationLength += 2;
            operator = sequenceToTranslate[endOperator]
            a = translation + ','
            b = sequenceToTranslate[endOperator + 1]
            

            translation = translationTemplates(a,b,operator);

            nextOpIsInverse = sequenceToTranslate[endOperator + 2] === '+' || sequenceToTranslate[endOperator + 2] === '-';
        }

        sequenceToTranslate.splice(operatorInFocus - 1, equationLength, translation + ';')

        aOperator = (sequenceToTranslate.indexOf('+') !== -1) ? sequenceToTranslate.indexOf('+') : Infinity;
        bOperator = (sequenceToTranslate.indexOf('-') !== -1) ? sequenceToTranslate.indexOf('-') : Infinity;
        operatorInFocus = Math.min(aOperator, bOperator)
    
    }

    TRANSLATION_ELEMENT.textContent = sequenceToTranslate.join('');
    textToSpeak = sequenceToTranslate.join('');
    return textToSpeak
}