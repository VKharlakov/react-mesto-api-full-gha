import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext)
    const isOwn = card.owner._id === currentUser._id
    const isLiked = card.likes.some(i => i === currentUser._id)
    const cardLikeButtonClassName = (
        `elements__like-button ${isLiked && 'elements__like-button_active'}`
    );
    const cardDeleteButtonClassName = (
        `elements__delete-button ${!isOwn && 'elements__delete-button_hidden'}`
    )

    function handleCardClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleDeleteClick() {
        onCardDelete(card)
    }

    return (
        <li className="elements__element">
            <button className={cardDeleteButtonClassName} type="button" aria-label="Удалить" onClick={handleDeleteClick} />
            <img className="elements__photo" src={card.link} alt={card.name} onClick={handleCardClick} />
            <div className="elements__info">
                <h2 className="elements__title">{card.name}</h2>
                <div className="elements__likes">
                    <button className={cardLikeButtonClassName} type="button" aria-label="Оценить" onClick={handleLikeClick} />
                    <p className="elements__like-count">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card