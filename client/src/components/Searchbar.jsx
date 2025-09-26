import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useLocation } from 'react-router-dom';
import { assets } from '../assets/assets';
import { Search, X } from 'lucide-react';

const Searchbar = () => {

    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
    const [ visible, setVisible ] = useState(false);
    const location = useLocation();


    useEffect(() => {
        if (location.pathname.includes("ebooks")) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [location]);

  return showSearch && visible ? (
    <div className="bg-indigo-50 text-center">
        <div className="inline-flex items-center justify-center border border-indigo-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
            <input 
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                type="text"
                placeholder="Buscar"
                className="flex-1 outline-none bg-inherit placeholder-indigo-300 text-sm"
            />
            <Search color='#6160ac' />           
        </div>
           <X color='#6160ac'  onClick={() => setShowSearch(false)} className="inline w-7 cursor-pointer" />        
    </div>
  ) : null
}

export default Searchbar
