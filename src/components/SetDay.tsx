import LeftIcon from '../assets/left-128.png'
import RightIcon from '../assets/right-128.png'
import { useDayContext } from '../contexts/DayContext'
import { useActivitiesContext } from '../contexts/ActivitiesContext'
import { useState } from 'react'

export default function SetDay(){
    const today = new Date();

    const [currDay, setCurrDay] = useState(today);
    const dataFormattedDate = currDay.toISOString().split('T')[0];

    function handleForward(){
        if(!isToday()){
            setCurrDay(prevDay => {
                const nextDay = new Date(prevDay);
                nextDay.setDate(prevDay.getDate() + 1);
                return nextDay;
            });
        }   
    }

    function handleBackward(){
        setCurrDay(prevDay => {
            const nextDay = new Date(prevDay);
            nextDay.setDate(prevDay.getDate() - 1);
            return nextDay;
        });
    }

    function isToday() {
        return currDay.toDateString() === today.toDateString();
    }

    return(
        <>
            <div className='flex flex-row justify-between bg-[linear-gradient(120deg,rgba(7,112,0,0.34)-26.24%,rgba(205,228,176,0)134.68%)]
              rounded-[41px] items-center min-w-[230px] w-[20%] h-[50px] shadow-lg min-w-[56] mb-2.5 p-2'>
                <img onClick={handleBackward} src={LeftIcon} alt="Prev Day" className='h-[35px] opacity-75 cursor-pointer'/>
                <h1 className='text-[20px] font-bold'>{`${String(currDay.getMonth() + 1).padStart(2, '0')}-${String(currDay.getDate()).padStart(2, '0')}-${currDay.getFullYear()}`}</h1>
                <img id="forwardButton" onClick={handleForward} src={RightIcon} alt="Next Day" className={`h-[35px] ${isToday() ? 'opacity-25' : 'opacity-75 cursor-pointer'}`}/>
            </div>
        </>
        
    )
}