import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import deleteCard from '../images/group.png'
function Card({card, onCardLike, onCardClick, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;

    const deleteButtonClassName = `elements__delete-button ${
        !isOwn && "elements__delete-button_hiden"
    }`;
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

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
        onCardDelete(card);
    };
    return (
        <div className="card">
            <li className="elements__list">
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
