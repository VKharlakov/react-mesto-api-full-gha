import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo/logo.svg';

function Header({ loggedIn, userData, onLogOut }) {
    const currentPath = useLocation()

    const nonAuthorizedElements = () => {
        if (currentPath.pathname === '/sign-in') {
            return (
                <Link className="header__link" to={'/sign-up'}>Зарегистрироваться</Link>
            )
        } else {
            return (
                <Link className="header__link" to={'/sign-in'}>Войти</Link>
            )
        }
    }

    const authorizedElements = () => {
        return (
            <div className="header__profile-info">
                <p className="header__email">{userData.email}</p>
                <button onClick={onLogOut} className="header__logout-btn">Выйти</button>
            </div>
        )
    }


    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип Mesto" />
            {loggedIn ? authorizedElements() : nonAuthorizedElements()}
        </header>
    )
}

export default Header;