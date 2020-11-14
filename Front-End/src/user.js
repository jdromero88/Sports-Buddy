function getUserUrl() {
  return 'http://localhost:3000/users'
}

function getLoginUrl () {
  return 'http://localhost:3000/login'
}

function getLogoutUrl () {
  return 'http://localhost:3000/logout'
}

function getHeaders() {
  const HEADERS = {
    "Content-Type": 'application/json',
    "Accept": 'application/json'
  }
  return HEADERS
}

function getButtonContainerEl() {
  return document.getElementById('button-container')
}

function getMainContainerEl() {
  return document.querySelector('#main-container');
}

function getLoginButton() {
  return document.getElementById('login-button')
}

function getSignupButton() {
  return document.getElementById('signup-button')
}

function getLogoutBtn() {
  return document.querySelector('#logout')
}

function getDivForms() {
  return document.getElementById('forms-container')
}

function getLoginForm() {
  return document.getElementById('login-form')
}

function getLoginUsernameEl() {
  return document.getElementById('login-username')
}

function getLoginPasswordEl() {
  return document.getElementById('login-password')
}

function getNewLoginDiv() {
  return document.querySelector('#new-login');
}

// sign up form
function getSubmitForm() {
  return document.getElementById('sign-up')
}
function getFirstNameEl() {
  return document.getElementById('first-name-field')
}

function getLastNameEl() {
  return document.getElementById('last-name-field')
}

function getUsernameEl () {
  return document.getElementById('username-field')
}

function getPasswordEl () {
  return document.getElementById('password-field')
}
function getEmailEl () {
  return document.getElementById('email-field')
}
function getLocationEl () {
  return document.getElementById('location-field')
}
// sign up form end

// home div
function getHomeDiv() {
  return document.getElementById('home')
}

function getSportDiv() {
  return document.querySelector('#sports')
}
function getGamesDiv() {
  return document.querySelector('#games')
}

function getLoginSignUpForm() {
  return document.getElementById('new-login')
}

function getHomePage() {
  return document.getElementById('page')
}

function getScheduleNewGame() {
  return document.getElementById('new-game')
}

function getColumn2Div() {
  return document.querySelector('#column-2');
}

function getCurrentUserId() {
  return document.getElementById('user-card').dataset.id
}

function getCurrentUsername() {
  return document.querySelector('#p-tag-welcome-user').dataset.username
}

function getGameCountATagEl() {
  return document.querySelector('#games-on-schedule')
}

function getGamesContentDivEl() {
  return document.querySelector('#div-games-content')
}

// function login() {
//   // getDivForms().innerHTML = ''
//   // let loginDiv = document.createElement('div')
//   // loginDiv.innerHTML =
//   // `<form id='login-form' class='ui form' action='#' method='post'>
//   //   <div class='field'>
//   //       <label>Username</label>
//   //       <input id='login-username' type='text' name='username' placeholder='Username' required>
//   //     </div>
//   //     <div class='field'>
//   //       <label>Password</label>
//   //       <input id='login-password' type='password' name='password' placeholder='Password' required>
//   //     </div>
//   //     <button id='login-btn' class='ui button' type='submit'>Login</button>
//   // </form>`
//   // getDivForms().appendChild(loginDiv)
//   getLoginButton().addEventListener('click', function(e) {
//     e.preventDefault()
//     userLogin(getLoginUsernameEl().value, getLoginPasswordEl().value)
//   })
// }


function signUp () {
  getDivForms().innerHTML = ''
  getLoginSignUpForm().innerHTML = ''
  let signUpDiv = document.createElement('div')
  signUpDiv.innerHTML =
  `<form id='sign-up' class='ui form' action='#' method='post'>
    <div class='field'>
        <label>First Name</label>
        <input id="first-name-field" type='text' name='first_name' placeholder='First Name' required>
      </div>
      <div class='field'>
        <label>Last Name</label>
        <input id="last-name-field" type='text' name='last_name' placeholder='Last Name' required>
      </div>
      <div class='field'>
        <label>Username</label>
        <input id="username-field" type='text' name='username' placeholder='Username'minlength="5" maxlength="10" required>
      </div>
      <div class='field'>
        <label>Password</label>
        <input id="password-field" type='password' name="password_digest" placeholder='Password' required>
      </div>
      <div class='field'>
        <label>Email</label>
        <input id="email-field" type='email' name='email' placeholder='Email' size="30" required>
      </div>
      <div class='field'>
        <label>Zip Code</label>
        <input id="location-field" type='number' name='location' placeholder='Zip Code' max='99999' size="5" required>
      </div>
      <div class='field'>
        <div class='ui checkbox'>
          <input type='checkbox' tabindex='0' class=''>
          <label>I agree to the Terms and Conditions</label>
        </div>
      </div>
      <button id='submit' class='ui button' type='submit'>Submit</button>
  </form>`
  getDivForms().appendChild(signUpDiv)
  getSubmitForm().addEventListener('submit', function(e) {
    e.preventDefault()
    submitUserInfo()
  })
}

