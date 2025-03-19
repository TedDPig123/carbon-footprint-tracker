import { useState, useEffect } from 'react';
import { useActivitiesContext } from '../contexts/ActivitiesContext';
import { useGoalContext } from '../contexts/DailyGoalContext';
import { useDayContext } from '../contexts/DayContext';
import { lightModeStyles, darkModeStyles } from '../contexts/DisplayColors';
import { useLoggerContext } from '../contexts/ShowLogger';

export default function GoalModule() {
    const { activitiesArray } = useActivitiesContext();
    const { dailyGoal, loadGoal } = useGoalContext();
    const { currentDay } = useDayContext();
    const { isLightMode } = useLoggerContext();
    const styles = isLightMode ? lightModeStyles : darkModeStyles;

    const [carbonGenerated, setCarbonGenerated] = useState(0);
    const [carbonOffset, setCarbonOffset] = useState(0);
    const [carbonProgressBar, setCarbonProgressBar] = useState(0);

    useEffect(() => {
        loadGoal(currentDay);

        const generated = activitiesArray
            .filter(e => e.mult >= 0)
            .reduce((prev, e) => prev + (e.num * e.mult), 0);

        const offset = activitiesArray
            .filter(e => e.mult < 0)
            .reduce((prev, e) => prev + (Math.abs(e.num) * e.mult), 0);

        let progBar = ((generated + offset) / dailyGoal) * 100;
        if (progBar > 100) {
            progBar = 100;
            alert("You have reached your daily limit!");
        } else if (progBar < 0) {
            progBar = 0;
        }

        setCarbonGenerated(generated);
        setCarbonOffset(offset);
        setCarbonProgressBar(progBar);
    }, [activitiesArray, currentDay, dailyGoal]);

    return (
        <>
            <h1 className={`mt-[-20px] items-left mb-[6px] text-[20px] w-[100%] ml-[10px] font-bold ${styles.headerText}`}>Carbon Footprint Goal</h1>
            <div className={`flex flex-row items-stretch ${styles.gradientBg} h-[100px] w-[100%] rounded-[15px] ${styles.innerText}`}>
                <div className='flex flex-col w-[150px] items-center justify-center'>
                    <h2 className='text-[20px] font-bold mb-[-5px]'>{carbonGenerated.toFixed(2)}kg</h2>
                    <p className='text-[15px]'>CO₂e Generated</p>
                </div>
                <div className='flex flex-col flex-auto items-center pt-[12px] mt-[2px]'>
                    <h2 className='text-[20px] font-bold mb-[-5px]'>{(dailyGoal - carbonGenerated - carbonOffset).toFixed(2)}kg</h2>
                    <p className='text-[15px]'>Allocated CO₂e Remaining</p>
                    <div className='progressBar relative bg-[#0A4C0675] w-[100%] h-[6px] rounded-full opacity-75 mt-[10px]'>
                        <div className={`progressBar relative h-[6px] rounded-full opacity-95`} 
                            style={{ width: `${carbonProgressBar}%`, backgroundColor: carbonProgressBar === 100 ? 'red' : 'white' }}>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col w-[150px] items-center justify-center'>
                    <h2 className='text-[20px] font-bold mb-[-5px]'>{carbonOffset.toFixed(2)}kg</h2>
                    <p className='text-[15px]'>CO₂e Offset</p>
                </div>
            </div>
        </>
    );
}
