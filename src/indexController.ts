import { Number, ArithOperator, Decimal, Delete, Sign, Translate, Equal, Exponent } from "./indexModels.js"

const IX_BUTTON = document.querySelector(`#btn9`) as HTMLButtonElement
const VIII_BUTTON = document.querySelector(`#btn8`) as HTMLButtonElement
const VII_BUTTON = document.querySelector(`#btn7`) as HTMLButtonElement
const VI_BUTTON = document.querySelector(`#btn6`) as HTMLButtonElement
const V_BUTTON = document.querySelector(`#btn5`) as HTMLButtonElement
const IV_BUTTON = document.querySelector(`#btn4`) as HTMLButtonElement
const III_BUTTON = document.querySelector(`#btn3`) as HTMLButtonElement
const II_BUTTON = document.querySelector(`#btn2`) as HTMLButtonElement
const I_BUTTON = document.querySelector(`#btn1`) as HTMLButtonElement
const O_BUTTON = document.querySelector(`#btn0`) as HTMLButtonElement
const ADD_BUTTON = document.querySelector(`#btnAdd`) as HTMLButtonElement
const MNS_BUTTON = document.querySelector(`#btnMns`) as HTMLButtonElement
const MLT_BUTTON = document.querySelector(`#btnMlt`) as HTMLButtonElement
const DIV_BUTTON = document.querySelector(`#btnDiv`) as HTMLButtonElement
const DCM_BUTTON = document.querySelector(`#btnDcm`) as HTMLButtonElement
const FRC_BUTTON = document.querySelector(`#btnFrc`) as HTMLButtonElement
const DEL_BUTTON = document.querySelector(`#btnDel`) as HTMLButtonElement
const SGN_BUTTON = document.querySelector(`#btnSign`) as HTMLButtonElement
const EQL_BUTTON = document.querySelector(`#btnEql`) as HTMLButtonElement
const EXP_BUTTON = document.querySelector(`#btnExp`) as HTMLButtonElement

IX_BUTTON?.addEventListener('click', (e:Event) => {
    Number(e)
    Translate()
})
VIII_BUTTON?.addEventListener('click', (e:Event) => {
    Number(e)
    Translate()
})
VII_BUTTON?.addEventListener('click', (e:Event) => {
    Number(e)
    Translate()
})
VI_BUTTON?.addEventListener('click', (e : Event) => {
    Number(e)
    Translate()
})
V_BUTTON?.addEventListener('click', (e : Event) => {
    Number(e)
    Translate()
})
IV_BUTTON?.addEventListener('click', (e : Event) => {
    Number(e)
    Translate()
})
III_BUTTON?.addEventListener('click', (e : Event) => {
    Number(e)
    Translate()
})
II_BUTTON?.addEventListener('click', (e : Event) => {
    Number(e)
    Translate()
})
I_BUTTON?.addEventListener('click', (e : Event) => {
    Number(e)
    Translate()
})
O_BUTTON?.addEventListener('click', (e : Event) => {
    Number(e)
    Translate()
})
ADD_BUTTON.addEventListener('click', (e:Event) => {
    ArithOperator(e)
    Translate()
})
MNS_BUTTON.addEventListener('click', (e:Event) => {
    ArithOperator(e)
    Translate()
})
MLT_BUTTON.addEventListener('click', (e:Event) => {
    ArithOperator(e)
    Translate()
})
DIV_BUTTON.addEventListener('click', (e:Event) => {
    ArithOperator(e)
    Translate()
})
DCM_BUTTON.addEventListener('click', (e:Event) => {
    Decimal(e)
    Translate()
})
FRC_BUTTON.addEventListener('click', (e:Event) => {
    ArithOperator(e)
    Translate()
})
DEL_BUTTON.addEventListener('click', (e:Event) => {
    Delete()
    Translate()
})
SGN_BUTTON.addEventListener('click', (e:Event) => {
    Sign()
    Translate()
})
EQL_BUTTON.addEventListener('click', (e:Event) => {
    Equal(e)
    Translate()
})
EXP_BUTTON.addEventListener('click', (e:Event) => {
    Exponent(e)
    Translate()
})