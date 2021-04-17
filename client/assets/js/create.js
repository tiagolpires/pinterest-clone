const apiBaseUrl = 'http://localhost:3001/graphql'
const googleLoginPage = 'http://localhost:3001/auth/google'
const homePage = 'http://localhost:5500/client/index.html'
const form = document.querySelector('.create-form')

form.addEventListener('submit', handleFormSubmit)
createUserDiv()

async function handleFormSubmit(e) {
    e.preventDefault()
    const pinValues = getPinValues()
    const newPin = await createPin(pinValues)
    if(newPin.errors) return window.location.href = googleLoginPage
    window.location.href = homePage
}

function getPinValues() {
    const title = document.querySelector('.title-input').value
    const description = document.querySelector('.desc-input').value
    const imageUrl = document.querySelector('.url-input').value

    return {imageUrl: imageUrl, title: title, description: description}
}

async function createPin(pinValues) {
    const query = getPinQuery(pinValues)

    const response = await fetch(apiBaseUrl, {
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
    
    const responseJson = await response.json()
    return responseJson
}

function getPinQuery({ imageUrl, title, description }) {
    const query = `
        mutation {
            addPin (
                image_url: "${imageUrl}", 
                title: "${title}", 
                description: "${description}"
            ){
                title
            }
        }
    `
    return query
}

async function createUserDiv() {
    const loggedUser = await getLoggedUser()

    const divContainer = document.querySelector('.create-pin-user')
    const userInfo = `
        <img src= ${loggedUser.data.loggedUser.profile_picture}>
        <span>${loggedUser.data.loggedUser.name}</span>
    `
    divContainer.innerHTML = userInfo
}

async function getLoggedUser() {
    const response = await fetch(apiBaseUrl, {
        method: 'POST',
        credentials: "include",
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify({ 
            query: '{loggedUser{name profile_picture}}' 
        })
    })
    
    const responseJson = await response.json()
    if(responseJson.errors) return window.location.href = googleLoginPage
    return responseJson
}