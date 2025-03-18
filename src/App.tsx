import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar.tsx'
import Notification from './components/Notification.tsx'
import GoalModule from './components/GoalModule.tsx'
import LogNewActivities from './components/LogNewActivity.tsx'
import AddNote from './components/AddNote.tsx'
import Motivation from './components/Motivation.tsx'
import ActivityLogger from './components/ActivityLogger.tsx'
import { ShowLoggerProvider } from './contexts/ShowLogger.tsx'
import { ActivitiesProvider } from './contexts/ActivitiesContext.tsx'
import { DayProvider } from './contexts/DayContext.tsx'
import SetDay from './components/SetDay.tsx'

function App() {
  return (
    <>
      <DayProvider>
        <ActivitiesProvider>
          <ShowLoggerProvider>
          <Navbar />
          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-[25px] m-2.5'>✨ Welcome Back! ✨</h1>
            <Notification 
                notificationText="Don't forget to unplug all your unused appliances!"
              />
            <SetDay />
              <div className='z-2 flex flex-col bg-[linear-gradient(120deg,rgba(7,112,0,0.34)-26.24%,rgba(205,228,176,0)134.68%)]
              rounded-[41px] justify-center items-center p-[32px] w-[90%] shadow-lg min-w-[560px] max-w-[800px]'>
                <GoalModule
                  carbonGenerated={2.4}
                  carbonOffset={1.2}
                  carbonLimit={8}
                />
                  
                    <LogNewActivities />
                  
                

                <div className='flex flex-row w-[100%] items-stretch'>
                  <AddNote />
                  <Motivation />
                </div>

              </div>
          </div>
          </ShowLoggerProvider>
        </ActivitiesProvider>
      </DayProvider>
    </>
  )
}

export default App
