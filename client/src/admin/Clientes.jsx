import React, { useContext, useEffect, useState } from 'react'
import AdminTitle from './AdminTitle'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'

const Clientes = () => {
    
    const { dummyUserData } = useContext(ShopContext)

    const [ list, setList ] = useState([])


    // ------------------------ Buscar Lista de Clientes ------------------------
    const fetchList = async () => {
        if (dummyUserData) {
            setList(dummyUserData)
        }
    }



    // Executa a função de buscar a lista de produtos
    useEffect(() => {
        fetchList()
    },[])


  return (
    <>
        <AdminTitle text1='Clientes' text2='Cadastrados' />

        <div className='relative flex flex-wrap gap-4 mt-6'>        
            {
            list.map((item, index) => (
                <div key={index} className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-indigo-300 text-sm">
                <div className="flex justify-center items-center">
                    <img src={item.image || assets.placeholder} alt="Avatar" className="w-12 rounded-full" />
                </div>
                <p className="text-center">{item.name}</p>
                <p className="text-center">{item.email}</p>
                <p className="text-center">{item.cpf}</p>
                <p className="text-center">{item.phone}</p>
                <p className="text-center">{item.role}</p>
                </div>
            ))
            }
        </div>
      
    </>
  )
}

export default Clientes
