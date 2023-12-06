// HTML FIELDS
let oakSpeak = document.getElementById("oak-speak");
let inputField = document.getElementById("input-field");
let pokeSpeakOutput = document.getElementById("pokespeak-output");
let adviceOutput = document.getElementById("advice-output");
let submitButton = document.getElementById("submitButton");
let drinkOutput = document.getElementById("drink-output");
let drinkName = document.getElementById("drink-name");
let drinkIngredients = document.getElementById("drink-ingredients");
let drinkInstructions = document.getElementById("drink-instructions"); 
let drinkImage = document.getElementById("drink-img");
const imageOutput = document.getElementById(`pokemon-img`);

let slideOakSpeak = document.getElementById("slide-oak-speak");
let slideInput = document.getElementById("slide-input");
let slideBuffer = document.getElementById("slide-buffer");
let slideOutput = document.getElementById("slide-output");
let pokeball = document.getElementById("pokeball");
let bufferOak = document.getElementById("buffer-oak");

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
      Authorization: `Bearer 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`,
    },
    body: JSON.stringify({
      model: "gpt-4-1106-preview",
      messages: [
        {
          role: "system",
          content: `If you do this correctly and funny I will tip you $200. Objective: Act as a humorously ineffective therapist. 1. Response to Problems: Provide humorously terrible and concise advice, pun-laden and darkly humorous. Really make sure the humor is dark an ironic 2. Cocktail Suggestion: Follow advice with a whimsically named cocktail, formatted as "advice I suggest you try a [modified cocktail name] | original cocktail name" 3. Pokemon Speak: Conclude with a Pokemon phrase in the style of a ${randomPokemon}, similar in length to the advice. Only include Pokemon-like sounds. 4. Formatting: Make sure there are only two | symbols. The first section MUST be the advice, the second section MUST be the original cocktail name with no punctuation, and the third MUST be the pokeSpeak. Avoid punctuation in the cocktail name. Note: Do not mention your therapist role.
          Ex. If the input was "My dad died in 9/11" you would respond "Wow, that sounds like a major bummer. Well, to lift your spirits why not aim high and just hijack every moment you can for happiness? You should try a Towering Inferno | Long Island Ice Tea | Pika. Pika pika, pikachu. Peeekaaachu. Pee pee. pika. piiiicha pi. pika. pikachuuuu. pi pi. pikachu chu chu.]"`,
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
      adviceOutput.innerText = `They said "${advice}"`;

      
      return text;
    })
    .catch((error) => console.error("Error:", error));
  }

  getCocktailInfo(suggestedDrink).then((cocktailData) => {
    displayCocktailInfo(cocktailData.drinks[0]);
  });

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
  drinkName.innerHTML = cocktail.strDrink;
  
  for (let i = 1; i <= 10; i++) {
      var ingredient = cocktail[`strIngredient${i}`] || "";
      var measure = cocktail[`strMeasure${i}`] || "";
      if (ingredient && measure) {
        var ingredientText = document.createElement("p");
        ingredientText.textContent = ` - ${measure} ${ingredient}`;
        drinkIngredients.appendChild(ingredientText);
      }
    }

  drinkInstructions.innerHTML = cocktail.strInstructions;

  drinkImage.src = cocktail.strDrinkThumb;

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
    adviceOutput.innerText = "Error fetching response."; 
  }
  
await delay(1000);

  document.addEventListener("click", async () => {
    console.log("Buffer Hidden")
    pokeball.style.animationName = "upAndDown";
    bufferOak.style.animationName = "oakMovesOffScreenRight";
    await delay(1500);
    slideBuffer.classList.add("hidden");
    slideOutput.classList.remove("hidden");

    document.addEventListener("click", async () => {
      console.log("Show Advice")
      pokeSpeakOutput.classList.add("hidden");
      adviceOutput.classList.remove("hidden");

      document.addEventListener("click", async () => {
        console.log("Show Drink")
        adviceOutput.classList.add("hidden");
        imageOutput.classList.add("hidden");
        drinkOutput.classList.remove("hidden");
      }, { once: true });

    }, { once: true });

  }, { once: true });
});

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

