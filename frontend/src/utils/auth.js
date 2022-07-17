import {apiUrl} from "./const";

function getResponse(res) {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

export const register = (password, email) => {
    return fetch(`${apiUrl.baseUrl}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
        .then((res) => {
            console.log(res)
            return getResponse(res)
        })
};

export const authorization = (password, email) => {
    return fetch(`${apiUrl.baseUrl}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
        .then((res) => {
            return getResponse(res)
        })
}

export const validityToken = (token) => {
    return fetch(`${apiUrl.baseUrl}/users/me`, {
        method: 'GET',
        headers: {authorization: 'Bearer ' + localStorage.getItem('jwt'), ...apiUrl.headers},
    })
        .then((res) => {
            return getResponse(res)
        })
}

