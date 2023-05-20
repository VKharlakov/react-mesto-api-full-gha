export const BASE_URL = 
process.env.NODE_ENV === 'production' ? 'https://api.mesto.vkharlakod.nomoredomains.monster' : 'http://localhost:3000'

function returnResponse(res) {
    if (res.ok) {
        return res.json()
    } else {
        return Promise.reject(`Была допущена ошибка: ${res.status}`)
    }
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
        credentials: "include",
      }).then((res) => {
        return returnResponse(res);
      });
}


export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
        credentials: "include",
      }).then((res) => {
        return returnResponse(res);
      });
};

export const checkToken = (token) => {
    console.log('forntend: auth.js: check token started:', token)
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }).then((res) => {
        return returnResponse(res);
      });
} 