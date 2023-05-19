import React from "react";

function ImagePopup(props) {
    return (
        <div className={`popup popup_type_fullscreen-photos ${props.card.link ? "popup_opened" : ""}`} id="fullscreen-photos">
            <button className="popup__btn-close popup__btn-close_type_photo" type="button" aria-label="Закрыть" onClick={props.onClose} />
            <div className="popup__fullscreen">
                <img className="popup__image-fullscreen" src={props.card.link} alt={props.card.name} />
                <p className="popup__image-subtitle">{props.card.name}</p>
            </div>
        </div>
    )
}

export default ImagePopup