const apiBaseUrl = 'http://localhost:3001/graphql'

createPins()

async function createPins() {
    const pins = await getAllPins()
    addPins(pins)
}

async function getAllPins() {
    const query = '{ pins{id, image_url}}'

    const response = await fetch(apiBaseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify( { query } )
  })

  const data = await response.json()
  return data.data.pins
}

function addPins(pins) {
    const pinsContainer = document.querySelector('.pins-container')
    pins.map((pin) => {
        const pinContent = `<div class="pin" onClick="pinPage(${pin.id})"><img src=${pin.image_url}></div>`
        pinsContainer.innerHTML += pinContent
    })
}

function pinPage(pinId) {
    window.location.href = `pin.html?id=${pinId}`
}