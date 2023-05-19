import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [placeName, setPlaceName] = React.useState('')
    const [placeLink, setPlaceLink] = React.useState('')

    function handleNameChange(e) {
        setPlaceName(e.target.value)
    }

    function handleLinkChange(e) {
        setPlaceLink(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()

        onAddPlace({
            name: placeName,
            link: placeLink
        })
    }

    React.useEffect(() => {
        setPlaceName('')
        setPlaceLink('')
    }, [isOpen])

    return (
        <PopupWithForm
            name="add-photos"
            title="Новое место"
            buttonText="Добавить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input className="popup__input popup__input_type_photo-title" value={placeName} onChange={handleNameChange} placeholder="Введите название места" name="name" id="mesto-name" minLength="2" maxLength="30" type="text" required />
            <span className="popup__error-hint" id="mesto-name-error" />
            <input className="popup__input popup__input_type_photo-link" value={placeLink} onChange={handleLinkChange} placeholder="Ссылка на фотографию" name="link" id="mesto-link" type="url" required />
            <span className="popup__error-hint" id="mesto-link-error" />
        </PopupWithForm>
    )
}

export default AddPlacePopup