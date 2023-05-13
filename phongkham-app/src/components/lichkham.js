import React, { useEffect, useState } from "react";
import Api, { endpoints } from "../configs/Api";
import { Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment-timezone";

const LichKham = () => {
    const [danhsach, setDanhsach] = useState([])
    const today = moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD");
    const [ngaykham, setNgaykham] = useState(today)
    const nav = useNavigate()

    useEffect(() => {
        lichkham({preventDefault: () => {}});
    }, []);


    const lichkham = async (evt) => {
        evt.preventDefault()
        const res = await Api.get(`${endpoints['dangkykham']}?date=${ngaykham}`)
        setDanhsach(res.data)
    }

    const hoso = async (id) => {
        const r = await Api.patch(endpoints['deactive'](id))
        nav(`/donkham/${id}`)
    }


    let list =  <div className="item danger"> KHÔNG CÓ BỆNH NHÂN HÔM NAY</div>
    if (danhsach.length != 0)
        list = <>
            <div className="item">
                <Col xs={9} className="title">Họ tên bệnh nhân</Col>
            </div>

            {danhsach.map(d => {
                return <div className="item">
                    <Col xs={9} className="patient-name">{d.ho_bennhan}  {d.ten_benhnhan}</Col>
                    {d.active ? <Col xs={3}><button className="appointment-btn" onClick={() => hoso(d.id)} disabled={ngaykham !== today}>Xác nhận</button></Col> : <Col xs={3} className="d"> Đã Khám</Col>}
                </div>
            })}
        </>
    return (
        <>
            <div className="patient-search">
                <form onSubmit={lichkham}>
                    <div>
                        <span>Ngày khám: </span>
                        <input
                            type="date"
                            id="date"
                            value={ngaykham}
                            onChange={(event) => setNgaykham(event.target.value)}
                        />
                        <button type="submit">Đăng ký </button>
                    </div>
                </form>

            </div>
            <div className="patient-list">
                <div>
                    {list}
                   
                </div>


            </div>
        </>


    )
}

export default LichKham