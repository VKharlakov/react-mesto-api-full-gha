import React from "react";
import { useNavigate } from "react-router-dom";

function InfoToolTip({ isOpen, isRegisterSuccessful, onClose }, props) {
    const navigate = useNavigate()  //Хук навигации

    function handleCloseClick() {
        onClose()

        //Если регистрация прошла успешно, пользователя переадрисуют на Login
        if (isRegisterSuccessful) {
            navigate('/sign-in', { replace: true })
        }

    }

    return (
        <div className={`popup popup_type_${props.name} ${isOpen ? "popup_opened" : ""}`} id={props.name}>
            <button className="popup__btn-close" type="button" onClick={handleCloseClick} aria-label="Закрыть" />
            <div className="popup__container">
                <div className="popup__info-tool-tip">
                    <img src={isRegisterSuccessful ? `${require('../images/auth-success.svg').default}` : `${require('../images/auth-failed.svg').default}`} />
                    <h2 className="popup__info-tool-tip-title">{isRegisterSuccessful ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
                </div>
            </div>
        </div>
    )
}

export default InfoToolTip