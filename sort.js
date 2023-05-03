const shuffle_btn = document.getElementById('shuffle')
const start_btn = document.getElementById('start_btn')
const stop_btn = document.getElementById('stop_btn')
const speed_range = document.getElementById('speed_range')
const bars_container = document.getElementById('bars_container')
const method_select = document.getElementById('method_select')
const barHeightMultiplier = 8.5
const MINRANGE = 1
const MAXRANGE = 80
const NUMOFBARS = 100
let unsortedArray = new Array(NUMOFBARS)
let isStopped = false
let speed = 50

const generateRandomNum = (min,max) => {
    return Math.floor(Math.random() * (max-min +1)) + min;
}

const delay = (ms) => {
    return new Promise((sleep) => setTimeout(sleep,ms))
}

const stopAllFunctions = () => {
    isStopped = true
}

const createRandomArray = () => {
    for(let i = 0; i < NUMOFBARS; i++){
        unsortedArray[i] = generateRandomNum(MINRANGE,MAXRANGE)
    }
}

const setInterface = (val) => { // Val must be boolean!!!
    shuffle_btn.disabled = !val
    start_btn.disabled = !val
    method_select.disabled = !val
}

const renderBars = (array) => {
    for(let i = 0; i < array.length; i++){
        let bar = document.createElement("div")
        bar.classList.add("bar")
        bar.style.height = array[i] * barHeightMultiplier + 'px'
        bars_container.appendChild(bar)
    }
}

document.addEventListener('DOMContentLoaded',() => {
    // Set up (Bar width,etc...)
    createRandomArray()
    renderBars(unsortedArray)
})

shuffle_btn.addEventListener('click', () => {
    createRandomArray()
    bars_container.innerHTML = ""
    renderBars(unsortedArray)
})
start_btn.addEventListener('click',() => {
    //TODO! Update with switch!!!
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
speed_range.addEventListener('input', (event) => {
    speed = event.target.value
    
})

const bubbleSort = async (arr) => {
    let bars = document.getElementsByClassName('bar')
    for(let i = 0; i< arr.length; i++){
        for(let j = 0;j< arr.length-1-i;j++){
            if(isStopped) {
                setInterface(true)
                isStopped = false
                return arr
            }
            if(arr[j] > arr[j+1]){
                for(let k = 0; k < bars.length;k++){
                    if(k!== j &&k !== j+1){
                        bars[k].style.backgroundColor = '#FEE715FF'
                    }
                }
                let tmp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = tmp
                bars[j].style.height = arr[j] * barHeightMultiplier + "px"
                bars[j].style.backgroundColor = "aqua"
                bars[j +1].style.height = arr[j +1] * barHeightMultiplier + "px"
                bars[j +1].style.backgroundColor = "aqua"
                await delay((500-speed))
            }
        }
        await delay(10-speed)
    }
    setInterface(true)
    return arr
} 

const selectionSort = async (arr) => {
    let bars = document.getElementsByClassName('bar')
    for(let i = 0; i < arr.length; i++){
        for(let j = i + 1; j < bars.length;j++){
            for(let k = 0; k < bars.length;k++){
                if(k!== j &&k !== i){
                    bars[k].style.backgroundColor = '#FEE715FF'
                }
            if(isStopped) {
                setInterface(true)
                isStopped = false
                return arr
            }
            bars[j].style.height = arr[j] * barHeightMultiplier + "px"
            bars[j].style.backgroundColor = "aqua"
            if(arr[j] < arr[i]) {
                
                tmp = arr[j]
                arr[j] = arr[i]
                arr[i] = tmp
                bars[i].style.height = arr[i] * barHeightMultiplier + "px"
                bars[i].style.backgroundColor = "aqua"
            }
            }
            await delay((500-speed))
        }
        await delay(10-speed)
    }
    setInterface(true)
    return arr
}