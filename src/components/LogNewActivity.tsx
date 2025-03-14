import ActivityLogger from './ActivityLogger';
import addIcon from '../assets/plus-128.png';
import minusIcon from '../assets/minus-128.png';
import { useState } from 'react';
import { useLoggerContext } from '../contexts/ShowLogger';
import { useActivitiesContext } from '../contexts/ActivitiesContext';
import { useDayContext } from '../contexts/DayContext';
import { useEffect } from 'react';

export default function LogNewActivities({ activitiesDone }: { activitiesDone: { activity: string, carbonContribution: number }[] }) {
    const today = `activities-${new Date().toISOString().split('T')[0]}`;
    
    const { showLogger, toggle } = useLoggerContext();
    const { activitiesArray, addActivity, removeActivity, loadActivities } = useActivitiesContext();
      
    useEffect(() => {
        const loadData = async () => {
            await loadActivities(today);
        };
        loadData();
    }, []);

    function handleRemove(index: number) {
        removeActivity(index);
    }

    function ActivityDisplay({ x, y, index }: { x: string, y: number, index: number }) {
        return (
            <div className='flex flex-row bg-[#0221006E] w-[100%] h-[42px] mt-[6px] rounded-[18px] justify-between items-center pl-[18px] pr-[18px] text-white text-[15px]'>
                <div className='flex flex-row'>
                    <button onClick={() => handleRemove(index)} className='mr-2 cursor-pointer'>
                        <img className='h-[15px] w-[15px]' src={minusIcon} alt='Remove' />
                    </button>
                <p>{x}</p>
                </div>
                <p className='font-semibold'>{y > 0 ? "+" : ""} {y.toFixed(2)}kg</p>
            </div>
        );
    }

    return (
        <>
            <h1 className='mt-[10px] items-left mb-[6px] text-[#CDE4B0] font-bold text-[20px] w-[100%] ml-[10px]'>Activities</h1>
            <div className='flex flex-col items-stretch bg-[linear-gradient(95deg,_#CDE4B0_-22.13%,_#077000_153.73%)] w-[100%] rounded-[15px] text-[#022100] p-5'>
                <div className='flex mb-[15px]'>
                    <h2 className="text-[20px] font-semibold">Log New Activity</h2>

                    <div className="flex flex-auto justify-end">
                        <div onClick={toggle} className="cursor-pointer flex items-center justify-center h-[35px] w-[35px] bg-[#0221006E] rounded-full opacity-80">
                            <img className="h-[20px] w-[20px]" src={addIcon} alt="Add" />
                        </div>
                    </div>
                </div>

                <div className='Displayer'>
                    {activitiesArray.length > 0 && activitiesArray.map((e, index) => {
                        const x = e.description + " " + e.num + " " + e.quant;
                        const y = (e.num * e.mult);
                        return (
                            <ActivityDisplay key={index} x={x} y={y} index={index} />
                        );
                    })}
                </div>
            </div>

            {showLogger && (
                <div className="fixed top-0 backdrop-blur-xs left-0 w-full h-full flex justify-center items-center">
                    <div className="absolute z-2">
                        <ActivityLogger />
                    </div>
                </div>
            )}
        </>
    );
}
