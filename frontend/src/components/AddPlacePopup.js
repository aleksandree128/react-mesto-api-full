import React from "react";
import PopupWithForm from "./PopupWithForm";
function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const cardInputRef = React.useRef();
    const linkInputRef = React.useRef();

    React.useEffect(() => {
        cardInputRef.current.value = "";
        linkInputRef.current.value = "";
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name: cardInputRef.current.value,
            link: linkInputRef.current.value,
        });
    }

    return (
        <PopupWithForm
            title="Новое место"
            name="add-card"
            popup="new-card"
            isOpen={isOpen}
            onClose={onClose}
            buttonText={"Создать"}
            onSubmit={handleSubmit}
        >
            <input
                id="title"
                type="text"
                className="popup__item popup__item_type_card-name"
                name="name"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                ref={cardInputRef}
                required
            />
            <span
                id="error-title"
                className="popup__input-error popup__input-error_visible"
            ></span>
            <input
                id="link"
                type="url"
                className="popup__item popup__item_type_card-link"
                name="link"
                placeholder="Ссылка на картинку"
                ref={linkInputRef}
                required
            />
            <span
                id="error-link"
                className="popup__input-error popup__input-error_visible"
            ></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
