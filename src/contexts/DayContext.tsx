import React, { createContext, useState, ReactNode, useContext } from 'react';

interface DayContextType {
    currentDay: string;
    setDay: (date: string) => void;
}

const DayContext = createContext<DayContextType | undefined>(undefined);

export const DayProvider = ({ children }: { children: ReactNode }) => {
    const [currentDay, setCurrentDay] = useState<string>(new Date().toISOString().split('T')[0]);

    const setDay = (date: string) => {
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
        throw new Error('provider needed');
    }
    return context;
};
