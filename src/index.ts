import {
  TRIGNOMETRY_ADV_MATH_OPERATION,
  CALCULATOR_OPERATION,
  setDisplayScreenContent,
  getDisplayScreenContent,
  replaceDisplayScreenContent,
  ERROR,
} from "./constant";
import { getIsDegreeEnabled } from "./degree";
import { toggleExponential } from "./function-expression";
import {
  calculateResult,
  clearScreen,
  factorialHandler,
  onError,
  updateExpressionAndDisplay,
} from "./utils";

/**
 * @description stores the current mathematical expression.
 */
let expression: string = "";

/**
 * @description retrieves the current expression.
 */
export function getExpression() {
  return expression;
}

/**
 * @description appends a string to the existing expression.
 */
export function setExpression(str: string) {
  expression += str;
}

/**
 * @description replaces the current expression with a new string.
 */
export function replaceExpression(str: string) {
  expression = str;
}

/**
 * @description tracks whether the "2nd" function button is enabled.
 */
let is2ndEnabled: boolean = false;

// selecting and adding event listeners to html elements
const operationElement: HTMLElement | null = document.querySelector(".keys");
if (operationElement) {
  operationElement.addEventListener("click", handleOperationClick);
}

const trignometryOperationElement = document.getElementById("trignometry");
if (trignometryOperationElement) {
  trignometryOperationElement.addEventListener(
    "change",
    handleTrignometryAdvanceMathFunction
  );
}

const advanceMathOperationElement = document.getElementById("function");
if (advanceMathOperationElement) {
  advanceMathOperationElement.addEventListener(
    "change",
    handleTrignometryAdvanceMathFunction
  );
}

// key events
document.addEventListener("keydown", handleBackSpace);
document.addEventListener("keypress", handleKeyEvent);

/**
 * @description handles the backspace key event to remove the last character from the expression and display.
 */
function handleBackSpace(e: KeyboardEvent) {
  if (e.key === "Backspace") {
    replaceExpression(getExpression().slice(0, -1));
    replaceDisplayScreenContent(getDisplayScreenContent()!.slice(0, -1));
  }
}

/**
 * @description handles keypress events to allow keyboard input in the calculator.
 */
function handleKeyEvent(e: KeyboardEvent) {
  const allowedKeys = new Set([
    "Enter",
    "Backspace",
    "(",
    ")",
    "*",
    "-",
    "+",
    "/",
    ".",
    "=",
    "c",
  ]);
  const key = e.key;
  if ((key >= "0" && key <= "9") || allowedKeys.has(key)) {
    if (key === "Enter" || key === "=") {
      try {
        calculateResult();
      } catch (error) {
        if (error instanceof Error) {
          onError();
        }
      }
    } else if (key.toLowerCase() === "c") {
      clearScreen();
    } else {
      updateExpressionAndDisplay(key, key);
    }
  }
}

// selecting elements from html
const squareRootElement = document.getElementById("sqrt__change");
const squareElement = document.getElementById("sqr__change");

/**
 * @description handles trignometric, floor, and ceil functions.
 */
function handleTrignometryAdvanceMathFunction(e: Event) {
  if (e.target instanceof HTMLSelectElement) {
    const operationName: string = e.target.value;
    const trignometryOperation = document.getElementById("trigno_func");
    const advMathOperation = document.getElementById("func");
    if (
      trignometryOperation instanceof HTMLOptionElement &&
      advMathOperation instanceof HTMLOptionElement
    ) {
      switch (operationName) {
        case TRIGNOMETRY_ADV_MATH_OPERATION.sine: {
          const sinStr = getIsDegreeEnabled()
            ? "Math.sin((Math.PI/180)*"
            : "Math.sin(";
          updateExpressionAndDisplay(sinStr, "sin(");
          trignometryOperation.selected = true;
          break;
        }
        case TRIGNOMETRY_ADV_MATH_OPERATION.cosine: {
          const cosStr = getIsDegreeEnabled()
            ? "Math.cos((Math.PI/180)*"
            : "Math.cos(";
          updateExpressionAndDisplay(cosStr, "cos(");
          trignometryOperation.selected = true;
          break;
        }
        case TRIGNOMETRY_ADV_MATH_OPERATION.tan:
          {
            const tanStr = getIsDegreeEnabled()
              ? "Math.tan((Math.PI/180)*"
              : "Math.tan(";
            updateExpressionAndDisplay(tanStr, "tan(");
            trignometryOperation.selected = true;
          }
          break;
        case TRIGNOMETRY_ADV_MATH_OPERATION.floor: {
          updateExpressionAndDisplay("Math.floor(", "floor(");
          advMathOperation.selected = true;
          break;
        }
        case TRIGNOMETRY_ADV_MATH_OPERATION.ceil: {
          updateExpressionAndDisplay("Math.ceil(", "ceil(");
          advMathOperation.selected = true;
          break;
        }
      }
    }
  }
}

/**
 * @description hanldes all key operations when a button is clicked.
 */
