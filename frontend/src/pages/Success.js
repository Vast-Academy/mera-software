import React from 'react'
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <div className='bg-slate-200 max-w-md w-full mx-auto flex items-center justify-center flex-col p-4 m-2 rounded'>
      {/* <img 
        src=''
       width={150} 
       height={150}/> */}
      <p className='text-green-600 font-bold text-xl'>Payment Successfully</p>
      <Link to={"/order"} className='p-2 px-3 mt-5 border-2 text-green-600 border-green-600 rounded font-semibold hover:bg-green-600 hover:text-white'>See Order</Link>
    </div>
  )
}

export default Success
