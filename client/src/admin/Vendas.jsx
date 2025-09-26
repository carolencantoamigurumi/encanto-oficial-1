import React, { useContext, useEffect, useState } from 'react'
import AdminTitle from './AdminTitle'
import { ShopContext } from '../context/ShopContext'
import toast from 'react-hot-toast'
import { SquarePercentIcon } from 'lucide-react'
import OrderModal from '../components/OrderModal'

const Vendas = () => {

  const { orderProducts, currency } = useContext(ShopContext)

  const [ orders, setOrders ] = useState([])
  const [ showModal, setShowModal ] = useState(false)         // visibilidade do modal
  const [ selectedOrder, setSelectedOrder ] = useState(null)  // guardar a venda selecionada



  // ------------------------ Função para Buscar Todas as Vendas ------------------------
  const fetchAllOrders = async () => {
    if (orderProducts) {
        setOrders(orderProducts)
      }   
  }


  // ------------------------ Função para abrir o modal com a venda clicada ------------------------
  const openModal = (order) => {
    setSelectedOrder(order)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedOrder(null)
  }



  // Executa a função para buscar as Vendas
  useEffect(() => {
    fetchAllOrders()
  },[])




  return (
    <>
      <AdminTitle text1='Vendas' text2='Realizadas' />

      <div className={showModal ? "filter blur-sm pointer-events-none select-none" : ""}>                
        {orders.map((order) => (
          <div 
            key={order._id} 
            onClick={() => openModal(order)}
            title="Clique para ver detalhes"
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[1.5fr_1.5fr_1fr_1fr_2fr_1fr] gap-5 items-start border-2 border-indigo-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 cursor-pointer">
            {/* Ordem Numérica das vendas */}
            <div>
              {order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return (
                    <p key={index} className='py-1'>{item.name}</p>
                  )
                } else {
                  return (
                    <p key={index} className='py-1'>{item.name}</p>
                  )
                }
              })}
            </div>            

            <div>
              <p className="mt-3 mb-2 font-medium">{order.address.firstName + " " + order.address.lastName}</p>
              <p>{order.address.phone}</p>
            </div>
              
            <p className="text-sm sm:text-[15px]">Items : {order.items.length}</p>

            <p>
              {order.couponCode ? (
                <span className="inline-block bg-indigo-600 text-white px-3 py-1 rounded-full select-none ">
                  {order.couponCode}
                </span>
              ) : (
                <span className="text-gray-500 italic">Cupom não usado</span>
              )}
            </p>
            

            <div>
              <p className="mt-3">Método : {order.paymentMethod}</p>              
              <p>Data : {new Date(order.date).toLocaleDateString()}</p>
            </div>

            <p className="text-sm sm:text-[15px]">{currency} {Number(order.amount).toFixed(2)}</p>

          </div>
        ))}        
      </div>

      <OrderModal 
        show={showModal}
        onClose={closeModal}
        order={selectedOrder}
        currency={currency}
      />
    </>
  )
}

export default Vendas
