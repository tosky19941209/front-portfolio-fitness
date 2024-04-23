import React, { useEffect, useState } from "react";
import api from '../../service/axios'
function FitnessPlan({ planData, setPlanData, email, password }) {

    const [dailyPlanExercise, setDailyPlanExercise] = useState([])

    const [dailyPlanTime, setDailyPlanTime] = useState([])

    const defaultCloseBtn = 'close.png'
    const hoverCloseBtn = 'close_hover.png'
    const [imgCloseSrc, setImgCloseSrc] = useState(defaultCloseBtn)
    const [accidentID, setAccidentID] = useState(null)
    const [editPlanWidget, setEditPlanWidget] = useState(null)
    const [exerciseType, setExerciseType] = useState("")
    const [exerciseStartTime, setExerciseStartTime] = useState("")
    const [exerciseEndTime, setExerciseEndTime] = useState("")
    const [showWidget, setShowWidget] = useState(false);
    const [updateSignal, setUpdateSignal] = useState(0)

    const config = {
        headers: {
            "authorization": localStorage.getItem("token")
        }
    }
    useEffect(() => {
        setDailyPlanExercise(planData.exerciseType)
        setDailyPlanTime(planData.exerciseTime)
    }, [planData])

    useEffect(() => {
        if (planData.year === '') return

        const localEmail = localStorage.getItem("fitnessemail")
        const localPassword = localStorage.getItem("fitnesspassword")
        const header = {
            email: localEmail,
            password: localPassword
        }

        const updateData = {
            year: planData.year,
            month: planData.month,
            date: planData.date,
            day: planData.day,
            exerciseType: {
                exerciseName: dailyPlanExercise,
                exerciseTime: dailyPlanTime
            }
        }
        const apiData = { updateData: updateData }
        api.post('/exercise/setexercise', apiData, config)
            .then((res) => {
                console.log("Exercie is sended")
            })
    }, [updateSignal])

    return (
        <div className="flex flex-col items-center border rounded-xl w-full xl:h-[84%] items-center pb-[20px]">
            <button className='border rounded-[50%] w-[5%] md:w-[3%] xl:w-[5%]  mt-[2%] ml-[80%] text-[black] hover:bg-[#A85CF9] text-[60%]'
                onClick={
                    (e) => {
                        showWidget === false ? setShowWidget(true) : setShowWidget(false)
                    }}
            >
                <img src='plus.png' width='30px'></img>
            </button>

            {showWidget &&
                <div className="mt-1 w-[95%] xl:h-[30%] bg-[#F1EEF6] border rounded-xl">
                    <p className="text-[black] text-[15px] text-left mt-1 xl:mt-3">Exercise Kind</p>
                    <input className="form-control w-[20%] h-[20%] mr-1 ml-1 mt-1 xl:mt-[-3%]"
                        style={{
                            width: "98%"
                        }}
                        value={exerciseType}
                        onChange={(e) => {
                            setExerciseType(e.target.value)
                        }}
                    >
                    </input>
                    <p className="text-[black] text-[15px] text-left mt-1 xl:mt-2">Time</p>
                    <div className="flex">
                        <input type='time' className="form-control w-[16%] h-[20%] mr-1 ml-1 mt-[-1%] xl:mt-[-3%]"
                            style={{
                                width: "98%",
                                height: "130%"
                            }}
                            value={exerciseStartTime}
                            onChange={(e) => {
                                setExerciseStartTime(e.target.value)
                            }}
                        ></input>
                        <input type='time' className="form-control w-[18%] h-[20%] mr-4 xl:mr-2 ml-1 mt-[-1%] xl:mt-[-3%]"
                            style={{
                                width: "98%",
                                height: "130%"
                            }}
                            value={exerciseEndTime}
                            onChange={(e) => {
                                setExerciseEndTime(e.target.value)
                            }}
                        ></input>
                    </div>

                    <div className="flex justify-between mt-1">
                        <button className="text-[#5534A5] text-[18px] ml-20 mt-1"
                            onClick={(e) => {
                                const newType = dailyPlanExercise
                                newType.push(exerciseType)
                                const newTime = dailyPlanTime
                                newTime.push(exerciseStartTime + "-" + exerciseEndTime)

                                setDailyPlanExercise(newType)
                                setDailyPlanTime(newTime)
                                setShowWidget(false)
                                const newData = { ...planData, exerciseType: newType, exerciseTime: newTime }
                                setPlanData(newData)
                                setExerciseStartTime('')
                                setExerciseEndTime('')
                                setExerciseType('')
                                setUpdateSignal(prev => prev + 1)
                            }}
                        >
                            Add
                        </button>
                        <button className="text-[black] text-[18px] mr-20 mt-1"
                            onClick={(e) => {
                                setShowWidget(false)
                            }}>
                            Close
                        </button>
                    </div>
                </div>
            }

            {

                dailyPlanExercise.map((item, index) => (
                    <div className="flex border w-[94%] md:h-[20%] xl:h-[15%] rounded-xl mt-2 justify-between z-[0]">
                        <div className="w-[12px] bg-[#5534A5] rounded-xl" />
                        <div className="flex w-[94%] rounded-xl">
                            <div className="flex flex-col justify-between">
                                <p className="text-black text-left ml-5 text-[20px]">{item}</p>
                                <p className="text-[#757575] text-left ml-5 text-[15px]">{dailyPlanTime[index]}</p>
                            </div>
                        </div>
                        <div className="flex mt-2 h-[80%]">
                            <button onClick={(e) => {
                                const newDataType = []
                                const newDataTime = []
                                let j = 0
                                for (let i = 0; i < dailyPlanExercise.length; i++) {
                                    if (i !== index) {
                                        newDataType[j] = dailyPlanExercise[i];
                                        newDataTime[j] = dailyPlanTime[i];
                                        j++
                                    }
                                }
                                setDailyPlanExercise(newDataType)
                                setDailyPlanTime(newDataTime)
                                setUpdateSignal(prev => prev + 1)
                            }}>
                                <img
                                    src={index === accidentID ? 'close_hover.png' : 'close.png'}
                                    onMouseEnter={() => { setAccidentID(index) }}
                                    onMouseLeave={() => { setAccidentID(null) }}
                                    width='35px'
                                />
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}


export default FitnessPlan