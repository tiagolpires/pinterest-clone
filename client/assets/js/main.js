createPins()

async function createPins() {
    const pins = await getAllPins()
    addPins(pins)
}

async function getAllPins() {
    const query = '{ pins{id, image_url}}'
    const pins = await queryFetch(query)
    return pins.data.pins
}

function addPins(pins) {
    const pinsContainer = document.querySelector('.pins-container')
    pins.forEach((pin) => {
        const pinContent = `
            <div class="pin">
                <img src=${pin.image_url} onClick="pinPage(${pin.id})">
                <div class="pin-save-btn" onClick="savePin(event, ${pin.id})">Salvar</div>
            </div>`
        pinsContainer.innerHTML += pinContent
    })
}

function pinPage(pinId) {
    window.location.href = `pin.html?id=${pinId}`
}

async function savePin(e, pinId) {
    const query = `mutation {savePin(id: "${pinId}"){user_id pin_id}}`
    const res = await queryFetch(query)
    if(res.errors) return window.location.href = googleLoginPage
    changeSaveBtnStyle(e.target)
}

function changeSaveBtnStyle(saveBtn) {
    saveBtn.classList.add('pin-saved')
    saveBtn.innerText = 'Salvo'
}

async function queryFetch(query) {
    const response = await fetch(apiUrl, {
        method: 'POST',
        credentials: "include",
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify({ query })
    })

    const data = await response.json()
    return data
}