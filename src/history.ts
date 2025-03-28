import { $, getLocalStorage } from './utils.js'
import { replaceDisplayScreenContent } from './constant.js'
import { setExpression } from './index.js'

/**
 * @description button to toggle history visibility.
 */
const historyToggleButton = document.getElementById('history')!
historyToggleButton.addEventListener("click",handleHistoryToggle)

/**
 * @description list element that contains history items.
 */
const historyList = document.getElementById('history_list')!
historyList.addEventListener("click",addResultInExpression)

/**
 * @description tracks whether history is currently displayed.
 */
let isHistoryEnabled = false

/**
 * @description hides the history container.
 */
function hideHistory(historyContainerElement:HTMLElement){
    $(historyContainerElement).css('display','none')
}

/**
 * @description handles the toggle of the history section.
 * shows history if it is currently hidden, otherwise hides it.
 */
function handleHistoryToggle(){
    isHistoryEnabled = !isHistoryEnabled
    const historyContainerElement:HTMLElement = document.querySelector('.history')!
    if(isHistoryEnabled){
        $(historyContainerElement).css('display','inline')
        const history = getLocalStorage('history')
        historyList.innerHTML =""
        //create document fragment to optimize DOM updates
        const historyFragment = document.createDocumentFragment()
        for(const result of history){
            const li = document.createElement('li')
            li.textContent = result
            $(li).css("border-bottom","1px solid #333").css("padding","5px")
            historyFragment.appendChild(li)
        }
        historyList.appendChild(historyFragment)
    }else{
        hideHistory(historyContainerElement)
    }
}

/**
 * @description handles the click event on a history list item.
 * extracts the result from the clicked history entry and sets in the display
 */
function addResultInExpression(e:Event){
    if(e.target instanceof HTMLElement){
        const answer = e.target!.textContent!.match(/=(.*)/)!
        replaceDisplayScreenContent(answer[1])
        setExpression(answer[1])
    }    
}