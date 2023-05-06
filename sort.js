// HTML elements
const shuffle_btn = document.getElementById('shuffle')
const start_btn = document.getElementById('start_btn')
const stop_btn = document.getElementById('stop_btn')
const speed_range = document.getElementById('speed_range')
const mode_select = document.getElementById('mode_select')
const bars_container = document.getElementById('bars_container')
const method_select = document.getElementById('method_select')
// CONSTANTS
const barHeightMultiplier = 0.85 // 0.85 is the correct one that fits in the screen and also 'spectacular' 
const MINRANGE = 10 // Minimum number that can be generated (for value in the Array -> later bar height)
const MAXRANGE = 800 // Maximum number that can be generated (for value in the Array -> later bar height)
// Global Variables
let numOfBars = mode_select.value.split(',')[0]
let speed = mode_select.value.split(',')[1]
let unsortedArray = new Array(numOfBars)
let isStopped = false // This variable is set to true when we stop the running function by clicking on stop button, or the unsortedArray sort has been finished.
let bars = document.getElementsByClassName('bar')

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', () => {
    drawBars()
})
shuffle_btn.addEventListener('click', () => {
    drawBars()
})
start_btn.addEventListener('click', () => {
    if (checkIfListIsSorted(unsortedArray)) return
    switch (method_select.value) {
        case 'bubblesort':
            bubbleSort(unsortedArray)
            break;
        case 'selectionsort':
            selectionSort(unsortedArray)
            break;
        case 'insertionsort':
            insertionSort(unsortedArray)
            break;
    }
    setInterface(false)
})
stop_btn.addEventListener('click', () => {
    isStopped = true
    setInterface(true)
})
mode_select.addEventListener('change', () => {
    numOfBars = mode_select.value.split(',')[0]
    speed = mode_select.value.split(',')[1]
    if (numOfBars != unsortedArray.length) drawBars()
})

// ARROW FUNCTIONS FOR LOGICS / UI

/**
 * 
 * @param {Number} min - lower limit of the number generation 
 * @param {Number} max - upper limit of the number generation 
 * @returns a random number between (or equal to) min and max 
 */
const generateRandomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * 
 * @param {Number} ms - sleep function, stops everything for the time amount given in param. 1ms / 0.001 second  
 * @returns a Promise, sleeps the application. Must be called with async-await
 */
const delay = (ms) => {
    return new Promise((sleep) => setTimeout(sleep, ms))
}
const stopAllFunctions = () => {
    isStopped = true
}
const createRandomArray = () => {
    unsortedArray = []
    for (let i = 0; i < numOfBars; i++) {
        unsortedArray[i] = generateRandomNum(MINRANGE, MAXRANGE)
    }
}
/**
 * 
 * @param {Boolean} val - determines if the buttons are clickable or not. 
 */
const setInterface = (val) => { // Val must be boolean!!!
    shuffle_btn.disabled = !val
    start_btn.disabled = !val
    method_select.disabled = !val
    mode_select.disabled = !val
}
/**
 * 
 * @returns whether the processes are running or not.
 */
const stopProcess = () => {
    if (isStopped) {
        setInterface(true)
        isStopped = false
        return true
    }
    return false
}
/**
 * 
 * @returns - whether the @var unsortedArray is sorted or not.
 */
const checkIfListIsSorted = () => {
    for (let i = 0; i < unsortedArray.length - 1; i++) {
        if (unsortedArray[i] > unsortedArray[i + 1]) return false
    }
    alert('List Is Already sorted!')
    return true
}

// ARROW FUNCTIONS FOR RENDERING & GRAPHICS
const renderBars = () => {
    for (let i = 0; i < unsortedArray.length; i++) {
        let bar = document.createElement("div")
        bar.classList.add("bar")
        bar.style.height = unsortedArray[i] * barHeightMultiplier + 'px'
        bar.style.width = 1500 / numOfBars + 'px'
        bar.style.marginLeft = 150 / numOfBars + 'px'
        bar.style.marginRight = 150 / numOfBars + 'px'
        bars_container.appendChild(bar)
    }
}
const drawBars = () => {
    createRandomArray()
    bars_container.innerHTML = ""
    renderBars(unsortedArray)
}
const resetHighlights = (k, selected1, selected2) => {
    if (k !== selected1 && k !== selected2) {
        bars[k].style.backgroundColor = '#FEE715FF'
    }
}
const swapElements = (index1, index2) => {
    if (unsortedArray[index1] < unsortedArray[index2]) {
        let tmp = unsortedArray[index1]
        unsortedArray[index1] = unsortedArray[index2]
        unsortedArray[index2] = tmp
        highlightElement(index1, 'red')
        highlightElement(index2, 'red')
    }
    else {
        highlightElement(index1, 'aqua')
        highlightElement(index2, 'aqua')
    }
}
const highlightElement = (index, color) => {
    bars[index].style.height = unsortedArray[index] * barHeightMultiplier + "px"
    bars[index].style.backgroundColor = color
}
// IMPLENETATION OF SORTING METHODS

/* Bubble sort:
Time complexity: O(n^2)
Space complexity: O(1)
Bubble sort is effective and efficient, when the unsortedArray is nearly sorted!
*/
const bubbleSort = async () => {
    if (checkIfListIsSorted()) return unsortedArray
    for (let i = 0; i < unsortedArray.length; i++) {
        for (let j = 0; j < unsortedArray.length - 1 - i; j++) {
            if (stopProcess()) return unsortedArray
            for (let k = 0; k < unsortedArray.length; k++) {
                resetHighlights(k, j + 1, j)
                if (k > unsortedArray.length - i - 1) highlightElement(k, 'green')
            }
            swapElements(j + 1, j)
            await delay(speed)
        }
    }
    setInterface(true)
    start_btn.disabled = true
    stop_btn.disabled = true
    return unsortedArray
}
/* Selection sort:
Time complexity: O(n^2)
Space complexity: O(1)
*/
const selectionSort = async () => {
    if (checkIfListIsSorted()) return unsortedArray
    for (let i = 0; i < unsortedArray.length; i++) {
        for (let j = i + 1; j < unsortedArray.length; j++) {
            for (let k = 0; k < unsortedArray.length; k++) {
                resetHighlights(k, i, j)
                if (k < i) highlightElement(k, 'green')
                if (stopProcess()) return unsortedArray
                swapElements(j, i)
            }
            await delay(speed)
        }
    }
    setInterface(true)
    start_btn.disabled = true
    stop_btn.disabled = true
    return unsortedArray
}
/* Insertion sort:
Time complexity: O(n^2)
Space complexity: O(1)
*/
const insertionSort = async () => {
    if (checkIfListIsSorted()) return unsortedArray
    for (let i = 1; i < unsortedArray.length; i++) {
        for (let j = 0; j < i; j++) {
            if (stopProcess()) return unsortedArray
            for (let k = 0; k < unsortedArray.length; k++) {
                resetHighlights(k, j + 1, j)
                if (k < i + 1) highlightElement(k, 'green')
            }
            swapElements(i, j)
            await delay(speed)
        }
    }
    setInterface(true)
    start_btn.disabled = true
    stop_btn.disabled = true
    return unsortedArray
}