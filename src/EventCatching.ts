import { ButtonNumber, ButtonOperatorArith, ButtonDecimal, ButtonDelete, ButtonSign, Translator, ButtonExponent, ButtonParenthesis, ButtonClear, ButtonRadical } from "./ButtonLogic.js"

const NUMBER_BUTTONS = [document.querySelector(`#btn9`) as HTMLButtonElement, 
                        document.querySelector(`#btn8`) as HTMLButtonElement, 
                        document.querySelector(`#btn7`) as HTMLButtonElement, 
                        document.querySelector(`#btn6`) as HTMLButtonElement, 
                        document.querySelector(`#btn5`) as HTMLButtonElement, 
                        document.querySelector(`#btn4`) as HTMLButtonElement, 
                        document.querySelector(`#btn3`) as HTMLButtonElement, 
                        document.querySelector(`#btn2`) as HTMLButtonElement, 
                        document.querySelector(`#btn1`) as HTMLButtonElement, 
                        document.querySelector(`#btn0`) as HTMLButtonElement]

const ARITHMETIC_BUTTONS = [document.querySelector(`#btnAdd`) as HTMLButtonElement,
                            document.querySelector(`#btnMns`) as HTMLButtonElement,
                            document.querySelector(`#btnMlt`) as HTMLButtonElement,
                            document.querySelector(`#btnDiv`) as HTMLButtonElement,
                            document.querySelector(`#btnFrc`) as HTMLButtonElement]

const DCM_BUTTON = document.querySelector(`#btnDcm`) as HTMLButtonElement
const DEL_BUTTON = document.querySelector(`#btnDel`) as HTMLButtonElement
const CLR_BUTTON = document.querySelector(`#btnClear`) as HTMLButtonElement
const SGN_BUTTON = document.querySelector(`#btnSign`) as HTMLButtonElement
const EQL_BUTTON = document.querySelector(`#btnEql`) as HTMLButtonElement
const EXP_BUTTON = document.querySelector(`#btnExp`) as HTMLButtonElement

const GROUPERS = [document.querySelector(`#btnOPar`) as HTMLButtonElement,
                  document.querySelector(`#btnCPar`) as HTMLButtonElement]

const RAD_BUTTON = document.querySelector(`#btnRad`) as HTMLButtonElement;

const SPEAK_BUTTON = document.querySelector(`#btnSpeak`) as HTMLButtonElement;

let speechContent : string = 'awaiting input';
let synth = window.speechSynthesis;

SPEAK_BUTTON.addEventListener('click',(e : Event) => {
    if (synth.speaking) {
        return
    }
    let speech = new SpeechSynthesisUtterance(speechContent);
    speech.rate = .8;
    synth.speak(speech);
})

NUMBER_BUTTONS.forEach(button => {
    button.addEventListener('click', (event: Event) => {
        ButtonNumber(event)
        speechContent = Translator()
    })
})

ARITHMETIC_BUTTONS.forEach(button => {
    button.addEventListener('click', (event: Event) => {
        ButtonOperatorArith(event)
        speechContent = Translator()
    })
})

GROUPERS.forEach(button => {
    button.addEventListener('click', (e:Event) => {
        ButtonParenthesis(e)
        speechContent = Translator()
    })
})

SGN_BUTTON.addEventListener('click', (e:Event) => {
    ButtonSign()
    speechContent = Translator()
})

DEL_BUTTON.addEventListener('click', (e:Event) => {
    ButtonDelete()
    speechContent = Translator()
})

DCM_BUTTON.addEventListener('click', (e:Event) => {
    ButtonDecimal()
    speechContent = Translator()
})

EQL_BUTTON.addEventListener('click', (e:Event) => {
    speechContent = Translator()
})

EXP_BUTTON.addEventListener('click', (e:Event) => {
    ButtonExponent()
    speechContent = Translator()
})

CLR_BUTTON.addEventListener('click', (e:Event) => {
    ButtonClear()
    speechContent = Translator()
})

RAD_BUTTON.addEventListener('click', (e:Event) => {
    ButtonRadical()
    speechContent = Translator();
})