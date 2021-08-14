//------------------------------------------------------
//----------------------CHALLENGE-1---------------------
//------------------------------------------------------



//Returns your birthdate which should be entered in the prompt in the format mm/dd/yy to recieve correcrt results from the program.
function birthDate() {
    const birthYear = prompt("When are you born? \nPlease use the following format for correct results: mm/dd/yy");
    const date = new Date(birthYear);
    return date;
}

//Count the number of days between your birthdate and the first day of your birthyear(01/01/yourBirthYear).
function daysUnbornFromBirthYear(date1) {
    const date2 = new Date("01/01/" + date1.getFullYear());
    var Difference_In_Time = date1.getTime() - date2.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    if (Difference_In_Days - Math.round(Difference_In_Days) < 0) {
        return Math.round(Difference_In_Days) - 1;
    } else {
        return Math.round(Difference_In_Days);
    }
}

//Calculate your age in days.
function ageInDays() {
    const birthYear = birthDate();
    const date = new Date();
    var ageInYears = date.getFullYear() - birthYear.getFullYear();

    //Count the number of elap years.
    function numberOfLeapYears() {
        let leaps = 0;
        for (i = birthYear.getFullYear(); i < date.getFullYear() + 1; i++) {
            if (isLeapYear(i)) {
                leaps++;
            }
        }
        return leaps;
    }

    //Calculations to get your age in days.
    var n = numberOfLeapYears() + ageInYears * 365 + daysFromCurrentYear() - daysUnbornFromBirthYear(birthYear);   

    var h1 = document.createElement("h1");
    var textAnswer = document.createTextNode("Your age is " + n + " days!");
    h1.setAttribute("id", "ageInDays");
    h1.appendChild(textAnswer);
    document.getElementById("flex-box-result").appendChild(h1);
}

//Reset the part of the html page that calculates the days since your birth.
function reset() {
    document.getElementById("ageInDays").remove();
}

//This function returns the remaining days from the current year.
function daysFromCurrentYear() {
    const date1 = new Date();
    const date2 = new Date("01/01/" + date1.getFullYear());
    var Difference_In_Time = date1.getTime() - date2.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    //Check if the days are rounded to a smaller or bigger number.
   if (Difference_In_Days - Math.round(Difference_In_Days) < 0) {
       return Math.round(Difference_In_Days) - 1;
    } else {
        return Math.round(Difference_In_Days);
    }
}

//This function checks if a year is a leap year.
function isLeapYear(year) {
    if (year % 100 == 0) {
        if (year % 4 == 0) {
            return true;
        }
    }  else if (i % 4 == 0) {
        return true;
    } else {
        return false;
    }
}



//------------------------------------------------------
//----------------------CHALLENGE-2---------------------
//------------------------------------------------------



//Create an image element and append it to a div.
function generateCat() {
    var img = document.createElement("img");
    img.src = "https://cdn2.thecatapi.com/images/18t.gif";
    document.getElementById("flex-box-images").appendChild(img);
    //Set the image id to the current number of existing elements in the div.
    img.id = document.getElementById("flex-box-images").children.length;
}

//Remove the last created cat image by getting the id of that image which is always equal to the number of currently existing images.
function removeCat() {
    var childID = document.getElementById(document.getElementById("flex-box-images").children.length);
    document.getElementById("flex-box-images").removeChild(childID);
}



//------------------------------------------------------
//----------------------CHALLENGE-3---------------------
//------------------------------------------------------


//The game function where everything runs together.
function rpsGame(yourChoice) {

    var humanChoice, computerChoice;
    humanChoice = yourChoice.id;
    computerChoice = getRandomChoice(getRandomInt());
    let results = getWinner(humanChoice, computerChoice);
    message = finalMessage(results);
    rpsFrondEnd(humanChoice, computerChoice, message);
}

//Return a random int between 0 and 2
function getRandomInt() {
    return Math.floor(Math.random() * 3);
}

/*Assign a value to the random number.
rock = 0
paper = 1
scissors = 2
*/
function getRandomChoice(number) {
    return ["rock", "paper", "scissors"][number];
}

function getWinner(yourChoice, computerChoice) {
    var outcomeList = {
        "rock" : {"rock" : 0.5, "paper" : 0, "scissors" : 1},
        "paper" : {"rock" : 1, "paper" : 0.5, "scissors" : 0},
        "scissors" : {"rock" : 0, "paper" : 1, "scissors" : 0.5}
    };

    var yourScore = outcomeList[yourChoice][computerChoice];

    return yourScore;
}

//Return a dictionary with the results and the color the result should be in
function finalMessage(yourScore) {
    if (yourScore == 0) {
        return {"message" : "You lost!", "color" : "red"};
    } else if (yourScore == 0.5) {
        return {"message" : "You tied!", "color" : "yellow"};
    } else {
        return {"message" : "You won!", "color" : "green"};
    }
}

