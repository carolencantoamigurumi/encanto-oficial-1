import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2 } from 'lucide-react';
import Rating from './Rating';

const ProductCard = ({ id, name, image, price }) => {


  const { currency, navigate, addToCart, cartItems, removeFromCart } = useContext(ShopContext)  
  

  return (
    <div className="text-indigo-700 border border-gray-200 rounded-xl shadow-lg p-3">
      <Link to={`/produto/${id}`} className="text-indigo-700 cursor-pointer">
        <div className="overflow-hidden">
            <img src={image[0]} alt='' className="hover:scale-110 transition ease-in-out"  />
        </div>      
      </Link>

      <div className="text-indigo-500/60 text-sm">          
          <p className="pt-3 pb-1 text-gray-700 font-medium text-lg truncate w-full">{name}</p>
          <div className="flex items-center gap-0.5">
              <Rating productId={id} />
          </div>
          <div className="flex items-end justify-between mt-3">            
            <p className="md:text-xl text-base font-medium text-indigo-500">
                {currency} {(price.toFixed(2))}
            </p>

              <div className="text-indigo-500">                  
                <button
                    onClick={(e) => {
                        e.preventDefault()
                            if (cartItems[id]) {
                                removeFromCart(id)    // remove                                
                            } else {
                                addToCart(id)         // adiciona                                
                                navigate('/carrinho') // redireciona
                            }
                    }}
                    className={`flex items-center justify-center gap-1 px-4 md:px-5 h-[34px] rounded text-white font-medium cursor-pointer 
                        ${cartItems[id] ? "bg-red-500" : "bg-indigo-500"}`} 
                    >
                        {cartItems[id] ? (
                            <>
                                <Trash2 width={15} />
                                Remover
                            </>
                        ) : (
                            <>
                                <ShoppingCart width={15} />
                                Adicionar
                            </>
                        )}                    
                </button>                      
              </div>
              
          </div>
      </div>
    </div>
  )
}

export default ProductCard
