import { $, getLocalStorage } from "./utils";
import { replaceDisplayScreenContent } from "./constant";
import { setExpression } from "./index";

/**
 * @description button to toggle history visibility.
 */
const historyToggleButton = document.getElementById("history");
if (historyToggleButton) {
  historyToggleButton.addEventListener("click", handleHistoryToggle);
}

/**
 * @description list element that contains history items.
 */
const historyList = document.getElementById("history_list");
if (historyList) {
  historyList.addEventListener("click", addResultInExpression);
}

/**
 * @description tracks whether history is currently displayed.
 */
let isHistoryEnabled = false;

/**
 * @description hides the history container.
 */
function hideHistory(historyContainerElement: HTMLElement) {
  $(historyContainerElement).css("display", "none");
}

/**
 * @description handles the toggle of the history section.
 * shows history if it is currently hidden, otherwise hides it.
 */
function handleHistoryToggle() {
  isHistoryEnabled = !isHistoryEnabled;
  const historyContainerElement: HTMLElement | null =
    document.querySelector(".history");
  if (isHistoryEnabled) {
    if (historyContainerElement) {
      $(historyContainerElement).css("display", "inline");
    }
    const history = getLocalStorage("history");
    if (historyList) {
      historyList.innerHTML = "";
    }
    //create document fragment to optimize DOM updates
    const historyFragment = document.createDocumentFragment();
    for (const result of history) {
      const li = document.createElement("li");
      li.textContent = result;
      $(li).css("border-bottom", "1px solid #333").css("padding", "5px");
      historyFragment.appendChild(li);
    }
    if (historyList) {
      historyList.appendChild(historyFragment);
    }
  } else {
    if (historyContainerElement) {
      hideHistory(historyContainerElement);
    }
  }
}

/**
 * @description handles the click event on a history list item.
 * extracts the result from the clicked history entry and sets in the display
 */
function addResultInExpression(e: Event) {
  if (e.target instanceof HTMLElement) {
    const answer = e.target!.textContent!.match(/=(.*)/)!;
    replaceDisplayScreenContent(answer[1]);
    setExpression(answer[1]);
  }
}
