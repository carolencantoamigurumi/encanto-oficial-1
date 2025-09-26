import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductCard from './ProductCard'

const RelatedProducts = ({ category, subCategory}) => {

    const { dummyProducts } = useContext(ShopContext)
    const [ related, setRelated ] = useState([])


    useEffect(() => {
        if (dummyProducts.length > 0) {
            let productsCopy = dummyProducts.slice()
            productsCopy = productsCopy.filter((item) => category === item.category)
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory)
            setRelated(productsCopy.slice(0,5))
        }
    },[dummyProducts])

  return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2'>
            <Title text1={'Outros'} text2={'Encantos'} />
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {related.map((item, index) => (
                <ProductCard key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
            ))}
        </div>      
    </div>
  )
}

export default RelatedProducts
