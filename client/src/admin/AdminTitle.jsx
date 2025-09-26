import React from 'react'

const AdminTitle = ({ text1, text2 }) => {
  return (
    <h1 className='font-medium text-2xl'>
        <p className="text-indigo-500">
            {text1} <span className="text-indigo-700 font-medium">{text2}</span>
        </p>
    </h1>
  )
}

export default AdminTitle
