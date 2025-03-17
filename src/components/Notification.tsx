import { useState } from 'react';
import closeIcon from '../assets/x-mark-128.png';

export default function Notification({notificationText} : {notificationText : string}){

    const [showNotif, setShowNotif] = useState(true);

    return(
        <div className='fixed h-[100%] w-[100%] flex justify-end items-start z-[0]'>
            {showNotif && <div className = "z-10 mt-22 mr-3 relative w-[25%] min-w-[300px] rounded-[15px] bg-[linear-gradient(95deg,_#DCB0E4_-22.13%,_#320070_153.73%)] pl-[12px] pr-[12px] pt-[6px] pb-[10px] opacity-95 backdrop-blur-md">
            <h1 className="z-3 text-[#022100] font-bold mb-[2px]">Daily Challenge!</h1>
            <p className="z-3 text-[#022100]">{notificationText}</p>
            <div className='cursor-pointer' onClick={()=>setShowNotif(e=>!e)}>
                <span className="absolute top-[5px] right-[5px] h-[22px] w-[22px] bg-[#E3E0E0] rounded-full opacity-50"></span>
                <img className="absolute top-[10.4px] right-[10.2px] h-[12px] w-[12px] opacity-80" src={closeIcon} alt="Close" />
            </div>
        </div>}
        </div>
        
    )
}

