import { Number, ArithOperator, Decimal, Delete, Sign, Translate, Equal, Exponent } from "./indexModels.js";
const IX_BUTTON = document.querySelector(`#btn9`);
const VIII_BUTTON = document.querySelector(`#btn8`);
const VII_BUTTON = document.querySelector(`#btn7`);
const VI_BUTTON = document.querySelector(`#btn6`);
const V_BUTTON = document.querySelector(`#btn5`);
const IV_BUTTON = document.querySelector(`#btn4`);
const III_BUTTON = document.querySelector(`#btn3`);
const II_BUTTON = document.querySelector(`#btn2`);
const I_BUTTON = document.querySelector(`#btn1`);
const O_BUTTON = document.querySelector(`#btn0`);
const ADD_BUTTON = document.querySelector(`#btnAdd`);
const MNS_BUTTON = document.querySelector(`#btnMns`);
const MLT_BUTTON = document.querySelector(`#btnMlt`);
const DIV_BUTTON = document.querySelector(`#btnDiv`);
const DCM_BUTTON = document.querySelector(`#btnDcm`);
const FRC_BUTTON = document.querySelector(`#btnFrc`);
const DEL_BUTTON = document.querySelector(`#btnDel`);
const SGN_BUTTON = document.querySelector(`#btnSign`);
const EQL_BUTTON = document.querySelector(`#btnEql`);
const EXP_BUTTON = document.querySelector(`#btnExp`);
IX_BUTTON === null || IX_BUTTON === void 0 ? void 0 : IX_BUTTON.addEventListener('click', (e) => {
    Number(e);
    Translate();
});
VIII_BUTTON === null || VIII_BUTTON === void 0 ? void 0 : VIII_BUTTON.addEventListener('click', (e) => {
    Number(e);
    Translate();
});
VII_BUTTON === null || VII_BUTTON === void 0 ? void 0 : VII_BUTTON.addEventListener('click', (e) => {
    Number(e);
    Translate();
});
VI_BUTTON === null || VI_BUTTON === void 0 ? void 0 : VI_BUTTON.addEventListener('click', (e) => {
    Number(e);
    Translate();
});
V_BUTTON === null || V_BUTTON === void 0 ? void 0 : V_BUTTON.addEventListener('click', (e) => {
    Number(e);
    Translate();
});
IV_BUTTON === null || IV_BUTTON === void 0 ? void 0 : IV_BUTTON.addEventListener('click', (e) => {
    Number(e);
    Translate();
});
III_BUTTON === null || III_BUTTON === void 0 ? void 0 : III_BUTTON.addEventListener('click', (e) => {
    Number(e);
    Translate();
});
II_BUTTON === null || II_BUTTON === void 0 ? void 0 : II_BUTTON.addEventListener('click', (e) => {
    Number(e);
    Translate();
});
I_BUTTON === null || I_BUTTON === void 0 ? void 0 : I_BUTTON.addEventListener('click', (e) => {
    Number(e);
    Translate();
});
O_BUTTON === null || O_BUTTON === void 0 ? void 0 : O_BUTTON.addEventListener('click', (e) => {
    Number(e);
    Translate();
});
ADD_BUTTON.addEventListener('click', (e) => {
    ArithOperator(e);
    Translate();
});
MNS_BUTTON.addEventListener('click', (e) => {
    ArithOperator(e);
    Translate();
});
MLT_BUTTON.addEventListener('click', (e) => {
    ArithOperator(e);
    Translate();
});
DIV_BUTTON.addEventListener('click', (e) => {
    ArithOperator(e);
    Translate();
});
DCM_BUTTON.addEventListener('click', (e) => {
    Decimal(e);
    Translate();
});
FRC_BUTTON.addEventListener('click', (e) => {
    ArithOperator(e);
    Translate();
});
DEL_BUTTON.addEventListener('click', (e) => {
    Delete();
    Translate();
});
SGN_BUTTON.addEventListener('click', (e) => {
    Sign();
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
