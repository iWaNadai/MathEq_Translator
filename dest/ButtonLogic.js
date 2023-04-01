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
            if (lastTermType === 'none')
                return;
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
        if (lastTermType === 'grouper' && lastTermValue === '(') {
            EQH.grouperCounters[0]--;
        }
        else if (lastTermType === 'grouper' && lastTermValue === ')') {
            EQH.grouperCounters[1]--;
        }
        EQH.DeleteLastTerm();
    };
    const utilAllClear = () => {
        EQH.grouperCounters[0] = 0;
        EQH.grouperCounters[1] = 0;
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
        Solve();
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
    if (event === undefined) {
        EQH.AddTerm({ value: ')', type: 'grouper' });
        EQH.grouperCounters[1]++;
        return;
    }
    let target = (event).target;
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
    let term = { value: value, type: 'grouper' };
    if (value === '(') {
        EQH.AddTerm(term);
        EQH.grouperCounters[0]++;
    }
    else if (value === ')' && EQH.grouperCounters[0] > EQH.grouperCounters[1]) {
        EQH.AddTerm(term);
        EQH.grouperCounters[1]++;
    }
}
export function AddFunction(event) {
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
            console.log(Number(number.substring(1, number.length - 1)).toLocaleString());
            return `${Number(number.substring(1, number.length - 1)).toLocaleString()}`;
        }
        return Number(number).toLocaleString();
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
        for (let i = 0; i <= itterationCount; i++) {
            let operand1 = ATLAS[sequenceParts[0]];
            let operator = sequenceParts[1];
            let operand2 = (!INITIAL_NUMBERS.includes(sequenceParts[2])) ? ': ' + ATLAS[sequenceParts[2]] : ' ' + ATLAS[sequenceParts[2]];
            if (operator === '√') {
                if (operand1.endsWith('1')) {
                    operator = '...1√';
                }
                else if (operand1 === '2') {
                    operator = '2√';
                }
                else if (operand1 === '3') {
                    operator = '3√';
                }
                else if (operand1.endsWith('2')) {
                    operator = '...2√';
                }
                else if (operand1.endsWith('3')) {
                    operator = '...3√';
                }
            }
            if (operator === '^') {
                if (operand2.endsWith('1')) {
                    operator = '^...1';
                }
                else if (operand2 === '2') {
                    operator = '^2';
                }
                else if (operand2 === '3') {
                    operator = '^3';
                }
                else if (operand2.endsWith('2')) {
                    operator = '^...2';
                }
                else if (operand2.endsWith('3')) {
                    operator = '^...3';
                }
                else if (!INITIAL_NUMBERS.includes(sequenceParts[2])) {
                    operator = '^x';
                }
            }
            let translations = {
                '+': [`${operand1} added to${operand2}`, `${operand1} increased by${operand2}`],
                '-': [`${operand1} reduced by${operand2}`, `${operand1} subtracted by${operand2}`, `${operand1} decreased by${operand2}`],
                '×': [`${operand1} multiplied by${operand2}`, `${operand1} times${operand2}`],
                '÷': [`${operand1} divided by${operand2}`, `${operand1} group into${operand2}'s`],
                '√': [`${operand1}th root of${operand2}`],
                '2√': [`${operand1}nd root of${operand2}`, `squareroot of${operand2}`],
                '3√': [`${operand1}rd root of${operand2}`, `cuberoot of${operand2}`],
                '...1√': [`${operand1}st root of${operand2}`],
                '...2√': [`${operand1}nd root of${operand2}`],
                '...3√': [`${operand1}rd root of${operand2}`],
                '^': [`${operand1} to the power of${operand2}`, `${operand1} to the${operand2}th power`],
                '^...1': [`${operand1} to the power of${operand2}`, `${operand1} to the${operand2}st power`],
                '^x': [`${operand1} to the power of${operand2}`],
                '^2': [`${operand1} to the ${operand2}nd power`, `${operand1} squared`, `${operand1} to the power of${operand2}`],
                '^3': [`${operand1} to the ${operand2}rd power`, `${operand1} cubed`, `${operand1} to the power of${operand2}`],
                '^...2': [`${operand1} to the ${operand2}nd power`, `${operand1} to the power of${operand2}`],
                '^...3': [`${operand1} to the ${operand2}rd power`, `${operand1} to the power of${operand2}`],
                '/': [`${operand1} over${operand2}`],
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
        return sequenceParts.join('');
    };
    while (equation.includes('(')) {
        let Groups = equation.match(/\(([^()]*)\)/g) ?? [];
        Groups.forEach(group => {
            let groupEquation = group.replace('(', '').replace(')', '');
            let exponentRadicalGroup = groupEquation.match(/[a-z]{10}((\^|\√)([a-z]{10}))+/g) ?? [];
            exponentRadicalGroup.forEach(a => {
                let translation = translate(a);
                groupEquation = groupEquation.replace(a, translation);
            });
            let fractionsGroup = group.match(/[a-z]{10}((\/)([a-z]{10}))+/g) ?? [];
            fractionsGroup.forEach(a => {
                let translation = translate(a);
                groupEquation = groupEquation.replace(a, translation);
            });
            let multiplicationDivisionGroup = groupEquation.match(/[a-z]{10}((\×|\÷)([a-z]{10}))+/g) ?? [];
            multiplicationDivisionGroup.forEach(a => {
                let translation = translate(a);
                groupEquation = groupEquation.replace(a, translation);
            });
            let additionSubtractionGroup = groupEquation.match(/[a-z]{10}((\+|\-)([a-z]{10}))+/g) ?? [];
            additionSubtractionGroup.forEach(a => {
                let translation = translate(a);
                groupEquation = groupEquation.replace(a, translation);
            });
            console.log(ATLAS);
            let prefix = ['the term: ', 'the value of: ', 'the variable: '][Math.floor(Math.random() * 3)];
            equation = equation.replace(group, makeAlias(ATLAS, prefix + ATLAS[groupEquation]));
        });
    }
    let ExponentRadical = equation.match(/[a-z]{10}((\^|\√)([a-z]{10}))+/g) ?? [];
    ExponentRadical.forEach(a => {
        let translation = translate(a);
        equation = equation.replace(a, translation);
    });
    let Fractions = equation.match(/[a-z]{10}((\/)([a-z]{10}))+/g) ?? [];
    Fractions.forEach(a => {
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
    EQH.UpdateTranslation(ATLAS[equation].replaceAll('-', 'negative '));
}
export function Solve() {
    EQH.Resolve();
    const ATLAS = {};
    const makeAlias = (atlas, value) => {
        let entries = Object.entries(atlas);
        if (value.includes('(-')) {
            value = value.substring(1, value.length - 1);
        }
        if (entries.find(a => a[1] === Number(value)) !== undefined) {
            return entries.find(a => a[1] === Number(value))[0];
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
        atlas[alias] = Number(value);
        return alias;
    };
    let equation = EQH.equation
        .map(item => {
        if (item.type === 'number') {
            let alias = makeAlias(ATLAS, item.value);
            return alias;
        }
        return item.value;
    })
        .join('');
    let steps = [EQH.equation.map(a => a.value).join('')];
    const solve = (sequence) => {
        let answer = sequence;
        let sequenceParts = sequence.match(/([a-z]{10}|(\√|\^|\/|\×|\÷|\+|\-))/g);
        let [operand1, operator, operand2] = sequenceParts;
        operand1 = ATLAS[operand1].toString();
        operand2 = ATLAS[operand2].toString();
        let answers = {
            '^': (Number(operand1) ** Number(operand2)).toFixed(2),
            '√': (Number(operand2) ** (1 / Number(operand1))).toFixed(2),
            '/': (Number(operand1) / Number(operand2)).toFixed(2),
            '×': (Number(operand1) * Number(operand2)).toFixed(2),
            '÷': (Number(operand1) / Number(operand2)).toFixed(2),
            '+': (Number(operand1) + Number(operand2)).toFixed(2),
            '-': (Number(operand1) - Number(operand2)).toFixed(2),
        };
        sequenceParts.splice(0, 3, makeAlias(ATLAS, answers[operator]));
        answer = sequenceParts.join('');
        return answer;
    };
    while (equation.includes('(')) {
        let Focus = equation.match(/\(([^()]*)\)/g)[0] ?? '';
        let solveStep;
        let newFocus;
        if (Focus.includes('^') || Focus.includes('√')) {
            solveStep = Focus.match(/[a-z]{10}((\^|\√)([a-z]{10}))+/g)[0];
            newFocus = Focus.replace(solveStep, solve(solveStep));
            newFocus = (newFocus.length === 12) ? newFocus.replace('(', '').replace(')', '') : newFocus;
            equation = equation.replace(Focus, newFocus);
            let newStep = equation;
            Object.keys(ATLAS)
                .forEach(a => {
                newStep = newStep.replaceAll(a, ATLAS[a].toString());
            });
            steps.push(newStep);
        }
        else if (Focus.includes('/')) {
            solveStep = Focus.match(/[a-z]{10}((\/)([a-z]{10}))+/g)[0];
            newFocus = Focus.replace(solveStep, solve(solveStep));
            newFocus = (newFocus.length === 12) ? newFocus.replace('(', '').replace(')', '') : newFocus;
            equation = equation.replace(Focus, newFocus);
            let newStep = equation;
            Object.keys(ATLAS)
                .forEach(a => {
                newStep = newStep.replaceAll(a, ATLAS[a].toString());
            });
            steps.push(newStep);
        }
        else if (Focus.includes('×') || Focus.includes('÷')) {
            solveStep = Focus.match(/[a-z]{10}((\×|\÷)([a-z]{10}))+/g)[0];
            newFocus = Focus.replace(solveStep, solve(solveStep));
            newFocus = (newFocus.length === 12) ? newFocus.replace('(', '').replace(')', '') : newFocus;
            equation = equation.replace(Focus, newFocus);
            let newStep = equation;
            Object.keys(ATLAS)
                .forEach(a => {
                newStep = newStep.replaceAll(a, ATLAS[a].toString());
            });
            steps.push(newStep);
        }
        else if (Focus.includes('+') || Focus.includes('-')) {
            solveStep = Focus.match(/[a-z]{10}((\+|\-)([a-z]{10}))+/g)[0];
            newFocus = Focus.replace(solveStep, solve(solveStep));
            newFocus = (newFocus.length === 12) ? newFocus.replace('(', '').replace(')', '') : newFocus;
            equation = equation.replace(Focus, newFocus);
            let newStep = equation;
            Object.keys(ATLAS)
                .forEach(a => {
                newStep = newStep.replaceAll(a, ATLAS[a].toString());
            });
            steps.push(newStep);
        }
    }
    let numberOfOperators = equation.match(/(\√|\^|\/|\×|\÷|\+|\-)/g)?.length;
    for (let i = 0; i < numberOfOperators; i++) {
        let Focus = equation;
        let solveStep;
        let newFocus;
        if (Focus.includes('^') || Focus.includes('√')) {
            solveStep = Focus.match(/[a-z]{10}((\^|\√)([a-z]{10}))+/g)[0];
            newFocus = solve(solveStep);
            equation = equation.replace(solveStep, newFocus);
            let newStep = equation;
            Object.keys(ATLAS)
                .forEach(a => {
                newStep = newStep.replaceAll(a, ATLAS[a].toString());
            });
            steps.push(newStep);
        }
        else if (Focus.includes('/')) {
            solveStep = Focus.match(/[a-z]{10}((\/)([a-z]{10}))+/g)[0];
            newFocus = solve(solveStep);
            equation = equation.replace(solveStep, newFocus);
            let newStep = equation;
            Object.keys(ATLAS)
                .forEach(a => {
                newStep = newStep.replaceAll(a, ATLAS[a].toString());
            });
            steps.push(newStep);
        }
        else if (Focus.includes('×') || Focus.includes('÷')) {
            solveStep = Focus.match(/[a-z]{10}((\×|\÷)([a-z]{10}))+/g)[0];
            newFocus = solve(solveStep);
            equation = equation.replace(solveStep, newFocus);
            let newStep = equation;
            Object.keys(ATLAS)
                .forEach(a => {
                newStep = newStep.replaceAll(a, ATLAS[a].toString());
            });
            steps.push(newStep);
        }
        else if (Focus.includes('+') || Focus.includes('-')) {
            solveStep = Focus.match(/[a-z]{10}((\+|\-)([a-z]{10}))+/g)[0];
            newFocus = solve(solveStep);
            equation = equation.replace(solveStep, newFocus);
            let newStep = equation;
            Object.keys(ATLAS)
                .forEach(a => {
                newStep = newStep.replaceAll(a, ATLAS[a].toString());
            });
            steps.push(newStep);
        }
    }
    EQH.UpdateSolution(steps);
}
//# sourceMappingURL=ButtonLogic.js.map