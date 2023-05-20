import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext)
    React.useEffect(() => {
        console.log(cards, cards.length)
    })

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img className="profile__avatar" src={currentUser.avatar} alt="Ваш аватар" />
                    <button className="profile__edit-avatar-button" onClick={() => { onEditAvatar(true) }} />
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button className="profile__edit-button" id="btn-show-edit-profile-form" type="button" aria-label="Редактировать профиль" name="EditProfile" onClick={() => { onEditProfile(true) }} />
                    <p className="profile__brief">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" id="btn-show-add-photos-form" type="button" aria-label="Добавить" name="AddPhotos" onClick={() => { onAddPlace(true) }} />
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                    ))}
                </ul>
            </section>
        </main>
    )
}

export default Main