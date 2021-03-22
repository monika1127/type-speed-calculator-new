const resetButton = document.querySelector('.reset__button')
const input = document.querySelector('.excercise__record')
const excercise = document.querySelector('.excercise')

let currentWordId=0

const shuffle = (arr) => {
    const randomize = arr.sort((a, b) => Math.random() - 0.5)
    return randomize
}

const loadExcercise = ()=>{
    const exampleText = shuffle(words).map((word, i) => `<span class="excercise-word ${i===currentWordId && 'excercise-word--active'}">${word}</span>`)
    excercise.innerHTML = exampleText.join(' ')
}

const spellingCheck = (e)=>{
    if(e.keyCode===32 && recordInput.value.trim().length > 0){
                const currentWord = excercise.querySelector('.excercise-word--active')
        console.log(input.value)
        const typedText = Array.from(input.value)
    }
}

resetButton.addEventListener('click', loadExcercise)
input.addEventListener('keyup', spellingCheck)