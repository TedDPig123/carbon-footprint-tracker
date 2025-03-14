export default function AddNote() {
    return (
        <div className="flex flex-col w-[50%] mr-3">
        <h1 className='mt-[10px] items-left mb-[6px] text-[#CDE4B0] font-bold text-[20px] w-[100%] ml-[4px]'>Add Note</h1>
        <div className='flex flex-col items-stretch bg-[linear-gradient(95deg,_#CDE4B0_-22.13%,_#077000_153.73%)] h-[100px] w-[100%] rounded-[15px] text-[#022100] min-h-[160px]'>
            <h2 className="text-[20px] font-semibold ml-[12px] mt-[5px]">Note of the Day!</h2>
            <p className="flex items-center justify-center pl-[15px] pr-[15px] mt-[-20px] h-[100%]">Here goes your note</p>
        </div>
        </div>
    )
}