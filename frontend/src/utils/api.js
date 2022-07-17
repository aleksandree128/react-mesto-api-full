import {apiUrl} from "./const";

class Api {
    constructor({ baseUrl, headers }) {
        this._headers = headers;
        this._baseUrl = baseUrl;
    }
    _checkResponse(res){
        if(res.ok) {
            return res.json()
        }
        return Promise.reject(res.status)
    }
    getProfile() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        })
            .then(res=>this._checkResponse(res))
    }
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        })
            .then(res=>this._checkResponse(res))
    }

    editProfile(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
            })
        })
            .then(res=>this._checkResponse(res))
    }

    addCards(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            }),
        })
            .then(res=>this._checkResponse(res))
    }

    deleteCard(id) {
        // console.log(id)
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then(res=>this._checkResponse(res))
    }

    deleteLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then(res=>this._checkResponse(res))
    }

    addLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: "PUT",
            headers: this._headers,
        })
            .then(res=>this._checkResponse(res))
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return this.addLike(cardId);
        } else {
            return this.deleteLike(cardId);
        }
    }

    updateAvatar(item) {
        return fetch(`${this._baseUrl}/users/me/avatar`,{
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({
                    avatar: item.avatar,
                }),
            }
        )
            .then(res=>this._checkResponse(res))
    }
}

const api = new Api(apiUrl);

export default api
