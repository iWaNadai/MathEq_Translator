import { WCTTerm, WCTGroup } from "../types"

const EQUATION_ARRAY: WCTTerm[] = [];
const CURRENT_INDEX: [number] = [-1];
const GROUPERS: number[][] = []
const EQUATION_VIEW: HTMLElement = document.querySelector('#equation') as HTMLElement
const TRANSLATION_VIEW: HTMLElement = document.querySelector('#translation') as HTMLElement
const TRANSLATION: [string] = [''];
const CONTAINER_VIEW: HTMLElement = document.querySelector('.container') as HTMLElement
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

//EXPORTED FUNCTIONS
function UpdateTranslation(translation: string) {
    TRANSLATION[0] = translation;

    TRANSLATION_VIEW.innerText = translation
    CONTAINER_VIEW.scrollTop = 0;
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

    length = GROUPERS.length

    for (let i = 0; i < length; i++){
        GROUPERS.pop();
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

function AddGrouper(type: '(' | ')') {
    if (type === '(') {
        AddTerm({value: type, type: 'grouper'})
        GROUPERS.push([CURRENT_INDEX[0]])
    }
    else {
        let {length} = GROUPERS;
        for (let i = length - 1; i > -1; i--) {
            if (GROUPERS[i].length === 1) {
                AddTerm({value: type, type: 'grouper'})
                GROUPERS[i].push(CURRENT_INDEX[0])
                break;
            }
        }
    }
}

function GetGrouperRanks() {    
    let RankList: WCTGroup[][] = []

    GROUPERS
        .map(value => {
            return {open : value[0], close : value[1]} as WCTGroup
        })
        .forEach((value, index) => {
            let parenthesis = value as WCTGroup
            if (index === 0) {
                RankList[0] = [value]
                return
            }

            RankList
                .slice(0)
                .reverse()
                .forEach((rValue, rIndex) => {
                    let condition = rValue.find((a) => (a.open < parenthesis.open && a.close > parenthesis.close))

                    if (condition === undefined) {
                        
                    }
                })
            
            RankList = RankList.reverse()
        })
    
    return RankList
}

const EQH = {
    equation: EQUATION_ARRAY,
    index: CURRENT_INDEX,
    groupers: GROUPERS,
    translation: TRANSLATION,
    AddTerm,
    EditLastTerm,
    GetLastTermType,
    GetLastTermValue,
    DeleteLastTerm,
    ClearEquation,
    AddGrouper,
    Resolve: () => {
        ResolveLastTerm()
        ResolveOperator()
        // ResolveGroupers()
        Update()
    },
    GetGrouperRanks,
    UpdateTranslation
}

export default EQH