import React from "react";

function ImagePopup(props) {
    const popupOpened = props.isOpen ? "popup_opened" : "";

    function close(evt) {
        if (evt.target.classList.contains("popup_opened")) {
            props.onClose();
        }
        if (evt.target.classList.contains("popup__close")) {
            props.onClose();
        }
    }

    React.useEffect(() => {
        if (!props.isOpen) return;
        function handleEscClose(event) {
            if (event.keyCode === "Escape") {
                props.onClose();
            }
        }
        document.addEventListener("keydown", handleEscClose);

        return () => {
            document.removeEventListener("keydown", handleEscClose);
        };
    }, [props.isOpen]);

    return (
        <section
            className={`popup popup_type_image ${popupOpened}`}
            onMouseDown={close}
        >
            <div className="popup__container-image">
                <img className="popup__image-link" src={props.card.link} alt={props.card.name} />
                <h2 className="popup__place-title">{props.card.name}</h2>
                <button className="popup__close" type="button"></button>
            </div>
        </section>
    );
}

export default ImagePopup;
