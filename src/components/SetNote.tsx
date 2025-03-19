import { useState, useEffect } from "react";
import { useLoggerContext } from "../contexts/ShowLogger";
import { useDayContext } from "../contexts/DayContext";
import { useNotesContext } from "../contexts/NotesContext";

export default function SetNote() {
    const [inputValue, setInputValue] = useState("Your note goes here...");
    const { currentDay } = useDayContext();
    const { toggleNotes } = useLoggerContext();
    const { loadNote, saveNote, dailyNote } = useNotesContext();

    useEffect(() => {
        loadNote(currentDay);
        setInputValue(dailyNote);
    }, [currentDay, dailyNote]);
    
    
    function handleInputChange(event) {
        setInputValue(event.target.value);
    }

    function handleSubmit() {
        saveNote(currentDay, inputValue);
        setInputValue(inputValue);
        toggleNotes();
    }

    return (
        <>
            <div className="flex flex-col p-5 min-w-[400px] w-[30%]">
                <div className="pt-2 pl-3 pr-3 flex flex-col items-center bg-[linear-gradient(95deg,_#CDE4B0_-22.13%,_#077000_153.73%)] rounded-[15px] text-[#022100]">
                    <h1 className="text-[20px] font-semibold">Set a Daily Goal!</h1>
                    <textarea
                        name="textInput"
                        id="textInput"
                        className="bg-[white] w-[100%] p-1"
                        rows={5}
                        cols={33}
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <div className="flex flex-row justify-center mb-4 mt-2">
                        <div
                            onClick={toggleNotes}
                            className="cursor-pointer mr-1 flex flex-row justify-center bg-[#0221006E] w-[100px] h-[42px] mt-[6px] rounded-[18px] justify-between items-center pl-[18px] pr-[18px] text-white text-[15px]"
                        >
                            <p className="font-semibold">Cancel</p>
                        </div>
                        <div onClick={handleSubmit} className="cursor-pointer ml-1 flex flex-row justify-center bg-[#0221006E] w-[100px] h-[42px] mt-[6px] rounded-[18px] justify-between items-center pl-[18px] pr-[18px] text-white text-[15px]">
                            <p className="font-semibold">Save</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
