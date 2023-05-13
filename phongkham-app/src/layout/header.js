import React, { memo, useContext } from "react";
import { Link } from "react-router-dom";
import cookies from "react-cookies";
import { UserContext } from "../App";


function Header() {
  const [user, dispatch] = useContext(UserContext)

  const logout = (evt) => {
    evt.preventDefault()
    cookies.remove('token')
    cookies.remove('user')

    dispatch({ "type": "logout" })
  }




  let btn
  let type =  <li><Link to="/dangkykham">Đặt lịch khám</Link></li>
  if (user != null) {
    btn =
      <div className="user">
        <img src={user.avatar_path} />
        <span>Hi, {user.first_name + " " + user.last_name}</span>
        <button className="logout-button" onClick={logout}>Đăng xuất</button>
      </div>
    if (user.usertype == "bacsi")
      type = <li><Link to="/lichkham">Lịch khám</Link></li>
  }

  else {
    btn = <nav className="login">
      <button><Link to="/login">Đăng nhập</Link></button>
      <button><Link to="/register">Đăng ký</Link></button>
    </nav>
  }

  return (<>

    <nav className="header">
      <ul>
        <li><Link to="/">Trang chủ</Link></li>
        <li><Link to="#">Dịch vụ</Link></li>
        {type}
        <li><Link to="#">Liên hệ</Link></li>
      </ul>
      {btn}
    </nav>

  </>
  )
}

export default memo(Header)