import { useLoggerContext } from "../contexts/ShowLogger"
import PencilIcon from '../assets/pencil-128.png'
import { useDayContext } from "../contexts/DayContext";
import { useEffect } from "react";
import { useNotesContext } from "../contexts/NotesContext";

export default function AddNote() {
    const {toggleNotes} = useLoggerContext();
    const {dailyNote, loadNote} = useNotesContext();
    const {currentDay} = useDayContext();

    useEffect(() => {
        loadNote(currentDay);
    }, [currentDay, dailyNote, loadNote]);

    return (
        <div className="flex flex-col w-[50%] mr-3">
        <h1 className='mt-[10px] items-left mb-[6px] text-[#CDE4B0] font-bold text-[20px] w-[100%] ml-[4px]'>Add Note</h1>
            <div className='flex flex-col bg-[linear-gradient(95deg,_#CDE4B0_-22.13%,_#077000_153.73%)] h-[100px] w-[100%] rounded-[15px] text-[#022100] min-h-[160px]'>
                <div className="flex flex-row items-center justify-between">
                    <h2 className="text-[20px] font-semibold ml-[12px] mt-[5px]">Note of the Day!</h2>
                    <img onClick={toggleNotes} src={PencilIcon} alt="Edit Note" className="h-[20px] w-[20px] mt-[10px] mr-4 cursor-pointer"/>
                </div>
                <p className="flex items-center justify-center pl-[15px] pr-[15px] h-[100%]">{dailyNote}</p>
            </div>
        </div>
    )
}