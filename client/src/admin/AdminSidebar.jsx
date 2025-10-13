import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { LayoutDashboardIcon, ListCollapseIcon, ListIcon, PlusSquareIcon, SquarePercentIcon, UsersRound } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const AdminSidebar = () => {

  const { user } = useContext(ShopContext)  

  const adminNavlinks = [
      { name: 'Dashboard', path: '/admin', icon: LayoutDashboardIcon },
      { name: 'Adicionar', path: '/admin/add', icon: PlusSquareIcon },
      { name: 'Lista', path: '/admin/lista', icon: ListIcon },
      { name: 'Clientes', path: '/admin/clientes', icon: UsersRound },
      { name: 'Vendas', path: '/admin/vendas', icon: ListCollapseIcon },
      { name: 'Cupons', path: '/admin/cupons', icon: SquarePercentIcon },
  ]


  return (
    <div className='h-[calc(100vh-64px)] md:flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-indigo-600/40 text-sm'>
      <img src={user.imageUrl} alt="Imagem do Admin" className='h-9 md:h-20 w-9 md:w-20 rounded-full mx-auto' />
      <p className='mt-2 text-base text-indigo-700 max-md:hidden text-center w-full'>{user.firstName} {user.lastName}</p>

      <div className='w-full'>
        {adminNavlinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path} end
            className={({ isActive }) =>
              `relative flex items-center max-md:justify-center gap-2 w-full py-2.5 min-md:pl-10 first:mt-6 
              ${isActive ? 'bg-indigo-600 text-white' : 'text-indigo-400'}`}>

            {({isActive}) => (
                <>
                    <link.icon className={`w-5 h-5 ${isActive && 'text-white'}`} />
                    <p className='max-md:hidden'>{link.name}</p>
                    <span className={`w-1.5 h-10 rounded-1 right-0 absolute ${isActive && 'bg-indigo-600'}`} />
                </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default AdminSidebar