function submitUserInfo() {
    let userInfo = {
      first_name: getFirstNameEl().value,
      last_name: getLastNameEl().value,
      username: getUsernameEl().value,
      password_digest: getPasswordEl().value,
      email: getEmailEl().value,
      location: getLocationEl().value,
      profile_photo: 'https://kooledge.com/assets/default_medium_avatar-57d58da4fc778fbd688dcbc4cbc47e14ac79839a9801187e42a796cbd6569847.png'
    }
    let configOptions = {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(userInfo)
    }
    fetch(getUserUrl(), configOptions)
    .then(response => {
      if (response.ok) {
        alert("Profile created!")
        window.location.reload(true)
      } else {
        alert("Sign up failed. Please try again")
      }
    })
    .catch(error => console.log(error.message))
}

function userLogin(username, password_digest) {
  let configOptions = {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({username: username, password_digest: password_digest})
  }
  fetch(getLoginUrl(), configOptions)
  .then(response => response.json())
  .then(currentUser => showMainContainerDiv(currentUser))
  .catch(error => console.log(error.message))
}


function userLogout() {
  // if user is login, clear all the data from the current user
  //  and show the home page.
  hideScheduleNewGame()
  getHomeDiv().style.display = ''
  getButtonContainerEl().style.display = ''
  getMainContainerEl().innerHTML = ''
  // $('#leftmenu').is(':empty')
  if (getGameFormDivEl() !== null) {
    getGameFormDivEl().innerHTML = ''
    getLogoutBtn().style.display = 'none'
  }
  window.location.reload(true)
  // Do I need a fetch to do a fake logout ?
  // const configOptions = {
  //   headers: getHeaders()
  // }
  // fetch(getLogoutUrl())
}

function showMainContainerDiv(currentUser) {
  if (currentUser.message === "User doesn't exist. Create and account") {
    alert("User doesn't exist. Create and account")
    signUp()
  } else if (currentUser.message === 'Invalid username or password. Please check.') {
    alert('Invalid username or password. Please check.')
    getLoginUsernameEl().focus()
  } else {
    getNewLoginDiv().style.display = 'none'
    getLogoutBtn().style.display = 'flex'
    getLogoutBtn().addEventListener('click', function(e) {
      userLogout()
    })
    getButtonContainerEl().style.display = 'none'
    getDivForms().innerHTML = ''
    getHomeDiv().style.display = 'none'
    getScheduleNewGame().style.display = ''


    const pTagTest = document.createElement('p')
    pTagTest.id = 'p-tag-welcome-user'
    pTagTest.dataset.username = `${currentUser.username}`
    pTagTest.innerText = `Welcome to Bromble, ${currentUser.first_name}!`

    const cardDiv = document.createElement('div')
    let userCreateAt = currentUser.created_at.split('-')
    cardDiv.innerHTML = `
    <div id='user-card' class="ui card" data-id=${currentUser.id}>
      <div class="ui slide masked reveal image">
        <img src="${currentUser.profile_photo}" class="visible content">
        <img src="${currentUser.profile_photo}" class="hidden content">
      </div>
      <div class="content">
        <a class="header">${currentUser.first_name} ${currentUser.last_name}</a>
        <div class="meta">
          <span class="date">User since ${userCreateAt[1]}/${userCreateAt[2].charAt(0)}${userCreateAt[2].charAt(1)}/${userCreateAt[0]}</span>
        </div>
      </div>
      <div class="extra content">
        <a id='games-on-schedule'></a>
      </div>
    </div>
    `
    getMainContainerEl().append(pTagTest)
    getMainContainerEl().append(pTagTest)
    getMainContainerEl().append(cardDiv)

    let games = currentUser.games
    let gameColumn = document.getElementById('column-2')
    let gameList = document.createElement('ul')
    gameList.id = 'gamelist-id'
    let gameHeader = document.createElement('h3')
    gameHeader.innerText = 'Your Games'
    // games.forEach(function(game) {
    //   var li = document.createElement('li');
    //   let time = game.time.split('-')
    //   li.innerHTML = `Date: ${time[1]}/${time[2].charAt(0)}${time[2].charAt(1)}/${time[0]} <br> Location: ${game.location} <br> Sport: ${game.sport} <br>`
    //   gameList.appendChild(li)
    // })
    games.forEach(game => renderSingleGame(game, gameList))
    getGamesContentDivEl().appendChild(gameHeader)
    getGamesContentDivEl().appendChild(gameList)
    gameColumn.append(getGamesContentDivEl())
    getGameCount() //this is adding the amount of games a user have on the div card
    getGameIdOnATagEl().forEach(tag => addEventListener(tag))
    // getGameIdOnATagEl().addEventListener('click', function(e) {
    //   console.log('need to put the values on the form')
    //   editGame()
    // })
  }
}

