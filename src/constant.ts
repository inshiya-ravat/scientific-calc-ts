/**
 * @description - generic error message.
 */
export const ERROR = "Error"

/**
 * @description - error message when memory is empty.
 */
export const MEMORY_EMPTY = 'Nothing in memory!'

/**
 * @description - error message when non-numeric values are attempted to store in memory.
 */
export const ONLY_DIGITS = 'Can only store a number in memory.'

/**
 * @description - Object containing allowed memory operations.
 */
export const MEMORY_OPERATION = {
    memoryClear : "mc",
    memoryRead : "mr",
    memoryAdd : "m+",
    memorySubtract : "m-",
    memorySave : "ms",
}

/**
 * @description - key used for memory storage.
 */
export const MEMORY_KEY = 'memory'

/**
 * @description - Object containing trignometry and advance math operations.
 */
export const TRIGNOMETRY_ADV_MATH_OPERATION = {
    sine : "sin(x)",
    cosine : "cos(x)",
    tan : "tan(x)",
    floor : "floor(x)",
    ceil : "ceil(x)",
}

/**
 * @description - Object containing calculator operations.
 */
export const CALCULATOR_OPERATION = {
    clear : "C",
    calculate : "calc",
    factorial : "factorial",
    delete : "del",
    e : "e",
    absolute : "abs",
    pi : "pi",
    fraction : "div-by-1",
    square : "sqr",
    squareRoot : "sqrt",
    power : "x-pow-y",
    tenPower : "10-pow-x",
    log : "log",
    ln : "ln",
    toggleSign : "+/-",
    second : "2nd",
    exp: "exp",
}

/**
 * @description - object containing degree and fe mode operations.
 */
export const DEGREE_FE = {
    degree : "degree",
    FE : "F-E",
}

/**
 * @description - store all previous calculations
 */
export const HISTORY:string[] = []

/**
 * @description - the display screen element
 */
const DISPLAY_SCREEN = document.getElementById('ans')

/**
 * @description - gets the current content of the display screen.
 */
export function getDisplayScreenContent():string|undefined{
    if(DISPLAY_SCREEN){
        if(DISPLAY_SCREEN.textContent){
            return DISPLAY_SCREEN.textContent;
        }
    }
}

/**
 * @description appends a string to the display screen content.
 */
export function setDisplayScreenContent(str:string){
    if(DISPLAY_SCREEN?.textContent){
        DISPLAY_SCREEN.textContent += str
    }
}
   

/**
 * @description replaces the entire content of the display screen with a new string.
 */
export function replaceDisplayScreenContent(str:string){
    if(DISPLAY_SCREEN?.textContent){
        DISPLAY_SCREEN.textContent = str
    }  
}

/**
 * @description gets the display screen element.
 */
export function getDisplayScreen(){
    if(DISPLAY_SCREEN){
        return DISPLAY_SCREEN
    }
}