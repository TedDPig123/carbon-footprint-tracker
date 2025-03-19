import { useState } from 'react';
import closeIcon from '../assets/x-mark-128.png';

export default function Notification(){

    const [showNotif, setShowNotif] = useState(true);

    const possibleNotifications : [message: string] = [
        "Switch to energy-efficient LED bulbs to save power!",
        "Take shorter showers to conserve water and reduce heating energy!",
        "Use reusable bags, bottles, and containers to cut down on plastic waste!",
        "Opt for public transportation, biking, or walking instead of driving!",
        "Eat more plant-based meals to lower your food-related carbon emissions!",
        "Shop secondhand or repair items instead of buying new ones!",
        "Reduce, reuse, and recycle to minimize waste and resource consumption!",
        "Buy local and seasonal produce to reduce food transportation emissions!",
        "Line-dry your clothes when possible to save energy from dryers!",
        "Support renewable energy sources by choosing green energy plans!"
    ]

    const today = new Date();
    const todaysNote = possibleNotifications[today.getDate() % 10];

    return(
        <div className='fixed h-[100%] w-[100%] flex justify-end items-start z-[0]'>
            {showNotif && <div className = "z-1 mt-25 mr-3 relative w-[25%] min-w-[300px] rounded-[15px] bg-[linear-gradient(95deg,_#DCB0E4_-22.13%,_#320070_153.73%)] pl-[12px] pr-[12px] pt-[6px] pb-[10px] opacity-95 backdrop-blur-md">
            <h1 className="z-3 text-[#022100] font-bold mb-[2px]">Daily Challenge!</h1>
            <p className="z-3 text-[#022100]">{todaysNote}</p>
            <div className='cursor-pointer' onClick={()=>setShowNotif(e=>!e)}>
                <span className="absolute top-[5px] right-[5px] h-[22px] w-[22px] bg-[#E3E0E0] rounded-full opacity-50"></span>
                <img className="absolute top-[10.4px] right-[10.2px] h-[12px] w-[12px] opacity-80" src={closeIcon} alt="Close" />
            </div>
        </div>}
        </div>
        
    )
}

