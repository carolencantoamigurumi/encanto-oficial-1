import React from 'react'

const OrderModal = ({show, onClose, order, currency}) => {

    if (!show || !order) return null
    
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#00000050] z-50 p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">

            {/* Título */}
            <h2 className="text-xl font-semibold text-center mb-4">Detalhes do Pedido</h2>

             {/* Dados do cliente */}
             <div className="mb-4">
                <h3 className="font-semibold mb-2">Detalhes do cliente</h3>

                <p>
                    <span className="text-indigo-700 font-medium">Cliente:</span>{" "}
                    {order.address.firstName} {order.address.lastName}
                </p>
                <p>
                    <span className="text-indigo-700 font-medium">E-mail:</span>{" "}
                    {order.address.email}
                </p>
                <p>
                    <span className="text-indigo-700 font-medium">Fone:</span>{" "}
                    {order.address.phone}
                </p>
                <p>
                    <span className="text-indigo-700 font-medium">Endereço:</span>{" "}
                    {order.address.address}
                </p>
             </div>

            {/* Produtos */}
            <div className="mb-4">
                <h3 className="font-semibold mb-2">Ebooks</h3>
                <div className="space-y-2">
                    {order.items.map((item, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between shadow-xl rounded p-2 mr-5"
                    >
                        {/* Imagem */}
                        <div className="flex items-center gap-3">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded"
                            />
                        <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">Qtd: {item.quantity}</p>
                        </div>
                        </div>

                        {/* Valor */}
                        <span className="font-semibold">
                        R$ {item.price}
                        </span>
                    </div>
                    ))}
                </div>
            </div>


            {/* Pagamento e status */}
            <div className="space-y-1 text-sm">
                <p>
                    <span className="text-indigo-700 font-medium">Tipo de Pagamento:</span>{" "}
                    {order.paymentMethod}
                </p>
                <p>
                    <span className="text-indigo-700 font-medium">Pago:</span>{" "}
                    {order.payment ? (
                    <span className="text-green-600">Sim</span>
                    ) : (
                    <span className="text-red-600">Não</span>
                    )}
                </p>

                {order.couponCode && (
                    <p>
                    <span className="text-indigo-700 font-medium">Cupom:</span> {order.couponCode}
                    </p>
                )}

                <p>
                    <span className="text-indigo-700 font-medium">Valor Total:</span> R$ {order.amount}
                </p>

                <p>
                    <span className="text-indigo-700 font-medium">Data da Venda:</span>{" "}
                    {new Date(order.date).toLocaleString("pt-BR")}
                </p>
            </div>

            {/* Botão fechar */}
            <div className="flex justify-end mt-6">
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 transition cursor-pointer"
                >
                    Fechar
                </button>
            </div>            
        </div>      
    </div>
  )
}

export default OrderModal
