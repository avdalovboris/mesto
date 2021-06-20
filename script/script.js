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
                      //дом edit profile
const modalEditProfile = document.querySelector('#popupEditProfile')
const btnOpenModalEditProfile = document.querySelector('.profile__edit')
const btnCloseModalEditProfile = modalEditProfile.querySelector('.popup__close')
                      //дом add photo
const modalAddPhoto = document.querySelector('#popupAddPhoto')
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
const nameNewPhotoName = modalAddPhoto.querySelector('#name-card')
const nameNewPhotoSrc = modalAddPhoto.querySelector('#link')

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
  const inputList = Array.from(modalEditProfile.querySelectorAll('.popup__field'));
  const buttonElement = modalEditProfile.querySelector('.popup__button')
  toggleButtonState(inputList, buttonElement, {
    disabled: ['disabled', 'true'],
    buttonActive: 'popup__button_inactive',
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
  const inputList = Array.from(modalAddPhoto.querySelectorAll('.popup__field'));
  const buttonElement = modalAddPhoto.querySelector('.popup__button')
  toggleButtonState(inputList, buttonElement, {
    disabled: ['disabled', 'true'],
    buttonActive: 'popup__button_inactive',
  })
}

function closeModalAddPhoto() {
  closeModal(modalAddPhoto)
}

                      //load photo of massive | create new card | submit (add new photo on page)
function renderCards() {
  initialCards.forEach(renderCard)
}

function renderCard(card){
  const newCard = createCard(card.name, card.link)
  elementsLists.prepend(newCard)
}

function createCard(name, link) {
  const cardElement = templateElement.cloneNode(true);
  const elementName = cardElement.querySelector('.element__name')
  const elementPhoto = cardElement.querySelector('.element__img')

  elementName.textContent = name;
  elementPhoto.src = link;
  elementPhoto.alt = name;

  function handleDeconste(evt) {
    evt.target.closest('.element').remove()
  }

  function handleLike(evt) {
    evt.target.closest('.element__like').classList.toggle('element__like_no-active')
    evt.target.closest('.element__like').classList.toggle('element__like_active')
  }

  function openCardPreview(evt) {
    openModal(cardPreview)
    cardPreview.classList.add('popup_full')
    modalFullScreenImg.src = evt.target.closest('.element__img').src
    modalFullScreenNameImg.textContent = evt.target.closest('.element').textContent
  }

  cardElement.querySelector('.element__like').addEventListener('click', handleLike)
  cardElement.querySelector('.element__delite').addEventListener('click', handleDeconste)
  cardElement.querySelector('.element__img').addEventListener('click', openCardPreview)


  elementsLists.prepend(cardElement)
  return cardElement
}

function cardFormSubmitHandler(submit) {
  submit.preventDefault();
  const newCard = createCard(nameNewPhotoName.value, nameNewPhotoSrc.value); 
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