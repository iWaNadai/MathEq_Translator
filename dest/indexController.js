import { ButtonNumber, ButtonOperatorArith, Decimal, ButtonDelete, ButtonSign, Translate, Equal, Exponent } from "./indexModels.js";
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
        Translate();
    });
});
ARITHMETIC_BUTTONS.forEach(button => {
    button.addEventListener('click', (event) => {
        ButtonOperatorArith(event);
        Translate();
    });
});
SGN_BUTTON.addEventListener('click', (e) => {
    ButtonSign();
    Translate();
});
DEL_BUTTON.addEventListener('click', (e) => {
    ButtonDelete();
    Translate();
});
DCM_BUTTON.addEventListener('click', (e) => {
    Decimal(e);
    Translate();
});
EQL_BUTTON.addEventListener('click', (e) => {
    Equal(e);
    Translate();
});
EXP_BUTTON.addEventListener('click', (e) => {
    Exponent(e);
    Translate();
});
