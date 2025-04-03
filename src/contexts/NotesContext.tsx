import { createContext, useState, ReactNode, useContext } from 'react';

interface NotesContextType {
    dailyNote: string;
    setDailyNote: (note: string) => void;
    loadNote: (date: Date) => void;
    saveNote: (date: Date, note: string) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

const getNoteStorageKey = (date: Date) => `note-${date.toISOString().split('T')[0]}`;

export const NotesProvider = ({ children }: { children: ReactNode }) => {
    const [dailyNote, setDailyNote] = useState<string>("");

    const loadNote = (date: Date) => {
        try {
            const storageKey = getNoteStorageKey(date);
            const stored = localStorage.getItem(storageKey);
            if (stored) {
                setDailyNote(JSON.parse(stored));
            } else {
                setDailyNote("Note goes here...");
            }
        } catch (error) {
            console.error("Failed to load note:", error);
            setDailyNote("");
        }
    };

    const saveNote = (date: Date, note: string) => {
        try {
            const storageKey = getNoteStorageKey(date);
            localStorage.setItem(storageKey, JSON.stringify(note));
            setDailyNote(note);
            console.log("Saved note for date:", date);
        } catch (error) {
            console.error("Failed to save note:", error);
        }
    };

    return (
        <NotesContext.Provider value={{ dailyNote, setDailyNote, saveNote, loadNote }}>
            {children}
        </NotesContext.Provider>
    );
};

export const useNotesContext = (): NotesContextType => {
    const context = useContext(NotesContext);
    if (!context) {
        throw new Error('PETAH I NEED THE PROVIDAH');
    }
    return context;
};
