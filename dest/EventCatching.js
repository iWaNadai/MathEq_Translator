import { ButtonNumber, ButtonOperatorArith, ButtonDecimal, ButtonDelete, ButtonSign, TranslateSequence, ButtonEqual, ButtonExponent, ButtonParenthesis } from "./ButtonLogic.js";
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
const GROUPERS = [document.querySelector(`#btnOPar`),
    document.querySelector(`#btnCPar`)];
NUMBER_BUTTONS.forEach(button => {
    button.addEventListener('click', (event) => {
        ButtonNumber(event);
        TranslateSequence();
    });
});
ARITHMETIC_BUTTONS.forEach(button => {
    button.addEventListener('click', (event) => {
        ButtonOperatorArith(event);
        TranslateSequence();
    });
});
GROUPERS.forEach(button => {
    button.addEventListener('click', (e) => {
        ButtonParenthesis(e);
        TranslateSequence();
    });
});
SGN_BUTTON.addEventListener('click', (e) => {
    ButtonSign();
    TranslateSequence();
});
DEL_BUTTON.addEventListener('click', (e) => {
    ButtonDelete();
    TranslateSequence();
});
DCM_BUTTON.addEventListener('click', (e) => {
    ButtonDecimal();
    TranslateSequence();
});
EQL_BUTTON.addEventListener('click', (e) => {
    ButtonEqual();
    TranslateSequence();
});
EXP_BUTTON.addEventListener('click', (e) => {
    ButtonExponent();
    TranslateSequence();
});
