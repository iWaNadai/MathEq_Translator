import { ButtonNumber, ButtonOperatorArith, ButtonDecimal, ButtonDelete, ButtonSign, Translator, ButtonExponent, ButtonParenthesis, ButtonClear, ButtonRadical } from "./ButtonLogic.js";
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
const CLR_BUTTON = document.querySelector(`#btnClear`);
const SGN_BUTTON = document.querySelector(`#btnSign`);
const EQL_BUTTON = document.querySelector(`#btnEql`);
const EXP_BUTTON = document.querySelector(`#btnExp`);
const GROUPERS = [document.querySelector(`#btnOPar`),
    document.querySelector(`#btnCPar`)];
const RAD_BUTTON = document.querySelector(`#btnRad`);
const SPEAK_BUTTON = document.querySelector(`#btnSpeak`);
let speechContent = 'awaiting input';
let synth = window.speechSynthesis;
SPEAK_BUTTON.addEventListener('click', (e) => {
    if (synth.speaking) {
        return;
    }
    let speech = new SpeechSynthesisUtterance(speechContent);
    speech.rate = .8;
    synth.speak(speech);
});
NUMBER_BUTTONS.forEach(button => {
    button.addEventListener('click', (event) => {
        ButtonNumber(event);
        speechContent = Translator();
    });
});
ARITHMETIC_BUTTONS.forEach(button => {
    button.addEventListener('click', (event) => {
        ButtonOperatorArith(event);
        speechContent = Translator();
    });
});
GROUPERS.forEach(button => {
    button.addEventListener('click', (e) => {
        ButtonParenthesis(e);
        speechContent = Translator();
    });
});
SGN_BUTTON.addEventListener('click', (e) => {
    ButtonSign();
    speechContent = Translator();
});
DEL_BUTTON.addEventListener('click', (e) => {
    ButtonDelete();
    speechContent = Translator();
});
DCM_BUTTON.addEventListener('click', (e) => {
    ButtonDecimal();
    speechContent = Translator();
});
EQL_BUTTON.addEventListener('click', (e) => {
    speechContent = Translator();
});
EXP_BUTTON.addEventListener('click', (e) => {
    ButtonExponent();
    speechContent = Translator();
});
CLR_BUTTON.addEventListener('click', (e) => {
    ButtonClear();
    speechContent = Translator();
});
RAD_BUTTON.addEventListener('click', (e) => {
    ButtonRadical();
    speechContent = Translator();
});
