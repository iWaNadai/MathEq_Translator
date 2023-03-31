import { AddGroupers } from "../ButtonLogic.js";
const EQUATION_ARRAY = [];
const CURRENT_INDEX = [-1];
const EQUATION_VIEW = document.querySelector('#equation');
const TRANSLATION_VIEW = document.querySelector('#translation');
const SOLUTION_VIEW = document.querySelector('#solution');
const TRANSLATION = [''];
const CONTAINER_VIEW = document.querySelector('.container');
const GROUPER_COUNTERS = [0, 0];
const CONSOLE_VIEW = document.querySelector('.console');
function Update() {
    let children = Array.from(EQUATION_VIEW.children);
    children.forEach(child => {
        child.remove();
    });
    EQUATION_ARRAY.map(term => term.value)
        .map(value => {
        let varElem = document.createElement('var');
        varElem.textContent = value;
        return varElem;
    })
        .forEach(element => {
        EQUATION_VIEW.append(element);
    });
    EQUATION_VIEW.scrollLeft = EQUATION_VIEW.scrollWidth;
}
function ResolveLastTerm() {
    if (GetLastTermType() === 'number' && GetLastTermValue().endsWith('.')) {
        let number = GetLastTermValue();
        if (GetLastTermValue().startsWith('(-')) {
            number = GetLastTermValue().substring(2);
            if (Number(number) === 0) {
                number = '0';
                let value = Number(number).toString();
                EditLastTerm({ value, type: 'number' });
            }
            else {
                let value = `(-${Number(number).toString()}`;
                EditLastTerm({ value, type: 'number' });
            }
        }
        else {
            let value = Number(number).toString();
            EditLastTerm({ value, type: 'number' });
        }
    }
    if (GetLastTermValue().startsWith('(-')) {
        let number = GetLastTermValue().substring(2);
        if (Number(number) === 0) {
            let value = Number(number).toString();
            console.log(value);
            EditLastTerm({ value, type: 'number' });
        }
    }
    if (GetLastTermValue().startsWith('(-') && !GetLastTermValue().endsWith(')')) {
        let value = GetLastTermValue() + ')';
        EditLastTerm({ value, type: 'number' });
    }
}
function ResolveOperator() {
    const isOperator = GetLastTermType() === 'operator';
    if (isOperator) {
        AddTerm({ value: '0', type: 'number' });
    }
}
function ResolveGroupers() {
    let length = GROUPER_COUNTERS[0] - GROUPER_COUNTERS[1];
    for (let i = 0; i < length; i++) {
        AddGroupers();
    }
}
function UpdateTranslation(translation) {
    TRANSLATION[0] = translation;
    TRANSLATION_VIEW.innerText = translation;
    CONTAINER_VIEW.scrollTo({ top: 0 });
    CONSOLE_VIEW.scrollTo({ top: 0, left: 0 });
}
function UpdateSolution(equation) {
    SOLUTION_VIEW.innerHTML = '';
    equation.forEach(string => {
        let element = document.createElement('p');
        element.classList.add('solution-entry');
        element.innerHTML = 'x=' + string;
        SOLUTION_VIEW.appendChild(element);
    });
    CONTAINER_VIEW.scrollTo({ top: 0 });
    CONSOLE_VIEW.scrollTo({ top: 0, left: CONSOLE_VIEW.scrollWidth });
}
function DeleteLastTerm() {
    if (CURRENT_INDEX[0] <= -1)
        return;
    let LastTerm = EQUATION_ARRAY[CURRENT_INDEX[0]];
    if (LastTerm.type === 'number' && LastTerm.value.length > 1) {
        EQUATION_ARRAY[CURRENT_INDEX[0]].value = LastTerm.value.substring(0, LastTerm.value.length - 1);
        Update();
        return;
    }
    EQUATION_ARRAY.pop();
    CURRENT_INDEX[0]--;
    Update();
}
function ClearEquation() {
    let { length } = EQUATION_ARRAY;
    for (let i = 0; i < length; i++) {
        EQUATION_ARRAY.pop();
        CURRENT_INDEX[0]--;
    }
    Update();
}
function AddTerm(termToAdd) {
    ResolveLastTerm();
    EQUATION_ARRAY.push(termToAdd);
    CURRENT_INDEX[0]++;
    Update();
}
function EditLastTerm(newTerm) {
    EQUATION_ARRAY[CURRENT_INDEX[0]] = newTerm;
    Update();
}
function GetLastTermType() {
    let term = EQUATION_ARRAY[CURRENT_INDEX[0]];
    if (!term) {
        return 'none';
    }
    return term.type;
}
function GetLastTermValue() {
    let term = EQUATION_ARRAY[CURRENT_INDEX[0]];
    if (!term) {
        return '';
    }
    return term.value;
}
const EQH = {
    equation: EQUATION_ARRAY,
    index: CURRENT_INDEX,
    translation: TRANSLATION,
    grouperCounters: GROUPER_COUNTERS,
    AddTerm,
    EditLastTerm,
    GetLastTermType,
    GetLastTermValue,
    DeleteLastTerm,
    ClearEquation,
    Resolve: () => {
        ResolveLastTerm();
        ResolveOperator();
        ResolveGroupers();
        Update();
    },
    UpdateTranslation,
    UpdateSolution
};
export default EQH;
//# sourceMappingURL=EquationHandler.js.map