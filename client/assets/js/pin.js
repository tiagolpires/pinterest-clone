const pinId = new URLSearchParams(location.search).get('id')
const apiBaseUrl = 'http://localhost:3001/graphql'

createPin()

async function createPin() {
  const pin = await getPin()
  addPin(pin)
}

async function getPin() {
    const query = '{ pin(id: 1){image_url, title, id, author{name, profile_picture}}}'

    const response = await fetch(`${apiBaseUrl}/${pinId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify( { query } )
  })

    const pin = await response.json()
    return pin.data.pin
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
          <a>Salvar</a>
      </div>
      <div class="pin-title">
          <h1>${pin.title}</h1>
      </div>
    </div>
  `
  pinContainer.innerHTML = pinContent
}