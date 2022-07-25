const BASE_URL = "https://api.domainname.students.nomorepartiesxyz.ru";

function handleCheckResponse(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка ${res.status}`);
    }
}


export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => handleCheckResponse(res));
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => handleCheckResponse(res))
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            'Accept': 'application/json',
        },
    })
        .then((res) => handleCheckResponse(res));
};
