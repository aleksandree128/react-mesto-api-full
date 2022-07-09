import React from 'react';

function Login({onLogin}) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleEmail(evt) {
        setEmail(evt.target.value);
    }

    function handlePassword(evt) {
        setPassword(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onLogin(email, password);
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h3 className="login-form__title">Вход</h3>
            <input className="login-form__input login-form__input_login-email" placeholder="Email"
                   type="email" onChange={handleEmail} required />
            <input className="login-form__input login-form__input_login-pass" placeholder="Пароль"
                   type="password" onChange={handlePassword} required />
            <button className="login-form__button" type="submit">Войти</button>
        </form>
    )
}

export default Login;