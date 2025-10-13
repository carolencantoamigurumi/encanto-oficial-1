import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { BookOpenTextIcon, CircleDollarSign, Icon, Package, UsersIcon } from 'lucide-react'
import AdminTitle from './AdminTitle'
import Title from '../components/Title'
import { aggregateEbookSalesByDate } from '../utils/aggregateSales'
import { orderProducts } from '../assets/assets'
import EbookChart from '../components/charts/ebookChart'

const Dashboard = () => {

    const { currency } = useContext(ShopContext)

    const [ activeCard, setActiveCard ] = useState(null)        // Verifica qual card está selecionado
    const [ ebookSalesData, setEbookSalesData ] = useState([])
    const [ totalEbooksSold, setTotalEbooksSold ] = useState(0)



    // Quando o card 'Ebooks' for selecionado, carrega os dados agregados
    useEffect(() => {
        if (activeCard === 'Ebooks') {
            const data = aggregateEbookSalesByDate(orderProducts)
            setEbookSalesData(data)

            const total = data.reduce((acc, cur) => acc + cur.quantity, 0)
            setTotalEbooksSold(total)
        }
    },[activeCard])



  const dashboardCards = [
      { title: 'Ebooks', value: totalEbooksSold || 0, icon: BookOpenTextIcon },
      { title: 'Pedidos', icon: Package },
      { title: 'Receitas', icon: CircleDollarSign },
      { title: 'Clientes', icon: UsersIcon }
  ]

  return (
    <>
      <AdminTitle text1='Admin' text2='Dashboard' />

      <div className='relative flex flex-wrap gap-4 mt-6'>
        <div className='flex flex-wrap gap-4 w-full'>
          {dashboardCards.map((card, index) => {
            const Icon = card.icon
            const isActive = activeCard === card.title

            return (
              <div
                key={index}
                className={`flex items-center justify-between px-6 py-3 rounded-md w-full max-w-50 cursor-pointer ${
                  isActive ? 'bg-indigo-900 text-white' : 'bg-indigo-500 text-white'
                }`}
                onClick={() => setActiveCard(isActive ? null : card.title)}
              >
                <div>
                    <h1 className='text-sm'>{card.title}</h1>
                    <p className='text-xl font-medium mt-1'>{card.value}</p>
                </div>
                <Icon className='w-6 h-6' />
              </div>
            )
          })}
        </div>
      </div>

      {activeCard && (
        <div className='mt-10'>
          <Title text1={'Gráfico de '} text2={activeCard} />

          <div className='mt-4'>
            {activeCard === 'Ebooks' && ebookSalesData.length > 0 ? (
              <EbookChart data={ebookSalesData} />
            ) : activeCard === 'Ebooks' ? (
              <p>Carregando dados...</p>
            ) : (
              <p>Gráfico para "{activeCard}" em construção.</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Dashboard
