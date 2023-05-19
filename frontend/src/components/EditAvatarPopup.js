import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = React.useRef()

    function handleSubmit(e) {
        e.preventDefault()

        onUpdateAvatar({
            avatar: avatarRef.current.value
        })
    }

    React.useEffect(() => {
        avatarRef.current.value = ''
    }, [isOpen])

    return (
        <PopupWithForm
            name="edit-profile-avatar"
            title="Обновить аватар"
            buttonText="Обновить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input className="popup__input popup__input_type_photo-link" ref={avatarRef} placeholder="Ссылка на фотографию" name="avatar" id="avatar-link" type="url" required />
            <span className="popup__error-hint" id="avatar-link-error" />
        </PopupWithForm>
    )
}

export default EditAvatarPopup