function addEventListener(tag) {
  tag.addEventListener('click', function(e) {
    console.log('need to put the values on the form')
    editGame(e)
  })
}


function getGameIdOnATagEl() {
  return document.querySelectorAll('#game-id-on-a-tag')
}

function renderSingleGame(game, gameList) {
  // console.log(game)
  let li = document.createElement('li')
  li.dataset.id = game.id
  let time = game.time.split('-')
  if (game.result === 'none') {
    li.innerHTML = `<a href="#" id='game-id-on-a-tag'>Game #${game.id}</a>
    <p>Game Status: Pending</p>
    <p><i class="calendar alternate outline icon"></i>Date: ${time[1]}/${time[2].charAt(0)}${time[2].charAt(1)}/${time[0]}</p>
    <p>Sport: ${game.sport}</p>
    <p><i class="marker icon"></i>Location: ${game.location}</p>
    <div class="ui divider"></div>`
  } else {
    li.innerHTML = `<a href="#" id='game-id-on-a-tag'>Game #${game.id}</a>
    <p>Game Status: Completed</p>
    <p><i class="calendar alternate outline icon"></i>Date: ${time[1]}/${time[2].charAt(0)}${time[2].charAt(1)}/${time[0]}</p>
    <p>Sport: ${game.sport}</p>
    <p>Result: ${game.result}</p>
    <p><i class="marker icon"></i>Location: ${game.location}</p>
    <div class="ui divider"></div>`
  }

  // li.innerHTML = `Date: ${time[1]}/${time[2].charAt(0)}${time[2].charAt(1)}/${time[0]} <br> Location: ${game.location} <br> Sport: ${game.sport} <br>`
  li.classList.add('ui', 'list')
  gameList.appendChild(li)
}

function getGameCount() {
  fetch(getUserGamesURL()+`/count/${getCurrentUserId()}`)
  .then(res => res.json())
  .then(userGamesCount => getGameCountATagEl().innerText = userGamesCount + ' Games')
  .catch(err => console.log(err.message))
}

function hideGamesSportsDivs() {
  getGamesDiv().style.display = 'none'
  getSportDiv().style.display = 'none'
}

function hideLogoutBtn() {
  getLogoutBtn().style.display = 'none'
}

function hideScheduleNewGame(){
  getScheduleNewGame().style.display = 'none'
}

function userDoingStuffWhenThePageIsLoaded() {
  // add here functions you need when the page is loaded for the first time
  hideGamesSportsDivs()
  hideLogoutBtn()
  hideScheduleNewGame()
  getLoginButton().addEventListener('click', function(e) {
    e.preventDefault()
    userLogin(getLoginUsernameEl().value, getLoginPasswordEl().value)
  })
  getSignupButton().addEventListener('click', signUp)
}

function getUser() {
  fetch(`http://localhost:3000/users`)
  .then(response => response.json())
  .then(users => {users.forEach(user => listUserElements(user))})
}


function listUserElements(user) {
  let userDropdown = document.getElementById('users-list')
  let userEl = document.createElement('a')
  let userImg = document.createElement('img')
  userEl.classList.add('item')
  userImg.classList.add('ui', 'mini', 'avatar', 'image')
  userDropdown.append(userEl)
  userEl.prepend(userImg)
  userEl.innerText = `${user.first_name} ${user.last_name}`
  userImg.src = `${user.profile_photo}`
}
