window.onscroll = () => addShadowOnHeader()

const mainHeader = document.querySelector('.main-header')
const mainHeaderOffsetTop = mainHeader.offsetTop

const addShadowOnHeader = () => {
    if (window.pageYOffset > mainHeaderOffsetTop) {
        mainHeader.classList.add('bottom-shadow')
        return
    }
    mainHeader.classList.remove('bottom-shadow')
}