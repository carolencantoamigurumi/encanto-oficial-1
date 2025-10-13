import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductCard from './ProductCard'
import { motion } from 'motion/react'


const LatestCollection = () => {

  const { products } = useContext(ShopContext)
  const [ latestProducts, setLatestProducts ] = useState([])


  // Função que irá exibir os últimos 10 Ebooks lançados
    useEffect(() => {
        setLatestProducts(products.slice(0,10))
    },[products])
  

  return (
    <motion.div 
      initial={{opacity: 0, y: 40 }}
      whileInView={{opacity: 1, y: 0 }}
      transition={{duration: 1, ease: 'easeOut'}}
      className="my-10">

      <motion.div
        initial={{opacity: 0, y: 20 }}
        whileInView={{opacity: 1, y: 0 }}
        transition={{duration: 1, delay: 0.5}} 
        className="text-center py-8 text-3xl">
          <Title text1={"Últimos"} text2={"Lançamentos"}/>
          <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
              Veja aqui as últimas receitas lançadas na nossa loja e se Encante!
          </p>
      </motion.div>
      
      {/* Renderizar últimos 10 produtos com animação individual */}
      <motion.div 
        initial={{opacity: 0, y: 100 }}
        whileInView={{opacity: 1, y: 0 }}
        transition={{delay: 0.5, duration: 1 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6"
      >
        {latestProducts.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{opacity: 0, y: 60 }}
            whileInView={{opacity: 1, y: 0 }}
            transition={{
              duration: 0.7, 
              ease: 'easeOut',
              delay: 0.2 * index // ajuste esse valor para mais/menos intervalo
            }}
            viewport={{ once: true }}
          >
            <ProductCard 
              id={item._id}
              image={item.image}
              name={item.name}
              category={item.category}
              price={item.price}
            />
          </motion.div>
        ))}
      </motion.div>     
    </motion.div>
  )
}

export default LatestCollection
