import React, { createContext, useState, ReactNode, useContext } from 'react';
import { useDayContext } from './DayContext';

interface GoalContextType {
    dailyGoal: number;
    setDailyGoal: (goal: number) => void;
    loadGoal: (date: Date) => void;
    saveGoal: (date: Date, goal:number) => void;
}

const GoalContext = createContext<GoalContextType | undefined>(undefined);

const getGoalStorageKey = (date: Date) => `goal-${date.toISOString().split('T')[0]}`;

export const GoalProvider = ({ children }: { children: ReactNode }) => {
    const [dailyGoal, setDailyGoal] = useState<number>(100);
    const loadGoal = (date: Date) => {
        try {
            const storageKey = getGoalStorageKey(date);
            const stored = localStorage.getItem(storageKey);
            if (stored) {
                setDailyGoal(JSON.parse(stored));
            } else {
                localStorage.setItem(getGoalStorageKey(date), JSON.stringify(100));
            }
        } catch (error) {
            console.error("Failed to load goal:", error);
            setDailyGoal(100);
        }
    };

    const saveGoal = (date: Date, goal: number) => {
        try {
            localStorage.setItem(getGoalStorageKey(date), JSON.stringify(goal));
            setDailyGoal(goal);
            console.log("Saved goal for date:", date);
        } catch (error) {
            console.error("Failed to save goal:", error);
        }
    };

    return (
        <GoalContext.Provider value={{ dailyGoal, setDailyGoal, saveGoal, loadGoal }}>
            {children}
        </GoalContext.Provider>
    );
};

export const useGoalContext = (): GoalContextType => {
    const context = useContext(GoalContext);
    if (!context) {
        throw new Error('PETAH I NEED THE PROVIDAH');
    }
    return context;
};
