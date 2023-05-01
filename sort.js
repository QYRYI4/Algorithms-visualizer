const shuffle_btn = document.getElementById('shuffle')
const sort_btn = document.getElementById('sort_btn')
const bars_container = document.getElementById('bars_container')
const barHeightMultiplier = 8
const MINRANGE = 1
const MAXRANGE = 80
const NUMOFBARS = 100
let unsortedArray = new Array(NUMOFBARS)

const generateRandomNum = (min,max) => {
    return Math.floor(Math.random() * (max-min +1)) + min;
}

const createRandomArray = () => {
    for(let i = 0; i < NUMOFBARS; i++){
        unsortedArray[i] = generateRandomNum(MINRANGE,MAXRANGE)
    }
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
    createRandomArray()
    renderBars(unsortedArray)
})

shuffle_btn.addEventListener('click', () => {
    createRandomArray()
    bars_container.innerHTML = ""
    renderBars(unsortedArray)
})
sort_btn.addEventListener('click',() => {
    bubbleSort(unsortedArray)
})
const delay = (ms) => {
    return new Promise((sleep) => setTimeout(sleep,ms))
}
const bubbleSort = async (arr) => {
    let bars = document.getElementsByClassName('bar')
    for(let i = 0; i< arr.length; i++){
        for(let j = 0;j< arr.length-1-i;j++){
            if(arr[j] > arr[j+1]){
                for(let k = 0; k < bars.length;k++){
                    if(k!== j &&k !== j+1){
                        bars[k].style.backgroundColor = 'aqua'
                    }
                }
                let tmp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = tmp
                bars[j].style.height = arr[j] * barHeightMultiplier + "px"
                bars[j].style.backgroundColor = "red"
                bars[j +1].style.height = arr[j +1] * barHeightMultiplier + "px"
                bars[j +1].style.backgroundColor = "red"
                await delay(500)
            }
        }
        await delay(10)
    }
    return arr
} 