import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {

   const { currency, getCartAmount, cupom } = useContext(ShopContext)

   const subtotal = getCartAmount()
   const desconto = cupom ? (subtotal * (cupom / 100)) : 0
   const totalFinal = subtotal - desconto



  return (
    <div className='full'>

        <div className='text-2xl'>
            <Title text1={"Total do"} text2={"Carrinho"} />
        </div>


        <div className="flex flex-col gap-2 mt-2 text-sm">
            <div className="flex justify-between">
                <p>Subtotal</p>
                <p>{currency} {subtotal.toFixed(2)}</p>
            </div>

            <hr className="border-t border-indigo-500" />

            <div className='flex justify-between'>
                <p>Cupom de Desconto</p>
                <p>{currency} {desconto.toFixed(2)}</p>
            </div>

            <hr className="border-t border-indigo-500" />

            <div className='flex justify-between'>
                <b>Total</b>
                <b>{currency} {totalFinal <= 0 ? "0.00" : totalFinal.toFixed(2)}</b>
            </div>
        </div>      
    </div>
  )
}

export default CartTotal
