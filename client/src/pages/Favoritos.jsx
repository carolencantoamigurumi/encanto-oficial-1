import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductCard from '../components/ProductCard'
import { FileHeart } from 'lucide-react'

const Favoritos = () => {

    const { dummyProducts, favoriteItems } = useContext(ShopContext)

    const favorites = dummyProducts.filter(p => favoriteItems[p._id])

  return (
    <div className='pt-16'>
        <div className="text-2xl border-b border-indigo-200">
            <Title text1={"Ebooks"} text2={"Favoritos"} />
        </div>

        {/* Mensagem caso o Carrinho esteja vazio  */}
        {(!favoriteItems || favoriteItems.length === 0) && (
            <div className="mt-8 flex items-center justify-center gap-2 mt-4 text-indigo-600">
                <FileHeart />
                <p>Nenhum Ebook em seus Favoritos.</p>
            </div>
        )}
        

        {/* Lista de Favoritos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {favorites.map((item, index) => (
                <ProductCard 
                    key={index}
                    name={item.name}
                    id={item._id}
                    price={item.price}
                    image={item.image}                    
                />
            ))}        
        </div>
    </div>
  ) 
}

export default Favoritos
