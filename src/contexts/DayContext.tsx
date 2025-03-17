import React, { createContext, useState, ReactNode, useContext } from 'react';

interface DayContextType {
    currentDay: Date;
    setDay: (date: Date) => void;
}

const DayContext = createContext<DayContextType | undefined>(undefined);

export const DayProvider = ({ children }: { children: ReactNode }) => {
    const [currentDay, setCurrentDay] = useState<Date>(new Date());

    const setDay = (date: Date) => {
        setCurrentDay(date);
        console.log("Switched to day:", date);
    };

    return (
        <DayContext.Provider value={{ currentDay, setDay }}>
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