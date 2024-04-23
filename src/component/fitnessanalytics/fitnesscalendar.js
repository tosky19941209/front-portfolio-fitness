import React, { useEffect, useState } from "react";

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
function FitnessCalendar({ planData, setPlanData,enableBtn, setEnableBtn, signal, setSignal }) {
    const daysOfWeek = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
    ]

    const today = new Date();
    const dayOfWeek = today.getDay();
    const [accidentID, setAccidentID] = useState(dayOfWeek)

    const date = []
    const month = []
    const year = []

    for (let i = 0; i < 7; i++) {
        const currentDate = new Date();
        const futureDate = new Date(currentDate.setDate(currentDate.getDate() - dayOfWeek + i));
        date.push(futureDate.getDate())
        month.push(futureDate.getMonth() + 1)
        year.push(futureDate.getFullYear())
    }

    useEffect(() => {
        const currentDate = new Date()
        const newData = {
            ...planData,
            year: currentDate.getFullYear(),
            month: currentDate.getMonth() + 1,
            date: currentDate.getDate(),
            day: currentDate.getDay()
        }
        setPlanData(newData)

    },[])



    return (
        <div className="flex border rounded-xl w-[100%] h-[13%] justify-center items-center bg-[#F1EEF6] mb-4">
            {
                daysOfWeek.map((item, index) => (
                    <button className={`flex justify-center items-center w-[15%] h-[60%] ${index === accidentID ? 'bg-[#5534A5]' : ''} rounded-lg mr-1 ml-1 duration-500 hover:shadow-2xl`}
                        disabled={!enableBtn}
                        onClick={(e) => {
                            setAccidentID(index)
                            const newData = {
                                ...planData,
                                year: year[index],
                                month: month[index],
                                date: date[index],
                                day: index
                            }
                            setPlanData(newData)
                            setEnableBtn(false)
                            setSignal(prev => prev + 1)
                        }}>
                        <div className="flex flex-col justify-center items-center ">
                            <p className={`${index === accidentID ? 'text-[white]' : 'text-[black]'} text-[17px] mt-[50%]`}>{month[index] + "/" + date[index]}</p>
                            <p className={`${index === accidentID ? 'text-[white]' : 'text-[#757575]'} text-[13px] mt-[-20%]`}>{item}</p>
                        </div>
                    </button>
                ))
            }
        </div>
    )
}

export default FitnessCalendar

