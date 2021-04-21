const apiBaseUrl = 'http://localhost:3001/graphql'
const googleLoginPage = 'http://localhost:3001/auth/google'

const pinsCreatedQuery = `{userPins {id image_url}}`
createUserPins(pinsCreatedQuery, 'created-pins', 'userPins')

const pinsSavedQuery = `{userSavedPins {id image_url}}`
createUserPins(pinsSavedQuery, 'saved-pins', 'userSavedPins')

async function createUserPins(query, containerClass, dataName) {
    const userPins = await queryFetch(query)
    if(!userPins) return
    addUserPins(userPins.data[dataName], containerClass)
}

function addUserPins(pins, containerClass) {
    const containerDiv = document.getElementsByClassName(containerClass)[0]
    pins.forEach(pin => {
        const pinContent = `<h3>${pin.id}</h3>`
        containerDiv.insertAdjacentHTML('beforeend', pinContent)
    })
}

async function queryFetch(query) {
    const response = await fetch(apiBaseUrl, {
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