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

function mixCards() {
    $('.card .fa').each(function() {
        oldCards[i++] = $(this).attr('class');
    });

    let newCards = shuffle(oldCards);

    i = 0;

    $('.card .fa').each(function() {
        $(this).removeClass();
        $(this).addClass(newCards[i++]);
    });
}

$(document).ready(function() {
    mixCards();
});

/* End Shuffle Cards */

/* Matching Cards */

let c = 0;
let openCard;

$('.card').click(function() {
    if ((c < 2) && ($(this).hasClass('match') === false) && ($(this).hasClass('open') === false)) {
        if (c === 0) {
            $(this).toggleClass('open').toggleClass('show').toggleClass('bounce');
            openCard = $(this).find('i').attr('class');
            c = 1;
            moves++;
        } else {
            if ($(this).find('i').attr('class') === openCard) {
                $(this).toggleClass('open').toggleClass('show').toggleClass('bounce');
                $('.open').toggleClass('rubber').toggleClass('bounce').toggleClass('show').toggleClass('open').toggleClass('match');
                win++;
                c = 0;
            } else {
                if(c === 1) {
                    c = 2;
                    $(this).toggleClass('open').toggleClass('show').toggleClass('bounce');
                    $('.open').toggleClass('bounce').toggleClass('wobble');
                    setTimeout(function() {$('.open').removeClass('open').removeClass('show').toggleClass('wobble'); c = 0;}, 400);
                }
            }
        moves++;
        }
    }
});

/* End Matching Cards */

/* Star Count */

let stars = 3;
let moves = 0;

$('.card').click(function() {
    if (moves % 25 === 0 && moves < 75) {
        $('.stars').find('.fa:first').removeClass();
        stars--;
    }
    $('.moves').text(moves);
});

/* End Star Count */

/* Timer */

let min = 0;
let sec = 0;
let time;
let t = 0;

$('.card').click(function() {
    if (t === 0) {
        time = setInterval(function(){
            if(sec > 59) {
                sec = 0;
                min += 1;
                $('.minutes').text(min);
            }
            $('.seconds').text(sec++);
        }, 1000);
        t = 1;
    }
});

/* End Timer */

/* Restart Puzzle */

function restart() {
    $('.card').each(function() {
        $(this).removeClass('match').removeClass('open').removeClass('show').removeClass('rubber').removeClass('wobble');
    });
    $('.stars i').each(function() {
        $(this).removeClass();
        $(this).addClass('fa').addClass('fa-star');
    });
    $('.moves').text(0);
    moves = 0;
    stars = 3;
    $('.seconds').text('0');
    $('.minutes').text('0');
    clearInterval(time);
    sec = 0;
    min = 0;
    t = 0;
    win = 0;
    i = 0;
    oldCards = [];
    mixCards();
}

$('.restart').click(function() {
    restart();
});

/* End Restart Puzzle */

/* Game Win Message */

let win = 0;

function success() {
    swal({
        title: 'Congratulations! You Won!',
        text: 'Achievements',
        html: `Moves: ${moves}<br>Stars: ${stars}<br>Time: ${min} minutes ${sec} seconds`,
        type: 'success',
        confirmButtonText: 'Play again!',
        allowOutsideClick: false,
        allowEscapeKey: false,
        onClose: restart(),
    });
}

$('.card').click(function() {
    if (win === 8) {
        setTimeout(function() {success();}, 500)
    }
});

/* End Game Win Message */