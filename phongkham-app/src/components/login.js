import React, { useState, useContext } from 'react'
import { UserContext } from '../App'
import { Form, Link, Navigate, useNavigate } from 'react-router-dom'
import Api, { authApi, endpoints } from '../configs/Api'
import cookies from 'react-cookies'
const Login = () => {
    const nav = useNavigate()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [user, dispatch] = useContext(UserContext)
    const [err, setErr] = useState(false)


    const login = async (evt) => {

        evt.preventDefault()

        let info = Api.get(endpoints["oauth2-info"])
        try {
    
            const res = await Api.post(endpoints['login'], {
                'username': username,
                'password': password,
                'client_id': (await info).data.client_id,
                'client_secret': (await info).data.client_secret,
                'grant_type': 'password'
            })
            cookies.save('token', res.data.access_token)

            const user = await authApi().get(endpoints['current-user'])
            cookies.save('user', user.data)
            dispatch({
                'type': 'login',
                'payload': user.data
            })
        } catch (e) {
            setErr(true)
        }
    }
    const gotoSignup = (evt) => {
        evt.preventDefault()
        nav(`/signup`)
    }

    if (user != null)
        return <Navigate to="/" />

    return (

        <div className='login-container'>
            <form onSubmit={login}>
            <div>Đăng Nhập</div>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(evt) => { setUsername(evt.target.value); setErr(false); }}
                    placeholder="Username"
                />
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(evt) =>{setPassword(evt.target.value); setErr(false)} }
                    placeholder="Password"
                />
                <div className={`${err ? 'err-text-danger' : 'err-hide'}`}>Sai tên đăng nhập hoặc mật khẩu</div>

                <button type="submit">Login</button>
                <Link to="/login">Quên mật khẩu?</Link>
            </form>
        </div>
    )
}

export default Login