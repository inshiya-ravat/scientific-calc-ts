import { getExpression, replaceExpression } from "./index";
import {
  getDisplayScreenContent,
  replaceDisplayScreenContent,
} from "./constant";

/**
 * @description event listeners for triggering exponential mode
 */
document.getElementById("fe")?.addEventListener("click", toggleExponential);

/**
 * @description keeps track of whether the exponential mode is enabled
 */
let isExponential = false;

/**
 * @description Toggles the exponential notation of the number on the display.
 * converts between standard numeric representation and scientific notation.
 */
export function toggleExponential() {
  if (!getExpression() || isNaN(Number(getDisplayScreenContent()))) return;

  const num = Number(getDisplayScreenContent());
  isExponential = !isExponential;
  if (isExponential) {
    const exponent = num.toExponential().split("e");
    const expressionStr = `${exponent[0]}*10**${Number(exponent[1])}`;
    replaceExpression(expressionStr);
    const displayStr = `${exponent[0]}*10^${Number(exponent[1])}`;
    replaceDisplayScreenContent(displayStr);
    isExponential = false;
  } else {
    replaceExpression(num.toString());
    replaceDisplayScreenContent(getExpression());
  }
}
