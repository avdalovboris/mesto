import Card from "./card.js";
import FormValidator from "./validate.js";

const initialCards = [
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

const object = {
  form: '.popup__form',
  formButton: '.popup__button',
  buttonInActive: 'popup__button_inactive',
  disabled: ['disabled', 'true'],
  inputError: 'popup__field_error',
  errorSpanActive: 'error__active'
}

                      //дом edit profile
const modalEditProfile = document.querySelector('#popupEditProfile')
const modalEditProfileForm = modalEditProfile.querySelector('.popup__form')
const btnOpenModalEditProfile = document.querySelector('.profile__edit')
const btnCloseModalEditProfile = modalEditProfile.querySelector('.popup__close')
                      //дом add photo
const modalAddPhoto = document.querySelector('#popupAddPhoto')
const modalAddPhotoForm = modalAddPhoto.querySelector('.popup__form')
const btnOpenModalAddPhoto = document.querySelector('.profile__add')
const btnCloseModalAddPhoto = modalAddPhoto.querySelector('.popup__close')
                      
const elementsLists = document.querySelector('.elements__list')
const cardPreview = document.querySelector('#popupFullScreen')
const templateElement = document.querySelector('#templateElement').content
const profileName = document.querySelector('.profile__full-name') 
const profileJob = document.querySelector('.profile__profession') 
const profileNameInput = modalEditProfile.querySelector('#user-name');
const profileJobInput = modalEditProfile.querySelector('#user-job');
const newCardNameInput = modalAddPhoto.querySelector('#name-card')
const newCardLinkInput = modalAddPhoto.querySelector('#link')
const modalFullScreenImg = cardPreview.querySelector('.full-screen__img')
const modalFullScreenNameImg = cardPreview.querySelector('.full-screen__text')



const validEditPofile = new FormValidator(object, modalEditProfileForm)
validEditPofile.enableValidation();
const validAddPhoto = new FormValidator(object, modalAddPhotoForm)
validAddPhoto.enableValidation();



                      //open and close popup
function openModal(modal) {
  modal.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupClickEsc)
}

function closeModal(modal) {
  modal.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupClickEsc)
}

function closePopupClickEsc(evt) {
  const nameOpenModal = document.querySelector('.popup_opened')
  if(evt.key === "Escape") {
    closeModal(nameOpenModal)
  }
}

                      //edit profile: open | close | submit
function openeModalEditProfile() {
  openModal(modalEditProfile)
  profileNameInput.value = profileName.textContent
  profileJobInput.value = profileJob.textContent
  validEditPofile.toggleButtonState()
  //TOOOOOOT
  const inputList = modalEditProfile.querySelectorAll('.popup__field')
  inputList.forEach((el) => {
    validAddPhoto.hideInputError(el)
  })
}

function closeModalEditProfile() {
  closeModal(modalEditProfile)

}

function profileFormSubmitHandler (submit) {
  submit.preventDefault();
  profileName.textContent = profileNameInput.value
  profileJob.textContent = profileJobInput.value
  closeModalEditProfile()
}
                      //add photo open | close
function OpenModalAddPhoto() {
  openModal(modalAddPhoto)
  newCardNameInput.value = ""
  newCardLinkInput.value = ""
  validAddPhoto.toggleButtonState()
  //TOOOOOOT
  const inputList = modalAddPhoto.querySelectorAll('.popup__field')
  inputList.forEach((el) => {
    validAddPhoto.hideInputError(el)
  })
}

function closeModalAddPhoto() {
  closeModal(modalAddPhoto)

}

                      //load photo of massive | create new card | submit (add new photo on page)
function renderCards() {
  initialCards.forEach(renderCard)
}

function renderCard(cardElem){
  const сard = new Card(cardElem)
  const newCard = сard.generateCard()
  elementsLists.prepend(newCard)
}

function cardFormSubmitHandler(submit) {
  submit.preventDefault();
  const data = {
    name: newCardNameInput.value,
    link: newCardLinkInput.value
  }
  const сard = new Card(data); 
  const newCard = сard.generateCard()
  elementsLists.prepend(newCard)
  closeModalAddPhoto();
};

function closePopupClickOverlay(event) {
  if(event.target === event.currentTarget){
    closeModal(event.currentTarget)
  }
}

renderCards()
btnOpenModalEditProfile.addEventListener('click', openeModalEditProfile)
btnCloseModalEditProfile.addEventListener('click', closeModalEditProfile)
btnOpenModalAddPhoto.addEventListener('click', OpenModalAddPhoto)
btnCloseModalAddPhoto.addEventListener('click', closeModalAddPhoto)
modalEditProfile.querySelector('.popup__form').addEventListener('submit', profileFormSubmitHandler)
modalAddPhoto.querySelector('.popup__form').addEventListener('submit', cardFormSubmitHandler)
modalEditProfile.addEventListener('click', closePopupClickOverlay)
modalAddPhoto.addEventListener('click', closePopupClickOverlay)
cardPreview.querySelector('.popup__close').addEventListener('click', () => closeModal(cardPreview))
cardPreview.addEventListener('click', closePopupClickOverlay)

export {openModal, cardPreview, modalFullScreenImg, modalFullScreenNameImg};