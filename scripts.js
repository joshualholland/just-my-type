let upperCase = $('#keyboard-upper-container');
let lowerCase = $('#keyboard-lower-container');
let sentences = [
    'ten ate neite ate nee enet ite ate inet ent eate',
    'Too ato too nOt enot one totA not anot tOO aNot',
    'oat itain oat tain nate eate tea anne inant nean',
    'itant eate anot eat nato inate eat anot tain eat',
    'nee ene ate ite tent tiet ent ine ene ete ene ate',
    ];
let array = 0;
let typing = sentences[array];
let letterLocation = 0;
let letter = typing.substring(letterLocation, letterLocation + 1);
let numberOfMistakes = 0;
let timer = false
let startDate;
let startTime;

// hide uppercase keyboard when page loads
$('#keyboard-upper-container').hide();
// show uppercase keyboard when shift is held down
$(document).keydown(function (e) {
    if (e.which === 16) {
        $(upperCase).show();
        $(lowerCase).hide();
    }
});
// hide uppercase keyboard when shift is released
$(document).keyup(function (e) {
    if (e.which === 16) {
        $(upperCase).hide();
        $(lowerCase).show();
    }
});
// highlight selected keys
$(document).keypress(function (e) {
    let key = $('#' + e.which)
    $(key).css('background-color', 'yellow');
    // unhighlight keys
    $(document).keyup(function (e) {
        $(key).css('background-color', '')
    });
});
// display sentences and letters one at a time
$('#sentence').text(typing);
$('#target-letter').text(letter);
// move through sentence
$(document).keypress(function (e) {
    // start timer
    if (timer === false) {
        startDate = new Date();
        startTime = startDate.getTime();
        timer = true;
    }
    if (e.which === sentences[array].charCodeAt(letterLocation)) {
        let correct = $('<span class="glyphicon glyphicon-ok"></span>')
        $('#feedback').append(correct)
        $('#yellow-block').css('left', '+=17.5px')
        letterLocation++;
        letter = typing.substring(letterLocation, letterLocation + 1);
        $('#target-letter').text(letter);
        if (letterLocation === typing.length) {
            array++;
            // end timer and display wpm
            if (array === sentences.length) {
                let endDate = new Date();
                let endTime = endDate.getTime();
                let minutes = (endTime - startTime) / 60000
                wpm = Math.round(54 / minutes - 2 * numberOfMistakes);
                $('#feedback').append(`You got ${wpm}, Nice!`)
                if ($('#feedback').text() == (`You got ${wpm}, Nice!`)) {
                    setTimeout(playAgain, 5000)
                    // Ask if they want to play again
                    function playAgain() {
                        $('#feedback').text('Do you want to play again?')
                        $('#target-letter').append('<button class="btn btn-success" id="yes">Yes</button>')
                        $('#target-letter').append('<button class="btn btn-success" id="no">No</button>')
                        $('#yes').click(function () {
                            location.reload();
                        })
                        $('#no').click(function () {
                            $('#target-letter').text('Thanks for playing!')
                        })
                    }
                }
            }
            else {
                typing = sentences[array]
                $('#sentence').text(typing);
                letterLocation = 0;
                letter = typing.substring(letterLocation, letterLocation + 1);
                $('#target-letter').text(typing);
                $('#yellow-block').css('left', '15px');
                $('#feedback').text('');
            }
        }
    } else {
        let incorrect = $('<span class="glyphicon glyphicon-remove"></span>')
        $('#feedback').append(incorrect)
        numberOfMistakes++;
    }
});
