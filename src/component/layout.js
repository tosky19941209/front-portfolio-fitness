import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Layout () {
    const navigate = useNavigate()
    useEffect(() => {
        navigate("/homepage")
    }, [])
    return(
        <>
        </>
    )
}

export default Layout