import { useLoggerContext } from "../contexts/ShowLogger";
import { lightModeStyles, darkModeStyles } from "../contexts/DisplayColors";

export default function Motivation() {
    const { isLightMode } = useLoggerContext();

    const styles = isLightMode ? lightModeStyles : darkModeStyles;

    return (
        <div className="flex flex-col w-[50%] ml-3">
            <h1 className={`mt-[10px] items-left mb-[6px] font-bold text-[20px] w-[100%] ml-[4px] ${styles.headerText}`}>Motivation</h1>
            <div className={`flex flex-col items-stretch h-[100px] w-[100%] rounded-[15px] min-h-[160px] ${styles.gradientBg} ${styles.innerText}`}>
                <h2 className="text-[50px] font-semibold font-serif ml-[10px]">"</h2>
                <p className="flex justify-center pl-[15px] pr-[15px]">A polar bear will die unless you do this!</p>
            </div>
        </div>
    );
}