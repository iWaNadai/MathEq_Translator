import { ButtonNumber, ButtonOperatorArith, ButtonDecimal, ButtonDelete, ButtonSign, TranslateSequence, ButtonEqual, ButtonExponent, SEQUENCE } from "./ButtonLogic.js";
const NUMBER_BUTTONS = [document.querySelector(`#btn9`),
    document.querySelector(`#btn8`),
    document.querySelector(`#btn7`),
    document.querySelector(`#btn6`),
    document.querySelector(`#btn5`),
    document.querySelector(`#btn4`),
    document.querySelector(`#btn3`),
    document.querySelector(`#btn2`),
    document.querySelector(`#btn1`),
    document.querySelector(`#btn0`)];
const ARITHMETIC_BUTTONS = [document.querySelector(`#btnAdd`),
    document.querySelector(`#btnMns`),
    document.querySelector(`#btnMlt`),
    document.querySelector(`#btnDiv`),
    document.querySelector(`#btnFrc`)];
const DCM_BUTTON = document.querySelector(`#btnDcm`);
const DEL_BUTTON = document.querySelector(`#btnDel`);
const SGN_BUTTON = document.querySelector(`#btnSign`);
const EQL_BUTTON = document.querySelector(`#btnEql`);
const EXP_BUTTON = document.querySelector(`#btnExp`);
NUMBER_BUTTONS.forEach(button => {
    button.addEventListener('click', (event) => {
        ButtonNumber(event);
        TranslateSequence(SEQUENCE);
    });
});
ARITHMETIC_BUTTONS.forEach(button => {
    button.addEventListener('click', (event) => {
        ButtonOperatorArith(event);
        TranslateSequence(SEQUENCE);
    });
});
SGN_BUTTON.addEventListener('click', (e) => {
    ButtonSign();
    TranslateSequence(SEQUENCE);
});
DEL_BUTTON.addEventListener('click', (e) => {
    ButtonDelete();
    TranslateSequence(SEQUENCE);
});
DCM_BUTTON.addEventListener('click', (e) => {
    ButtonDecimal();
    TranslateSequence(SEQUENCE);
});
EQL_BUTTON.addEventListener('click', (e) => {
    ButtonEqual();
    TranslateSequence(SEQUENCE);
});
EXP_BUTTON.addEventListener('click', (e) => {
    ButtonExponent();
    TranslateSequence(SEQUENCE);
});
