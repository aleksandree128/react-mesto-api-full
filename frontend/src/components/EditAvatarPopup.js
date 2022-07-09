import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = React.useRef();

    React.useEffect(() => {
        avatarRef.current.value = "";
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm
            title="Обновить аватар"
            name="update-avatar"
            popup="avatar-form"
            isOpen={isOpen}
            onClose={onClose}
            buttonText={"Создать"}
            onSubmit={handleSubmit}
        >
            <input
                id="avatar"
                type="url"
                ref={avatarRef}
                className="popup__item popup__item_type_avatar-link"
                name="link"
                placeholder="Ссылка на картинку"
                required
            />
            <span
                id="error-avatar"
                className="popup__input-error popup__input-error_visible"
            ></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
