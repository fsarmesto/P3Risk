import {cGame,sGames} from './lobby.js'

import riskLogo from './../assets/imgs/Riskgame_logo.png';  //relative path
import swordImage from './../assets/imgs/sword_selectorNBG.png';
        

let currentFocusIndex = 0;

document.addEventListener("DOMContentLoaded", f_prepare);

function f_prepare() {
  
  let hideMsgBtn = document.getElementById("close-msg");

  hideMsgBtn.addEventListener("click", f_hide);

  addListenersToButtons();
  checkMenu();
}

function addListenersToButtons(){
  let gbuttons = document.querySelectorAll('.gbutton');
  
  gbuttons.forEach(button => {
    button.addEventListener('focus',(e) => addIndicator(e));
    button.addEventListener('blur',(e) => removeIndicator(e));
  });

  gbuttons[0].addEventListener('click',startNewGame);
  gbuttons[1].addEventListener('click',checkCurrentGames);
  gbuttons[1].addEventListener('click',sGames);
  gbuttons[3].addEventListener('click',logout);
}

function addIndicator(ev){
  let element = ev.target;

  let selector = document.createElement('img');

  selector.id = "selector_menu";
  selector.src = swordImage;

  element.before(selector);
}

function removeIndicator(e){
  let selector = document.getElementById('selector_menu');

  selector.remove();

  // Blur = current indicator
}

function logout(){
  localStorage.setItem('token','');
  window.location.href = "/login";
  
}

function checkMenu() {
  const menu = document.getElementById('menu');
  const buttons = menu.querySelectorAll('.gbutton'); 

  function focusButton(index) {
    if (index >= 0 && index < buttons.length) {
      currentFocusIndex = index;
      buttons[currentFocusIndex].focus();
    }
  }

  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowUp':
        focusButton(currentFocusIndex - 1); // Cambiar a no usar funcion y hacerlo directamente
        console.log(currentFocusIndex);
        break;
      case 'ArrowDown':
        focusButton(currentFocusIndex + 1);
        console.log(currentFocusIndex);
      break;
    }
  });

  if (buttons.length > 0) {
    buttons[currentFocusIndex].focus();
  }
}



function checkCurrentGames(ev) {
  const menu = document.getElementById('menu');
  const storedMenu = menu.cloneNode(true); // Store for later use

  menu.innerHTML = ''; // Clear the current menu buttons

  // Create the game list container
  const gameListContainer = document.createElement('div');
  gameListContainer.id = 'game-list-container';
  gameListContainer.innerHTML = `
    <h2>Ongoing Games</h2>
    <div id="game-list">
      </div>
    <button id="back-to-menu">Go Back</button>
  `;

  menu.appendChild(gameListContainer); // Append the game list to the menu div

  // Simulate receiving game data from the server (replace with actual fetch)
  const gameData = [
    { id: 123, name: "Game 1", creator: "PlayerA", password: "pass1" },
    { id: 456, name: "Game 2", creator: "PlayerB", password: null },
    { id: 789, name: "Game 3", creator: "PlayerC", password: "secret" },
    { id: 101, name: "Game 4", creator: "PlayerD", password: null },
  ];

  // Get the game list div
  const gameList = document.getElementById('game-list');

  // Iterate through the game data and create elements
  gameData.forEach(game => {
    let gameElement = document.createElement('div');
    gameElement.classList.add('game-item');
    gameElement.setAttribute('role', 'listitem'); // Add role for accessibility

    // Create spans for each piece of information
    let gameIdSpan = document.createElement('span');
    gameIdSpan.classList.add('game-id', 'gameEl');
    gameIdSpan.textContent = `ID: ${game.id}, `;

    let gameNameSpan = document.createElement('span');
    gameNameSpan.classList.add('game-name', 'gameEl');
    gameNameSpan.textContent = `Name: ${game.name}, `;

    let gameCreatorSpan = document.createElement('span');
    gameCreatorSpan.classList.add('game-creator', 'gameEl');
    gameCreatorSpan.textContent = `Creator: ${game.creator}`;

    gameElement.appendChild(gameIdSpan);
    gameElement.appendChild(gameNameSpan);
    gameElement.appendChild(gameCreatorSpan);
    gameElement.setAttribute('tabindex', '0');

    if (game.password) {
      gameElement.setAttribute('data-password', game.password);

      gameElement.addEventListener('click', () => {
        const password = prompt(`Enter password for Game ${game.id}:`);
        if (password === game.password) {
          console.log(`Joining game ${game.id} with password: ${password}`);
        } else {
          alert("Incorrect password!");
        }
        });

    } else {
        gameElement.addEventListener('click', () => {
        console.log(`Joining game ${game.id} (no password)`);
      });
    }

    gameList.appendChild(gameElement);
  });

  // Add event listener to the back button
  const backButton = document.getElementById('back-to-menu');
  backButton.addEventListener('click', (event) => goBack(event, menu, storedMenu));
}



function startNewGame() {
  let menu = document.getElementById('menu');
  let storedMenu = menu.cloneNode(true);

  menu.innerHTML = '';

  let newGameForm = document.createElement('form');
  newGameForm.id = 'new-game-form';
  newGameForm.innerHTML = `
    <h2>Start a New Game</h2>
    <div class="form-group">
      <label for="gameName">Game Name:</label>
      <input type="text" id="gameName" name="gameName" required>
    </div>
    <div class="form-group">
      <label for="maxPlayers">Max Number of Players:</label>
      <input type="number" id="maxPlayers" name="maxPlayers" min="2" max="8" required>
    </div>
    <div class="form-group">
      <label for="token">Game Password (Optional):</label>
      <input type="password" id="token" name="token">
    </div>
    <div class="form-buttons">
    <button id="go_back">↩Go back</button>
    <button id="mGame" type="submit">Create Game</button>
    </div>
  `;

  const mGame = newGameForm.querySelector('#mGame');
  mGame.addEventListener('click',(ev) => cGame(ev, newGameForm));
  const goBackButtonElement = newGameForm.querySelector('#go_back');

  goBackButtonElement.addEventListener('click', (event) => goBack(event, menu, storedMenu));

  menu.appendChild(newGameForm);

  newGameForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("Form submitted");
    console.log("Game Name: ", document.getElementById('gameName').value);
    console.log("Max Players: ", document.getElementById('maxPlayers').value);
    console.log("Token: ", document.getElementById('token').value);
    newGameForm.remove();
  });
}

function goBack(e, menu, storedMenu) {
  e.preventDefault();
  menu.innerHTML = '';
  menu.appendChild(storedMenu);
  currentFocusIndex = 0;
  storedMenu.querySelectorAll('.gbutton')[0].focus();
  checkMenu();
  addListenersToButtons();
}

function f_hide(e) {
  let container = e.target.parentElement;

  for (let child of container.children) {
    if (child.id !== 'close-msg') {
      child.style.height = "0.1px";
      child.style.visibility = "hidden";
    }
  }

  e.target.textContent = "⬇";

  e.target.addEventListener('click', f_show);

  e.target.removeEventListener('click', f_hide);
}

function f_show(e) {
  let container = e.target.parentElement;

  for (let child of container.children) {
    if (child.id !== 'close-msg') {
       child.style.height = "";
       child.style.visibility = "";
    }
  }

  e.target.textContent = "⬆";

  e.target.addEventListener('click', f_hide);
  e.target.removeEventListener('click', f_show);
}
