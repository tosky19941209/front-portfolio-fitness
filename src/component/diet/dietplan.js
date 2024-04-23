import React, { useEffect, useState } from "react";
import DietCalendar from './dietcalendar.js'
import DietDaily from './dietdaily.js'
import api from '../../service/axios.js'
function DietPlan({ setdietCal, updateWeeklySignal, setUpdateWeeklySignal }) {

    const [btnEnable, setBtnEnable] = useState(false)
    const [signal, setSignal] = useState(0)
    const [dietPlan, setDietPlan] = useState({
        year: '',
        month: '',
        date: '',
        day: '',
        food: {
            breakfast: [],
            lunch: [],
            dinner: [],
            snack1: [],
            snack2: []
        },
        amount: {
            breakfast: [],
            lunch: [],
            dinner: [],
            snack1: [],
            snack2: []
        },
        dietMenu: {
            foodName: [],
            kcal: [],
            protein: [],
            water: [],
            mineral: []
        }
    })

    const config = {
        headers: {
            "authorization": localStorage.getItem("token")
        }
    }

    useEffect(() => {
        setdietCal(dietPlan)
    }, [dietPlan])

    useEffect(() => {
        if (dietPlan.year === '') return
        setBtnEnable(true);


        const getData = {
            year: dietPlan.year,
            month: dietPlan.month,
            date: dietPlan.date,
            day: dietPlan.day
        }
        api.post("/diet/getdiet", { getData: getData }, config).then((res) => {
            setBtnEnable(false)
            const message = res.data.message
            const result = res.data.result
            if (message === 'success') {
                const newData = {
                    ...dietPlan,
                    food: {
                        breakfast: result.plandiet.meal.breakfast,
                        lunch: result.plandiet.meal.lunch,
                        dinner: result.plandiet.meal.dinner,
                        snack1: result.plandiet.meal.snack1,
                        snack2: result.plandiet.meal.snack2
                    },
                    amount: {
                        breakfast: result.plandiet.amount.breakfast,
                        lunch: result.plandiet.amount.lunch,
                        dinner: result.plandiet.amount.dinner,
                        snack1: result.plandiet.amount.snack1,
                        snack2: result.plandiet.amount.snack2
                    },
                    dietMenu: {
                        foodName: result.dietMenu.foodName,
                        kcal: result.dietMenu.kcal,
                        protein: result.dietMenu.protein,
                        water: result.dietMenu.water,
                        mineral: result.dietMenu.mineral
                    }
                }
                setDietPlan(newData)
            } else {
                const newData = {
                    ...dietPlan,
                    food: {
                        breakfast: [],
                        lunch: [],
                        dinner: [],
                        snack1: [],
                        snack2: []
                    },
                    amount: {
                        breakfast: [],
                        lunch: [],
                        dinner: [],
                        snack1: [],
                        snack2: []
                    },
                    dietMenu: {
                        foodName: result.dietMenu.foodName,
                        kcal: result.dietMenu.kcal,
                        protein: result.dietMenu.protein,
                        water: result.dietMenu.water,
                        mineral: result.dietMenu.mineral
                    }
                }
                setDietPlan(newData)
            }
        })

    }, [signal])

    useEffect(() => {
        setSignal(prev => prev + 1)
    }, [])

    return (
        <div className="border rounded-xl w-[100%] pb-[20px] mt-[2%] md:mt-[0px]">
            <DietCalendar dietPlan={dietPlan} setDietPlan={setDietPlan} btnEnable={btnEnable} setBtnEnable={setBtnEnable} signal={signal} setSignal={setSignal} />
            <DietDaily dietPlan={dietPlan} setDietPlan={setDietPlan} updateWeeklySignal={updateWeeklySignal} setUpdateWeeklySignal={setUpdateWeeklySignal} />
        </div>
    )


}

export default DietPlan