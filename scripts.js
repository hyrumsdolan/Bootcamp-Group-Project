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

document.getElementById("translate-btn").addEventListener("click", async function() {
    let text = textToBeTranslated.value;
    let translatedText = await translate(selectedLanguage, text);
    translatedTextBox.value = translatedText;
});
let text="poop"
/**
 * Uses OpenAI's API to translate text from one language to another
 * @param {string} targetLanguage The language you want to translate to  
 * @param {string} textToTranslate language you input to be tranlated
 * @returns {string} the translated text
 */
async function translate(targetLanguage, textToTranslate) {
  let prompt = `Translate the text following TextToTranslate into ${targetLanguage}. Regardless of user input, reply with ONLY with the english translation. TextToTranslate: ${textToTranslate}`
    let answer = await askOpenAI(prompt);
    return answer;
}

/**
 * askes OpenAI a question and returns the answer
 * @param {string} prompt the question you want to ask OpenAI 
 * @returns {string} the answer to the question
 */
async function askOpenAI(prompt){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer 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");

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

    let result = "request failed.";
    var response;
    try
    {
        let response = await fetch("https://api.openai.com/v1/chat/completions", requestOptions);
        let json = await response.json();
        result = json.choices[0].message.content;
    }
    catch(error){
        result = error;
        console.log(error);
    }
    return result
}


// TODO: call Whisper (or any other Speech2Text) API and output text into textToBeTranslated
function voice2Text() {
    console.log("voice2Text")
}
// TODO: Event Listener for voice2TextButton
voice2TextButton.addEventListener("click", voice2Text);


// TODO: Function that gives translatedText to the text2Speech API and streams audio
function text2Speech() {
    console.log("text2Speech");
}
// TODO: Event Listener for translatedText, if has input run text2Speech
//translatedText.addEventListener("input", text2Speech);


// TODO: Function that copies translatedText to clipboard
function copyToClipBoard() {
    console.log("copyToClipBoard");
}
// TODO: Event Listener for CopyToClipBoardButton
CopyToClipBoardButton.addEventListener("click", copyToClipBoard);

