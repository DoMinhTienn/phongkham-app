import React, { useContext, useEffect, useState } from "react";
import Api, { endpoints } from "../configs/Api";
import { UserContext } from "../App";

const DangKyKham = () => {
    const [user, dispatch] = useContext(UserContext)
    const [ho, setHo] = useState()
    const [ten, setTen] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [gioitinh, setGioitinh] = useState()
    const [ngaykham, setNgaykham] = useState()


      
    const Dangky = async (evt) => {
        evt.preventDefault()
        console.log(gioitinh)
        const r = await Api.get(endpoints['dangkykham'])
        console.log(ngaykham)
        const formData = new FormData()
        formData.append("ho_bennhan", ho)
        formData.append("ten_benhnhan", ten)
        formData.append("email", email)
        formData.append("phone", phone)
        formData.append("gioitinh", gioitinh)
        formData.append("ngay_kham", ngaykham)
        const res = await Api.post(endpoints['dangkykham'], formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        
        const datlich = async () => {
           
        }
        // datlich()



    }

    let btn

    if (user != null)
        btn = <>
            <div>
                <input
                    type="text"
                    id="ho"
                    defaultValue={user.last_name}
                    value={ho}
                    onChange={(event) => setHo(event.target.value)}
                    placeholder='Họ'
                />
            </div>
            <div>
                <input
                    type="text"
                    id="ten"
                    defaultValue={user.first_name}
                    value={ten}
                    onChange={(event) => setTen(event.target.value)}
                    placeholder='Tên'
                />
            </div>
            <div>
                <input
                    type="email"
                    id="email"
                    defaultValue={user.email}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder='Email'
                />
            </div>
        </>

    else
        btn = <>
            <div>
                <input
                    type="text"
                    id="ho"
                    value={ho}
                    onChange={(event) => setHo(event.target.value)}
                    placeholder='Họ'
                />
            </div>
            <div>
                <input
                    type="text"
                    id="ten"
                    value={ten}
                    onChange={(event) => setTen(event.target.value)}
                    placeholder='Tên'
                />
            </div>
            <div>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder='Email'
                />
            </div>
        </>




    return (
        <div>
            <form onSubmit={Dangky}>

                <div>
                    {btn}
                    <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        placeholder='Số điện thọai'
                    />
                </div>
                <div>
                    <select
                        value={gioitinh}
                        id="gioitinh"
                        onChange={(event) => setGioitinh(event.target.value)}>
                        <option value="-">--</option>
                        <option value="nam">Nam</option>
                        <option value="nu">Nữ</option>
                    </select>
                </div>
                <div>
                    <input
                        type="date"
                        id="date"
                        value={ngaykham}
                        onChange={(event) => setNgaykham(event.target.value)}
                    />
                </div>
                <button type="submit">A</button>
            </form>
        </div>
    )
}

export default DangKyKham