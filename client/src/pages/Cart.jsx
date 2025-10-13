import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import toast from 'react-hot-toast'
import { ArrowRight, ShoppingCart, SquareCheckBig, TicketPercent, Trash2 } from 'lucide-react'
import { useClerk } from '@clerk/clerk-react'

const Carrinho = () => {

  const { products, currency, cartItems, navigate, user, removeFromCart } = useContext(ShopContext)
  const [ cartData, setCartData ] = useState([])
  const [ lastAdded, setLastAdded ] = useState(null)
  const [ showCupom, setShowCupom ] = useState(false)
  const [ cupom, setCupom ] = useState("");
  const { redirectToSignUp } = useClerk()


  const handleFinalizarCompra = async () => {
    if (!user) {
      toast("Você precisa se cadastrar para continuar", { icon: "🔑" });
      return redirectToSignUp({ redirectUrl: "/fazer-pedido" });
    }
    navigate("/fazer-pedido");
  };


  // Monta o cartData para exibir na página
  useEffect(() => {
    const temporaryData = []
    for(const item in cartItems) {
      if (cartItems[item] > 0) {
        temporaryData.push({
          _id: item,
          quantity: cartItems[item]
        })
      }
    }
    setCartData(temporaryData)
    

  // Captura o último item adicionado
    if (temporaryData.length > 0) {
      const last = temporaryData[temporaryData.length - 1]
      const product = products.find((p) => p._id === last._id)
      if (product) {
        setLastAdded(product)
      }
    }  
  },[cartItems])



  return (
    <div className="pt-14">
      <div className="text-2xl mb-3 border-b border-indigo-200">
        <Title text1={"Seu"} text2={"Carrinho"} />
      </div>

      {/* Opção de Continuar Comprando */}
      {lastAdded && (
        <div className="flex items-center justify-between bg-indigo-50 p-3 mb-4">
          <p className="flex items-center gap-2">
            <SquareCheckBig color='#6160ac' />
            <span className="font-bold">{lastAdded.name} </span>foi adicionado ao seu carrinho.
          </p>
          <button
            onClick={() => navigate('/ebooks')}
            className="bg-indigo-700 text-white px-4 py-2 text-sm cursor-pointer"
          >
            Continuar Comprando
          </button>
        </div>
      )}
      

      {/* Mensagem caso o Carrinho esteja vazio  */}
      {(!cartData || cartData.length === 0) && (
        <div className="mt-8 flex items-center justify-center gap-2 mt-4 text-indigo-600">
          <ShoppingCart />
          <p>Seu carrinho está vazio.</p>
        </div>
      )}

      <div>
        {cartData?.map((item, index) => {
          const productData = products.find((product) => product._id === item._id)
          
          
          return (
            <div key={index} className="py-4 border-b border-indigo-200 text-gray-700 grid grid-cols-[4fr_1_1fr_1fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
              <div className="flex items-start gap-6">
                <img src={productData.image?.[0]} alt={item.name} className="w-16 sm:w-20" />
                <div>
                  <p className="text-xs sm:text-lg font-medium">{productData.name}</p>                  
                </div>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm sm:text-lg font-medium">{currency} {productData.price.toFixed(2)}</p>
              </div>
              <Trash2 onClick={() => removeFromCart(item._id)} className='cursor-pointer' />
            </div>
          )
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />

        {/* Aplicar Cupom   */}
        <button
          onClick={() => setShowCupom(!showCupom)}
          className="flex items-center mt-3 text-sm text-indigo-600 cursor-pointer"
        >
          Aplicar cupom de desconto
          <ArrowRight width={20} />
        </button>

        {showCupom && (
          <div className="flex items-center gap-2 mt-4">
            <div className="relative flex-1">
              <TicketPercent 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-600" 
                size={18}
              />
              <input
                onChange={(e) => setCupom(e.target.value)}
                value={cupom}
                type="text"
                placeholder="Código do Cupom"
                className="w-full border border-indigo-300 rounded-lg pl-10 pr-3 py-2 text-sm 
                          placeholder-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <button type="button" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 text-sm cursor-pointer">Aplicar</button>
          </div>        
        )}


          <div className="w-full text-end">
            <button onClick={handleFinalizarCompra} className="bg-indigo-700 text-white text-sm my-8 px-8 py-3 cursor-pointer">
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>      
    </div>
  )
}


export default Carrinho
