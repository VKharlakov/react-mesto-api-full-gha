import React from "react";

function Login({ onLogin, userData, isRegisterSuccessful }) {
    const [formValue, setFormValue] = React.useState({ email: '', password: '' })   //Стейт с данными инпутов

    //Если регистрация прошла успешно, в value инпутов вставятся email, password из регистрации
    React.useEffect(() => {
        if (isRegisterSuccessful) {
            setFormValue({ email: userData.email, password: userData.password })
        }
    }, [])

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
        onLogin(email, password)

        setFormValue({ email: '', password: '' })
    }

    return (
        <form onSubmit={handleSubmit} className="auth-form" >
            <h1 className="auth-form__title">Вход</h1>
            <input name="email" value={formValue.email} onChange={handleChange} placeholder="Email" className="auth-form__input" />
            <input name="password" value={formValue.password} onChange={handleChange} placeholder="Пароль" className="auth-form__input" />
            <button className="auth-form__button">Войти</button>
        </form>
    )
}

export default Login