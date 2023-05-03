const shuffle_btn = document.getElementById('shuffle')
const start_btn = document.getElementById('start_btn')
const stop_btn = document.getElementById('stop_btn')
const speed_range = document.getElementById('speed_range')
const mode_select = document.getElementById('mode_select')
const bars_container = document.getElementById('bars_container')
const method_select = document.getElementById('method_select')
const barHeightMultiplier = 0.85
const MINRANGE = 10
const MAXRANGE = 800
let numOfBars = mode_select.value.split(',')[0]
let speed = mode_select.value.split(',')[1]
let unsortedArray = new Array(numOfBars)
let isStopped = false




const generateRandomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

const setInterface = (val) => { // Val must be boolean!!!
    shuffle_btn.disabled = !val
    start_btn.disabled = !val
    method_select.disabled = !val
    mode_select.disabled = !val
}

const renderBars = (array) => {
    for (let i = 0; i < array.length; i++) {
        let bar = document.createElement("div")
        bar.classList.add("bar")
        bar.style.height = array[i] * barHeightMultiplier + 'px'
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
const stopProcess = () => {
    if (isStopped) {
        setInterface(true)
        isStopped = false
        return true
    }
    return false
}

const resetHighlights = (bars, k, selected1, selected2) => {
    if (k !== selected1 && k !== selected2) {
        bars[k].style.backgroundColor = '#FEE715FF'
    }
}

const swapElements = (arr, index1, index2) => {
    if (arr[index1] < arr[index2]) {
        let tmp = arr[index1]
        arr[index1] = arr[index2]
        arr[index2] = tmp
    }
}
const highlightElement = (bars, arr, index) => {
    bars[index].style.height = arr[index] * barHeightMultiplier + "px"
    bars[index].style.backgroundColor = "aqua"
}
const checkIfListIsSorted = (list) => {
    for (let i = 0; i < list.length - 1; i++) {
        if (list[i] > list[i + 1]) return false
    }
    alert('List Is Already sorted!')
    setInterface(true)
    return true
}

document.addEventListener('DOMContentLoaded', () => {
    drawBars()
})

shuffle_btn.addEventListener('click', () => {
    drawBars()
})
start_btn.addEventListener('click', () => {
    switch (method_select.value) {
        case 'bubblesort':
            bubbleSort(unsortedArray)
            break;
        case 'selectionsort':
            selectionSort(unsortedArray)
    }
    setInterface(false)
})
stop_btn.addEventListener('click', () => {
    isStopped = true
    setInterface(true)
})
mode_select.addEventListener('change', (event) => {
    numOfBars = mode_select.value.split(',')[0]
    speed = mode_select.value.split(',')[1]
    if (numOfBars != unsortedArray.length) drawBars()
})

const bubbleSort = async (arr) => {
    if (checkIfListIsSorted(arr)) return arr
    let bars = document.getElementsByClassName('bar')
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (stopProcess()) return arr
            for (let k = 0; k < bars.length; k++) {
                resetHighlights(bars, k, j + 1, j)
            }
            swapElements(arr, j + 1, j)
            highlightElement(bars, arr, j)
            highlightElement(bars, arr, j + 1)
            await delay(speed)
        }
    }
    setInterface(true)
    return arr
}

const selectionSort = async (arr) => {
    if (checkIfListIsSorted(arr)) return arr
    let bars = document.getElementsByClassName('bar')
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < bars.length; j++) {
            for (let k = 0; k < bars.length; k++) {
                resetHighlights(bars, k, i, j)
                if (stopProcess()) return arr
                highlightElement(bars, arr, j)
                highlightElement(bars, arr, i)
                swapElements(arr, j, i)
            }
            await delay(speed)
        }
    }
    setInterface(true)
    return arr
}