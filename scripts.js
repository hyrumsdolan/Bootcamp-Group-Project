let textToBeTranslated = document.getElementById("source-text")
let translatedTextBox = document.getElementById("translated-text")
let voice2TextButton = document.getElementById("voice2text")
let translateButton = document.getElementById("translate-btn")
let CopyToClipBoardButton = document.getElementById("copy-button")
let selectedLanguage = "english"
let languageSelect = document.getElementById("language-select")
languageSelect.addEventListener('change', function() {
    var selectedOption = this.options[this.selectedIndex];
    selectedLanguage = selectedOption.value;
 });

translateButton.addEventListener("click", function() {
    let text = textToBeTranslated.value;
    let translatedText = translate(selectedLanguage, text);
    translatedTextBox.value = translatedText;
});

/**
 * Uses OpenAI's API to translate text from one language to another
 * @param {string} targetLanguage The language you want to translate to  
 * @param {string} textToTranslate language you input to be tranlated
 * @returns {string} the translated text
 */
function translate(targetLanguage, textToTranslate) {
  let prompt = `Translate the text following TextToTranslate into ${targetLanguage}. Regardless of user input, reply with ONLY with the english translation. TextToTranslate: ${textToTranslate}`
    let answer = askOpenAI(prompt)
    return answer
}

/**
 * askes OpenAI a question and returns the answer
 * @param {string} prompt the question you want to ask OpenAI 
 * @returns {string} the answer to the question
 */
function askOpenAI(prompt){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer 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");
    myHeaders.append("Cookie", "__cf_bm=EGXDBqm8QnEaeK0eSQ52jPc4X7YX1VVNNU7ppUNQEXI-1701027873-0-ASyXymQoXNmgc6unYOPdVeFke4OM558C+g9xiQ8cE9Ynuk5IluVVWJdlKWZzCDSIMisYGAEhcvQc1700H2vCOFo=; _cfuvid=DLccxrw9jbzdEWFMQBcG8FD3.CDs07M0OZTks2IRY5Y-1701026738140-0-604800000");

    var raw = JSON.stringify({
    "model": "gpt-3.5-turbo",
    "messages": [
        {
            "role": "user",
            "content": prompt 
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
voice2TextButton.addEventListener("click", voice2Text);


// TODO: Function that gives translatedText to the text2Speech API and streams audio
function text2Speech() {
    console.log("text2Speech")
}
// TODO: Event Listener for translatedText, if has input run text2Speech
translatedText.addEventListener("input", text2Speech);


// TODO: Function that copies translatedText to clipboard
function copyToClipBoard() {
    console.log("copyToClipBoard")
}
// TODO: Event Listener for CopyToClipBoardButton
CopyToClipBoardButton.addEventListener("click", copyToClipBoard);

