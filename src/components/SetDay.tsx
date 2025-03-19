import LeftIcon from '../assets/left-128.png'
import RightIcon from '../assets/right-128.png'
import { useDayContext } from '../contexts/DayContext'
import { useActivitiesContext } from '../contexts/ActivitiesContext'
import { useEffect } from 'react'
import { lightModeStyles, darkModeStyles } from '../contexts/DisplayColors';
import { useLoggerContext } from '../contexts/ShowLogger'

export default function SetDay() {
    const today = new Date();
    const { loadActivities } = useActivitiesContext();
    const { currentDay, nextDay, prevDay } = useDayContext();
    const { isLightMode } = useLoggerContext(); 

    const styles = isLightMode ? lightModeStyles : darkModeStyles;

    useEffect(() => {
        loadActivities(currentDay.toISOString().split('T')[0]);
    }, [currentDay]);

    function handleForward() {
        if (!isToday()) {
            nextDay();
            loadActivities(currentDay.toISOString().split('T')[0]);
        }   
    }

    function handleBackward() {
        prevDay();
        loadActivities(currentDay.toISOString().split('T')[0]);
    }

    function isToday() {
        return currentDay.toDateString() === today.toDateString();
    }

    return (
        <>
            <div className={`flex flex-row justify-between ${styles.gradientBg} rounded-[41px] items-center min-w-[230px] w-[20%] h-[50px] shadow-lg min-w-[56] mb-2.5 p-2`}>
                <img onClick={handleBackward} src={LeftIcon} alt="Prev Day" className='h-[35px] opacity-75 cursor-pointer'/>
                <h1 className={`text-[20px] font-bold ${styles.innerText}`}>
                    {`${String(currentDay.getMonth() + 1).padStart(2, '0')}-${String(currentDay.getDate()).padStart(2, '0')}-${currentDay.getFullYear()}`}
                </h1>
                <img id="forwardButton" onClick={handleForward} src={RightIcon} alt="Next Day" className={`h-[35px] ${isToday() ? 'opacity-25' : 'opacity-75 cursor-pointer'}`}/>
            </div>
        </>
    );
}
