const resetButton = document.querySelector('.reset__button')
const input = document.querySelector('.excercise__record')
const excercise = document.querySelector('.excercise')
const timer = document.querySelector('.timer__counter')
const progressBar = document.querySelector('.progress__bar')

let currentWordId
let isCounter = false

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
    const gameTime = 60
    const endTime = Date.now() + gameTime*1000
    const counter = setInterval(()=>{
        const secondsLeft = Math.round((endTime - Date.now())/1000)
        const progress = Math.round(100*secondsLeft/gameTime)
        if(secondsLeft<0) {
            clearInterval(counter)
            return
        }
        timer.innerHTML = secondsLeft + ' sec'
        progressBar.style.width = progress + '%'
        console.log(progress)
    }, 500)

}

// function to chack spelling
const spellingCheck = (e) => {
    !isCounter && countdown()
    isCounter = true

    const excerciseWord = excercise.querySelector(`#word_${currentWordId}`)
    // whole word validation (if space-32 or enter-13 pressed  )
    if ((e.keyCode === 32 ||e.keyCode ===  13) && input.value.trim().length > 0) {
        excerciseWord.innerHTML = words[currentWordId]
        excerciseWord.innerHTML === input.value.trim()
            ? setClassOnActiveWord('--pass')
            : setClassOnActiveWord('--fail')
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

const loadNewGame = () => {
    loadExcercise()
    currentWordId = 0
    setClassOnActiveWord('--active')
    input.value = ''
}

window.addEventListener('load', loadNewGame)
resetButton.addEventListener('click', loadNewGame)
input.addEventListener('keyup', spellingCheck)