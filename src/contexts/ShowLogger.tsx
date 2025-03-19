import React, { createContext, useState, ReactNode, useContext } from 'react';

interface ShowLoggerContextType {
    showNote: boolean;
    showLogger: boolean;
    showGoal: boolean;
    toggle: () => void;
    toggleGoal: () => void;
    toggleNotes: () => void;
}

const LoggerContext = createContext<ShowLoggerContextType | undefined>(undefined);

export const ShowLoggerProvider = ({ children }: { children: ReactNode }) => {
    const [showNote, setShowNote] = useState(false);
    const [showLogger, setShowLogger] = useState(false);
    const [showGoal, setGoal] = useState(false);
    const [isLightMode, setLightMode] = useState(false);

    const toggle = () => {
        setShowLogger((prev) => !prev);
    };

    const toggleGoal = () => {
        setGoal((prev) => !prev);
    };

    const toggleNotes = () => {
        setShowNote((prev)=>!prev);
    }

    return (
        <LoggerContext.Provider value={{ showLogger, toggle, toggleGoal, showGoal, toggleNotes, showNote, isLightMode, setLightMode}}>
            {children}
        </LoggerContext.Provider>
    );
};

export const useLoggerContext = (): ShowLoggerContextType => {
    const context = useContext(LoggerContext);
    if (!context) {
        throw new Error('useLoggerContext must be used within a ShowLoggerProvider');
    }
    return context;
};