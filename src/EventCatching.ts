import { ButtonNumber, ButtonOperatorArith, ButtonDecimal, ButtonDelete, ButtonSign, TranslateSequence, ButtonEqual, ButtonExponent, SEQUENCE } from "./ButtonLogic.js"

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
const SGN_BUTTON = document.querySelector(`#btnSign`) as HTMLButtonElement
const EQL_BUTTON = document.querySelector(`#btnEql`) as HTMLButtonElement
const EXP_BUTTON = document.querySelector(`#btnExp`) as HTMLButtonElement

NUMBER_BUTTONS.forEach(button => {
    button.addEventListener('click', (event: Event) => {
        ButtonNumber(event)
        TranslateSequence(SEQUENCE)
    })
})

ARITHMETIC_BUTTONS.forEach(button => {
    button.addEventListener('click', (event: Event) => {
        ButtonOperatorArith(event)
        TranslateSequence(SEQUENCE)
    })
})

SGN_BUTTON.addEventListener('click', (e:Event) => {
    ButtonSign()
    TranslateSequence(SEQUENCE)
})

DEL_BUTTON.addEventListener('click', (e:Event) => {
    ButtonDelete()
    TranslateSequence(SEQUENCE)
})

DCM_BUTTON.addEventListener('click', (e:Event) => {
    ButtonDecimal()
    TranslateSequence(SEQUENCE)
})

EQL_BUTTON.addEventListener('click', (e:Event) => {
    ButtonEqual()
    TranslateSequence(SEQUENCE)
})


EXP_BUTTON.addEventListener('click', (e:Event) => {
    ButtonExponent()
    TranslateSequence(SEQUENCE)
})