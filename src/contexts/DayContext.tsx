import { createContext, useState, ReactNode, useContext } from 'react';

interface DayContextType {
    currentDay: Date;
    setDay: (date: Date) => void;
    nextDay: () => void;
    prevDay: () => void;
}

const DayContext = createContext<DayContextType | undefined>(undefined);

export const DayProvider = ({ children }: { children: ReactNode }) => {
    const [currentDay, setCurrentDay] = useState<Date>(new Date());

    const setDay = (date: Date) => {
        setCurrentDay(date);
    };

    const nextDay = () => {
        setCurrentDay(curr => {
            const nextDay = new Date(curr);
            nextDay.setDate(curr.getDate() + 1);
            return nextDay;
        });
        console.log("Switched to day:", currentDay);
    }

    const prevDay = () => {
        setCurrentDay(curr => {
            const prevDay = new Date(curr);
            prevDay.setDate(curr.getDate() - 1);
            return prevDay;
        });
        console.log("Switched to day:", currentDay);
    }

    return (
        <DayContext.Provider value={{ currentDay, setDay, nextDay, prevDay}}>
            {children}
        </DayContext.Provider>
    );
};

export const useDayContext = (): DayContextType => {
    const context = useContext(DayContext);
    if (!context) {
        throw new Error('DayProvider is required');
    }
    return context;
};