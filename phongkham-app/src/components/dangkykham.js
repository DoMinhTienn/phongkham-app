import React, { useContext, useEffect, useState } from "react";
import Api, { endpoints } from "../configs/Api";
import { UserContext } from "../App";
import { Link, useNavigate } from "react-router-dom";

const DangKyKham = () => {
    const [user, dispatch] = useContext(UserContext)
    const [ho, setHo] = useState()
    const [ten, setTen] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [gioitinh, setGioitinh] = useState()
    const [ngaykham, setNgaykham] = useState()
    const [showPopup, setShowPopup] = useState(false);
    const [popupcontent, setPopupcontent] = useState("");
    const nav = useNavigate()

    useEffect(() => {
        if (user) {
            setHo(user.last_name);
            setTen(user.first_name);
            setEmail(user.email);
        }
      }, [user]);

    const Dangky = async (evt) => {
        evt.preventDefault()
        const r = await Api.get(`${endpoints['dangkykham']}?date=${ngaykham}`)
        setShowPopup(true);
        const datlich = async () => {
            const formData = new FormData()
            formData.append("ho_bennhan", ho)
            formData.append("ten_benhnhan", ten)
            formData.append("email", email)
            formData.append("phone", phone)
            formData.append("gioitinh", gioitinh)
            formData.append("ngay_kham", new Date(ngaykham).toISOString())
            const res = await Api.post(endpoints['dangkykham'], formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

        }
        let content = "";
        if (r.data.length < 100) {
            datlich()
            content = "Bạn đã đăng ký khám thành công";
        }
        else
            content = "Không thể đăng ký do quá số lượng đăng ký khám hôm nay. Vui lòng đăng ký vào ngày khác!";

        setPopupcontent(<span className="close-content">{content}</span>);

    }

    let btn

    if (user != null)
    {

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
                    defaultValue={user.email}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder='Email'
                />
            </div>
        </>
    }

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
        <div className="DangkyKham">

            <form onSubmit={Dangky}>
                <div>Đăng Ký Lịch Khám</div>
                {btn}
                <div>
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
                <button type="submit">Đăng ký </button>
                {showPopup && (
                    <div className="popup-container">
                        <div className="popup-content">
                            <div>
                                <Link to="/"><button onClick={() => setShowPopup(false)} className="close">&times;</button></Link>
                                {popupcontent}
                            </div>


                        </div>
                    </div>
                )}
            </form>
        </div>
    )
}

export default DangKyKham