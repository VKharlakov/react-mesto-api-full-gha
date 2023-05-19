import React from "react";

function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`} id={props.name}>
            <button className="popup__btn-close" type="button" onClick={props.onClose} aria-label="Закрыть" />
            <div className="popup__container">
                <h2 className="popup__title">{props.title}</h2>
                <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
                    {props.children}
                    <button className="popup__btn-submit" type="submit" aria-label="Сохранить">{props.buttonText}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm