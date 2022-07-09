
export const url = 'http://localhost:3000';

function getResponse(res) {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

export const register = (password, email) => {
    return fetch(`${url}/signup`, {
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
    return fetch(`${url}/signin`, {
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
    return fetch(`${url}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        }
    })
        .then((res) => {
            return getResponse(res)
        })
}

