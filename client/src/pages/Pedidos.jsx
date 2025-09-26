import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { PackageOpen } from 'lucide-react'
import RatingModal from '../components/RatingModal'

const Pedidos = () => {
  
  const { orderProducts, currency } = useContext(ShopContext)

  const [ orders, setOrders ] = useState([])
  const [ ratingModal, setRatingModal ] = useState(null);



  return (
    <div className="pt-16 ">
      <div className="text-2xl border-b border-indigo-200">
        <Title text1={"Meus"} text2={"Pedidos"} />
      </div>

      {/* Mensagem caso o Carrinho esteja vazio  */}
      {(!orders || orders.length === 0) && (
          <div className="mt-8 flex items-center justify-center gap-2 mt-4 text-indigo-600">
            <PackageOpen />
            <p>Você ainda não adquiriu nenhum Ebook.</p>
          </div>
      )}



      <div className="md:p-10 p-4 space-y-4">
        {/* Linhas de pedidos */}
        {orderProducts.map((order) => (
          <div
            key={order._id}
            className="p-5 rounded-md border border-indigo-300 space-y-4"
          >

            <p className="text-sm text-gray-500">
              Pedido em <span className="text-indigo-500">{new Date(order.date).toLocaleDateString()}</span>
            </p>

            {order.items.map((item, idx) => (
              <div key={idx} className='flex flex-col md:grid md:grid-cols-[1.5fr_1fr_1fr_1fr] md:items-center gap-5 p-4 rounded-md border border-indigo-200'>

                {/* Produto e imagem */}
                <div className="flex gap-5 items-center">
                  <img src={Array.isArray(item.image) ? item.image[0] : item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md opacity-90" />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.category} — {item.subCategory}</p>
                  </div>
                </div>

                {/* Preço */}
                <div className="text-base font-medium text-black/70">
                  {currency === 'R$' ? `R$ ${item.price}` : `$ ${item.price}`}
                  <span className="ml-2 text-xs text-indigo-500">{item.discount > 0 && `-${item.discount}% off`}</span>
                </div>
                

                {/* Status */}
                <div className="flex items-center gap-2">
                  <span className={`min-w-2 h-2 rounded-full ${order.payment ? 'bg-green-500' : 'bg-yellow-400'}`}></span>
                  <span className="text-sm md:text-base">
                    {order.payment ? 'Aprovado' : 'Pendente'}
                  </span>
                </div>

                <div>
                  {/* só deixa avaliar se pagamento foi aprovado */}
                  {order.payment && (  
                    <button
                      onClick={() => setRatingModal({ 
                        orderId: order._id,
                        productId: item._id || idx,
                        name: item.name,
                        image: Array.isArray(item.image) ? item.image[0] : item.image
                      })}
                      className="px-3 py-1 text-sm rounded-md text-indigo-600 border border-indigo-400 hover:bg-indigo-50 transition cursor-pointer"
                    >
                      Avaliar Ebook                    
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* Modal único */}
        {ratingModal && (
          <RatingModal
            ratingModal={ratingModal}
            setRatingModal={setRatingModal}
          />
        )}
      </div>
    </div>
  )
}

export default Pedidos
