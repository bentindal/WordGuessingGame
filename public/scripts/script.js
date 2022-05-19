function createBoard(wordLength, guessesAllowed){
  var array = [];
  start = document.getElementById("wordCanvas")
  for(var y=0; y<guessesAllowed; y++){
    // Add divider class=word_game
    start.appendChild(document.createElement("div"));
    var rowArray = [];
    for(var x=0; x<wordLength; x++){
      // Add 5 canvas elements
      rowArray.push(document.createElement("CANVAS"));
      start.appendChild(rowArray[x]);
      rowArray[x].setAttribute("id","canv-"+y+x)
      rowArray[x].setAttribute("width","400px")
      rowArray[x].setAttribute("height","400px")
    }
    array.push(rowArray);
  }
  return array
}

function drawWord(canvas, letter) {
  canvas.font = "bold 400px Arial";
  canvas.fillStyle = "rgb(34, 85, 112)";
  if(letter == "W"){
    canvas.fillText(letter, 12, 350);
  }
  else{canvas.fillText(letter, 60, 350);}
}

function drawGuess(theGuess){
  var array = wordToArray(theGuess)
  for(var i=0; i<word.length; i++){
    var canv = document.getElementById("canv-"+rowPointer+i)
    canv.getContext("2d").clearRect(0, 0, canv.width, canv.height);
    drawWord(document.getElementById("canv-"+rowPointer+i).getContext("2d"), array[i])
  }
}

function wordToArray(word){
  var array = [];
  array.push(word.substring(0,1))
  array.push(word.substring(1,2))
  array.push(word.substring(2,3))
  array.push(word.substring(3,4))
  array.push(word.substring(4,5))
  return array
}

function clearBoard(){
  for(rowPointer=0;rowPointer<=5; rowPointer++){
    drawGuess("     ")
    var canvPointer;
    for(var letterPointer=0;letterPointer<=4; letterPointer++){
      canvPointer = document.getElementById("canv-"+rowPointer+letterPointer)
      if (canvPointer.classList.contains("orange")){
        canvPointer.classList.remove("orange")
      }
      if (canvPointer.classList.contains("green")){
        canvPointer.classList.remove("green")
      }
      if (canvPointer.classList.contains("grey")){
        canvPointer.classList.remove("grey")
      }
    }
  }
}

function validateGuess(guess){
  // Guess must be 5 letters long
  if (guess.length != 5){
    updateHeader("Must be 5 Letters")
    return false;
  }
  // Guess must be a valid word
  if(isValidWord(guess)){
    updateHeader("")
    return true;
  }
  updateHeader("Not a Word")
  return false;
}

function updateHeader(text){
  const header = document.getElementById("header")
  if(text == ""){
    if(header.classList.contains("red")){
      header.classList.remove("red")
    }
    updateScore(0)
  }
  else{
    const sHeader = document.getElementById("header2")
    sHeader.innerHTML = "&nbsp"
    header.innerText = text;
    header.classList.add("red")
  }
}
function makeGuess(){
  var guess = letterGuess
  guess = guess.toUpperCase()
  if (validateGuess(guess)){
    letterGuess = ""
    drawGuess(guess);
    checkIfCorrect(wordToArray(guess), correctArray);
  }
}

function checkIfCorrect(guessArray, wordArray){
  updateScore(0)
  var x = 0;
  for(var y=0; y<wordArray.length; y++){
    for(x=0; x<wordArray.length; x++){
      if (guessArray[y] != wordArray[x]){
        document.getElementById("canv-"+rowPointer+y).classList.add("grey");
        colourLetter(guessArray[y], "grey")
      }
      else{
        document.getElementById("canv-"+rowPointer+y).classList.add("orange");
        colourLetter(guessArray[y], "orange")
      }
    }
  }
  var greensFound = 0
  for(x=0; x<wordArray.length; x++){
    if (guessArray[x] == wordArray[x]){
      document.getElementById("canv-"+rowPointer+x).classList.add("green");
      colourLetter(guessArray[x], "green")
      greensFound += 1
    }
  }

  rowPointer += 1
  if(greensFound == 5){
    endGame(1) // Win
  }
  else if(rowPointer >= 6){
    endGame(0) // Loss
  }
}

function endGame(state){
  document.getElementById("hintDiv").removeAttribute("hidden")
  const message = document.getElementById("guessHint")
  if(state == 0){ // Loss
    message.innerHTML = "Unlucky! The word was <b>"+word+"</b>\nYou scored: " + score
    message.classList.add("red")
    if (score != null) {
    document.getElementById("customDiv").removeAttribute("hidden")
    }
    score = 0
  }
  else{ // Win
    message.innerHTML = "Congratulations!";
    message.classList.add("green")
    updateScore((7-rowPointer)*10)
  }
  document.getElementById("guessDiv").remove()
  var definitionText = document.getElementById("definitionText")
  definitionText.innerHTML = "<i>"+definition+"</i>"
  var tryAgainButton = document.getElementById("tryAgain")
  tryAgainButton.innerHTML = "<b>Next Word </b>"
  tryAgainButton.setAttribute("value", score)
  if (score == null){
    tryAgainButton.remove()
  }
}

function updateScore(amount){
  if(score != null){
    console.log("Score = " + score + " + " + amount)
    score += amount
    console.log("= " + score)
    document.getElementById('header').innerText = score
    if (score > 1) {
      document.getElementById("scoreBox").setAttribute("value", score)
    }
  }
}

function isValidWord(guess){
  guess = guess.toUpperCase();
  for(let x=0; x<wordList.length; x++){
    if(wordList[x].toString() == guess){return true}
  }
}

// Main ------------------------->
var canvasArray = createBoard(5, 6);
var rowPointer = 0;
const correctArray = wordToArray(word); // Array of the word to guess