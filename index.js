const resetButton = document.querySelector('.reset__button')
const input = document.querySelector('.excercise__record')
const excercise = document.querySelector('.excercise')
const timer = document.querySelector('.timer__counter')
const progressBar = document.querySelector('.progress__bar')
const results = document.querySelector('.resutls')

const gameDuration = 60

let currentWordId
let isCounter = false
let counter
let cpm
let wpm

// function to shuffle words array
const shuffle = (arr) => {
    const randomize = arr.sort((a, b) => Math.random() - 0.5)
    return randomize
}

// function to display excercise
const loadExcercise = () => {
    const exampleText = shuffle(words).map((word, i) => `<span id="word_${i}"class="excercise-word">${word}</span>`)
    excercise.innerHTML = exampleText.join(' ')
}

// function to change class on active word
const setClassOnActiveWord = (className) => {
    const activeWord = excercise.querySelector(`#word_${currentWordId}`)
    if (className === '--active') {
        activeWord.classList.add(`${className}`)
    } else {
        activeWord.classList.remove(`--active`)
        activeWord.classList.add(`${className}`)
    }
}
//game timer
const countdown = () =>{
    const endTime = Date.now() + gameDuration*1000
    counter = setInterval(()=>{
        const secondsLeft = (endTime - Date.now())/1000
        const progress =  100-(100*secondsLeft/gameDuration)
        if(secondsLeft<0) {
            clearInterval(counter)
            loadResults()
            return
        }
        timer.innerHTML = Math.round(secondsLeft) + ' seconds left'
        progressBar.style.width = progress +'%'
    }, 50)
}

// function to chack spelling
const spellingCheck = (e) => {
    !isCounter && countdown()
    isCounter = true

    const excerciseWord = excercise.querySelector(`#word_${currentWordId}`)
    // whole word validation (if space-32 or enter-13 pressed  )
    if ((e.keyCode === 32 ||e.keyCode ===  13) && input.value.trim().length > 0) {
        excerciseWord.innerHTML = words[currentWordId]

        if(excerciseWord.innerHTML === input.value.trim()) {
            setClassOnActiveWord('--pass')
            cpm = cpm + excerciseWord.innerHTML.length
            wpm++
        } else {
            setClassOnActiveWord('--fail')
        }
        currentWordId++
        setClassOnActiveWord('--active')
        input.value = ''
    }
    // correctness of typed letters
     else {
        const typedText = Array.from(input.value)
        const splited = Array.from(words[currentWordId]).slice(0, typedText.length)
        const rest = Array.from(words[currentWordId]).slice(typedText.length).join('')

        const letters = splited.map((letter, i)=>
            letter == typedText[i] ? `<span class='--correct'>${letter}</span>` : `<span class='--incorrect'>${letter}</span>`
        ).join('')

        excerciseWord.innerHTML=letters + `<span>${rest}</span>`
    }
}

const loadResults = () => {
    results.style.transform=`scaleY(1)`
}

const loadNewGame = () => {
    //1. new example display
    loadExcercise()
    currentWordId = 0
    setClassOnActiveWord('--active')
    input.value = ''
    //2. game counter reset
    timer.innerHTML = gameDuration + ' seconds left'
    progressBar.style.width = '0%'
    clearInterval(counter)
    isCounter = false
    //3. reset score from previous game
    cpm = 0
    wpm = 0
}

window.addEventListener('load', loadNewGame)
resetButton.addEventListener('click', loadNewGame)
input.addEventListener('keyup', spellingCheck)