const STORAGE_KEY = 'questsDB';
var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

function createQuestsTree() {
    var quests = loadFromStorage(STORAGE_KEY);

    if (!quests) {
        quests = createQuest('Male?');
        quests.yes = createQuest('Picasso');
        quests.no = createQuest('Rita');
    }
    gQuestsTree = quests;
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;

    _saveQuestsToStorage();

}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    // update the gPrevQuest, gCurrQuest global vars:
    gPrevQuest = gCurrQuest;
    gCurrQuest = gCurrQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    // TODO: Create and Connect the 2 Quests to the quetsions tree
 
    gPrevQuest[lastRes] = createQuest(newQuestTxt);
    gPrevQuest[lastRes].no = gCurrQuest;
    gPrevQuest[lastRes].yes = createQuest(newGuessTxt);
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
    
    _saveQuestsToStorage();
}

function getCurrQuest() {
    return gCurrQuest;
}

function _saveQuestsToStorage() {
    saveToStorage(STORAGE_KEY, gQuestsTree);
}

