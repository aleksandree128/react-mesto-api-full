import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import deleteCard from '../images/group.png'
function Card({card, onCardLike, onCardClick, onCardDelete}) {
    //подписка на контекст CurrentUserContext
    const currentUser = React.useContext(CurrentUserContext)

    //определяем, владельца текущей карточки
    const isOwn = card.owner === currentUser._id;

    //переменная в `className` для кнопки удаления
    const deleteButtonClassName = (
        `elements__remove-button ${isOwn ? 'elements__remove-button_visible' : 'elements__remove-button_hidden'}`
    );

    //определяем, наличие у карточки лайка
    const isLiked = card.likes.some(i => i === currentUser._id);

    const likeButtonClassName = `elements__like ${
        isLiked && "elements__like_black"
    }`;

    const handleClick = () => {
        onCardClick(card);
    };

    const handleLikeClick = () => {
        onCardLike(card);
    };

    const handleDeleteClick = () => {
        onCardDelete(card._id);
    };
    return (
        <div className="card">
            <li className="elements__list" key={card.id}>
                <button className={deleteButtonClassName} type="button" onClick={handleDeleteClick}><img src={deleteCard} alt="удалить"/></button>
                <img className="elements__photo" src={card.link} alt={card.name} onClick={handleClick}/>
                <div className="elements__font">
                    <h2 className="elements__text">{card.name}</h2>
                    <button className={likeButtonClassName} onClick={handleLikeClick} type="button">
                    </button>
                    <span className="elements__like-count">{card.likes.length}</span>
                </div>
            </li>
        </div>
    )
}

export default Card;
