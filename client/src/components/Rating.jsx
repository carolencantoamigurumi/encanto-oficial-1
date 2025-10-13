import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

const Rating = ({ productId, onRate, interactive = false }) => {    

    const { products, calculateRating } = useContext(ShopContext)
    const [ rating, setRating ] = useState(0)

    // buscar produto no dummyProducts
    const product = products.find(p => p._id === productId)


    useEffect(() => {
        if(product && calculateRating) {            // Verifica se calculateRating existe
            const average = calculateRating(product)
            setRating(average)        
        }
    },[productId, calculateRating])


    const handleRating = (value) => {
        if (!interactive) return // Só permite interação se habilitada
        setRating(value)
        if (onRate) onRate(value, productId)
    }


    // Se não encontrar o produto, mostra 5 estrelas apagadas (text-indigo-200).
    if (!product) {
        return (
            <div className="flex items-center">
                {Array.from({ length: 5 }, (_, index) => (
                    <span
                        key={index}
                        className="text-lg sm:text-xl text-indigo-200"
                    >
                        &#9733;
                    </span>
                ))}
            </div>
        )
    }


  return (
    <div className="flex items-center">
        {Array.from({length: 5}, (_, index) => {
            const starValue = index + 1
            return (
                <span 
                    key={index} 
                    onClick={() => handleRating(starValue)}
                    className={`text-sm sm:text-base cursor-pointer transition-colors ${starValue <= rating ? 'text-yellow-500' : 'text-indigo-200'}`} >
                    &#9733;
                </span>
            )
        })}
        <span className="ml-2 text-sm text-indigo-600">            
            ({product.ebookRatings?.length || 0})   {/* quantidade de avaliações já feitas */} 
        </span>      
    </div>
  )
}

export default Rating
