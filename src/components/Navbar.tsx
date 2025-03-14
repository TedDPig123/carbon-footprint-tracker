

export default function Navbar(){
    return(
        <div className="relative z-50">
            <nav className="z-50 flex content-between w-full p-1.8 h-15 bg-[#077000] items-center text-[#CDE4B0] border-b-4 border-b-[#CDE4B0]">
                <h1 className="font-logo text-inherit text-[30px] ml-[10px]">🌱your carbon.</h1>
                <a href="" className="text-[18px] ml-[40px] text-[#CDE4B0]">Dashboard</a>
                <a href="" className="text-[18px] ml-[40px] text-[#CDE4B0]">Summary</a>
            </nav>   
        </div>
                 
    )
}