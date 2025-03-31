/**
 * @description - event listeners for triggering degree/radian mode
 */
document
  .getElementById("deg")
  ?.addEventListener("click", degreeClickEventHandler);

/**
 * @description toggles between degree and radian mode.
 */
let isDegreeEnabled = true;

/**
 * @description getter function to retrieve the state of degree mode.
 */
export function getIsDegreeEnabled() {
  return isDegreeEnabled;
}

/**
 * @description toggles the degree/radian mode and updates the button text accordingly.
 */
function degreeToggle() {
  isDegreeEnabled = !isDegreeEnabled;
  const degreeToggleElement = document.querySelector("#deg");
  if (degreeToggleElement) {
    degreeToggleElement.textContent = isDegreeEnabled ? "DEG" : "RAD";
  }
}

/**
 * @description handles the click event for the degree/radian and F-E button.
 */
function degreeClickEventHandler(e: Event) {
  if (e.target instanceof HTMLButtonElement) {
    const degreeOrRadian = e.target.closest("button")?.value;

    switch (degreeOrRadian) {
      case "degree":
        degreeToggle();
        break;
      case "F-E":
        break;
      default:
        break;
    }
  }
}
