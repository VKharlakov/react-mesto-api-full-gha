import React from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
    const [formValue, setFormValue] = React.useState({ email: '', password: '' }) //Стейт с данными инпутов

    function handleChange(e) {
        const { name, value } = e.target

        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        const { email, password } = formValue
        onRegister(email, password)
    }

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h1 className="auth-form__title">Регистрация</h1>
            <input name="email" value={formValue.email} onChange={handleChange} placeholder="Email" className="auth-form__input" />
            <input name="password" value={formValue.password} onChange={handleChange} placeholder="Пароль" className="auth-form__input" />
            <button className="auth-form__button">Зарегистрироваться</button>
            <Link to={'/sign-in'} className="auth-form__link">Уже зарегистрированы? Войти</Link>
        </form>
    )
}

export default Register