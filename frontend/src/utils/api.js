import { checkResponse, BASE_URL } from './utils';
class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }
    _checkResponse(res){
        if(res.ok) {
            return res.json()
        }
        return Promise.reject(res.status)
    }
    getProfile(jwt) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
        })
            .then(res=>this._checkResponse(res))
    }
    getInitialCards(jwt) {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
        })
            .then(res=>checkResponse(res))
    }

    editProfile(name, about, jwt) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                name,
                about
            })
        })
            .then((res)=>this._checkResponse(res))
    }

    addCards(data, jwt) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            }),
        })
            .then((res)=>checkResponse(res))
    }

    deleteCard(id, jwt) {
        // console.log(id)
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
        })
            .then((res)=>checkResponse(res))
    }

    deleteLike(id, jwt) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
        })
            .then((res)=>this._checkResponse(res))
    }

    addLike(id, jwt) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
        })
            .then((res)=>checkResponse(res))
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return this.addLike(cardId);
        } else {
            return this.deleteLike(cardId);
        }
    }

    updateAvatar(item, jwt) {
        return fetch(`${this._baseUrl}/users/me/avatar`,{
                method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
                body: JSON.stringify({
                    avatar: item.avatar,
                }),
            }
        )
            .then((res)=>checkResponse(res))
    }
}

const api = new Api({
    baseUrl: BASE_URL,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'content-type': 'application/json'
    }
});

export default api;
