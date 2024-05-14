import React, { useState } from "react";
import { Button, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";
import api from "../service/axios"
import toastr from "toastr";
function SignIn() {
    const navigate = useNavigate();
    const NavigateToSignUp = () => {

        // const config = {
        //     headers: {
        //         "authorization": localStorage.getItem("token")
        //     }
        // };

        // api.post("/admin/signin", { email: "qwer", name: "asdf" }, config)
        //     .then((res) => {
        //     });

        navigate("/signup")
    }
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const SignIn = () => {
        api.get("/admin/signin", { params: { email: email, password: password } })
            .then((res) => {
                if (res.data.message === 'success') {
                    toastr.success("Successful")
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("username", res.data.name)
                    navigate("/homepage")
                } else {
                    toastr.info("Email or password is not correct.")
                }
            })
    }
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-[600px] h-[700px] flex flex-col justify-center items-center border rounded">
                <p className="text-[40px] text-[#5534A5]">
                    Log In
                </p>
                <div className="w-[80%]">
                    <p>Email</p>
                    <Input type="email" className="mt-2" placeholder="email" value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }} />
                </div>

                <div className="w-[80%] mt-10">
                    <p>Password</p>
                    <Input type="password" className="mt-2" placeholder="password" value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>

                <div className="w-[80%] mt-20 h-[50px]">
                    <button className="w-full h-full border transition duration-300 bg-[#5534A5] text-[white] hover:bg-white hover:text-[#5534A5]"
                        onClick={SignIn}>
                        Sign In
                    </button>
                </div>
                <p className='mt-10'>
                    If you don't have account, please
                </p>
                <button className='text-[red]' onClick={NavigateToSignUp}>Sign Up</button>
            </div>
        </div>
    )
}

export default SignIn