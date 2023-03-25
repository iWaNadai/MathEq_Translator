export const EQUATION = [];
export const EQUATION_FIELD = document.querySelector('#equation');
let currentIndex = -1;
function Update() {
    EQUATION_FIELD.innerHTML = '';
    EQUATION
        .forEach(item => {
        let varElement = document.createElement('var');
        varElement.innerText = item.value;
        EQUATION_FIELD.appendChild(varElement);
    });
}
export function AddNextTerm(newTerm) {
    EQUATION.push(newTerm);
    currentIndex++;
    Update();
}
export function EditLastTerm(replacementTerm) {
    EQUATION[currentIndex] = replacementTerm;
    Update();
}
export function Get(target) {
    if (target === 'lastTerm') {
        let term = EQUATION[currentIndex];
        if (!term) {
            return { value: 'none', type: 'none' };
        }
        return EQUATION[currentIndex];
    }
    return { value: 'none', type: 'none' };
}
