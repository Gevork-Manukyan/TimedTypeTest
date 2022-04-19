const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p");
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

const testTexts = []
testTexts.push("To learn to type quickly, practice often and adopt the proper technique. Fix your posture, have adequate lighting, position your hands correctly over the keyboard," 
 + " look at the screen and use all your fingers to hit the keys. At first, concentrate on accuracy over speed. This will help you develop muscle memory and create automatic reflexes." 
 + " Keep practicing and gradually pick up the pace. You'll see results after just a few weeks!")

 testTexts.push("The higher they flew with the mirror, the more terribly it grinned: they could hardly hold it fast. Higher and higher still they flew, nearer and nearer to the stars, when suddenly the mirror shook so terribly with grinning, that it flew out of their hands and fell to the earth, where it was dashed in a hundred million and more pieces. And now it worked much more evil than before; for some of these pieces were hardly so large as a grain of sand, and they flew about in the wide world, and when they got into people's eyes, there they stayed; and then people saw everything perverted, or only had an eye for that which was evil.")

 testTexts.push("I observed for as long as I could. Their leaders have been assassinated. Communities flooded with drugs and weapons. They are overly policed and incarcerated. All over the planet, our people suffer because they don't have the tools to fight back. With vibranium weapons they can overthrow all countries, and Wakanda can rule them all, the right way!")


// inclusive, exclusive
function randomNumber (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

 // Load test text onto page
let random = randomNumber(0, testTexts.length)
originText.innerHTML = testTexts[random]



// Add leading zero to numbers 9 or below (purely for aesthetics):


// Run a standard minute/second/hundredths timer:


// Match the text entered with the provided text on the page:


// Start the timer:


// Reset everything:


// Event listeners for keyboard input and the reset button:
