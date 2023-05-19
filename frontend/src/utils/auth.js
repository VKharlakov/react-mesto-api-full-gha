export const BASE_URL = 'https://mesto.students.vkharlakov.nomoredomains.monster/api'

function returnResponse(res) {
    if (res.ok) {
        return res.json()
    } else {
        return Promise.reject(`Была допущена ошибка: ${res.status}`)
    }
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then((res) => returnResponse(res))
}


export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then((res) => returnResponse(res) )
    .then((res) => {
        if (res.token) {
            localStorage.setItem('token', res.token)
            return res
        }
    })
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    .then((res) => returnResponse(res) )
} 