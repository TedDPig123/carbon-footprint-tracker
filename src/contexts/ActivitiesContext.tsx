import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { useDayContext } from './DayContext';

interface Activity {
    label: string;
    description: string;
    quant: string;
    mult: number;
    num: number;
}

interface ActivitiesContextType {
    activitiesArray: Activity[];
    addActivity: (x: Activity) => void;
    removeActivity: (index: number) => void;
    loadActivities: (date: string) => Promise<void>;
    saveActivities: (date: string, activities: Activity[]) => void;
}

const ActivitiesContext = createContext<ActivitiesContextType | undefined>(undefined);

const getStorageKey = (date: string) => `activities-${date}`;

export const ActivitiesProvider = ({ children }: { children: ReactNode }) => {
    const [activitiesArray, setActivitiesArray] = useState<Activity[]>([]);
    const {currentDay} = useDayContext();

    const loadActivities = async (date: string) => {
        try {
            const storageKey = getStorageKey(date);
            const stored = localStorage.getItem(storageKey);
            if (stored) {
                setActivitiesArray(JSON.parse(stored));
            } else {
                const emptyActivities: Activity[] = [];
                localStorage.setItem(storageKey, JSON.stringify(emptyActivities));
                setActivitiesArray(emptyActivities);
            }
        } catch (error) {
            console.error("Failed to load activities:", error);
            setActivitiesArray([]);
        }
    };

    const saveActivities = (date: string, activities: Activity[]) => {
        try {
            localStorage.setItem(date, JSON.stringify(activities));
            console.log("Saved activities for date:", date);
        } catch (error) {
            console.error("Failed to save activities:", error);
        }
    };

    const addActivity = (x: Activity) => {
        setActivitiesArray((prev) => {
            const updated = [...prev, x];
            saveActivities(getStorageKey(currentDay.toISOString().split('T')[0]), updated);
            return updated;
        });
    };

    const removeActivity = (index: number) => {
        setActivitiesArray((prev) => {
            const updated = prev.filter((_, i) => i !== index);
            saveActivities(getStorageKey(currentDay.toISOString().split('T')[0]), updated);
            return updated;
        });
    };

    return (
        <ActivitiesContext.Provider value={{ activitiesArray, addActivity, removeActivity, loadActivities, saveActivities }}>
            {children}
        </ActivitiesContext.Provider>
    );
};

export const useActivitiesContext = (): ActivitiesContextType => {
    const context = useContext(ActivitiesContext);
    if (!context) {
        throw new Error('needs context providah');
    }
    return context;
};
