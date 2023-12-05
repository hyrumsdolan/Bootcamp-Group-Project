// HTML FIELDS
let oakSpeak = document.getElementById("oak-speak");
let inputField = document.getElementById("input-field");
let pokeSpeakOutput = document.getElementById("pokespeak-output");
let adviceOutput = document.getElementById("advice-output");
let submitButton = document.getElementById("submitButton");
let drinkOutput = document.getElementById("drink-output");
const imageOutput = document.getElementById(`pokemon-img`);

let slideOakSpeak = document.getElementById("slide-oak-speak");
let slideInput = document.getElementById("slide-input");
let slideBuffer = document.getElementById("slide-buffer");
let slideOutput = document.getElementById("slide-output");

// Variables
let isButtonPressed = false;
let suggestedDrink = "margarita";
let randomPokemon = "charmander";
let pokeSprite = "";
let pokeSpeak = "";




// API Variables
const CHATGPT_API_URL = "https://api.openai.com/v1/chat/completions"; // OpenAI's chat completion API endpoint
const POKEMON_API_URL = `https://pokeapi.co/api/v2/pokemon/`; // Pokemon API endpoint
const COCKTAIL_API_URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`; // Cocktail API

//Get Random Pokemon
const minNum = 0;
const maxNum = 386;
const randomNumber = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;

getRandomPokemon();

function getRandomPokemon() {
  fetch(POKEMON_API_URL+randomNumber)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      randomPokemon = data.species.name;
      console.log(randomPokemon);
      let pokeSprite = data.sprites.front_default;
      console.log(pokeSprite);
      let img = document.createElement("img"); 
      img.src = pokeSprite; 
      console.log(img);
      imageOutput.src = pokeSprite; 
    });
}



// Ask Chat GPT to be a bad alcoholic pokemon therapist
function getChatCompletion(prompt) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer {NEED TO ADD API KEY HERE}`,
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
      temperature: 0.7, // 0.7 is the default, 0 is less creative, 1 is more creative
      max_tokens: 4000, // About 3000 words
    }),
  };


// Fetches from the serverless function and processes the data
  // Fetches the ChatGPT API & Cleans up the data
  fetch(CHATGPT_API_URL, options)
    .then((response) => response.json())
    .then((data) => {
      const text = data.choices[0].message.content;
      console.log(text);
      splitData = text.split("|");
      advice = splitData[0].trim();
      suggestedDrink = splitData[1].trim();
      getCocktailInfo(suggestedDrink).then((cocktailData) => {
        displayCocktailInfo(cocktailData.drinks[0]);
      });
      pokeSpeak = splitData[2].trim();
      console.log(advice);
      console.log(suggestedDrink);
      pokeSpeakOutput.innerHTML = pokeSpeak
      adviceOutput.innerText = advice;

      
      return text;
    })
    .catch((error) => console.error("Error:", error));
  }

// CocktailDB API Call
async function getCocktailInfo(suggestedDrink) {
  try {
    var response = await fetch(`${COCKTAIL_API_URL}${suggestedDrink}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    var data = await response.json();

    console.log(data);

    return data;
  } catch (error) {
    throw new Error(`Error fetching cocktail information: ${error.message}`);
  }
}

// Function to display cocktail information in HTML
function displayCocktailInfo(cocktail) {
  // Display the suggestion
  var suggestionText = document.createElement("div");
  drinkOutput.innerHTML = `
      <p class="text-xl font-bold mb-2">Suggested Cocktail: ${cocktail.strDrink}</p>
      <p>Ingredients:</p>
  `;

  for (let i = 1; i <= 10; i++) {
    var ingredient = cocktail[`strIngredient${i}`] || "";
    var measure = cocktail[`strMeasure${i}`] || "";
    if (ingredient && measure) {
      var ingredientText = document.createElement("p");
      ingredientText.textContent = ` - ${measure} ${ingredient}`;
      suggestionText.appendChild(ingredientText);
    }
  }

  var instructionsText = document.createElement("p");
  instructionsText.textContent = `Instructions: ${cocktail.strInstructions}`;

  drinkOutput.appendChild(suggestionText);
  drinkOutput.appendChild(instructionsText);

  // Display image
  var imageUrl = cocktail.strDrinkThumb;
  if (imageUrl) {
    var cocktailImage = document.createElement("img");
    cocktailImage.src = imageUrl;
    cocktailImage.alt = cocktail.strDrink;
    drinkOutput.appendChild(cocktailImage);
  }
}



document.addEventListener("click", async () => {
  console.log("click");
  slideOakSpeak.classList.add("hidden");
  slideInput.classList.remove("hidden");
}, { once: true });

submitButton.addEventListener("click", async () => {
  if (isButtonPressed) return;

  isButtonPressed = true;
  slideInput.classList.add("hidden");
  slideBuffer.classList.remove("hidden");
  setTimeout(() => (isButtonClicked = false), 1000);
  try {
    console.log("API CALL!");
    await getChatCompletion(inputField.value);
    
  } catch (error) {
    console.error("Error:", error);
    adviceOutput.innerText = "Error fetching response."; // Changed here as well
  }
  document.addEventListener("click", async () => {
    console.log("I'm working!")
    slideBuffer.classList.add("hidden");
    slideOutput.classList.remove("hidden");

    document.addEventListener("click", async () => {
      console.log("I'm working!")
      pokeSpeakOutput.classList.add("hidden");
      adviceOutput.classList.remove("hidden");

      document.addEventListener("click", async () => {
        console.log("I'm working!")
        adviceOutput.classList.add("hidden");
        imageOutput.classList.add("hidden");
        drinkOutput.classList.remove("hidden");
      }, { once: true });

    }, { once: true });

  }, { once: true });
});



// Submit Button Event Listener
// submitButton.addEventListener("click", async () => {
//   if (isButtonPressed) return;

//   isButtonPressed = true;
//   setTimeout(() => (isButtonClicked = false), 1000);
//   try {
//     console.log("API CALL!");
//     await getChatCompletion(inputField.value);
    
//   } catch (error) {
//     console.error("Error:", error);
//     adviceOutput.innerText = "Error fetching response."; // Changed here as well
//   }
// });
