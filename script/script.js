let initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

//                                DOM ELEMENT
                      //-popupEdit-
//                      -popupEdit-
let popupEdit = document.querySelector('#popupEdit')

//           form
let formEdit = popupEdit.querySelector('.popup__form')

//           name
let inputEditName = popupEdit.querySelector('#inputEditName')

//           job
let inputEditJob = popupEdit.querySelector('#inputEditJob')

//                      -button-
//           open popup Edit
let btnOpenPopupEdit = document.querySelector('.profile__edit')

//           close popup Edit
let btnClosePopupEdit = popupEdit.querySelector('.popup__close')

                      //-popupAdd-
//                      -popupAdd-
let popupAdd = document.querySelector('#popupAdd')

//           form
let formAdd = popupAdd.querySelector('.popup__form')

//           name
let inputAddPhotoName = popupAdd.querySelector('#inputAddPhotoName')

//           job
let inputAddPhotoSrc = popupAdd.querySelector('#inputAddPhotoSrc')

//                      -button-
//           open popup Edit
let btnOpenPopupAdd = document.querySelector('.profile__add')

//           close popup Edit
let btnClosePopupAdd = popupAdd.querySelector('.popup__close')

//                      -profile-
//           name
let profileName = document.querySelector('.profile__full-name')

//           job
let profileJob = document.querySelector('.profile__profession')

const popupFullScreen = document.querySelector('#popupFullScreen')
const btnClosePopupFullScreen = popupFullScreen.querySelector('.popup__close')

const templateElement = document.querySelector('#templateElement').content
const elementsList = document.querySelector('.elements__list')

//
//                                FUNCTION 
function openEdit() {
  popupEdit.classList.add('popup_openned')
  inputEditName.value = profileName.textContent
  inputEditJob.value =  profileJob.textContent
}
function closeEdit() {
  popupEdit.classList.remove('popup_openned')
}

function openAdd() {
  popupAdd.classList.add('popup_openned')
}
function closeAdd() {
  popupAdd.classList.remove('popup_openned')
  inputAddPhotoSrc.value = ''
  inputAddPhotoName.value = ''
}

function formSubmitHandler (submit) {
  submit.preventDefault();
  profileName.textContent = inputEditName.value
  profileJob.textContent = inputEditJob.value
  closeEdit()
}

                                
                                

function renderInitialCards() {
  initialCards.forEach(renderInitialCard)
}

function renderInitialCard(element) {
  const initialCardElement = templateElement.cloneNode(true);

  initialCardElement.querySelector('.element__img').src = element.link;
  initialCardElement.querySelector('.element__name').textContent = element.name;
  
  setEventListeners(initialCardElement)
  elementsList.appendChild(initialCardElement)
}

                                
                                

function formSubmitHandlerP (submit) {
  submit.preventDefault();
  const initialCardElement = templateElement.cloneNode(true);
  initialCardElement.querySelector('.element__img').src = document.querySelector('#inputAddPhotoSrc').value;
  initialCardElement.querySelector('.element__name').textContent = document.querySelector('#inputAddPhotoName').value;
  setEventListeners(initialCardElement)
  elementsList.prepend(initialCardElement)
  closeAdd()
}

formAdd.addEventListener('submit', formSubmitHandlerP)

function handleDelete(evt) {
  evt.target.closest('.element').remove()
}

function handleLike(evt) {
  evt.target.closest('.element__like').classList.toggle('element__like_no-active')
  evt.target.closest('.element__like').classList.toggle('element__like_active')
}

//////////////////////////////////////////

function fullScreen (evt) {
  const initialCardElement = templateElement.cloneNode(true);
  popupFullScreen.classList.add('popup_full', 'popup_openned')
  popupFullScreen.querySelector('.full-screen__img').src = evt.target.closest('.element__img').src
  popupFullScreen.querySelector('.full-screen__text').textContent = evt.target.closest('.element').textContent
}

function closeFullScreen(evt) {
  evt.target.closest('#popupFullScreen').classList.remove('popup_openned')
}

function setEventListeners(element) {
  element.querySelector('.element__like').addEventListener('click', handleLike)
  element.querySelector('.element__delite').addEventListener('click', handleDelete)
  element.querySelector('.element__img').addEventListener('click', fullScreen)
  btnClosePopupFullScreen.addEventListener('click', closeFullScreen)
}

////                                EVENT
btnOpenPopupEdit.addEventListener('click', openEdit)
btnOpenPopupAdd.addEventListener('click', openAdd)
btnClosePopupEdit.addEventListener('click', closeEdit)
btnClosePopupAdd.addEventListener('click', closeAdd)
formEdit.addEventListener('submit', formSubmitHandler)
renderInitialCards()