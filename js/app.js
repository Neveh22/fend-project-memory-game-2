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

const moveCount = 0;
const deck = document.querySelector('.deck');
const cards = deck.querySelectorAll('.card');
let arr = []; // Create a list that holds all of your cards
let oldNode = [];

// Set event listeners for "cards"
for (let i = 0; i < cards.length; i++) {
  oldNode.push(cards[i]);
  arr.push(cards[i]); // Create a list that holds all of your cards
  cards[i].addEventListener("click", function(event) { //"onclick" functions
    cards[i].classList.toggle("open");
    cards[i].classList.toggle("show");
  });
}

function shuff() { //shuffle the list of cards using the "shuffle" method
  shuffle(arr);
  arr = shuffle(arr);
  removeHtml();
  addHtml();
}

function removeHtml() { //loop through each card and REMOVE each card's HTML to the page
  for (j = 0; j < 16; j++) {
    deck.removeChild(oldNode[j]);
  }
}

function addHtml() { //loop through each card and ADD each card's HTML to the page
  for (j = 0; j < 16; j++) {
    deck.appendChild(arr[j]);
  }
}




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */