import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api, { endpoints } from "../configs/Api";

const DonKham = () => {
    
    const [trieuchung, setTrieuchung] = useState()
    const [ketluan, setKetluan] = useState()
    const q = parseInt(useParams().Id)
    const[thuoc, setThuoc] = useState([])
    const [data, setData] = useState([])
    const nav = useNavigate()

    useEffect(() => {
        const danhsachthuoc = async () => {
            const r = await Api.get(endpoints['thuoc'])
            setThuoc(r.data)
        }
        danhsachthuoc()
       
    }, []);

    const handleSelectThuoc = (event) => {
        const selectedValue = event.target.value;
        // Kiểm tra nếu loại thuốc đã được chọn rồi thì không thêm vào mảng thuốc được chọn
        if (!data.includes(selectedValue)) {
            setData([...data, selectedValue]);
        }
      };    
    const donkham = async (evt) => {
        evt.preventDefault()
        const formData = new FormData()
        formData.append("dang_ky", q)
        formData.append("Trieu_chung", trieuchung)
        formData.append("ket_luan", ketluan)
        const res = await Api.post(endpoints['donkham'], formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        nav("/lichkham")
    }

    return (
        <div className="donkham-container">
  <form onSubmit={donkham}>
    <div>
      <label>Triệu chứng: </label>
      <textarea
        id="trieuchung"
        name="trieuchung"
        rows="2"
        cols="70"
        value={trieuchung}
        onChange={(event) => setTrieuchung(event.target.value)}
      />
    </div>
    <div>
      <label>Kết luận: </label>
      <textarea
        id="ketluan"
        name="ketluan"
        rows="2"
        cols="70"
        value={ketluan}
        onChange={(event) => setKetluan(event.target.value)}
      />
    </div>
    <button type="submit">Hoàn Thành</button>
  </form>
  <div className="abc">
        <select onChange={handleSelectThuoc}>
        <option value="">--Chọn--</option>
        {thuoc.map(t => {
                return <option value={t.id}>{t.name} - {t.donvi} - {t.gia}đ </option>
            })}
    </select>
    <select onChange={handleSelectThuoc}>
        <option value="">--Chọn--</option>
        {thuoc.map(t => {
                return <option value={t.id}>{t.name} - {t.donvi} - {t.gia}đ </option>
            })}
    </select>
    <select onChange={handleSelectThuoc}>
        <option value="">--Chọn--</option>
        {thuoc.map(t => {
                return <option value={t.id}>{t.name} - {t.donvi} - {t.gia}đ </option>
            })}
    </select>
    <select onChange={handleSelectThuoc}>
        <option value="">--Chọn--</option>
        {thuoc.map(t => {
                return <option value={t}>{t.name} - {t.donvi} - {t.gia}đ </option>
            })}
    </select>

  </div>
</div>

    )
}
export default DonKham