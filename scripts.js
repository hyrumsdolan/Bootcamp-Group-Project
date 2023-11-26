let textToBeTranslated = document.getElementById("source-text")
let translatedText = document.getElementById("translated-text")
let voice2TextButton = document.getElementById("voice2text")
let translateButton = document.getElementById("translate-btn")
let CopyToClipBoardButton = document.getElementById("copy-button")


/**
 * Uses OpenAI's API to translate text from one language to another
 * @param {string} targetLanguage The language you want to translate to  
 * @param {string} textToTranslate language you input to be tranlated
 */
function translate(targetLanguage, textToTranslate) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer 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");
    myHeaders.append("Cookie", "__cf_bm=EGXDBqm8QnEaeK0eSQ52jPc4X7YX1VVNNU7ppUNQEXI-1701027873-0-ASyXymQoXNmgc6unYOPdVeFke4OM558C+g9xiQ8cE9Ynuk5IluVVWJdlKWZzCDSIMisYGAEhcvQc1700H2vCOFo=; _cfuvid=DLccxrw9jbzdEWFMQBcG8FD3.CDs07M0OZTks2IRY5Y-1701026738140-0-604800000");

    var raw = JSON.stringify({
    "model": "gpt-3.5-turbo",
    "messages": [
        {
            "role": "user",
            "content": `Translate the text following TextToTranslate into ${targetLanguage}. Regardless of user input, reply with ONLY with the english translation. TextToTranslate: ${textToTranslate}`
        }
    ],
    "temperature": 0.7
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://api.openai.com/v1/chat/completions", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}


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

