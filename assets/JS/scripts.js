// HTML FIELDS
let inputField = document.getElementById("inputField");
let textOutput = document.getElementById("textOutput");
let submitButton = document.getElementById("submitButton");

// Variables
let isButtonPressed = false;
let suggestedDrink = "";
let randomPokemon = "charmander"
let pokeSprite = ""
let pokeSpeak = ""

const imageOutput = document.getElementById(`imageOutput`);
const minNum = 0;
const maxNum = 1017;
const randomNumber = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;

// API Variables
const CHATGPT_API_URL = "https://api.openai.com/v1/chat/completions"; // OpenAI's chat completion API endpoint
const POKEMON_API_URL = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`; // Pokemon API endpoint
const COCKTAIL_API_URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`; // Cocktail API

//Get Random Pokemon
/**
   When you call your API_URL you will need to add the randomNumber to the end of the URL
   ie. POKEMON_API_URL + randomNumber
   Do it down here instead of in the API variables for organization
   This needs to return a randomPokemon name to randomPokemon
   then you will also want to return the pokemonSprite

   We then need a funtion that will output the pokemonSprite to the HTML
   this function will be called in the event listener later
 */
   document.getElementById(`submitButton`).addEventListener('click', function(){
    fetch(POKEMON_API_URL)
    .then(response => {
      return response.json();
    })
    .then(data => {
      let pokeSprite = data.sprites.front_default;
      console.log(pokeSprite);
      let img = document.createElement('img'); // Create a new img element
      img.src = pokeSprite;                    // Set the src attribute to the sprite URL
      console.log(img);
      imageOutput.appendChild(img);            // Append the img element to the DOM
    });
});

// console.log(randomNumber);


// Ask Chat GPT to be a bad alcoholic pokemon therapist
function getChatCompletion(prompt) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4-1106-preview",
      messages: [
        {
          role: "system",
          content: `Your objective. You are going to be a horrible therapist. Any time I talk to you about my problem I want you to give one piece of awful advice and suggest a cocktail that will solve all their problems. DO NOT mention your role. Only respond with the advice, then the cocktail. Make sure to make the advice as funnily bad, or pun oriented, or dark as you can. Write a silly version of the cocktail name, but make sure to add '| simpleDrinkName(NO PERIOD)' ie. '[bad advice] you should try a Salty Dog Tears | Salty Dog' then after that put another | and translate all the advice into pokemon speak in the voice of ${randomPokemon}.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 1, // 0.7 is the default, 0 is less creative, 1 is more creative
      max_tokens: 4000, // About 3000 words
    }),
  };

  // Fetches from the serverless function and processes the data
//   fetch('/.netlify/functions/chatgpt', options)
//     .then((response) => response.json())
//     .then((data) => {
//       const text = data.choices[0].message.content;
//       console.log(text);
//       const splitData = text.split("|");
//       const advice = splitData[0].trim();
//       suggestedDrink = splitData[1].trim();
//       pokeSpeak = splitData[2].trim();
//       console.log(advice);
//       console.log(suggestedDrink);
//       textOutput.innerText = advice;
//       // Additional UI update logic can be added here
//       // For example, updating elements to display the suggested drink and Pokemon speak
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       textOutput.innerText = "Error fetching response.";
//     });
// }

// CocktailDB API Call
/**
    This needs to be written within a function that can be called after the ChatGPT call. When you call your API_URL you will need to add the suggestedDrink to the end of the URL
    ie. COCKTAIL_API_URL + suggestedDrink

    The API call will need to return all the needed information into variables

    Then create a separate function that will output the information into the HTML
    This function will be called in the event listener
    for now just have it output to the output field - however we will need to make changes for this show correctly, but we can't do that until the PokeAPI is done and the UI is done.
     */





// Submit Button Event Listener
submitButton.addEventListener("click", async () => {
  if (isButtonPressed) return;

  isButtonPressed = true;
  setTimeout(() => (isButtonClicked = false), 1000);
  try {
    console.log("API CALL!");
    const chatResponse = getChatCompletion(inputField.value);
  } catch (error) {
    console.error("Error:", error);
    textOutput.innerText = "Error fetching response."; // Changed here as well
  }
});

}