function handleOperationClick(event: Event) {
  if (getDisplayScreenContent() === ERROR) {
    clearScreen();
  }
  if (event.target instanceof HTMLElement) {
    const name = event.target.closest("button")!.name;
    const IS_DIGIT = Number(name) >= 0 && Number(name) <= 9;
    const IS_ARITHEMATIC_OPERATION =
      name == "+" ||
      name == "-" ||
      name == "*" ||
      name == "/" ||
      name == "(" ||
      name == ")" ||
      name == "%" ||
      name == ".";
    if (
      (IS_DIGIT || IS_ARITHEMATIC_OPERATION) &&
      name !== undefined &&
      name != "calc"
    ) {
      updateExpressionAndDisplay(name, name);
    } else {
      switch (name) {
        case CALCULATOR_OPERATION.clear: {
          clearScreen();
          break;
        }
        case CALCULATOR_OPERATION.calculate: {
          try {
            calculateResult();
            break;
          } catch (error) {
            if (error instanceof Error) {
              onError();
            }
            break;
          }
        }
        case CALCULATOR_OPERATION.factorial: {
          replaceDisplayScreenContent(getExpression() + "!");
          const factorialAnswer = factorialHandler()!;
          replaceExpression(
            getExpression().slice(0, getExpression().length - 1)
          );
          setExpression(factorialAnswer?.toString());
          break;
        }
        case CALCULATOR_OPERATION.delete: {
          if (getExpression().endsWith("**")) {
            replaceExpression(getExpression().slice(0, -1));
          }
          if (getExpression().endsWith("Math.E")) {
            replaceExpression(getExpression().slice(0, -7));
          } else if (getExpression().endsWith("Math.PI")) {
            replaceExpression(getExpression().slice(0, -8));
          } else {
            replaceExpression(getExpression().slice(0, -1));
          }
          replaceDisplayScreenContent(getDisplayScreenContent()!.slice(0, -1));
          break;
        }
        case CALCULATOR_OPERATION.e: {
          setDisplayScreenContent("e");
          const eValue = getExpression()
            ? getExpression() + "*Math.E"
            : "Math.E";
          replaceExpression(eValue);
          break;
        }
        case CALCULATOR_OPERATION.absolute: {
          updateExpressionAndDisplay("Math.abs(", "abs(");
          break;
        }
        case CALCULATOR_OPERATION.pi: {
          setDisplayScreenContent("𝜋");
          const piValue = getExpression()
            ? getExpression() + "*Math.PI"
            : "Math.PI";
          replaceExpression(piValue);
          break;
        }
        case CALCULATOR_OPERATION.fraction: {
          setExpression("(1/");
          replaceDisplayScreenContent(getExpression());
          break;
        }
        case CALCULATOR_OPERATION.square: {
          const val = is2ndEnabled
            ? Math.pow(Number(getExpression()[getExpression().length - 1]), 3)
            : Math.pow(Number(getExpression()[getExpression().length - 1]), 2);
          replaceExpression(
            getExpression().slice(0, getExpression().length - 1) + val
          );
          const valOn2nd = is2ndEnabled ? "^3" : "^2";
          setDisplayScreenContent(valOn2nd);
          break;
        }
        case CALCULATOR_OPERATION.squareRoot: {
          const cbrtValue = is2ndEnabled ? "Math.cbrt(" : "Math.sqrt(";
          setExpression(cbrtValue);
          const rootOn2nd = is2ndEnabled ? "∛(" : "√(";
          setDisplayScreenContent(rootOn2nd);
          break;
        }
        case CALCULATOR_OPERATION.power: {
          updateExpressionAndDisplay("**", "^");
          break;
        }
        case CALCULATOR_OPERATION.tenPower: {
          updateExpressionAndDisplay("10**", "10^");
          break;
        }
        case CALCULATOR_OPERATION.log: {
          updateExpressionAndDisplay("Math.log(", "log(");
          break;
        }
        case CALCULATOR_OPERATION.ln: {
          updateExpressionAndDisplay("Math.log10(", "ln(");
          break;
        }
        case CALCULATOR_OPERATION.toggleSign: {
          const lastDigitOfExpression =
            getDisplayScreenContent()?.match(/(-?\d+(\.\d+)?)$/);
          const toggleLastDigit = Number(lastDigitOfExpression![1]) * -1;
          replaceExpression(
            getExpression().replace(/(-?\d+(\.\d+)?)$/, `${toggleLastDigit}`)
          );
          replaceDisplayScreenContent(
            getDisplayScreenContent()!.replace(
              /(-?\d+(\.\d+)?)$/,
              `${toggleLastDigit}`
            )
          );
          break;
        }
        case CALCULATOR_OPERATION.second: {
          is2ndEnabled = !is2ndEnabled;
          // if flag if true then change superscript characters to 3 else 2
          if (is2ndEnabled) {
            if (squareRootElement) {
              squareRootElement.textContent = "3";
            }
            if (squareElement) {
              squareElement.textContent = "3";
            }
          } else {
            if (squareRootElement) {
              squareRootElement.textContent = "2";
            }
            if (squareElement) {
              squareElement.textContent = "2";
            }
          }
          break;
        }
        case CALCULATOR_OPERATION.exp: {
          toggleExponential();
          break;
        }
      }
    }
  }
}
