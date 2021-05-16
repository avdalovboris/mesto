//                                DOM ELEMENT
//                      -popup-
let popup = document.querySelector('.popup')

//           form
let form = document.querySelector('.popup__form')

//           name
let popupName = document.querySelector('#popupName')

//           job
let popupJob = document.querySelector('#popupJob')

//                      -button-
//           open popup
let openPopupButton = document.querySelector('.profile__edit')

//           close popup
let buttonClose = document.querySelector('#popupClose')

//                      -profile-
//           name
let profileName = document.querySelector('.profile__full-name')

//           job
let profileJob = document.querySelector('.profile__profession')

//                                FUNCTION 
function open() {
  popup.classList.add('popup_openned')
  popupName.value = profileName.textContent
  popupJob.value =  profileJob.textContent
}
function close() {
  popup.classList.remove('popup_openned')
}

function formSubmitHandler (submit) {
  submit.preventDefault();
  profileName.textContent = popupName.value
  profileJob.textContent = popupJob.value
  close()
}
//                                EVENT
openPopupButton.addEventListener('click', open)
buttonClose.addEventListener('click', close)
form.addEventListener('submit', formSubmitHandler)