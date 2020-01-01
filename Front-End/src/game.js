function getGamesURL() {
  const GAMES_URL = 'http://localhost:3000/games'
  return GAMES_URL
}

function getUserGamesURL() {
  const USER_GAMES_URL = 'http://localhost:3000/user_games'
  return USER_GAMES_URL
}

function getSubmitNewGameButton() {
  return document.getElementById('submit-new-game')
}

function getGameLocationEl() {
  return document.querySelector('#game-location-field')
}
function getGameTimeEl() {
  return document.querySelector('#game-time-field')
}
function getGameSportEl() {
  return document.querySelector('#game-sport-field')
}
function getGameResultEl() {
  return document.querySelector('#game-result-field')
}
function getGameUserEl() {
  return document.querySelector('#game-user-field')
}

function getUserSelectEl() {
  return document.querySelector('#user-select')
}
function getSportSelectEl() {
  return document.querySelector('#sport-select')
}

function getGameFormDivEl() {
  return document.querySelector('#game-form-div')
}

function getColumn3Div() {
  return document.getElementById('column-3')
}

function getGameForm() {
  return document.getElementById('form-create-game')
}


function createGame() {
  let createGameDiv = document.createElement('div')
  createGameDiv.id = 'game-form-div'
  createGameDiv.innerHTML = `<h2>Schedule New Game!</h2>
  <form id='form-create-game' class='ui form' action='#' method='post'>
    <div class='field'>
      <label>Location</label>
      <input id="game-location-field" type='number' name='location' placeholder='Location' max='99999' min='09999' size="5"required>
    </div>
    <div class='field'>
      <label>Date</label>
      <input id="game-time-field" type='date' name='time' placeholder='Time' required>
    </div>
    <div class='field'>
      <label>Sport</label>
      <select class ='ui fluid dropdown' id='sport-select'>
      <option value =''>Sport</option>
      <option value ='Tennis'>Tennis</option>
      <option value ='Table Tennis'>Table Tennis</option>
      <option value ='Basketball'>Basketball</option>
      <option value ='Golf'>Golf</option>
      <option value ='Running'>Running</option>
      <input id="game-sport-field" type='hidden' name='sport' placeholder='Sport' required>
      </select>
    </div>
    <div class='field'>
      <label>Result</label>
      <input id="game-result-field" type='text' name='result' value='none' disabled required>
    </div>
    <!-- begin add dropdown with search for user -->
    <div class='field' id='user-dropdown'>
      <label>Users</label>
      <select class ='ui fluid dropdown' id='user-select'>
        <option value =''>Users</option>
        <input id="game-user-field" type='hidden' name='user' placeholder='User' required>
      </select>
    </div>

    <button id='submit-new-game' class='ui button' type='submit'>Submit</button>
  </form>`
  getUsers()
  getColumn3Div().append(createGameDiv)
  let formCreateGame = document.querySelector('#form-create-game')
  formCreateGame.addEventListener('submit', function(e) {
    e.preventDefault()
    alert("Game Scheduled!")
    submitGameInfo()
    getGameForm().reset()
  })
}

function getUserId() {
  let userSelecEl = getUserSelectEl()
  let userId = userSelecEl.options[userSelecEl.selectedIndex].value
  return userId
}

function getSportValue() {
  let sportSelecEl = getSportSelectEl()
  let sportValue = sportSelecEl.options[sportSelecEl.selectedIndex].value
  return sportValue
}

function getUsers() {
  fetch(getUserUrl())
  .then(res => res.json())
  .then(users => addUsersToDropdownInTheForm(users))
  .catch(err => console.log(err.message))
}

function excludeCurrentUser(user) {
  return user.username !== getCurrentUsername()
}
function addUsersToDropdownInTheForm(users) {
  const userSelectEl = getUserSelectEl()
  // begin filter user #####
  // words.filter(word => word.length > 6)
  // function isBigEnough(value) {
  // return value >= 10
  // }
  // let filtered = [12, 5, 8, 130, 44].filter(isBigEnough)
  // filtered is [12, 130, 44]
  // let testFilterUser = users.filter(excludeCurrentUser)
  // end filter user

  let usersFiltered = users.filter(user => user.username!== getCurrentUsername())
  usersFiltered.forEach(function(user) {
    let userOption = document.createElement('option')
    userOption.id = `${user.id}-${user.username}`
    userOption.value = `${user.id}`
    userOption.innerText = `${user.username}`
    // for testing purpose
    let userImgEl = document.createElement('img')
    userImgEl.classList.add('ui', 'mini', 'avatar', 'image')
    userImgEl.src = `${user.profile_photo}`
    userOption.prepend(userImgEl)
    // end for testing pursose
    userSelectEl.append(userOption)
  })
}

function submitGameInfo() {
  let ulGameListEl = document.querySelector('#gamelist-id')
  let gameInfo = {
    location: getGameLocationEl().value,
    time: getGameTimeEl().value,
    sport: getSportValue(),
    result: getGameResultEl().value,
    user_id: getUserId()
  }
  let configOptions = {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(gameInfo)
  }
  fetch(getGamesURL(), configOptions)
  .then(response => response.json())
  .then(newGame => {createUserGame(newGame, getUserId()); renderSingleGame(newGame, ulGameListEl)})
  .catch(err=>console.log(err.message))
}

function createUserGame(newGame, userId) {
  let newUserGame = {game_id: newGame.id, user_id: userId}
  let configOptions = {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(newUserGame)
  }
  fetch(getUserGamesURL(),configOptions)
    .then(res => res.json())
    .then(newUserGameRes => createSecondUserGame(newUserGameRes))
}

function createSecondUserGame(newUserGameRes) {
  let newUserGame = {game_id:newUserGameRes.game_id, user_id: getCurrentUserId()}
  let configOptions = {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(newUserGame)
  }
  fetch(getUserGamesURL(), configOptions)
  .then(res => res.json())
  .then(newUserGameRes => console.log(newUserGameRes))
}


function gameDoingStuffWhenThePageIsLoaded() {
  // add here functions you need when the page is loaded for the first time
  getScheduleNewGame().addEventListener('click', createGame)

}
