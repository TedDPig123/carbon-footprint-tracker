import './App.css'
import Navbar from './components/Navbar.tsx'
import Notification from './components/Notification.tsx'
import GoalModule from './components/GoalModule.tsx'
import LogNewActivities from './components/LogNewActivity.tsx'
import AddNote from './components/AddNote.tsx'
import Motivation from './components/Motivation.tsx'
import { ShowLoggerProvider } from './contexts/ShowLogger.tsx'
import { ActivitiesProvider } from './contexts/ActivitiesContext.tsx'
import { DayProvider } from './contexts/DayContext.tsx'
import SetDay from './components/SetDay.tsx'
import { GoalProvider } from './contexts/DailyGoalContext.tsx'
import { NotesProvider } from './contexts/NotesContext.tsx'

function App() {
  return (
    <>
      <DayProvider>
        <GoalProvider>
          <NotesProvider>
          <ActivitiesProvider>
            <ShowLoggerProvider>
            <Navbar />
            <div className='flex flex-col items-center justify-center'>
              <h1 className='text-[25px] m-2.5'>✨ Welcome Back! ✨</h1>
              <Notification/>
              <SetDay />
                <div className='z-2 flex flex-col bg-[#07700025]
                rounded-[41px] justify-center items-center p-[32px] w-[90%] shadow-lg min-w-[560px] max-w-[800px]'>
                  <GoalModule/>
                    
                      <LogNewActivities />
                    
                  

                  <div className='flex flex-row w-[100%] items-stretch'>
                    <AddNote />
                    <Motivation />
                  </div>

                </div>
            </div>
            </ShowLoggerProvider>
          </ActivitiesProvider>
          </NotesProvider>
          </GoalProvider>
      </DayProvider>
    </>
  )
}

export default App
