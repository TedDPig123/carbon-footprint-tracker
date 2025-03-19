import { useLoggerContext } from "../contexts/ShowLogger"
import LightMode from "../assets/light-128.png"
import { lightModeStyles, darkModeStyles } from '../contexts/DisplayColors';

export default function Navbar(){
    const {toggleGoal, toggleLightMode, isLightMode} = useLoggerContext();
    
    const styles = isLightMode ? lightModeStyles : darkModeStyles;

    return(
        <div className="relative z-50">
            <nav className={`z-50 flex content-between justify-between w-full p-1.8 h-15 ${styles.navBg} items-center text-[#CDE4B0] border-b-4 ${styles.borderColor}`}>
                <div className="flex flex-row justify-center items-center">
                    <h1 className={`font-logo text-inherit text-[30px] ml-[10px] ${styles.headerText}`}>🌱your carbon.</h1>
                    <h1 onClick={toggleGoal} className={`text-[18px] ml-[20px] cursor-pointer ${styles.headerText}`}>Set Daily Goal</h1>
                </div>
                <img onClick={toggleLightMode} src={LightMode} alt="LightMode" className="h-[30px] mr-[15px] cursor-pointer"/>
            </nav>   
        </div>
    )
}
