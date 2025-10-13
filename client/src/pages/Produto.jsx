import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets, dummyUserData } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import ProductCard from '../components/ProductCard';
import Rating from '../components/Rating';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';

const Produto = () => {

  const { products, currency, calculateRating, cartItems, addToCart, removeFromCart, navigate, user, favoriteItems, toggleFavorite } = useContext(ShopContext)

  const { productId } = useParams()  // o productId vem do App.jsx- routes - product
  const [ productData, setProductData ] = useState(false);
  const [ image, setImage ] = useState("");
  const [ selectedTab, setSelectedTab ] = useState("Descrição");


    // Buscar Dados do Produto
    const fetchProductData = async () => {
      const item = products.find((item) => item._id === productId)
        if (item) {
          setProductData(item)
          setImage(item.image[0])
        }
    }
    

    // Exibe o produto pelo Id na página
    useEffect(() => {
        fetchProductData()
    },[productId, products])




  return productData ? (
    <div className="pt-10 transition-opacity ease-in duration-500 opacity-100">
      <p className='mb-2'>
          <Link to={'/'}>Home</Link> /
          <Link to={'/ebooks'}> Ebooks</Link> /          
          <span className="text-indigo-500"> {productData.name}</span>
      </p>

      {/* --------------------------- Dados do Produto --------------------------- */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">

        {/* --------------------------- Imagens do Produto --------------------------- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {
              productData.image.map((item, index) => (
                <img 
                  onClick={() => setImage(item)}
                  key={index}
                  src={item} 
                  alt="Imagem do Ebook"
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                />
              ))
            }
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="" className="w-full h-auto" />
          </div>
        </div>



        {/* --------------------------- Informações do Produto --------------------------- */}
        <div className="flex-1">
          <h1 className="text-3xl font-medium">{productData.name}</h1>
          
          <div className="flex items-center gap-0.5 mt-1">           
            <Rating productId={productId} />            
          </div>

          <p className="mt-5 text-3xl font-medium">{currency} {(productData.price.toFixed(2))}</p>
          <p className="mt-5 text-indigo-500 md:w-4/5">{productData.description}</p>                   
              
          <div className="flex items-center flex-wrap gap-8 text-indigo-500 mt-10">                  
            <button
                onClick={(e) => {
                    e.preventDefault()
                    if (cartItems[productId]) {
                        removeFromCart(productId)    // remove                        
                    } else {
                        addToCart(productId)         // adiciona                        
                        // navigate('/carrinho') // redireciona
                    }
                }}
                className={`flex items-center justify-center gap-1 px-4 md:px-5 h-[34px] rounded text-white font-medium cursor-pointer 
                    ${cartItems[productId] ? "bg-red-500" : "bg-indigo-500"}`} 
                >
                    {cartItems[productId] ? (
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

            {/* Favoritos */}            
            <button 
              onClick={() => toggleFavorite(productId)}
              className={`transition cursor-pointer active:scale-95 p-1.5 rounded-full 
                        ${favoriteItems.includes(productId) ? "bg-red-500" : "bg-indigo-500"}`}>
              <Heart
                className="w-6 h-6"
                strokeWidth={2}
                stroke="white"  
                fill={favoriteItems.includes(productId) ? "white" : "none"}
              />
            </button>              

          </div>                    
              

          <div className="text-sm text-indigo-300 mt-10 flex flex-col gap-1">
            <p>Você está adquirindo uma receita digital (PDF) de amigurumi com download imediato.</p>
            <p>A peça não vem pronta - é você quem vai dar vida a ela com suas próprias mãos!</p>
          </div>
        </div>
      </div>



      {/* --------------------------- Descrição & Comentários ------------------------------ */}
      <div className="my-18 text-sm text-slate-600">

        {/* Tabs */}
        <div className="flex border-b border-indigo-500 mb-6 max-w-2xl">
          {['Descrição', 'Comentários'].map((tab, index) => (
            <button
              key={index}
              onClick={() => setSelectedTab(tab)}
              className={`${tab === selectedTab ? 'border-b-[1.5px] font-semibold' : 'text-indigo-500'} px-3 py-2 font-medium cursor-pointer`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Descrição Geral dos Ebooks */}
        <div className="flex flex-col gap-4 py-2 text-sm text-gray-500">
          {selectedTab === 'Descrição' && (
            <>
              <p className="flex items-center gap-2">
                <img src={assets.encanto} alt="Ícone das Meninas Superpoderosas" className="w-5" />
                Receitas exclusivas, feitas com muito carinho e cheias de detalhes
                pra te ajudar a criar amigurumis lindos e encantadores.
              </p>
              <p className="flex items-center gap-2">
                <img src={assets.encanto} alt="Ícone das Meninas Superpoderosas" className="w-5" />
                Instruções passo a passo, claras e organizadas, ideais para todos os
                níveis de habilidade.
              </p>
              <p className="flex items-center gap-2">
                <img className="w-5" src={assets.encanto} alt="" />
                Arquivo em PDF ilustrado com fotos explicativas de cada etapa,
                garantindo mais facilidade e segurança na confecção.
              </p>
              <p className="flex items-center gap-2">
                <img className="w-5" src={assets.encanto} alt="" />
                Lista completa de materiais, para você se preparar com antecedência
                e evitar imprevistos.
              </p>
              <p className="flex items-center gap-2">
                <img className="w-5" src={assets.encanto} alt="" />
                Preço sugerido de venda, auxiliando você a transformar seu talento
                em renda extra com profissionalismo.
              </p>
            </>
        )}
      </div>

          
      {/* Comentários sobre o produto */}
      {selectedTab === 'Comentários' && (
        <div className="flex flex-col gap-3">
          {productData.ebookReviews.map((review, index) => {
            // Busca o usuário correspondente
            const user = dummyUserData.find(u => u.id === review.userId);
            // Busca o rating desse usuário (opcional: retorna undefined se não tiver)
            const userRating = productData.ebookRatings.find(r => r.userId === review.userId)?.rating ?? 0;
            return (
              <div key={index} className='flex gap-5 mb-10'>
                <img src={user?.image} alt="user name" className="size-10 rounded-full" width={100} height={100} />
                <div>
                  <div className="flex items-center">
                    {Array(5).fill('').map((_, idx) => (
                      <div key={idx} className={`mt-0.5 ${userRating >= idx + 1 ? "text-yellow-500" : "text-indigo-200"}`}>
                        &#9733;
                      </div>
                    ))}
                  </div>
                  <p className="text-sm max-w-lg my-4">{review.review}</p>
                  <p className="font-medium text-slate-800">{review.name}</p>
                  <p className="mt-3 font-light">{new Date(review.date).toDateString()}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      </div>          


      {/* --------------------------- Display Produtos Relacionados ---------------------------------- */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
      
    </div>

  ) : <div className="opacity-0"></div>
}

export default Produto
