import axios from 'axios'
import cookies from 'react-cookies'

export const endpoints = {
    "login": "/o/token/",
    "signup": "/users/",
    "oauth2-info" : "/oauth2-info/",
    "current-user": "/users/current-user/",
    "register": "/users/",
    "dangkykham": "/dangky/",
    "deactive": (id) => `/dangky/${id}/`,
    "donkham":  "/donkham/",
    "thuoc": "/thuoc/"
}

export const authApi = () => {
    return axios.create({
        baseURL: "http://localhost:8000/",
        headers: {
            'Authorization': `Bearer ${cookies.load('token')}`
        }
    })
}

export default axios.create({
    baseURL: "http://localhost:8000/"
})