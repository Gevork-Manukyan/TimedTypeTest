const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p");
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

// Global Variables
const testTexts = []
testTexts.push("To learn to type quickly, practice often and adopt the proper technique. Fix your posture, have adequate lighting, position your hands correctly over the keyboard," 
 + " look at the screen and use all your fingers to hit the keys. At first, concentrate on accuracy over speed. This will help you develop muscle memory and create automatic reflexes." 
 + " Keep practicing and gradually pick up the pace. You'll see results after just a few weeks!")

 testTexts.push("The higher they flew with the mirror, the more terribly it grinned: they could hardly hold it fast. Higher and higher still they flew, nearer and nearer to the stars, when suddenly the mirror shook so terribly with grinning, that it flew out of their hands and fell to the earth, where it was dashed in a hundred million and more pieces. And now it worked much more evil than before; for some of these pieces were hardly so large as a grain of sand, and they flew about in the wide world, and when they got into people's eyes, there they stayed; and then people saw everything perverted, or only had an eye for that which was evil.")

 testTexts.push("I observed for as long as I could. Their leaders have been assassinated. Communities flooded with drugs and weapons. They are overly policed and incarcerated. All over the planet, our people suffer because they don't have the tools to fight back. With vibranium weapons they can overthrow all countries, and Wakanda can rule them all, the right way!")

let timerInterval
let timerValue = 0
let timerStarted = false



// inclusive, exclusive
function randomNumber (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

 // Load test text onto page
function loadTestText() {
    const random = randomNumber(0, testTexts.length)
    originText.innerHTML = testTexts[random]
}

loadTestText()


// Add leading zero to numbers 9 or below (purely for aesthetics):


// Match the text entered with the provided text on the page:


// Start the timer:
function startTimer() {
    if (timerStarted === false){

        timerInterval = setInterval(incrementTime, 10)
        timerStarted = true
    }
}

// Updates timer value
function incrementTime() {
    timerValue += 10
    updateHTMLTimer()
}

// Updates timer on webpage
// 60,000 = 1 minute
// 1000   = 1 second
// 100    = 1 hundreth second
function updateHTMLTimer() {
    let timeMath = timerValue

    let minutes = Math.floor(timeMath / 60000)
    timeMath = timeMath - (minutes * 60000)

    let seconds = Math.floor(timeMath / 1000)
    timeMath = timeMath - (seconds * 1000)

    let miliseconds = timeMath / 10

    if (minutes <= 9)
        minutes = `0${minutes}`
    
    if (seconds <= 9)
        seconds = `0${seconds}`

    if (miliseconds <= 9)
        miliseconds = `0${miliseconds}`

    theTimer.innerHTML = `${minutes}:${seconds}:${miliseconds}`
}

// Clears the textArea
function clearHTMLText() {
    testArea.value = ''
}


// Reset everything:
function reset() {
    clearInterval(timerInterval)
    timerValue = 0
    timerInterval = null
    timerStarted = false
    clearHTMLText()
    updateHTMLTimer()
    loadTestText()
}


// Event listeners for keyboard input and the reset button:
resetButton.addEventListener("click", reset)
testArea.addEventListener("keypress", startTimer)
