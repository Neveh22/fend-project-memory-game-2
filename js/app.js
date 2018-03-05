// Shuffle function from http://stackoverflow.com/a/2450976
let shuffle = function(array) {
  let currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const deck = document.querySelector('.deck');
const cards = deck.querySelectorAll('.card');
const moves = document.querySelector('.moves');
const modal = document.querySelector('#myModal');
const span = document.querySelector(".close");
const scorePanel = document.querySelector(".score-panel");
const winner = document.querySelector(".winner");
let arr = []; // Create a list that holds all of your cards
let openCards = [];
let bingo = deck.querySelectorAll('.match');
let once = 1; //TODO reset to zero when shuffle is called
let startTime, running, time;

// Set event listeners for "cards"
for (let i = 0; i < cards.length; i++) {
  arr.push(cards[i]); // Create a list that holds all of your cards
  cards[i].addEventListener("click", function(event) { //"onclick" functions
    if (openCards.length !== 2 && bingo.length !== 16) { //prevent default on-click function after two cards have flipped
      cards[i].classList.toggle("open");
      cards[i].classList.toggle("show");
      cards[i].classList.remove("rubberBand", "animated");
      mvCounter(); //increment the move counter and display it on the page
      symbolChecker(cards[i]); //pull the card's symbol
      openCardChecker();
      if (once == 1) {
        startStop(); // Starts timmer
        once--;
      }
    }
    bingo = deck.querySelectorAll('.match');
    if (bingo.length == 16) {
      modal.style.display = "block"; // Displays Modal
      if (once == 0) {
        startStop(); // Stops timmer
        addHtml2();
        once++;
      }
    }
  });
}

function addHtml2() {
  let tempP = document.createElement("p");
  let pContent = document.createTextNode(time);
  tempP.appendChild(pContent);
  winner.insertAdjacentElement("afterend", tempP);
  let clone = scorePanel.cloneNode(true);
  span.insertAdjacentElement("afterend", clone);
}

function startStop() {
  if (running) {
    let timeTaken = Date.now() - startTime;
    running = false;
    time = "Time: " + Math.round(timeTaken / 100) / 10 + " Seconds!!";
  } else {
    running = true;
    startTime = Date.now();
  }
}

span.addEventListener("click", function() { // When the user clicks on <span> (x), close the modal
  modal.style.display = "none";
});

window.addEventListener("click", function(event) { // When the user clicks anywhere outside of the modal, close it
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

function mvCounter() { //increment the move counter and display it on the page
  moves.innerText++;
}

function symbolChecker(elm) {
  let symbols = ["diamond", "paper", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"];
  for (j = 0; j < symbols.length; j++) {
    if (elm.children[0].className.includes(symbols[j])) {
      openCards.push(symbols[j]); //add the card to a *list* of "open" cards
    }
  }
}

function openCardChecker() { //check to see if the two cards match
  if (openCards.length == 2 && openCards[0] === openCards[1]) {
    matched();
  } else if (openCards.length == 2 && openCards[0] !== openCards[1]) {
    setTimeout(function() {
      noMatch();
    }, 2000);
  }
}

function matched() { //lock matched cards in the open position
  let shown = document.querySelectorAll('.open');
  for (var i = 0; i < shown.length; i++) {
    shown[i].className = "card animated tada match";
  }
  openCards = [];
  openCardSelectors = [];
}

function noMatch() {
  let shown = document.querySelectorAll('.open');
  for (var i = 0; i < shown.length; i++) {
    shown[i].className = "card animated rubberBand";
    setTimeout(function() {
      clearToCard();
    }, 1000);
  }
  openCards = [];
  openCardSelectors = [];
}

function clearToCard() {
  let shown = document.querySelectorAll('.rubberBand');
  for (var i = 0; i < shown.length; i++) {
    shown[i].className = "card";
  }
}

function shuff() { //shuffle the list of cards using the "shuffle" method
  shuffle(arr);
  arr = shuffle(arr);
  removeHtml();
  addHtml();
}

function removeHtml() { //loop through each card and REMOVE each card's HTML to the page
  for (j = 0; j < 16; j++) {
    deck.removeChild(arr[j]);
  }
}

function addHtml() { //loop through each card and ADD each card's HTML to the page
  for (j = 0; j < 16; j++) {
    deck.appendChild(arr[j]);
  }
}