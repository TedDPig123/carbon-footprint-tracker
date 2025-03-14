import React, { createContext, useState, ReactNode, useContext } from 'react';

interface ShowLoggerContextType {
    showLogger: boolean;
    toggle: () => void;
}

const LoggerContext = createContext<ShowLoggerContextType | undefined>(undefined);

export const ShowLoggerProvider = ({ children }: { children: ReactNode }) => {
    const [showLogger, setShowLogger] = useState(false);

    const toggle = () => {
        setShowLogger((prev) => !prev);
    };

    return (
        <LoggerContext.Provider value={{ showLogger, toggle }}>
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