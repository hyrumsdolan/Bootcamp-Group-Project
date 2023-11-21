let textToBeTranslated = document.getElementById("source-text")
let translatedText = document.getElementById("translated-text")
let voice2TextButton = document.getElementById("voice2text")
let translateButton = document.getElementById("translate-btn")
let CopyToClipBoardButton = document.getElementById("copy-button")


// TODO: call Whisper (or any other Speech2Text) API and output text into textToBeTranslated
function voice2Text() {
    console.log("voice2Text")
}
// TODO: Event Listener for voice2TextButton
voice2TextButton.addEventListener("click", voice2Text){
    console.log("voice2TextButton")
}


// TODO: Function that gives textToBeTranslated to the translate API and outputs text into the translatedText
function translate() {
    console.log("translate")
}
// TODO: Event Listener for translateButton
translateButton.addEventListener("click", translate){
    console.log("translateButton")
}

// TODO: Function that gives translatedText to the text2Speech API and streams audio
function text2Speech() {
    console.log("text2Speech")
}
// TODO: Event Listener for translatedText, if has input run text2Speech
translatedText.addEventListener("input", text2Speech){
    console.log("translatedText")
}


// TODO: Function that copies translatedText to clipboard
function copyToClipBoard() {
    console.log("copyToClipBoard")
}
// TODO: Event Listener for CopyToClipBoardButton
CopyToClipBoardButton.addEventListener("click", copyToClipBoard){
    console.log("CopyToClipBoardButton")
}

