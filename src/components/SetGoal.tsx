import { useState, useEffect } from "react";
import { useGoalContext } from "../contexts/DailyGoalContext";
import { useDayContext } from "../contexts/DayContext";
import { useLoggerContext } from "../contexts/ShowLogger";

export default function SetGoal() {
    const [inputValue, setInputValue] = useState("");
    const { dailyGoal, loadGoal, saveGoal } = useGoalContext();
    const {toggleGoal} = useLoggerContext();
    const { currentDay } = useDayContext();

    useEffect(() => {
        loadGoal(currentDay);
    }, [currentDay, loadGoal]);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setInputValue(value);
    }

    function handleSubmit() {
        if (inputValue.length === 0) {
            alert("Enter a valid number, please.");
            return;
        }
        if (parseInt(inputValue) < 0) {
            alert("Enter a positive number, please.");
            return;
        }
        saveGoal(currentDay, parseInt(inputValue));
        setInputValue(inputValue);
        toggleGoal();
    }

    return (
        <>
            <div className="flex flex-col min-w-[250px] w-[30%]">
                <div className="pt-2 pl-3 pr-2 flex flex-col items-center bg-[linear-gradient(95deg,_#CDE4B0_-22.13%,_#077000_153.73%)] w-[100%] rounded-[15px] text-[#022100]">
                    <h1 className="text-[20px] font-semibold">Set a Daily Goal!</h1>
                    <input
                        id="numInput"
                        type="number"
                        className="bg-white w-[80px] pl-1 mt-2"
                        placeholder="..."
                        value={inputValue}
                        onChange={handleInputChange}
                        min="0"
                    />
                    <p className='text-[15px] mt-1'>kg CO₂e</p>
                    {dailyGoal !== null && (
                        <p className='mt-2'>Current goal: {dailyGoal} kg CO₂e</p>
                    )}
                    <div className="flex flex-row justify-center mb-4 mt-2">
                        <div onClick={toggleGoal} className='cursor-pointer mr-1 flex flex-row justify-center bg-[#0221006E] w-[100px] h-[42px] mt-[6px] rounded-[18px] justify-between items-center pl-[18px] pr-[18px] text-white text-[15px]'>
                            <p className='font-semibold'>Remove</p>
                        </div>
                        <div onClick={handleSubmit} className='cursor-pointer ml-1 flex flex-row justify-center bg-[#0221006E] w-[100px] h-[42px] mt-[6px] rounded-[18px] justify-between items-center pl-[18px] pr-[18px] text-white text-[15px]'>
                            <p className='font-semibold'>Add</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
