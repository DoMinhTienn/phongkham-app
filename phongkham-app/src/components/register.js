import React, { useState, useContext, useRef } from 'react'
import Api, { authApi, endpoints } from '../configs/Api'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [firstName, setFirstName] = useState()
    const [usertype] = useState("benhnhan")
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const avatar = useRef()
    const [err, setErr] = useState(false)
    const [valid, setValid] = useState(false)
    const nav = useNavigate()
    const register = (evt) => {
        evt.preventDefault()
        const registerUser = async () => {

            const formData = new FormData()
            formData.append("first_name", firstName)
            formData.append("last_name", lastName)
            formData.append("username", username)
            formData.append("password", password)
            formData.append("usertype", usertype)
            formData.append("email", email)

            if (avatar.current.files[0])
                formData.append("avatar", avatar.current.files[0])
            else
                formData.append("avatar_path", null)

            try {
                const res = await Api.post(endpoints['register'], formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                nav(`/login`)
            } catch (e) {
                setErr(true)
            }
        }
        if (password !== null && password === confirmPassword) {
            registerUser()
        }
        if (password != confirmPassword) {
            setValid(true);
        }

    }

    return (

        <div className='register-user'>
            <form onSubmit={register}>
                <div>Đăng Ký</div>
                <div>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        placeholder='First Name'
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        placeholder='Last Name'
                    />
                </div>
                <div>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(event) => { setEmail(event.target.value) }}
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(event) => { setUsername(event.target.value); setErr(false) }}
                        placeholder='Username'
                        className={`${err ? 'err' : ''}`}

                    />

                </div>
                <div className={`${err ? 'err-text-danger' : 'err-hide'}`}>Username đã tồn tại. Vui lòng chọn username khác!</div>

                <div>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => { setPassword(event.target.value); setValid(false) }}
                        placeholder='Password'
                    />

                </div>
                <div>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(event) => { setConfirmPassword(event.target.value); setValid(false) }}
                        placeholder='Confirm Password'
                        className={`${valid ? 'err' : ''}`}
                    />
                </div>
                <div className={`${valid ? 'err-text-danger' : 'err-hide'}`}>Password không khớp. Vui lòng thử lại!</div>

                <div>
                    <input
                        type="file"
                        id="avatar"
                        ref={avatar}
                    />
                </div>
                <button type="submit">Register</button>
                <div>Bạn đã có tài khoản ?<Link to="/login" > Đăng nhập</Link></div>
            </form>
        </div>
    )
}

export default Register