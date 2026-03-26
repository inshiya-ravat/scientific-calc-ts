import {
  ERROR,
  HISTORY,
  getDisplayScreen,
  setDisplayScreenContent,
  replaceDisplayScreenContent,
  getDisplayScreenContent,
} from "./constant";
import { getExpression, replaceExpression, setExpression } from "./index";
/**
 * @description selects an html element and provide a method to apply css styles.
 */
export function $(element: HTMLElement) {
  return {
    element: element,
    css: function (property: string, value: string) {
      element.style.setProperty(property, value);
      return this;
    },
  };
}

/**
 * @description stores a key-value pair in local storage.
 */
export function setLocalStorage(key: string, value: string) {
  JSON.stringify(localStorage.setItem(key, value));
}

/**
 * @description retreives a value from local storage.
 */
export function getLocalStorage(key: string): string {
  return JSON.parse(localStorage.getItem(key)!);
}

/**
 * @description removes an item from local storage.
 */
export function removeFromLocalStorage(key: string) {
  localStorage.removeItem(key);
}

/**
 * @description updates the list of html elements wuth a specified CSS property and value.
 */
export function updateNodeList(
  nodeList: NodeListOf<HTMLElement>,
  property: string,
  value: string
) {
  for (const node of nodeList) {
    $(node).css(property, value);
  }
}

/**
 * @description updates the mathematical expression and the display screen.
 */
export function updateExpressionAndDisplay(
  expContent: string,
  displayContent: string
) {
  setExpression(expContent);
  setDisplayScreenContent(displayContent);
}

/**
 * @description clears the display screen and resets the mathematical expression.
 */
export function clearScreen() {
  replaceDisplayScreenContent(" ");
  const displaycontent = getDisplayScreen();
  if(displaycontent){
    $(displaycontent)
      .css("font-size", "-webkit-xxx-large")
      .css("color", "black");
  }
  replaceExpression("");
}

/**
 * @description evaluates and calculates the mathematical expression, updateing the dispaly screen.
 */
export function calculateResult() {
  console.log("yes called")
  const removeZeroes = getExpression().replace(/\b0+(\d+)/g, "$1");
  const result: string = eval(removeZeroes).toFixed(2);
  replaceDisplayScreenContent(result.toString());
  HISTORY.push(getExpression() + "=" + getDisplayScreenContent());
  setLocalStorage("history", JSON.stringify(HISTORY));
}

/**
 * @description displays an error message on the display screen.
 */
export function onError() {
  replaceDisplayScreenContent(ERROR);
  const displayContent = getDisplayScreen();
  if(displayContent){
    $(displayContent).css("color", "red");
  }
}

/**
 * @description computes factorial of a given number.
 */
function factorial(num: number) {
  if (num === 0 || num === 1) {
    return 1;
  }
  let result = 1;
  for (let i = 2; i <= num; i++) {
    result *= i;
  }
  return result;
}

/**
 * @description - handles factorial operation, helps to compute factorial for more than single digit number
 */
export function factorialHandler() {
  const inputStr = getExpression();
  if (inputStr === "" || isNaN(Number(inputStr[inputStr.length - 1]))) return;

  let num = "";
  let i = inputStr.length - 1;

  while (i >= 0 && !isNaN(Number(inputStr[i]))) {
    num = inputStr[i] + num;
    i--;
  }

  if (num !== "") {
    const factValue = factorial(Number(num));
    return factValue;
  }
}
