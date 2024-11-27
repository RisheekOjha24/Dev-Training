import React, { useContext } from 'react'
import { GlobalInfo } from '../pages/ContextWork'

const Child = () => {

    const {bgColor}= useContext(GlobalInfo);

  return (
    <div style={{color:bgColor}}>First Child Component</div>
  )
}

export default Child