import React from 'react'
import Sidebar from './Sidebar'
import Feed from './Feed'
import Suggestions from './Suggestions'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
    <div className='d-flex'>
    <div className='w-20'><Sidebar/></div>
    <div className='w-50'><Feed/></div>
    <div className='w-30'><Suggestions/></div>
    </div>
    <ToastContainer/>
    
    </>
   
  )
}

export default App