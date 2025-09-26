import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { useClerk, UserButton } from '@clerk/clerk-react'
import { ChevronRightCircle, ChevronRightCircleIcon, CloudDownload, FileHeart, MenuIcon, PackageOpen, Search, ShoppingCart, UserCog } from 'lucide-react'
import { motion } from 'motion/react'

const Navbar = () => {

    const { user, navigate, setShowSearch, getCartCount, isAdmin, favoriteItems } = useContext(ShopContext)
    const [ visible, setVisible ] = useState(false)             //Menu responsivo
    const { openSignIn } = useClerk()
    


  return (
    <>
        {/* Header fixo */}
        <motion.div 
            initial={{y: -20, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{duration: 0.5}}
            className="flex items-center justify-between py-5 font-medium sticky top-0 z-50 bg-white/90 transition-all duration-300">

            <Link to={'/'}>
                <motion.img whileHover={{scale: 1.05}} src={assets.logo} alt="Logo da Encanto" className="w-64" />
            </Link>

            <ul className="hidden sm:flex gap-5 text-indigo-600">
                <NavLink to='/' className="flex flex-col items-center gap-1">
                    <p>HOME</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-indigo-700 hidden" />
                </NavLink>

                <NavLink to="/ebooks" className="flex flex-col items-center gap-1">
                    <p>EBOOKS</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-indigo-700 hidden" />
                </NavLink>

                {Object.keys(favoriteItems).length > 0 && 
                    <NavLink to="/favoritos" className="flex flex-col items-center gap-1">
                        <p>FAVORITOS</p>
                        <hr className="w-2/4 border-none h-[1.5px] bg-indigo-700 hidden" />
                    </NavLink>
                }
                
                <NavLink to="/sobre" className="flex flex-col items-center gap-1">
                    <p>SOBRE</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-indigo-700 hidden" />
                </NavLink>

                <NavLink to="/contato" className="flex flex-col items-center gap-1">
                    <p>CONTATO</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-indigo-700 hidden" />
                </NavLink>

            </ul>

            <div className="flex items-center gap-6">
                <Link to='/ebooks'>
                    <Search onClick={() => setShowSearch(true)} color='#6160ac' />                    
                </Link>

                <div className="relative group">
                    <Link to="/carrinho" className="relative flex items-center gap-2 text-slate-600">
                        <ShoppingCart color='#6160ac' />
                        {getCartCount() > 0 && (
                            <p className="absolute right-[-5px] top-[-10px] w-4 text-center leading-4 bg-red-500 text-white aspect-square rounded-full text-[8px]">
                                {getCartCount()}
                            </p>
                        )}                        
                    </Link>
                </div>

                {
                    !user ? (
                        <button onClick={openSignIn} className="px-8 py-2 bg-indigo-700 hover:bg-indigo-600 transition text-white rounded-full cursor-pointer">
                            Login
                        </button>
                    ) : (
                        <UserButton>
                            <UserButton.MenuItems>
                                <UserButton.Action label='Meus Pedidos' labelIcon={<PackageOpen width={17} />} onClick={() => navigate('/pedidos')} />
                                <UserButton.Action label='Meus Downloads' labelIcon={<CloudDownload width={17} />} onClick={() => navigate('/downloads')} />
                                <UserButton.Action label='Ebooks Favoritos' labelIcon={<FileHeart width={17} />} onClick={() => navigate('/favoritos')} />
                                { isAdmin && (
                                    <UserButton.Action label='Admin' labelIcon={<UserCog width={17} />} onClick={() => navigate('/admin')} />
                                )}
                            </UserButton.MenuItems>
                        </UserButton>
                    )
                }
                


                {/* Ícone de Menu Mobile */}
                <MenuIcon onClick={() => setVisible(true)} color='#6160ac' className='w-7 min-w-7 cursor-pointer sm:hidden' />                
            </div>
        </motion.div>


        {/* Menu Responsivo fora do header */}
        <div className={`fixed top-0 right-0 bottom-0 left-0 bg-white z-50 transition-all duration-300 
            ${visible ? 'translate-x-0' : 'translate-x-full'} ease-in-out`}>
                
                <div className='flex flex-col text-indigo-700'>
                    <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer" >
                        <ChevronRightCircleIcon />                        
                        <p>Voltar</p>
                    </div>

                    <NavLink to='/' onClick={() => setVisible(false)} className="py-2 pl-6 border" >
                        HOME
                    </NavLink>

                    <NavLink to='/ebooks' onClick={() => setVisible(false)} className="py-2 pl-6 " >
                        EBOOKS
                    </NavLink>

                    <NavLink to='/sobre' onClick={() => setVisible(false)} className="py-2 pl-6 border" >
                        SOBRE
                    </NavLink>

                    <NavLink to='/contato' onClick={() => setVisible(false)} className="py-2 pl-6 " >
                        CONTATO
                    </NavLink>
                </div>
        </div>
    </>
  )
}

export default Navbar
