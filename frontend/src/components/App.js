import '../App.css';
import React from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRouteElement from './ProtectedRoute';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';

import api from "../utils/api";
import * as auth from '../utils/auth'
import InfoToolTip from './InfoToolTip';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);  //Стейт состояния открытия для окна EditProfilePopup
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);        //Стейт состояния открытия для окна AddPlacePopup
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);    //Стейт состояния открытия для окна EditAvatarPopup
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = React.useState(false);  //Стейт состояния открытия для окна InfoToolTipPopup
  const [isRegisterSuccessful, setIsRegisterSuccessful] = React.useState(false)       //Стейт состояния успеха регистрации
  const [loggedIn, setLoggedIn] = React.useState(false)                               //Стейт с состоянием авторизованности пользователя

  const [selectedCard, setSelectedCard] = React.useState({});   //Стейт с адресом выбранной карточки
  const [userData, setUserData] = React.useState('')            //Стейт с информацией о пользователе, полученной с api
  const [currentUser, setCurrentUser] = React.useState({})      //Стейт с email, password пользователя, полученной после регистрации
  const [cards, setCards] = React.useState([]);                 //Стейт с массивом фотографий, полученных с api

  const navigate = useNavigate()                                //Хук навигации

  React.useEffect(() => {
    loggedIn &&
      api.getUserInfo()
        .then((userData) => {
          setCurrentUser(userData)
        })
        .catch((err) => console.log(err))

    loggedIn &&
      api.getInitialCardSet()
        .then((cardList) => {
          console.log('getting cards api')
          setCards(cardList)
          cards.map((card) => ({
            name: card.name,
            link: card.link,
            likes: card.likes,
            _id: card._id,
            owner: card.owner
          }))
        })
        .catch((err) => console.log(err))
  }, [loggedIn])

  React.useEffect(() => {
    //Проверка наличия токена в localStorage
    tokenCheck()

    //Метод получения массива фотографий с api

  }, [])

  //Объявление функции проверки наличия токена в localStorage
  function tokenCheck() {
    if (localStorage.getItem('jwt')) {
      const token = localStorage.getItem('jwt')

      if (token) {
        auth.checkToken(token)
          .then((res) => {
            if (res) {
              setUserData({ 'email': res.data.email })
              setLoggedIn(true)
              navigate('/', { replace: true })
            }
          })
          .catch((err) => console.log(err))
      }
    }
  }

  //Объявление функции обновления информации о пользователе
  function handleUpdateUser(newUserData) {
    api.patchUserInfo(newUserData)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  //Объявление функции обновления аватара пользователя
  function handleUpdateAvatar(newUserAvatar) {
    api.editUserAvatar(newUserAvatar)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  //Объявление функции добавления новой фотографии
  function handleAddPlace(newPlace) {
    api.postNewCard(newPlace)
      .then((data) => {
        setCards([data, ...cards])
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  //Объявление функции закрытия всех окон
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsInfoToolTipPopupOpen(false)
    setSelectedCard({})
  }

  //Объявление функции добавления/удаления лайка
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err))
  }

  //Объявление функции удаления фотографии
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter(item => item._id !== (card._id)))
      })
      .catch((err) => {
        console.log(err);
      })
  }

  //Объявление функции регистрации
  function handleRegister(email, password) {
    auth.register(email, password)
      .then((res) => {
        if (res) {
          setIsRegisterSuccessful(true)
          setUserData({ 'email': email, 'password': password })
        }
      })
      .catch((err) => {
        console.log(err)
        setIsRegisterSuccessful(false);
      })
      .finally(() => {
        setIsInfoToolTipPopupOpen(true);
      })
  }

  //Объявление функции авторизации
  function handleAuthorize(email, password) {
    auth.authorize(email, password)
      .then((res) => {
        if (res.token) {
          setUserData({ 'email': email })
          setLoggedIn(true)
          navigate('/', { replace: true })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //Объявление функции выхода из учетной записи
  function handleLogOut() {
    localStorage.removeItem('jwt')
    setUserData({ email: '', password: '' })
    navigate('/signin', { replace: true })
    setLoggedIn(false)
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} userData={userData} onLogOut={handleLogOut} />
        <Routes>
          <Route path='/' element={<ProtectedRouteElement element={Main} loggedIn={loggedIn}
            onEditProfile={setIsEditProfilePopupOpen}
            onAddPlace={setIsAddPlacePopupOpen}
            onEditAvatar={setIsEditAvatarPopupOpen}
            onCardClick={setSelectedCard}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards} />} />
          <Route path='/signin' element={<Login onLogin={handleAuthorize} isRegisterSuccessful={isRegisterSuccessful} userData={userData} />} />
          <Route path='/signup' element={<Register onRegister={handleRegister} />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>

        {loggedIn && <Footer />}

        {/* <!-- Окно успеха/провала регистрации --> */}
        <InfoToolTip
          isOpen={isInfoToolTipPopupOpen}
          isRegisterSuccessful={isRegisterSuccessful}
          onClose={closeAllPopups}
          name='info-tool-tip-popup'
        />

        {/* <!-- Окно редактирования информации пользователя --> */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/* <!-- Окно добавления фотографий --> */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

        {/* <!-- Окно редактирования аватара пользователя --> */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/* <!-- Окно с полноэкранным режимом фотографий --> */}
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        {/* <!-- Окно подтверждения удаления фотографии --> */}
        <PopupWithForm
          name="delete-confirmation"
          title="Вы точно хотите удалить?"
          buttonText="Да"
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
