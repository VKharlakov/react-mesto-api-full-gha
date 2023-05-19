import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = React.useContext(CurrentUserContext)

    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')

    function handleNameChange(e) {
        setName(e.target.value)
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()

        onUpdateUser({
            name: name,
            about: description
        })
    }

    React.useEffect(() => {
        setName(currentUser.name)
        setDescription(currentUser.about)
    }, [currentUser, isOpen])


    return (
        <PopupWithForm
            name="edit-profile"
            title="Редактировать профиль"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input className="popup__input popup__input_type_name" id="input-name" onChange={handleNameChange} value={name || ''} placeholder="Введите имя" name="name" minLength="2" maxLength="40" type="text" required />
            <span id="input-name-error" className="popup__error-hint" />
            <input className="popup__input popup__input_type_brief" id="input-brief" onChange={handleDescriptionChange} value={description || ''} placeholder="Опишите себя" name="brief" minLength="2" maxLength="200" type="text" required />
            <span id="input-brief-error" className="popup__error-hint" />
        </PopupWithForm>
    )
}

export default EditProfilePopup