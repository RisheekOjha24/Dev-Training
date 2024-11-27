import React, { createContext, useState } from 'react'
import Child from '../components/Child'
export const GlobalInfo = createContext();

const ContextWork = () => {

  const [color,setColor]=useState("orange");
    
  return (
    <GlobalInfo.Provider value={{bgColor:color}}>
        <div className='flex justify-center flex-col align-bottom p-20'>
         I am a Parent Component
        <Child/>
        </div>
    </GlobalInfo.Provider>
  )
}

export default ContextWork