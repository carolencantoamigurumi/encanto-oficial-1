import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const AdminNavbar = () => {

    const { navigate } = useContext(ShopContext)


    const handleLogout = () => {
        navigate('/')
    }

  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <Link to={'/'}>
            <img src={assets.logo_admin} alt="Logo Amigurumi" className='w-64' />
        </Link>
        <button onClick={handleLogout} className='bg-indigo-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm cursor-pointer' >Sair</button>       
    </div>
  )
}

export default AdminNavbar
