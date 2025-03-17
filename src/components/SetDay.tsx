import LeftIcon from '../assets/left-128.png'

export default function SetDay(){
    return(
        <>
            <div className='flex flex-row bg-[linear-gradient(120deg,rgba(7,112,0,0.34)-26.24%,rgba(205,228,176,0)134.68%)]
              rounded-[41px] justify-center items-center p-[32px] w-[50%] h-[50px] shadow-lg min-w-[56] mb-2.5'>
                <img src={LeftIcon} alt="Prev Day" className='h-[35px] opacity-75'/>


            </div>
        </>
    )
}