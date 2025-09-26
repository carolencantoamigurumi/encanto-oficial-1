import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { CloudDownload } from 'lucide-react'

const Downloads = () => {

    const { dummyProducts, currency } = useContext(ShopContext)

    const [ downloadEbook, setDownloadEbook ] = useState([])

  return (
    <div className="pt-16" >
        <div className="text-2xl border-b border-indigo-200">
            <Title text1={"Meus"} text2={"Downloads"} />
        </div>

        {/* Mensagem caso o Carrinho esteja vazio  */}
        {(!downloadEbook || downloadEbook.length === 0) && (
            <div className="mt-8 flex items-center justify-center gap-2 mt-4 text-indigo-600">
            <CloudDownload />
            <p>Você não possui Ebooks para download.</p>
            </div>
        )}


        <div>
            {dummyProducts.slice(1,4).map((item,index) => (
                <div key={index} className="py-4 border-b border-indigo-200 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-start gap-6 text-sm">
                        <img className="w-16 sm:w-20" src={item.image[0]} alt="Imagem do Produto" />
                        <div className="flex flex-col">
                            <p className="sm:text-base font-medium">{item.name}</p>
                            <p className="mt-1">Valor: <span className='text-base text-indigo-700'>{item.amount === 0 ? "Grátis" : `${currency} ${(item.price).toFixed(2)}`}</span></p>                                                      
                        </div>
                    </div>

                    {/* Método de pagamento (ajuste para dados reais) */}
                    <div className="flex flex-col text-sm">              
                        <p className="mt-1">Data da Compra: <span className="text-indigo-400">{new Date(item.date).toLocaleDateString("pt-Br", {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric'
                        })}</span></p> 
                        <p className="mt-1">Pagamento: <span className="text-indigo-400">{item.paymentMethod}</span></p>            
                    </div>

                    <div className="flex justify-between">
                        {/* Download */}
                        <button className={`border px-4 py-2 text-sm font-medium rounded-sm transition-opacity duration-300 ${item.payment ? "text-indigo-700 hover:bg-indigo-100 cursor-pointer"
                                    : "opacity-40 cursor-not-allowed"}`}>
                            Download do Ebook
                        </button>
                    </div>
                </div>
            ))}
        </div>      
    </div>
  )
}

export default Downloads
