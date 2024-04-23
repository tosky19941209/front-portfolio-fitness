import React, { useEffect, useState } from "react";
import MUIChart from './mui-chart'
import Result from "./result";
import api from '../../service/axios'
function Chart() {
    const [history, setHistory] = useState(null)

    const today = new Date();
    const dayOfWeek = today.getDay();
    const [accidentID, setAccidentID] = useState(dayOfWeek)

    const date = []
    const month = []
    const year = []
    
    const config = {
        headers: {
            "authorization": localStorage.getItem("token")
        }
    }
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date();
        const futureDate = new Date(currentDate.setDate(currentDate.getDate() - dayOfWeek + i));
        date.push(futureDate.getDate())
        month.push(futureDate.getMonth() + 1)
        year.push(futureDate.getFullYear())
    }

    useEffect(() => {
        if (year === '') return
        const header = {
            email: localStorage.getItem("fitnessemail"),
            password: localStorage.getItem("fitnesspassword")
        }
        const updateData = {
            year: year,
            month: month,
            date: date
        }
        api.post('/exercise/getweeklyhistory', { updateData: updateData }, config)
            .then((res) => {
                setHistory(res.data)
            })
    }, [])

    return (
        <div className="flex flex-col xl:flex-row justify-center items-center w-[96%]">
            <div className="w-[100%] h-[230px] sm:h-[300px] md:h-[500px] xl:h-[40vh] xl:w-[60%]">
                <MUIChart history={history} />
            </div>

            <div className="flex flex-col justify-center items-center w-[100%] xl:w-[40%] md:h-[100%]">
                <Result history={history} />
            </div>
        </div>
    )
}

export default Chart