//Update the front end by removing and creating the divs with the images and messages.
function rpsFrondEnd(humanImageChoice, botImageChoice, finalMessage) {
    //Create a dictionary with the image.src assigned to its corresponding value
    var imagesDatabase = {
        "rock" : document.getElementById("rock").src,
        "paper" : document.getElementById("paper").src,
        "scissors" : document.getElementById("scissors").src,
    };

    //Clear the contents of the div.
    clearBox("flex-box-rps");

    //Create the elements that will be put on the html page and set them up with an id.
    var humanDiv = document.createElement("div");
    var botDiv = document.createElement("div");
    var messageDiv = document.createElement("div");

    //Change the inner HTML of the elements.
    humanDiv.innerHTML = "<img id='humanChoice' src='" + imagesDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>";
    messageDiv.innerHTML = "<h1 id='message' style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>";
    botDiv.innerHTML = "<img id='botChoice' src='" + imagesDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>";

    //Add the HTML elemts to the webpage.
    document.getElementById("flex-box-rps").appendChild(humanDiv);
    document.getElementById("flex-box-rps").appendChild(messageDiv);
    document.getElementById("flex-box-rps").appendChild(botDiv);

}

//Reset the game.
function resetGame() {

    //Clear the contents of the div.
    clearBox("flex-box-rps");

    //Create a rock div, add an image to it and append it to the html page
    var rockDiv = document.createElement("div");
    rockDiv.innerHTML = "<img id='rock' src='http://images.clipartpanda.com/rock-clipart-alpine-landscape-rock-rubble-01b-al1.png' height=150 width=150 alt='' onclick='rpsGame(this)'>";
    document.getElementById("flex-box-rps").appendChild(rockDiv);

    //Create a paper div, add an image to it and append it to the html page
    var paperDiv = document.createElement("div");
    paperDiv.innerHTML = "<img id='paper' src='http://images.clipartpanda.com/paper-clip-art-4i9kbAxiE.png' height=150 width=150 alt='' onclick='rpsGame(this)'>";
    document.getElementById("flex-box-rps").appendChild(paperDiv);

    //Create a scissors div, add an image to it and append it to the html page
    var scissorsDiv = document.createElement("div");
    scissorsDiv.innerHTML = "<img id='scissors' src='http://images.clipartpanda.com/scissors-clip-art-scissors.gif' height=150 width=150 alt='' onclick='rpsGame(this)'>";
    document.getElementById("flex-box-rps").appendChild(scissorsDiv);
}

//Removes all the content in the element put in as a parameter.
function clearBox(elementID) {
    var div = document.getElementById(elementID);
      
    while(div.firstChild) {
        div.removeChild(div.firstChild);
    }
}



//------------------------------------------------------
//----------------------CHALLENGE-4---------------------
//------------------------------------------------------



//Creates a list with all the button elements.
var allButtons = document.getElementsByTagName("button");

//Creates an empty array.
var originalButtons = [];

//Copies the original background color of the button elements
//to an empty array as Strings.
for (let i = 0; i < allButtons.length; i++) {
    originalButtons.push(allButtons[i].style.background);
}

//Runs the color changing function depending on the value of the parameter.
function buttonColorChange(buttonChoice) {
    if (buttonChoice.value == "red") {
        buttonRed();
    } else if (buttonChoice.value == "green") {
        buttonGreen();
    } else if (buttonChoice.value == "reset") {
        buttonReset();
    } else if (buttonChoice.value == "random") {
        buttonRandom();
    }
}

//Sets the background rgb of the buttons to a red color.
function buttonRed() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].style.background = "rgb(" + 255 + "," + 0 + "," + 0 + ")";
    }
}

//Sets the background rgb of the buttons to a green color.
function buttonGreen() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].style.background = "rgb(" + 0 + "," + 255 + "," + 0 + ")";
    }
}

//Sets the background colors of the buttons to their original color.
function buttonReset() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].style.background = originalButtons[i];
    }
}

//Sets the background rgb of the buttons to a random color.
function buttonRandom() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].style.background = randomColors();
    }
}

//Returns a String of type "rgb(x, y, z)" with random values that can
//be used to assign random colors.
function randomColors() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    return bgColor;
}





//------------------------------------------------------
//----------------------CHALLENGE-5---------------------
//------------------------------------------------------



let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1, 11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

//Audio sounds for the game
const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');

//Set up the buttons to do what they are supposed to
document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

//Hit button
function blackjackHit() {
    if (blackjackGame['isStand'] === false) {
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}

//Return a random card
function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

//Create a card and put it on the screen
function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

//Deal button
function blackjackDeal() {
    if (blackjackGame['turnsOver'] === true) {

        blackjackGame['isStand'] = false;

        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

        for (let i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }

        for (let i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;

        document.querySelector('#your-blackjack-result').style.color = '#ffffff';
        document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';

        document.querySelector('#blackjack-result').textContent = "Let's play";
        document.querySelector('#blackjack-result').style.color = "black";
    
        blackjackGame['turnsOver'] = true;
    }
}

//Update the score of the players after a card is used
function updateScore(card, activePlayer) {
    if (card === 'A') {
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

//Show the score of the players on the page
function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

//Sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Deal button
async function dealerLogic() {
    blackjackGame['isStand'] = true;

    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(700);
    }
    
    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);
}

//Compute the winner of the game once the dealer is finished getting cards and compute the total wins, losses and draws of the player
function computeWinner() {
    let winner;

    if (YOU['score'] <= 21) {

        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
            blackjackGame['wins']++;
            winner = YOU;

        } else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++;
            winner = DEALER;

        } else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++;
        }

    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackjackGame['losses']++;
        winner = DEALER;

    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;
    }

    return winner;
}

//Show the result of the game on the page
function showResult(winner) {
    let message, messageColor;

    if (blackjackGame['turnsOver'] === true) {
        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You won!';
            messageColor = 'green';
            winSound.play();

        } else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You lost!';
            messageColor = 'red';
            lossSound.play();

        } else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You drew!';
            messageColor = 'black';
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}