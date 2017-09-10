/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
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

/* Shuffle Cards */

let oldCards = [];
let i = 0

$('.card .fa').each(function() {
    oldCards[i++] = $(this).attr('class');
});

let newCards = shuffle(oldCards);

i = 0;

$('.card .fa').each(function() {
    $(this).removeClass();
    $(this).addClass(newCards[i++]);
});

/* End Shuffle Cards */

/* Matching Cards */

let c = 0;
let openCard;

$('.card').click(function() {
    if ((c < 2) && ($(this).hasClass('match') === false) && ($(this).hasClass('open') === false)) {
        if (c === 0) {
            $(this).toggleClass('open').toggleClass('show');
            c = 1;
            openCard = $(this).find('i').attr('class');
            console.log('first');
            stars++;
        } else {
            if ($(this).find('i').attr('class') == openCard) {
                $(this).toggleClass('open').toggleClass('show');
                $('.open').toggleClass('open').toggleClass('show').toggleClass('match');
                console.log('second');
            } else {
                $(this).toggleClass('open').toggleClass('show');
                setTimeout(function() {$('.card').removeClass('open').removeClass('show');}, 400);
            }
        c = 0;
        stars++;
        }
    }
});

/* End Matching Cards */

/* Star Count */

let stars = 0;

$('.card').click(function() {
    if (stars % 15 === 0 && stars < 45) {
        $('.stars').find('.fa:first').removeClass();
    }
    $('.moves').text(stars);
});

/* End Star Count */