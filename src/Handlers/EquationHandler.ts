import { AddGroupers } from "../ButtonLogic.js";
import { WCTTerm } from "../types"

const EQUATION_ARRAY: WCTTerm[] = [];
const CURRENT_INDEX: [number] = [-1];
const EQUATION_VIEW: HTMLElement = document.querySelector('#equation') as HTMLElement
const TRANSLATION_VIEW: HTMLElement = document.querySelector('#translation') as HTMLElement
const SOLUTION_VIEW: HTMLElement = document.querySelector('#solution') as HTMLElement
const TRANSLATION: [string] = [''];
const CONTAINER_VIEW: HTMLElement = document.querySelector('.container') as HTMLElement
const GROUPER_COUNTERS = [0,0]
const CONSOLE_VIEW: HTMLElement = document.querySelector('.console') as HTMLElement

//NATIVE FUNCTIONS
function Update() {
    let children = Array.from(EQUATION_VIEW.children) as HTMLElement[]

    children.forEach(child => {
        child.remove()
    })

    EQUATION_ARRAY.map(term => term.value)
        .map(value => {
            let varElem = document.createElement('var');
            varElem.textContent = value;
            return varElem
        })
        .forEach(element => {
            EQUATION_VIEW.append(element)
        })

    EQUATION_VIEW.scrollLeft = EQUATION_VIEW.scrollWidth
}

function ResolveLastTerm() {    
    if (GetLastTermType() === 'number' && GetLastTermValue().endsWith('.')) {
        let number = GetLastTermValue()

        if (GetLastTermValue().startsWith('(-')) {
            number = GetLastTermValue().substring(2)

            if (Number(number) === 0) {
                number = '0';
                let value = Number(number).toString()
                EditLastTerm({value, type: 'number'})
            } else {
                let value = `(-${Number(number).toString()}`
                EditLastTerm({value, type: 'number'})
            }
        } else {
            let value = Number(number).toString()
            EditLastTerm({value, type: 'number'})
        }
    }

    if (GetLastTermValue().startsWith('(-')) {
        let number = GetLastTermValue().substring(2);
        if (Number(number) === 0) {
            let value = Number(number).toString()
            console.log(value)
            EditLastTerm({value, type: 'number'})
        }
    }

    if (GetLastTermValue().startsWith('(-') && !GetLastTermValue().endsWith(')')) {
        let value = GetLastTermValue() + ')'
        EditLastTerm({value, type: 'number'})
    }
}

function ResolveOperator() {
    const isOperator = GetLastTermType() === 'operator';

    if (isOperator) {
        AddTerm({value: '0', type: 'number'})
    }
}

function ResolveGroupers() {
    let length = GROUPER_COUNTERS[0] - GROUPER_COUNTERS[1];

    for (let i = 0; i < length; i++) {
        AddGroupers()
    }
}

//EXPORTED FUNCTIONS
function UpdateTranslation(translation: string) {
    TRANSLATION[0] = translation;

    TRANSLATION_VIEW.innerText = translation

    CONTAINER_VIEW.scrollTo({top: 0})
    CONSOLE_VIEW.scrollTo({top: 0, left: 0})
}

function UpdateSolution(equation: string[]) {
    SOLUTION_VIEW.innerHTML = '';

    equation.forEach(string => {
        let element = document.createElement('p')
        element.classList.add('solution-entry')
        element.innerHTML = 'x=' + string;

        SOLUTION_VIEW.appendChild(element)
    })
    
    CONTAINER_VIEW.scrollTo({top: 0})
    CONSOLE_VIEW.scrollTo({top: 0, left: CONSOLE_VIEW.scrollWidth})
}

function DeleteLastTerm() {
    if (CURRENT_INDEX[0] <= -1) return

    let LastTerm = EQUATION_ARRAY[CURRENT_INDEX[0]]

    if (LastTerm.type === 'number' && LastTerm.value.length > 1) {
        EQUATION_ARRAY[CURRENT_INDEX[0]].value = LastTerm.value.substring(0, LastTerm.value.length - 1)
        Update()
        return
    }

    EQUATION_ARRAY.pop()
    CURRENT_INDEX[0]--
    Update()
}

function ClearEquation() {
    let {length} = EQUATION_ARRAY

    for (let i = 0; i < length; i++){
        EQUATION_ARRAY.pop();
        CURRENT_INDEX[0]--
    }

    Update()
}

function AddTerm(termToAdd: WCTTerm) {
    ResolveLastTerm()

    EQUATION_ARRAY.push(termToAdd);
    CURRENT_INDEX[0]++
    Update()
}

function EditLastTerm(newTerm: WCTTerm) {
    EQUATION_ARRAY[CURRENT_INDEX[0]] = newTerm;
    Update()
}

function GetLastTermType() {
    let term: WCTTerm = EQUATION_ARRAY[CURRENT_INDEX[0]];
    
    if (!term) {
        return 'none'
    }
    
    return term.type
}

function GetLastTermValue() {
    let term: WCTTerm = EQUATION_ARRAY[CURRENT_INDEX[0]];

    if (!term) {
        return ''
    }

    return term.value
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
        ResolveLastTerm()
        ResolveOperator()
        ResolveGroupers()
        Update()
    },
    UpdateTranslation,
    UpdateSolution
}

export default EQH