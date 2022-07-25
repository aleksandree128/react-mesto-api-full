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
            method: 'GET',
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

    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
            return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: 'PUT',
                headers: this._headers(),
            })
                .then((res) => this._checkResponse(res))
        } else {
            return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: 'DELETE',
                headers: this._headers(),
            })
                .then((res) => this._checkResponse(res))
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

const api = new Api({
    baseUrl: 'https://api.domainname.students.nomorepartiesxyz.ru',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'content-type': 'application/json'
    }
});

export default api;


