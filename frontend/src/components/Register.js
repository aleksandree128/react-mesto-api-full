import React from 'react';
import { Link } from 'react-router-dom';


const Register = ({onRegister}) => {

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
        onRegister(email, password);
    }

    return(
        <form className="login-form" onSubmit={handleSubmit}>
            <h3 className="login-form__title">Регистрация</h3>
            <input className="login-form__input login-form__input_login-email" type="email" onChange={handleEmail} placeholder="Email" required />
            <input className="login-form__input login-form__input_login-pass"  type="password" onChange={handlePassword} placeholder="Пароль" required/>
            <button className="login-form__button" type="submit">Зарегистрироваться</button>
            <div className="login-form__container">
                <p className="login-form__text">Уже зарегистрированы?</p>
                <Link to="/sign-in" className="login-form__link">Войти</Link>
            </div>
        </form>
    )
}

export default Register;