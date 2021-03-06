function generateKeyboard(rowOne, rowTwo, rowThree){
  start = document.getElementById("guessDiv")
  var button = null;

  for(var x=0; x<rowOne.length; x++){
    button = document.createElement("button")
    button.setAttribute("onClick", "addToGuess('"+ rowOne[x] + "')")
    button.setAttribute("id", "letter-"+rowOne[x])
    button.innerText = rowOne[x]
    start.appendChild(button);
  }

  start.appendChild(document.createElement("div"));
  for(var y=0; y<rowTwo.length; y++){
    button = document.createElement("button")
    button.setAttribute("onClick", "addToGuess('"+ rowTwo[y] + "')")
    button.setAttribute("id", "letter-"+rowTwo[y])
    button.innerText = rowTwo[y]
    start.appendChild(button);
  }

  start.appendChild(document.createElement("div"));
  button = document.createElement("button")
  button.setAttribute("onClick", "removeLetterFromGuess()")
  button.setAttribute("id", "backButton")
  button.innerHTML = "<strong>Back</strong>"
  start.appendChild(button);

  for(var z=0; z<rowThree.length; z++){
    button = document.createElement("button")
    button.setAttribute("onClick", "addToGuess('"+ rowThree[z] + "')")
    button.setAttribute("id", "letter-"+rowThree[z])
    button.innerText = rowThree[z]
    start.appendChild(button);
  }

  button = document.createElement("button")
  button.setAttribute("onClick", "makeGuess()")
  button.setAttribute("id", "submitButton")
  button.innerHTML = "<strong>Enter</strong>"
  start.appendChild(button);
}

function addToGuess(letter){
  if (letterGuess.length < 5){
    letterGuess += letter
    drawGuess(letterGuess)
    console.log(letterGuess)
  }
}

function removeLetterFromGuess(){
  letterGuess = letterGuess.substring(0,letterGuess.length - 1)
  drawGuess(letterGuess)
}

function colourLetter(letter, colour){
  const keyboard = document.getElementById("letter-"+letter)
  if (colour == "green"){
    if (keyboard.classList.contains("orange")){
      keyboard.classList.remove("orange")
    }
    if (keyboard.classList.contains("grey")){
      keyboard.classList.remove("grey")
    }
    keyboard.classList.add("green");
  }
  if (colour == "orange"){
    if (keyboard.classList.contains("grey")){
      keyboard.classList.remove("grey")
    }
    keyboard.classList.add("orange");
  }
  if (colour == "grey"){
    if (keyboard.classList.contains("orange")){
      return
    }
    else if (keyboard.classList.contains("green")){
      return
    }
    else{keyboard.classList.add("grey");}
  }
}

function setMyKeyDownListener() {
  window.addEventListener(
    "keydown",
    function(event) {OnPress(event.key)}
  )
}

function OnPress (key) {
  key = key.toUpperCase()
  //alert("Is " + key + " a letter: " + isALetter(key));
  if (key == "BACKSPACE"){removeLetterFromGuess()}
  else if (key == "ENTER"){makeGuess()}
  else if (isALetter(key)){
    addToGuess(key)
  }
  else{return false}
}

function isALetter(letter){
  var letters = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"]
  for(var i = 0; i<letters.length; i++){
    if (letters[i] == letter){
      return true
    }
  }
  return false
}

// Main ------------------------->
const ROW1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
const ROW2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
const ROW3 = ["Z", "X", "C", "V", "B", "N", "M"]
generateKeyboard(ROW1, ROW2, ROW3)
setMyKeyDownListener()
var letterGuess = ""