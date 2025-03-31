import {
  MEMORY_OPERATION,
  getDisplayScreenContent,
  setDisplayScreenContent,
  MEMORY_EMPTY,
  ONLY_DIGITS,
  MEMORY_KEY,
} from "./constant";
import {
  $,
  setLocalStorage,
  getLocalStorage,
  removeFromLocalStorage,
  updateNodeList,
} from "./utils";
import { setExpression } from "./index";

/**
 * @description element for memory operation buttons.
 */
const memoryOperationElement = document.getElementById("memory-op");
if (memoryOperationElement) {
  memoryOperationElement.addEventListener("click", handleMemoryOperation);
}

/**
 * @description list of nodes having light as classname.
 * memory clear and memory read.
 */
const nodeList: NodeListOf<HTMLElement> = document.querySelectorAll(".light");

/**
 * @description if memory data exists in local storage, updates the color of the memory buttons.
 */
if (getLocalStorage(MEMORY_KEY) != null) {
  updateNodeList(nodeList, "color", "black");
}

/**
 * @description - handles the memory-related operations trigerred by button clicks.
 * supports following operations:
 * -memory clear (mc)
 * -memory read (mr)
 * -memory add (m+)
 * -memory subtract (m-)
 * -memory save (ms)
 */
function handleMemoryOperation(e: Event) {
  if (e.target instanceof HTMLButtonElement) {
    const name = e.target.name;
    switch (name) {
      case MEMORY_OPERATION.memoryClear:
        if (getLocalStorage(MEMORY_KEY) != null) {
          removeFromLocalStorage(MEMORY_KEY);
          for (const node of nodeList) {
            $(node).css("color", "rgb(199, 198, 198)");
          }
        } else {
          alert(MEMORY_EMPTY);
        }
        break;
      case MEMORY_OPERATION.memoryRead:
        if (getLocalStorage(MEMORY_KEY) != null) {
          setDisplayScreenContent(localStorage.getItem(MEMORY_KEY)!);
          const displayContent = getDisplayScreenContent();
          if (displayContent) {
            setExpression(displayContent);
          }
        } else {
          alert(MEMORY_EMPTY);
        }
        break;
      case MEMORY_OPERATION.memoryAdd:
        if (getLocalStorage(MEMORY_KEY) != null) {
          setLocalStorage(
            MEMORY_KEY,
            (
              Number(getDisplayScreenContent()) +
              Number(getLocalStorage(MEMORY_KEY))
            ).toString()
          );
        } else {
          alert(MEMORY_EMPTY);
        }
        break;
      case MEMORY_OPERATION.memorySubtract:
        if (getLocalStorage(MEMORY_KEY) != null) {
          setLocalStorage(
            MEMORY_KEY,
            (
              Number(getLocalStorage(MEMORY_KEY)) -
              Number(getDisplayScreenContent())
            ).toString()
          );
        } else {
          alert(MEMORY_EMPTY);
        }
        break;
      case MEMORY_OPERATION.memorySave: {
        const displayContent = getDisplayScreenContent();
        if (displayContent) {
          if (displayContent.match(/^\d+$/)) {
            setLocalStorage(MEMORY_KEY, displayContent);
            updateNodeList(nodeList, "color", "black");
          } else {
            alert(ONLY_DIGITS);
          }
        }
        break;
      }
    }
  }
}
