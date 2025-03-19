import { useLoggerContext } from "../contexts/ShowLogger";
import PencilIcon from '../assets/pencil-128.png';
import { useDayContext } from "../contexts/DayContext";
import { useEffect } from "react";
import { useNotesContext } from "../contexts/NotesContext";
import { lightModeStyles, darkModeStyles } from "../contexts/DisplayColors";

export default function AddNote() {
    const { toggleNotes, isLightMode } = useLoggerContext();
    const { dailyNote, loadNote } = useNotesContext();
    const { currentDay } = useDayContext();

    useEffect(() => {
        loadNote(currentDay);
    }, [currentDay, dailyNote, loadNote]);

    const styles = isLightMode ? lightModeStyles : darkModeStyles;
    
    return (
        <div className="flex flex-col w-[50%] mr-3">
            <h1 className={`mt-[10px] items-left mb-[6px] font-bold text-[20px] w-[100%] ml-[4px] ${styles.headerText}`}>Add Note</h1>
            <div className={`flex flex-col ${styles.gradientBg} h-[100px] w-[100%] rounded-[15px] text-[#022100] min-h-[160px]`}>
                <div className="flex flex-row items-center justify-between">
                    <h2 className={`text-[20px] font-semibold ml-[12px] mt-[5px] ${styles.innerText}`}>Note of the Day!</h2>
                    <img onClick={toggleNotes} src={PencilIcon} alt="Edit Note" className="h-[20px] w-[20px] mt-[10px] mr-4 cursor-pointer"/>
                </div>
                <p className={`flex items-center justify-center pl-[15px] pr-[15px] h-[100%] ${styles.innerText}`}>{dailyNote}</p>
            </div>
        </div>
    )
}
