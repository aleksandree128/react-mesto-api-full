import React from "react";

function PopupWithForm(props) {
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
        function handleEscClose(evt) {
            if (evt.key === "Escape") {
                props.onClose();
            }
        }
        document.addEventListener("keydown", handleEscClose);
        return () => {
            document.removeEventListener("keydown", handleEscClose);
        };
    },[props.isOpen]);

    return (
        <section
            className={`popup popup_type_${props.name} ${popupOpened}`}
            onMouseDown={close}
        >
            <div className="popup__container">
                <button type="button" className="popup__close"></button>
                <h3 className="popup__title">{props.title}</h3>
                <form
                    className="popup__name"
                    name={props.name}
                    onSubmit={props.onSubmit}
                >
                    {props.children}
                    <button className="popup__save" type="submit">
                        {props.buttonText}
                    </button>
                </form>
                <button className="popup__close" type="button"></button>
            </div>
        </section>
    );
}
export default PopupWithForm;
