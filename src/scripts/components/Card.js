
class Card {
  constructor(data, userInfo, handleCardClick, handleDeleteCardClick,handleLikeClick ) {
    this._data = data;
    
    this._isLiked = false;
    this._id = data._id;
    this._userInfo = userInfo;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._handleLikeClick = handleLikeClick;
  } //.grid__template

  getCardLikes() {
    return this._data.likes.length;
  }
  getId() {
    return this._id;
  }
  _handleLikeIcon(event) {
    event.target.classList.toggle("grid__icon_active");
    this._handleLikeClick();
  }
  // pass card id to this function 

  isLiked() {
    return this._isLiked;
  }

  handleDeleteIcon() {
    this._cardElement.remove();
  }


  _setEventListeners() {
    const cardLikeIcon = this._cardElement.querySelector(".grid__icon");
    const cardDeleteIcon = this._cardElement.querySelector(
      ".grid__delete-icon"
    );

    //like button
    cardLikeIcon.addEventListener("click", () => this._handleLikeClick());
    //delete button
    cardDeleteIcon.addEventListener("click", () =>
      this._handleDeleteCardClick()
    );
    //preview card image
    this._cardImage.addEventListener("click", () => this._handleCardClick());
  }

  updateLikeCount(count) {
     const likeCounter = this._cardElement.querySelector(".grid__likes");
     likeCounter.textContent = count;
  }

  updateLikeIconState(likeState) {
    const likeIcon = this._cardElement.querySelector(".grid__icon");
    if (likeState) {
      this._isLiked = likeState;
      likeIcon.classList.add("grid__icon_active");
    } else {
       this._isLiked = likeState;
      likeIcon.classList.remove("grid__icon_active");
    }
  }

  createCard() {
    const cardTemplate = document
      .querySelector(".grid__template")
      .content.querySelector(".grid__item");
    this._cardElement = cardTemplate.cloneNode(true);

    const cardDeleteIcon = this._cardElement.querySelector(
      ".grid__delete-icon"
    );

    // logic for showing delete icon
    if (this._userInfo._id === this._data.owner._id) {
      cardDeleteIcon.classList.add("grid__delete-show");
    }


    //Logic to check if I have liked the card
    const  filter = this._data.likes.filter( a => a._id === this._userInfo._id);
    if( filter.length !== 0){
      this._isLiked = true;
    }

    // const likeCounter = this._cardElement.querySelector('.grid__likes');
    // likeCounter.textContent = this.getCardLikes();

    this.updateLikeCount(this.getCardLikes());


    // Show filled like icon if the card has been liked
    // const likeIcon = this._cardElement.querySelector('.grid__icon');
    // if (this._isLiked) {
    //   likeIcon.classList.add("grid__icon_active");
    // }

    this.updateLikeIconState(this._isLiked);

    //set unique card attributes
    this._cardElement.setAttribute("id", this._id);

    this._cardImage = this._cardElement.querySelector(".grid__image");
    this._cardText = this._cardElement.querySelector(".grid__text");

    this._cardImage.style.backgroundImage = `url(${this._data.link})`;
    this._cardText.textContent = this._data.name;

    this._setEventListeners();

    return this._cardElement;
  }
}

export default Card;
