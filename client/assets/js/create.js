const form = document.querySelector('.create-form')

form.addEventListener('submit', handleFormSubmit)

createUserDiv()

async function handleFormSubmit(e) {
    e.preventDefault()
    const pinValues = getPinValues()
    const newPin = await createPin(pinValues)
    if(newPin.errors) return window.location.href = googleLoginPage
    window.location.href = 'index.html'
}

function getPinValues() {
    const title = document.querySelector('.title-input').value
    const description = document.querySelector('.desc-input').value
    const imageUrl = document.querySelector('.url-input').value
    return {imageUrl: imageUrl, title: title, description: description}
}

async function createPin(pinValues) {
    const query = getPinQuery(pinValues)
    const createPin = queryFetch(query)
    return createPin
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

async function getLoggedUser() {
    const query = '{loggedUser{name profile_picture}}'
    const response = await queryFetch(query)

    if(response.errors) return window.location.href = googleLoginPage
    return response
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

async function createUserDiv() {
    const loggedUser = await getLoggedUser()
    const loggedUserData = loggedUser.data.loggedUser
    const { profile_picture: userProfileImg, name: userName } = loggedUserData
    const divContainer = document.querySelector('.create-pin-user')
    
    const userInfo = `
        <img src= ${userProfileImg}>
        <span>${userName}</span>
    `
    divContainer.innerHTML = userInfo
}