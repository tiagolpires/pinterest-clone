async function changeHeaderPicture() {
    const userPicture = await getUserPicture()
    if (userPicture.errors) return
    const pictureImg = document.querySelector('.header-profile-picture')
    pictureImg.src = userPicture.data.loggedUser.profile_picture
}

async function getUserPicture() {
    const response = await fetch(apiUrl, {
        method: 'POST',
        credentials: "include",
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify({ 
            query: '{loggedUser{profile_picture}}' 
        })
    })
    
    const userData = await response.json()
    return userData
}