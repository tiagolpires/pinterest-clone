const pinId = new URLSearchParams(location.search).get('id')
const apiBaseUrl = 'http://localhost:3001/graphql'
const googleLoginPage = 'http://localhost:3001/auth/google'

createPin()

async function createPin() {
  const query = `{ pin(id: ${pinId}){image_url, title, id, author{name, profile_picture}}}`
  const url = `${apiBaseUrl}/${pinId}`
  const pin = await fetchApi(query, url, 'pin')
  addPin(pin)
}

async function fetchApi(query, url, dataName) {
  const response = await fetch(url, {
    method: 'POST',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify({ 
      query: query  
    })
  })
    
  const data = await response.json()
  if(data.errors) return window.location.href = googleLoginPage
  return data.data[dataName]
}

function addPin(pin) {
  const pinContainer = document.querySelector('.pin-container')

  const pinContent = `
    <img src=${pin.image_url} class="pin-img">
    <div class="pin-content">
      <div class="pin-owner-btn">
          <div class="pin-owner">
              <img src=${pin.author.profile_picture}>
              <span>Pin de <b>${pin.author.name}</b></span>
          </div>
          <a class="pin-save-btn" onClick = savePin(${pin.id})>Salvar</a>
      </div>
      <div class="pin-title">
          <h1>${pin.title}</h1>
      </div>
    </div>
  `
  pinContainer.innerHTML = pinContent
}

async function savePin(pinId) {
  const query = `mutation {savePin(id: "${pinId}"){user_id pin_id}}`
  const res = await fetchApi(query, apiBaseUrl, 'savePin')
  changeSaveBtn()
}

function changeSaveBtn() {
  const saveBtn = document.querySelector('.pin-save-btn')
  saveBtn.classList.add('saved')
  saveBtn.innerText = 'Salvo'
}