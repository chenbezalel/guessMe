'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);

function init() {
  createQuestsTree();
}

function onStartGuessing() {
  // hide the game-start section:
  $('.game-start').hide();
  // show the quest section:
  $('.quest').show('fast');
  renderQuest();
}

function renderQuest() {
  // select the <h2> inside quest and update
  // its text by the currQuest text:
 $('.quest h2').text(getCurrQuest().txt);
}

function onUserResponse(ev) {
  var res = ev.data.ans;
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    $('.quest').hide();
    if (res === 'yes') {
      $('.win').show('slow');
      // TODO: improve UX
    } else {
      // alert('I dont know...teach me!');
      // hide and show new-quest section 
      $('.new-quest').show();
    }
  } else {
    // update the lastRes global var
    gLastRes = res;
    moveToNextQuest(gLastRes);
    renderQuest();
  }
}

function onAddGuess(ev) {
  // Get the inputs' values:
  ev.preventDefault();
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();
  if (!newGuess || !newQuest) return;

  // Call the service addGuess:
  addGuess(newQuest, newGuess, gLastRes);
  onRestartGame();
  newGuess = '';
  newQuest = '';
  
}

function onRestartGame() {
  $('.new-quest').hide();
  $('.game-start').show();
  gLastRes = null;
}
