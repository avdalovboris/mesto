import {openModal, cardPreview, modalFullScreenImg, modalFullScreenNameImg} from './Script.js'
class Card {
  constructor(data, config) {
    this._name = data.name
    this._link = data.link
    this._templateElemID = config.templateElemID
    this._templateElement = config.templateElement
    this._elementName = config.elementName
    this._elementImg = config.elementImg
    this._elementLike = config.elementLike
    this._elementLikeActive = config.elementLikeActive
    this._popupFullClass = config.popupFullClass
    this._elementDelite = config.elementDelite
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateElemID)
    .content.querySelector(this._templateElement)
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners()
    this._element.querySelector(this._elementName).textContent = this._name;
    this._element.querySelector(this._elementImg).src = this._link;
    this._element.querySelector(this._elementImg).alt = `Изображение '${this._name}', которое добавил пользователь`;
    return this._element;
  }

  _handleLike() {
    this._element.querySelector(this._elementLike).classList.toggle(this._elementLikeActive);
  }

  _handleDelete() {
    this._element.remove();
  }

  _openCardPreview() {
    openModal(cardPreview)
    cardPreview.classList.add(this._popupFullClass)
    modalFullScreenImg.src = this._link
    modalFullScreenNameImg.textContent = this._name
    modalFullScreenImg.alt = `Изображение '${this._name}', которое добавил пользователь`;
  }

  _setEventListeners() {
    this._element.querySelector(this._elementLike).addEventListener('click', () => {
      this._handleLike();
    })

    this._element.querySelector(this._elementDelite).addEventListener('click', () => {
      this._handleDelete();
    })

    this._element.querySelector(this._elementImg).addEventListener('click', () => {
      this._openCardPreview();
    })
  }

}

export default Card;