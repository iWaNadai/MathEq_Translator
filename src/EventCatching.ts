import { AddGroupers, AddNumber, AddOperator, Translate, AddUtility } from "./ButtonLogic.js"
import EQH from "./Handlers/EquationHandler.js"

const NUMBERS = Array.from(document.querySelectorAll('.number')) as HTMLButtonElement[]
const OPERATORS = Array.from(document.querySelectorAll('.operator')) as HTMLButtonElement[]
const UTILITY = Array.from(document.querySelectorAll('.utility')) as HTMLButtonElement[]
const GROUPERS = Array.from(document.querySelectorAll('.grouper')) as HTMLButtonElement[]

const TRANSLATE = document.querySelector('#btnTranslate') as HTMLButtonElement
const SPEAK = document.querySelector('#btnSpeak') as HTMLButtonElement;
const NEXT = document.querySelector('#btnNextScreen') as HTMLButtonElement;
const PREV = document.querySelector('#btnPrevScreen') as HTMLButtonElement;

const CONSOLE = document.querySelector('.console') as HTMLElement;

NUMBERS
    .forEach(button => {
        button.addEventListener('click', event => {
            AddNumber(event)
        })
    })

OPERATORS
    .forEach(button => {
        button.addEventListener('click', event => {
            AddOperator(event)
        })
    })

UTILITY
    .forEach(button => {
        button.addEventListener('click', event => {
            AddUtility(event)
        })
    })

GROUPERS
    .forEach(button => {
        button.addEventListener('click', event => {
            AddGroupers(event)
        })
    })

TRANSLATE.addEventListener('click', event => {
    Translate()
})

PREV.addEventListener('click', (event) => {
    CONSOLE.scrollTo({top: 0, left: 0})
    PREV.disabled = true;
    NEXT.disabled = false;
})

NEXT.addEventListener('click', (event) => {
    CONSOLE.scrollTo({top: 0, left: CONSOLE.scrollWidth})

    NEXT.disabled = true;
    PREV.disabled = false;
})

SPEAK.addEventListener('click', (event) => {
    let textToSpeak = new SpeechSynthesisUtterance(EQH.translation[0])

    let speaker = window.speechSynthesis;

    speaker.speak(textToSpeak)
})

window.addEventListener('keydown', event => {
    event.preventDefault()
    let {key} = event

    key = (key === 'Backspace') ? 'DEL' : key;
    key = (key === '_') ? 'SIGN' : key;
    key = (key === 'Tab') ? 'AC' : key;
    key = (key === 'Tab') ? 'AC' : key;
    key = (key === 'Enter') ? 'TRANSLATE' : key;
    key = (key === 'ArrowRight') ? 'NEXT' : key;
    key = (key === 'ArrowLeft') ? 'PREV' : key;

    let button = document.querySelector(`[data-value="${key}"]`) as HTMLButtonElement

    if (button === null) return

    button.dispatchEvent(new Event('click'))
})