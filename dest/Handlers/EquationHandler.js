const EQUATION_ARRAY = [];
const CURRENT_INDEX = [-1];
const GROUPERS = [];
const EQUATION_VIEW = document.querySelector('#equation');
const TRANSLATION_VIEW = document.querySelector('#translation');
const TRANSLATION = [''];
const CONTAINER_VIEW = document.querySelector('.container');
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
function UpdateTranslation(translation) {
    TRANSLATION[0] = translation;
    TRANSLATION_VIEW.innerText = translation;
    CONTAINER_VIEW.scrollTop = 0;
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
    length = GROUPERS.length;
    for (let i = 0; i < length; i++) {
        GROUPERS.pop();
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
function AddGrouper(type) {
    if (type === '(') {
        AddTerm({ value: type, type: 'grouper' });
        GROUPERS.push([CURRENT_INDEX[0]]);
    }
    else {
        let { length } = GROUPERS;
        for (let i = length - 1; i > -1; i--) {
            if (GROUPERS[i].length === 1) {
                AddTerm({ value: type, type: 'grouper' });
                GROUPERS[i].push(CURRENT_INDEX[0]);
                break;
            }
        }
    }
}
function GetGrouperRanks() {
    let RankList = [];
    GROUPERS
        .map(value => {
        return { open: value[0], close: value[1] };
    })
        .forEach((value, index) => {
        let parenthesis = value;
        if (index === 0) {
            RankList[0] = [value];
            return;
        }
        RankList
            .slice(0)
            .reverse()
            .forEach((rValue, rIndex) => {
            let condition = rValue.find((a) => (a.open < parenthesis.open && a.close > parenthesis.close));
            if (condition === undefined) {
            }
        });
        RankList = RankList.reverse();
    });
    return RankList;
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
        ResolveLastTerm();
        ResolveOperator();
        Update();
    },
    GetGrouperRanks,
    UpdateTranslation
};
export default EQH;
