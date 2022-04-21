const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p");
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const wpmResult = document.querySelector("#wpm-result")
const mistakes = document.querySelector("#numberOfMistakes")
const scores = {
    score1: document.querySelector("#score1"),
    score2: document.querySelector("#score2"),
    score3: document.querySelector("#score3"),
}

// Global Variables
const testTexts = []

// Three different test texts that are displayed randomly
testTexts.push("To learn to type quickly, practice often and adopt the proper technique. Fix your posture, have adequate lighting, position your hands correctly over the keyboard," 
 + " look at the screen and use all your fingers to hit the keys. At first, concentrate on accuracy over speed. This will help you develop muscle memory and create automatic reflexes." 
 + " Keep practicing and gradually pick up the pace. You'll see results after just a few weeks!")

 testTexts.push("The higher they flew with the mirror, the more terribly it grinned: they could hardly hold it fast. Higher and higher still they flew, nearer and nearer to the stars, when suddenly the mirror shook so terribly with grinning, that it flew out of their hands and fell to the earth, where it was dashed in a hundred million and more pieces. And now it worked much more evil than before; for some of these pieces were hardly so large as a grain of sand, and they flew about in the wide world, and when they got into people's eyes, there they stayed; and then people saw everything perverted, or only had an eye for that which was evil.")

 testTexts.push("I observed for as long as I could. Their leaders have been assassinated. Communities flooded with drugs and weapons. They are overly policed and incarcerated. All over the planet, our people suffer because they don't have the tools to fight back. With vibranium weapons they can overthrow all countries, and Wakanda can rule them all, the right way!")

 testTexts.push("Hello")
 // Keeps track of top 3 times
const leaderboard = [Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE]

let timerInterval
let timerValue = 0
let timerStarted = false
let currentTestTextTokens
let playerPosition = 0
let typedString = ''
let mistakeCounter = 0



// inclusive, exclusive
function randomNumber (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

 // Load random test text onto page
function loadTestText() {
    const random = randomNumber(0, testTexts.length)
    originText.innerHTML = testTexts[random]
    currentTestTextTokens = testTexts[random].split("")
}

loadTestText()


// Match the text entered with the provided text on the page:
function checkKeyOrStartGame(event) {
    event.preventDefault()
    
    if (timerStarted === false){
        startTimer()
    }
    
    if (event.key === currentTestTextTokens[playerPosition]) {
        playerPosition++
        typedString = typedString + event.key
        testArea.classList.add("correct")
        testArea.classList.remove("mistake")
    } else {
        mistakeCounter++
        testArea.classList.add("mistake")
        testArea.classList.remove("correct")
    }

    testArea.value = typedString
    
    if (playerPosition === currentTestTextTokens.length) {
        stopTimer()
    }
}

// evenListenter for backspace
function doBackspace(event) {

    if (timerStarted === false){
        return;
    }

    if (event.key === 'Backspace') {
        playerPosition--
        typedString = typedString.substring(0, typedString.length - 1)
    }
}

// Start the timer:
function startTimer() {
    timerInterval = setInterval(incrementTime, 10)
    timerStarted = true
}

function stopTimer() {
    clearInterval(timerInterval)
    
    if (timerStarted === true) {
        if (timerValue < leaderboard[0])
            leaderboard.splice(0, 0, timerValue)
        
        else if (timerValue < leaderboard[1])
            leaderboard.splice(1, 0, timerValue)
        
        else if (timerValue < leaderboard[2])
            leaderboard.splice(2, 0, timerValue)
        

        // Display number of mistakes
        mistakes.innerHTML = mistakeCounter
        // Calculate wpm
        wpmResult.innerHTML = Math.floor(currentTestTextTokens.length / (timerValue / 60000)) / 10
        // Disable text area
        testArea.disabled = true
        // Change background color of textarea
        testArea.classList.remove("correct")
        testArea.classList.remove("mistake")
        testArea.classList.add("success")
        timerStarted = false
        updateLeaderboardHtml()
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
    theTimer.innerHTML = formatTime(timerValue)
}

// Updates the leaderboard html
function updateLeaderboardHtml() {

    leaderboard.forEach((element, index) => {
        if (element < Number.MAX_VALUE)
            scores[`score${index + 1}`].innerHTML = formatTime(element)
    })
    
}

// Formats the time appropriately
function formatTime(timeMath) {

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


    return `${minutes}:${seconds}:${miliseconds}`;
}

// Clears the textArea
function clearHTMLText() {
    testArea.value = ''
}

// Reset everything
function reset() {
    clearInterval(timerInterval)
    timerValue = 0
    timerInterval = null
    timerStarted = false
    typedString = ""
    playerPosition = 0
    mistakeCounter = 0
    testArea.disabled = false
    testArea.classList.remove("success")
    testArea.classList.remove("mistake")
    testArea.classList.remove("correct")
    clearHTMLText()
    updateHTMLTimer()
    loadTestText()
}


// Event listeners for keyboard input and the reset button:
resetButton.addEventListener("click", reset)
testArea.addEventListener("keypress", checkKeyOrStartGame)
testArea.addEventListener("keydown", doBackspace)