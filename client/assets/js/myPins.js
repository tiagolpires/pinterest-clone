const pinsCreatedQuery = `{userPins {id image_url}}`
createUserPins(pinsCreatedQuery, 'created-pins', 'userPins', 'deletePin')

const pinsSavedQuery = `{userSavedPins {id image_url}}`
createUserPins(pinsSavedQuery, 'saved-pins', 'userSavedPins', 'deleteSavedPin')

async function createUserPins(query, containerClass, dataName, deleteFunction) {
    const userPins = await queryFetch(query)
    if(!userPins) return
    addUserPins(userPins.data[dataName], containerClass, deleteFunction)
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
    if(data.errors) return window.location.href = googleLoginPage
    return data
}

function addUserPins(pins, containerClass, deleteFunction) {
    const containerDiv = document.getElementsByClassName(containerClass)[0]
    pins.forEach(pin => {
        const pinContent = `
            <div class="pin">
                <img src=${pin.image_url} onClick="pinPage(${pin.id})">
                <div class="pin-delete-btn" onClick="${deleteFunction}(event, ${pin.id})">Excluir</div>
            </div>`
        containerDiv.insertAdjacentHTML('beforeend', pinContent)
    })
}

function pinPage(pinId) {
    window.location.href = `pin.html?id=${pinId}`
}

async function deletePin(e, pinId) {
    const deletePinQuery = `mutation {deletePin(id: "${pinId}"){title}}`
    const deletedPin = await queryFetch(deletePinQuery)
    e.target.parentElement.remove()
}

async function deleteSavedPin(e, pinId) {
    const deleteSavedPinQuery = `mutation {deleteSavedPin(id: "${pinId}"){title}}`
    const deletedSavedPin = await queryFetch(deleteSavedPinQuery)
    e.target.parentElement.remove()
}
