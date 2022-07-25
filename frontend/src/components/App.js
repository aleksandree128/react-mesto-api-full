import React, {useEffect} from "react";
import "../pages/index.css";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import {api} from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import { Route, Redirect, Switch, useHistory } from 'react-router-dom';
import { register, authorize, checkToken } from '../utils/auth';
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";


function App() {
    const [editAvatarPopup, setEditAvatarPopup] = React.useState(false);
    const [editProfilePopup, setEditProfilePopup] = React.useState(false);
    const [addImagePopup, setAddImagePopup] = React.useState(false);
    const [selectCard, setSelectCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [infoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
    const [message, setMessage] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState('');

    const history = useHistory();

    React.useEffect(() => {
        if (loggedIn) {
            history.push('/');
            api
                .getUserProfile()
                .then((res) => {
                    setCurrentUser({
                        name: res.data.name,
                        about: res.data.about,
                        avatar: res.data.avatar,
                        _id: res.data._id,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
            api
                .getInitialCards()
                .then((data) => {
                    setCards(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
    }, []);


    React.useEffect(()=> {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            checkToken(jwt)
                .then((res) => {
                    if (res) {
                        setUserEmail(res.data.email);
                        setLoggedIn(true);
                        history.push('/');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },[])

    useEffect(()=>{
        if(loggedIn===true){
            history.push('/');
        }
    },[loggedIn, history])

    function handleEditAvatarClick() {
        setEditAvatarPopup(true);
    }

    function handleEditProfileClick() {
        setEditProfilePopup(true);
    }

    function handleAddPlaceClick() {
        setAddImagePopup(true);
    }

    function handleCardClick(card) {
        setSelectCard(card);
    }

    function closeAllPopups() {
        setEditAvatarPopup(false);
        setEditProfilePopup(false);
        setAddImagePopup(false);
        setSelectCard({});
        setInfoTooltipOpen(false);
    }

    function handleUpdateUser(data) {
        api
            .profileEdit({name: data.name, about: data.about})
            .then((dataProfile) => {
                setCurrentUser(dataProfile);
                closeAllPopups();
            })
            .catch((err) => console.log(`Ошибка: ${err}`));
    }

    function handleUpdateAvatar(data) {
        api
            .editAvatar({ avatar: data.avatar })
            .then((dataAvatar) => {
                setCurrentUser(dataAvatar);
                closeAllPopups();
            })
            .catch((err) => console.log(`Ошибка: ${err}`));
    }

    function handleAddPlaceSubmit(data) {
        api.addNewCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((res) => {
                setCards((state) => state.map((c) => c._id === card._id ? res : c));
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
                closeAllPopups();
        })
            .catch((err) => console.log(`Ошибка: ${err}`));

    }

    function registering(email, password) {
        register(email, password)
            .then((res) => {
                setInfoTooltipOpen(true);
                if(res) {
                    setMessage(true);
                    history.push('/sign-in');
                }
            })
            .catch(() => {
                setMessage(false);
                setInfoTooltipOpen(true);
            });
    }

    function login(email, password) {
        authorize(password, email)
            .then((res) => {
                if(res) {
                    localStorage.setItem('jwt', res.token);
                    setLoggedIn(true);
                    setUserEmail(email);
                    history.push('/');
                }
            })
            .catch(() => {
                setMessage(false);
                setInfoTooltipOpen(true);
            });
    }

    function ExitProfile() {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        setUserEmail('');
        history.push('/sign-in');
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="fonts">
                <div className="page">
                    <Header
                        userEmailOnHeader={userEmail}
                        logoutProfile={ExitProfile}
                    />
                    <Switch>
                    <ProtectedRoute
                        component={Main}
                        exact path="/"
                        loggedIn={loggedIn}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                    />
                        <ProtectedRoute
                            component={Footer}
                            exact path="/"
                            loggedIn={loggedIn}
                        />
                        <Route path="/sign-in">
                            <Login
                                onLogin={login}
                            />
                        </Route>
                        <Route path="/sign-up">
                            <Register
                                onRegister={registering}
                            />
                        </Route>
                        <Route>
                            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-up"/>}
                        </Route>
                    </Switch>
                    <InfoTooltip
                        isOpen={infoTooltipOpen}
                        onClose={closeAllPopups}
                        status={message}
                    />
                </div>
            </div>
            <EditProfilePopup
                isOpen={editProfilePopup}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
            />
            <EditAvatarPopup
                isOpen={editAvatarPopup}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
            />
            <AddPlacePopup
                isOpen={addImagePopup}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
            />

            <ImagePopup
                card={selectCard}
                onClose={closeAllPopups}
                isOpen={Object.keys(selectCard).length !== 0}
            />
        </CurrentUserContext.Provider>
    );
}

export default App;
