import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [about, setAbout] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser, isOpen]);

    function handleName(e) {
        setName(e.target.value);
    }

    function handleAbout(e) {
        setAbout(e.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdateUser({
            name: name,
            about: about,
        });
    };

    return (
        <PopupWithForm
            title="Редактировать профиль"
            name="edit"
            popup="edit-profile"
            isOpen={isOpen}
            onClose={onClose}
            buttonText={"Сохранить"}
            onSubmit={handleSubmit}
        >
            <input
                id="name"
                type="text"
                value={name || ''}
                onChange={handleName}
                className="popup__item popup__item_type_name"
                name="popup__input_name"
                placeholder="ФИО"
                minLength="2"
                maxLength="40"
                required
            />
            <span
                id="error-firstname"
                className="popup__input-error popup__input-error_visible"
            ></span>
            <input
                id="about"
                type="text"
                value={about || ''}
                className="popup__item popup__item_type_about-name"
                name="popup__input_about_name"
                placeholder="о себе"
                minLength="2"
                maxLength="200"
                required
                onChange={handleAbout}
            />
            <span
                id="error-about"
                className="popup__input-error popup__input-error_visible"
            ></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
