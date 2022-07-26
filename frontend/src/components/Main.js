import React from "react";
import edit from "../images/profile/edit_avatar.svg";
import add from "../images/plus/plus.svg";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main ({
    cards,
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    onCardLike,
    onCardDelete
})

{
    const currentUserContext = React.useContext(CurrentUserContext);
    return (
        <main className="content">
            <section className="profile">
                <button className="profile__avatar-button" onClick={onEditAvatar}>
                    <img
                        className="profile__avatar"
                        src={currentUserContext.avatar}
                        alt="аватар"
                    />
                </button>
                <div className="profile__info">
                    <h1 className="profile__title">{currentUserContext.name}</h1>
                    <p className="profile__text">{currentUserContext.about}</p>
                </div>
                <button
                    className="profile__edit-button"
                    type="button"
                    onClick={onEditProfile}
                >
                    <img className="profile__edit" src={edit} alt="редактировать" />
                </button>
                <button
                    className="profile__add-button"
                    onClick={onAddPlace}
                    type="button"
                >
                    <img className="profile__add" src={add} alt="добавить" />
                </button>
            </section>
            <section className="elements">
                <ul className="elements__lists">
                    {cards.map((card) => (
                        <Card
                            card={card}
                            key={card._id}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
};

export default Main;
