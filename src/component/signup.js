import React, { useEffect, useState } from "react";
import { Button, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";
import api from "../service/axios"
import toastr from "toastr";
function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("")
    const [username, setUserName] = useState("")
    const [isPassworCorrect, setIsPasswordCorrect] = useState(true)

    const config = {
        headers: {
            "authorization": localStorage.getItem("token")
        }
    }


    const setHandle = (e) => {
        if (e.target.placeholder === "email")
            setEmail(e.target.value)

        if (e.target.placeholder === "password")
            setPassword(e.target.value)

        if (e.target.placeholder === "confirm")
            setConfirm(e.target.value)

        if (e.target.placeholder === "username")
            setUserName(e.target.value)
    }

    useEffect(() => {
        if (password === confirm)
            setIsPasswordCorrect(true)
        else setIsPasswordCorrect(false)
    }, [password, confirm])
    const NavigateToSignIn = () => {
        navigate("/signin")
    }

    const SignUp = () => {

        api.post("/admin/signup", { username: username, email: email, password: password })
            .then(res => {
                if (res.data.message === 'success') {
                    toastr.success("Successfull")
                    localStorage.setItem("email", email)
                    navigate("/verify")
                }
            })
    }
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-[600px] flex flex-col justify-center items-center border rounded">

                <p className="text-[40px] text-[#5534A5]">
                    Sign Up
                </p>

                <div className="w-[80%]">
                    <p>User Name</p>
                    <Input type="username" className="mt-2" placeholder="username" value={username}
                        onChange={setHandle} />
                </div>

                <div className="w-[80%]">
                    <p>Email</p>
                    <Input type="email" className="mt-2" placeholder="email" value={email}
                        onChange={setHandle} />
                </div>

                <div className="w-[80%] mt-10">
                    <p>Password</p>
                    <Input type="password" className="mt-2" placeholder="password" value={password}
                        onChange={setHandle} />
                    {
                        !isPassworCorrect &&
                        <p className="text-[red] text-[12px]">please check your password</p>
                    }
                </div>

                <div className="w-[80%] mt-10">
                    <p>Confirm</p>
                    <Input type="password" className="mt-2" placeholder="confirm" value={confirm}
                        onChange={setHandle} />
                    {
                        !isPassworCorrect &&
                        <p className="text-[red] text-[12px]">please check your password</p>
                    }
                </div>

                <div className="w-[80%] mt-20 h-[50px]">
                    <button className="w-full h-full border transition duration-300 bg-[#5534A5] text-[white] hover:bg-white hover:text-[#5534A5]"
                        onClick={SignUp}>
                        Sign Up
                    </button>
                </div>
                <p className='mt-10'>
                    If you have already account, please
                </p>
                <button className='text-[red]' onClick={NavigateToSignIn}>Sign In</button>
            </div>
        </div>
    )
}

export default SignUp