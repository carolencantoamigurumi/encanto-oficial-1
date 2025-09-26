import React from 'react'
import AdminNavbar from './AdminNavbar'
import AdminSidebar from './AdminSidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
        <AdminNavbar />
        <hr className='border-indigo-300' />
        <div className='flex w-full'>
            <AdminSidebar />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
                <Outlet />
            </div>
        </div>      
    </>
  )
}

export default Layout
