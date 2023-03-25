import EQH from "./Handlers/EquationHandler.js";
export function AddNumber(event) {
    let target = event.target;
    let value = target.dataset.value;
    let lastTermType = EQH.GetLastTermType();
    let term = {
        value: value,
        type: 'number'
    };
    if (lastTermType === 'none' || lastTermType !== 'number') {
        EQH.AddTerm(term);
    }
    else {
        term.value = EQH.GetLastTermValue() + value;
        EQH.EditLastTerm(term);
    }
}
export function AddOperator(event) {
    let target = event.target;
    let value = target.dataset.value;
    let lastTermType = EQH.GetLastTermType();
    let lastTermValue = EQH.GetLastTermValue();
    let terms = [];
    const addBasic = () => {
        if (lastTermType === 'operator')
            return;
        if (lastTermValue === '(')
            return;
        value = (value === '*') ? '×' : value;
        terms.push({ value: value, type: 'operator' });
    };
    const addRadical = () => {
        if (lastTermType === 'none' || lastTermType === 'operator' || lastTermValue === '(') {
            terms.push({ value: '2', type: 'number' });
        }
        terms.push({ value: '√', type: 'operator' });
    };
    switch (value) {
        case ('*'):
        case ('÷'):
        case ('+'):
        case ('-'):
        case ('/'):
        case ('^'):
            addBasic();
            break;
        case ('√'):
            addRadical();
            break;
    }
    terms.forEach(a => EQH.AddTerm(a));
}
export function AddUtility(event) {
    let target = event.target;
    let value = target.dataset.value;
    let lastTermType = EQH.GetLastTermType();
    let lastTermValue = EQH.GetLastTermValue();
    const utilDelete = () => {
        EQH.DeleteLastTerm();
    };
    const utilAllClear = () => {
        EQH.ClearEquation();
    };
    const utilDecimal = () => {
        if (lastTermType === 'number' && lastTermValue === '(-') {
            let newTerm = `${EQH.GetLastTermValue()}0.`;
            EQH.EditLastTerm({ value: newTerm, type: 'number' });
        }
        else if (lastTermType === 'number' && lastTermValue !== '(-') {
            let newTerm = `${EQH.GetLastTermValue()}.`;
            EQH.EditLastTerm({ value: newTerm, type: 'number' });
        }
        else {
            EQH.AddTerm({ value: '0.', type: 'number' });
        }
    };
    const utilSign = () => {
        if (lastTermType === 'number') {
            let newTerm = `(-${EQH.GetLastTermValue()}`;
            EQH.EditLastTerm({ value: newTerm, type: 'number' });
        }
        else {
            EQH.AddTerm({ value: '(-', type: 'number' });
        }
    };
    const utilEquals = () => {
        alert('SOLVE IT YOURSELF FOR ONCE!!');
    };
    switch (value) {
        case 'DEL':
            utilDelete();
            break;
        case 'AC':
            utilAllClear();
            break;
        case '.':
            utilDecimal();
            break;
        case 'SIGN':
            utilSign();
            break;
        case '=':
            utilEquals();
            break;
    }
}
export function AddGroupers(event) {
    let target = event.target;
    let value = target.dataset.value;
    let lastTermType = EQH.GetLastTermType();
    let lastTermValue = EQH.GetLastTermValue();
    if (lastTermType === 'number' && value === '(')
        return;
    if (lastTermType === 'operator' && value === ')')
        return;
    if (lastTermValue === '(' && value === ')')
        return;
    if (lastTermValue === ')' && value === '(')
        return;
    EQH.AddGrouper(value);
    console.table(EQH.groupers);
}
export function Translate() {
    EQH.Resolve();
    const ATLAS = {};
    const makeAlias = (atlas, value) => {
        let entries = Object.entries(atlas);
        if (entries.find(a => a[1] === value) !== undefined) {
            return entries.find(a => a[1] === value)[0];
        }
        let aliasSource = 'abcdefghijklmnopqrstuvwxyz';
        let alias = '';
        do {
            for (let i = 0; i < 10; i++) {
                if (i === 0) {
                    alias = aliasSource[Math.floor(Math.random() * aliasSource.length)];
                    continue;
                }
                alias += aliasSource[Math.floor(Math.random() * aliasSource.length)];
            }
        } while (atlas[alias] !== undefined);
        atlas[alias] = value;
        return alias;
    };
    const commaNotate = (number) => {
        if (number.includes('(-')) {
            return `${Number(number.substring(1, number.length - 1)).toLocaleString()}`;
        }
        return number.toLocaleString();
    };
    let equation = EQH.equation
        .map(item => {
        if (item.type === 'number') {
            let alias = makeAlias(ATLAS, commaNotate(item.value));
            return alias;
        }
        return item.value;
    })
        .join('');
    const INITIAL_NUMBERS = Object.keys(ATLAS);
    const translate = (sequence) => {
        let translation = '';
        let sequenceParts = sequence.match(/([a-z]{10}|(\√|\^|\/|\×|\÷|\+|\-))/g);
        let itterationCount = ((sequenceParts.length - 3) / 2);
        console.log(itterationCount);
        for (let i = 0; i <= itterationCount; i++) {
            console.log(`Itteration ${i}`);
            let opperand1 = ATLAS[sequenceParts[0]];
            let operator = sequenceParts[1];
            let opperand2 = (!INITIAL_NUMBERS.includes(sequenceParts[2])) ? ': ' + ATLAS[sequenceParts[2]] : ' ' + ATLAS[sequenceParts[2]];
            if (operator === '√') {
                if (opperand1 === '2') {
                    operator = '2√';
                }
                else if (opperand1 === '3') {
                    operator = '3√';
                }
                else if (opperand1.endsWith('2')) {
                    operator = '...2√';
                }
                else if (opperand1.endsWith('3')) {
                    operator = '...3√';
                }
            }
            if (operator === '^') {
                if (opperand2 === '2') {
                    operator = '^2';
                }
                else if (opperand2 === '3') {
                    operator = '^3';
                }
                else if (opperand2.endsWith('2')) {
                    operator = '^...2';
                }
                else if (opperand2.endsWith('3')) {
                    operator = '^...3';
                }
                else if (!INITIAL_NUMBERS.includes(sequenceParts[2])) {
                    operator = '^x';
                }
            }
            let translations = {
                '+': [`${opperand1} added to${opperand2}`, `${opperand1} increased by${opperand2}`],
                '-': [`${opperand1} reduced by${opperand2}`, `${opperand1} subtracted by${opperand2}`, `${opperand1} decreased by${opperand2}`],
                '×': [`${opperand1} multiplied by${opperand2}`, `${opperand1} times${opperand2}`],
                '÷': [`${opperand1} divided by${opperand2}`, `${opperand1} group into${opperand2}'s`],
                '√': [`${opperand1}th root of${opperand2}`],
                '2√': [`${opperand1}nd root of${opperand2}`, `squareroot of${opperand2}`],
                '3√': [`${opperand1}rd root of${opperand2}`, `cuberoot of${opperand2}`],
                '...2√': [`${opperand1}nd root of${opperand2}`],
                '...3√': [`${opperand1}rd root of${opperand2}`],
                '^': [`${opperand1} to the power of${opperand2}`, `${opperand1} to the${opperand2}th power`],
                '^x': [`${opperand1} to the power of${opperand2}`],
                '^2': [`${opperand1} to the ${opperand2}nd power`, `${opperand1} squared`],
                '^3': [`${opperand1} to the ${opperand2}rd power`, `${opperand1} cubed`],
                '^...2': [`${opperand1} to the ${opperand2}nd power`],
                '^...3': [`${opperand1} to the ${opperand2}rd power`],
                '/': [`${opperand1} over${opperand2}`],
            };
            translation = translations[operator][Math.floor(Math.random() * translations[operator].length)];
            let endOfConEq = i === itterationCount;
            let endsInSemi = translation.endsWith(';');
            if (!endsInSemi) {
                if (endOfConEq) {
                    translation = translation + ';';
                }
                else {
                    translation = translation + ',';
                }
            }
            sequenceParts.splice(0, 3, makeAlias(ATLAS, translation));
        }
        console.log('sequences', sequenceParts.join(''));
        return sequenceParts.join('');
    };
    while (equation.includes('(')) {
        let Groups = equation.match(/\(([^()]*)\)/g) ?? [];
        Groups.forEach(group => {
            let groupEquation = group.replace('(', '').replace(')', '');
            let fractionsGroup = group.match(/[a-z]{10}((\/)([a-z]{10}))+/g) ?? [];
            fractionsGroup.forEach(a => {
                let translation = translate(a);
                groupEquation = groupEquation.replace(a, translation);
            });
            let exponentRadicalGroup = group.match(/[a-z]{10}((\^|\√)([a-z]{10}))+/g) ?? [];
            exponentRadicalGroup.forEach(a => {
                let translation = translate(a);
                groupEquation = groupEquation.replace(a, translation);
            });
            let multiplicationDivisionGroup = group.match(/[a-z]{10}((\×|\÷)([a-z]{10}))+/g) ?? [];
            multiplicationDivisionGroup.forEach(a => {
                let translation = translate(a);
                groupEquation = groupEquation.replace(a, translation);
            });
            let additionSubtractionGroup = group.match(/[a-z]{10}((\+|\-)([a-z]{10}))+/g) ?? [];
            additionSubtractionGroup.forEach(a => {
                let translation = translate(a);
                groupEquation = groupEquation.replace(a, translation);
            });
            console.log(ATLAS);
            equation = equation.replace(group, makeAlias(ATLAS, 'the term: ' + ATLAS[groupEquation]));
        });
    }
    let Fractions = equation.match(/[a-z]{10}((\/)([a-z]{10}))+/g) ?? [];
    Fractions.forEach(a => {
        let translation = translate(a);
        equation = equation.replace(a, translation);
    });
    let ExponentRadical = equation.match(/[a-z]{10}((\^|\√)([a-z]{10}))+/g) ?? [];
    ExponentRadical.forEach(a => {
        let translation = translate(a);
        equation = equation.replace(a, translation);
    });
    let MultiplicationDivision = equation.match(/[a-z]{10}((\×|\÷)([a-z]{10}))+/g) ?? [];
    MultiplicationDivision.forEach(a => {
        let translation = translate(a);
        equation = equation.replace(a, translation);
    });
    let AdditionSubtraction = equation.match(/[a-z]{10}((\+|\-)([a-z]{10}))+/g) ?? [];
    AdditionSubtraction.forEach(a => {
        let translation = translate(a);
        equation = equation.replace(a, translation);
    });
    console.log('check', equation);
    EQH.UpdateTranslation(ATLAS[equation].replaceAll('-', 'negative '));
}
