//    КНОПКА ОТКРЫТИЯ POPUP В DOM
const btnOpenPopup = document.querySelector('.profile__rectangle')
console.log(btnOpenPopup)

//    POPUP В DOM
const popup = document.querySelector('.popup')

//    КНОПКА ЗАКРЫТИЯ POPUP В DOM
const btnClosePopup = document.querySelector('.popup__close')
console.log(btnClosePopup)

//    КНОПКА СОХРАНИТЬ POPUP В DOM
const btnSave = document.querySelector('.popup__save')
console.log(btnSave)

//    СОБЫТИЕ  ОТКРЫТЬ POPUP
btnOpenPopup.addEventListener('click', function(){
  popup.classList.add('popup__openned')
  popupFullName.value = profileFullName.textContent
  popupProfession.value = profileProfession.textContent
})
//     ФУНКЦИЯ ЗАКРЫТЬ POPUP
function close() {
  popup.classList.remove('popup__openned')
}

//     СОБЫТИЕ ЗАКРЫТЬ POPUP
btnClosePopup.addEventListener('click', close)


//    ПОЛНОЕ ИМЯ И ПРОФЕССИЯ В POPUP
let popupFullName = document.querySelector('.popup__full-name')
let popupProfession = document.querySelector('.popup__profession')

//    ПОЛНОЕ ИМЯ И ПРОФЕССИЯ В PROFILE
let profileFullName = document.querySelector('.profile__full-name')
let profileProfession = document.querySelector('.profile__profession')

//     КНОПКА SAVE 
btnSave.addEventListener('click', function() {
  profileFullName.textContent = popupFullName.value
  profileProfession.textContent = popupProfession.value
  close()
})

