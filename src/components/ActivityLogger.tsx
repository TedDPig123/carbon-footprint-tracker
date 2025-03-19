import Select from "react-select";
import { useState, useEffect } from "react";
import { useLoggerContext } from '../contexts/ShowLogger';
import { useActivitiesContext } from "../contexts/ActivitiesContext";
import { useDayContext } from "../contexts/DayContext";
import { lightModeStyles, darkModeStyles } from "../contexts/DisplayColors";

export default function ActivityLogger() {
    class Activity {
        label: string;
        description: string;
        quant: string;
        mult: number;

        constructor(aName: string, aDescription: string, aQuantifier: string, aMultiplier: number) {
            this.label = aName;
            this.description = aDescription;
            this.quant = aQuantifier;
            this.mult = aMultiplier;
        }
    }

    const activities : { [key: string]: Activity } = {
        drivingGasCar: new Activity("Driving a Gas Car", "Drove", "Miles", 0.32),
        airTravel: new Activity("Air Travel (per passenger)", "Flew", "Miles", 0.4),
        electricityConsumption: new Activity("Electricity", "Used up", "kWh", 0.9),
        meatConsumption: new Activity("Eating Meat", "Ate", "lbs of meat", 61),
        heatingGas: new Activity("Heating", "Used", "cubic feet of gas for heating", 0.125),
        plantTrees: new Activity("Planting Trees", "Planted", "Trees", -46),
        solarPower: new Activity("Solar Power Generation", "Produced", "kWh of solar power", -2),
        recyclingAluminum: new Activity("Recycling Aluminum", "Recycled", "lbs of Aluminum", -22),
        composting: new Activity("Composting Organic Waste", "Composted", "lbs of organic waste", -0.44),
        publicTransit: new Activity("Using Public Transit Instead of Driving", "Rode public transport", "miles", -0.53)
    };

    const { isLightMode } = useLoggerContext();
    const styles = isLightMode ? lightModeStyles : darkModeStyles;
    const [selectedActivityKey, setSelectedActivityKey] = useState<string | null>(null);
    const [carbonMade, setCarbonMade] = useState<number>(0);
    const [inputValue, setInputValue] = useState<string>("");

    const { toggle } = useLoggerContext();
    const { addActivity, loadActivities } = useActivitiesContext();
    const { currentDay } = useDayContext();

    const activityData = Object.keys(activities).map((key) => ({
        label: activities[key].label,
        value: key,
    }));

    useEffect(() => {
        loadActivities(currentDay.toISOString().split('T')[0]);
    }, [currentDay]);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setInputValue(value);
        if (selectedActivityKey && value) {
            const numValue = parseFloat(value);
            if (!isNaN(numValue)) {
                setCarbonMade(activities[selectedActivityKey].mult * numValue);
            }
        } else {
            setCarbonMade(0);
        }
    }

    function handleSubmit() {
        if (inputValue.length === 0) {
            alert("Enter a valid number, please.");
            return;
        }
        if (parseInt(inputValue) < 0) {
            alert("Enter a positive number, please.");
            return;
        }
        if (selectedActivityKey !== null) {
            addActivity({
                label: activities[selectedActivityKey].label,
                description: activities[selectedActivityKey].description,
                quant: activities[selectedActivityKey].quant,
                mult: activities[selectedActivityKey].mult,
                num: parseFloat(inputValue)
            });
            toggle();
        }
    }

    return (
        <div className="flex flex-col min-w-[500px] w-[30%] ml-3">
            <div className={`flex flex-col items-stretch w-[100%] rounded-[15px] ${styles.gradientBg} text-[#D1F1DA]`}>
                <div className="m-5 text-[#022100]">
                    <Select
                        options={activityData}
                        placeholder="Select an activity"
                        onChange={(item) => {if (item) {setSelectedActivityKey(item.value)} else {alert("Item not included")}}}
                    />
                </div>
                {selectedActivityKey !== null && (
                    <div className="flex flex-row ml-5 mr-5 justify-between">
                        <div className="flex flex-row">
                            <p className="pr-2">{activities[selectedActivityKey].description}</p>
                            <input
                                id="numInput"
                                type="number"
                                className="bg-white w-[50px] pl-1"
                                placeholder="..."
                                value={inputValue}
                                onChange={handleInputChange}
                                min="0"
                            />
                            <p className="pl-2">{activities[selectedActivityKey].quant}</p>
                        </div>
                        <p>{activities[selectedActivityKey].mult < 0 ? "" : "+"} {carbonMade.toFixed(1)}kgs CO₂e</p>
                    </div>
                )}
                <div className="flex flex-row justify-center mb-4 mt-2">
                    <div onClick={toggle} className={`cursor-pointer mr-1 flex flex-row justify-center w-[100px] h-[42px] mt-[6px] rounded-[18px] justify-between items-center pl-[18px] pr-[18px] text-[15px] bg-[#0221006E]`}>
                        <p className='font-semibold'>Cancel</p>
                    </div>
                    <div onClick={handleSubmit} className={`cursor-pointer ml-1 flex flex-row justify-center w-[100px] h-[42px] mt-[6px] rounded-[18px] justify-between items-center pl-[18px] pr-[18px] text-[15px] bg-[#0221006E]`}>
                        <p className='font-semibold'>Add</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
