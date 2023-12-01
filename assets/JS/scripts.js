// HTML FIELDS
let inputField = document.getElementById("inputField");
let textOutput = document.getElementById("textOutput");
let submitButton = document.getElementById("submitButton");

// Variables
let isButtonPressed = false;
let suggestedDrink = "margarita";
let randomPokemon = "charmander"
let pokeSprite = ""
let pokeSpeak = ""


// API Variables
const CHATGPT_API_URL = "https://api.openai.com/v1/chat/completions"; // OpenAI's chat completion API endpoint
const POKEMON_API_URL = `https://pokeapi.co/api/v2/pokemon/`; // Pokemon API endpoint
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
  fetch('/.netlify/functions/chatgpt', options)
    .then((response) => response.json())
    .then((data) => {
      const text = data.choices[0].message.content;
      console.log(text);
      const splitData = text.split("|");
      const advice = splitData[0].trim();
      suggestedDrink = splitData[1].trim();
      pokeSpeak = splitData[2].trim();
      console.log(advice);
      console.log(suggestedDrink);
      textOutput.innerText = advice;
      // Additional UI update logic can be added here
      // For example, updating elements to display the suggested drink and Pokemon speak
    })
    .catch((error) => {
      console.error("Error:", error);
      textOutput.innerText = "Error fetching response.";
    });
}

// CocktailDB API Call
/**
    This needs to be written within a function that can be called after the ChatGPT call. When you call your API_URL you will need to add the suggestedDrink to the end of the URL
    ie. COCKTAIL_API_URL + suggestedDrink

    The API call will need to return all the needed information into variables

    Then create a separate function that will output the information into the HTML
    This function will be called in the event listener
    for now just have it output to the output field - however we will need to make changes for this show correctly, but we can't do that until the PokeAPI is done and the UI is done.
     */

    // Function to make CocktailDB API call
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
  var suggestionText = document.createElement('div');
  suggestionText.innerHTML = `
      <p class="text-xl font-bold mb-2">Suggested Cocktail: ${cocktail.strDrink}</p>
      <p>Ingredients:</p>
  `;

  for (let i = 1; i <= 10; i++) {
    var ingredient = cocktail[`strIngredient${i}`] || '';
    var measure = cocktail[`strMeasure${i}`] || '';
    if (ingredient && measure) {
      var ingredientText = document.createElement('p');
      ingredientText.textContent = ` - ${measure} ${ingredient}`;
      suggestionText.appendChild(ingredientText);
    }
  }

  var instructionsText = document.createElement('p');
  instructionsText.textContent = `Instructions: ${cocktail.strInstructions}`;

  textOutput.appendChild(suggestionText);
  textOutput.appendChild(instructionsText);

  // Display image 
  var imageUrl = cocktail.strDrinkThumb;
  if (imageUrl) {
    var cocktailImage = document.createElement('img');
    cocktailImage.src = imageUrl;
    cocktailImage.alt = cocktail.strDrink;
    textOutput.appendChild(cocktailImage);
  }
}




// Submit Button Event Listener
submitButton.addEventListener("click", async () => {
  if (isButtonPressed) return;

  isButtonPressed = true;
  setTimeout(() => (isButtonClicked = false), 1000);
  try {
    console.log("API CALL!");
    const chatResponse = await getChatCompletion(inputField.value);
    await getCocktailInfo(suggestedDrink)
      .then((cocktailData) => {
        displayCocktailInfo(cocktailData.drinks[0]);
      })
    } catch (error) {
      console.error("Error:", error);
      textOutput.innerText = "Error fetching response."; // Changed here as well
    }
  });
