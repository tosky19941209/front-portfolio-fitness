import React, { useState } from "react";
import { Button, Input } from "reactstrap";
import api from '../service/axios'
import { useNavigate } from "react-router-dom";
import toastr from "toastr";
function Verify() {
    const [verifyCode, SetVerifyCode] = useState("")
    const [title, setTitle] = useState("Email Verify")
    const navigate = useNavigate()
    return (
        <div className="flex flex-col w-[100%] h-[100vh] justify-center items-center">
            <p className="text-[30px] text-[#5534A5]">Email Verify</p>
            <Input value={verifyCode} type="text" className="mt-10 text-center" style={{ width: "50%" }}
                // style={{
                //     textAlign: "center"
                // }}
                onChange={(e) => {
                    SetVerifyCode(e.target.value)
                }} />

            <button className="w-[150px] h-[50px] mt-16 bg-[#5534A5] text-[white] text-[25px] rounded-lg"
                onClick={() => {
                    console.log(verifyCode)
                    api.get('/admin/verifyemail', { params: { email: localStorage.getItem("email"), verifyCode: verifyCode } })
                        .then((res) => {
                            if (res.data.message === "success") {
                                setTitle("Successfully verified!")
                                localStorage.removeItem("email")
                                navigate("/signin")
                                toastr.success("Registed Successfully")
                            }
                            else {
                                setTitle("Failed verify.")
                                toastr.info("Failed verify")
                            }
                        })
                        .catch((err) => {
                            setTitle("Net Error")
                        })
                }}>
                Verify
            </button>
        </div>
    )
}

export default Verify;