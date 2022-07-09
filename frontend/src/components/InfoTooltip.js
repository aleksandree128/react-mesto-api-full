import React from 'react';
import sucsesfull from '../images/sucsefull.svg';
import unsucsesfull from '../images/unsucsefull.svg';

function InfoTooltip(props) {

    return (
        <div className={`popup popup_type_open ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="infoTooltip">
                <img className="infoTooltip__image" src={props.status ? sucsesfull : unsucsesfull} />
                <p className="infoTooltip__text">
                    {props.status ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
                </p>
                <button type="button" className="popup__close" onClick={props.onClose} />
            </div>
        </div>
    )
}

export default InfoTooltip;
