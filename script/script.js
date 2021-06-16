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


                      //open and close popup
function openModal(modal) {
  modal.classList.add('popup_opened')
}

function closeModal(modal) {
  modal.classList.remove('popup_opened')
}
                      //edit profile: open | close | submit
function openeModalEditProfile() {
  openModal(modalEditProfile)
  modalEditProfile.querySelector('#user-name').value = document.querySelector('.profile__full-name').textContent
  modalEditProfile.querySelector('#user-job').value = document.querySelector('.profile__profession').textContent
}

function closeModalEditProfile() {
  closeModal(modalEditProfile)
}

function profileFormSubmitHandler (submit) {
  submit.preventDefault();
  profileName.textContent = modalEditProfile.querySelector('#user-name').value
  profileJob.textContent = modalEditProfile.querySelector('#user-job').value
  closeModalEditProfile()
}
                      //add photo open | close
function OpenModalAddPhoto() {
  openModal(modalAddPhoto)
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
    cardPreview.querySelector('.full-screen__img').src = evt.target.closest('.element__img').src
    cardPreview.querySelector('.full-screen__text').textContent = evt.target.closest('.element').textContent
  }

  function closeCardPreview(evt) {
    closeModal(cardPreview)
  }

  cardElement.querySelector('.element__like').addEventListener('click', handleLike)
  cardElement.querySelector('.element__delite').addEventListener('click', handleDeconste)
  cardElement.querySelector('.element__img').addEventListener('click', openCardPreview)
  cardPreview.querySelector('.popup__close').addEventListener('click', closeCardPreview)
  cardPreview.addEventListener('click', closePopupClickOverlay)


  elementsLists.prepend(cardElement)
  return cardElement
}

function cardFormSubmitHandler(submit) {
  submit.preventDefault();
  const nameNewPhotoName = modalAddPhoto.querySelector('#inputAddPhotoName').value
  const nameNewPhotoSrc = modalAddPhoto.querySelector('#inputAddPhotoSrc').value
  const newCard = createCard(nameNewPhotoName, nameNewPhotoSrc); 
  elementsLists.prepend(newCard)
  closeModalAddPhoto();
};

function closePopupClickOverlay(event) {
  if(event.target === event.currentTarget){
    closeModal(event.currentTarget)
  }
}

function closePopupClickKeydown(evt) {
  const popupEditProfile = document.querySelector('#popupEditProfile')
  const popupAddPhoto = document.querySelector('#popupAddPhoto')
  const popupFullScreen = document.querySelector('#popupFullScreen')
  if(evt.key === "Escape") {
    closeModal(popupEditProfile)
    closeModal(popupAddPhoto)
    closeModal(popupFullScreen)
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
document.addEventListener('keydown', closePopupClickKeydown)