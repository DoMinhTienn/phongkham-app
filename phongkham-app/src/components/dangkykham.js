import React, { useEffect, useState } from "react";
import Api, { endpoints } from "../configs/Api";

const DangKyKham =  () => {
    const[dangky, setDangky] = useState([])
    const [test] = useState("test")
    const [gioitinh] = useState("nam")

    const [usertype] = useState("2023-05-11")


    const alaba = async (evt) => {
        evt.preventDefault()
        const formData = new FormData()
        formData.append("ho_bennhan", test)
        formData.append("ten_benhnhan", test)
        formData.append("email", test)
        formData.append("phone", test)
        formData.append("gioitinh", gioitinh)
        formData.append("ngay_kham", usertype)
        const res = await Api.post(endpoints['dangkykham'], formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    //         setDangky(res.data)
    //         const count = dangky.length
    // console.log(count)

    }

    // useEffect(() => {
    //     const loadDangky = async () => {
    //         const res = await Api.get(endpoints['dangkykham'])
    //         setDangky(res.data)
    //     }
    //     loadDangky()
    // }, [])

    

    
    return (
        <h1>
            <form onSubmit={alaba}>
                <button type="submit">A</button>
            </form>
        </h1>
    )
}

export default DangKyKham