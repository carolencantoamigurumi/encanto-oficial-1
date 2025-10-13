import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { MoveLeft, ShoppingCart, SquareCheckBig, Trash2 } from 'lucide-react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import toast from 'react-hot-toast'


const Carrinho = () => {

    const { products, cartItems, navigate, currency, user, removeFromCart, getCartAmount, cupom, getToken, axios } = useContext(ShopContext)
    const [ cartData, setCartData ] = useState([])
    const [ paymentMethod, setPaymentMethod ] = useState("Pix");
    const [ lastAdded, setLastAdded ] = useState(null)
    const [ showAddress, setShowAddress ] = useState(false)
    const [ showCupom, setShowCupom ] = useState(false)
    const [ cupomInput, setCupomInput ] = useState("")
    const [ formData, setFormData ] = useState({
        firstName: "",
        lastName: "",
        cpf: "",
        email: "",
        phone: "",
        city: "",
        state: "",
        country: ""
      });


    // Carrega dados do localStorage ao abrir a página
    useEffect(() => {
       if (user) {
        const savedData = localStorage.getItem(`checkoutData_${user.id}`)
        if (savedData) {
           setFormData(JSON.parse(savedData))
        }
       }
    }, [user])



    // Atualiza os dados do formulário
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData((data) => ({ ...data, [name]: value }));
    };



    const subtotal = getCartAmount()
    const desconto = cupom ? (subtotal * (cupom / 100)) : 0
    const totalFinal = subtotal - desconto


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



    // Função para Finalizar o Pedido
    const finalizarPedido = async () => {
        if (!formData.email) {
            toast.error('Preencha seu e-mail para continuar')
            return
        }

        try {
            const payload = {
                transaction_amount: totalFinal,
                description: `Compra de ${cartData.length} amigurumi(s)`,
                payer: {
                    email: formData.email,
                }
                // outros campos relevantes podem ser enviados conforme necessário
            }

            let endpoint = ""
            if (paymentMethod === 'Pix') {
                endpoint = "/api/order/pix"  // seu endpoint back que cria pedido PIX
            } else {
                // implementar outros métodos
                return
            }

            const token = await getToken()

            const response = await axios.post(endpoint, payload, {headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json',}})
            
            if (!response || !response.data) {
                toast.error("Resposta inválida do servidor");
                return;
            }
            
            const data = response.data;
            
            if (paymentMethod === 'Pix') {
                // redirecionar para o link do boleto / ticket PIX
                window.open(data.transactions.payments[0].payment_method.ticket_url, "_blank");
            }
        } catch (error) {
            console.error("Erro ao processar pedido:", {
                message: error.message,
                responseData: error.response?.data,
                status: error.response?.status
            });
            toast.error(error.response?.data?.error || "Erro ao processar o pedido. Tente novamente.");
        }
    }
    


    
    return (
        <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">

            <div className='flex-1 max-w-4xl'>
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
                    </div>
                )}


                {/* Mensagem caso o Carrinho esteja vazio  */}
                {(!cartData || cartData.length === 0) && (
                    <div className="mt-8 flex items-center justify-center gap-2 mt-4 mb-10 text-indigo-600">
                    <ShoppingCart />
                    <p>Seu carrinho está vazio.</p>
                    </div>
                )}

                

                
                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Detalhes do Ebook</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Excluir</p>
                </div>

                {cartData?.map((item, index) => {
                    const productData = products.find((product) => product._id === item._id)

                    if (!productData) return null

                    return (
                        <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                            <div className="flex items-center md:gap-6 gap-3">
                                <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                                    <img className="max-w-full h-full object-cover" src={productData.image} alt={productData.name} />
                                </div>
                                <div>
                                    <p className="hidden md:block font-semibold">{productData.name}</p>                                    
                                </div>
                            </div>
                            <p className="text-center">{currency} {productData.price.toFixed(2)}</p>
                            <Trash2 onClick={() => removeFromCart(item._id)} className='mx-auto cursor-pointer' />
                        </div>
                    )
                })}


                <button onClick={() => navigate('/ebooks')}  className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium">
                    <MoveLeft />
                    Continue Comprando
                </button>
            </div>

            
            {/* Card de Finalização da Compra */}
            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Resumo do Pedido</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Seus Dados</p>
                    <div className="relative flex justify-between items-start mt-2">
                        {formData.firstName ? (
                            <p className="text-gray-600 text-sm">
                                {formData.firstName} {formData.lastName}<br/>
                                {formData.email}<br/>
                                {formData.city} - {formData.state}<br/>
                                {formData.country}
                            </p>

                        ) : (
                            <p className="text-gray-500">Nenhuma informação</p>
                        )}


                        <button onClick={() => setShowAddress(!showAddress)} className="text-indigo-500 hover:underline cursor-pointer">
                            Trocar
                        </button>

                        {showAddress && (
                            <div className="absolute top-12 left-0 bg-white border border-gray-300 text-sm w-full z-10 p-4 shadow-md rounded">
                                <div className="flex gap-2 mb-2">
                                    <input
                                        name='firstName'
                                        value={formData.firstName}
                                        onChange={onChangeHandler}
                                        placeholder='Nome'
                                        type="text" 
                                        className="border border-indigo-300 rounded px-2 py-1 w-1/2 focus:outline-indigo-500"
                                    />
                                    <input 
                                        name="lastName" 
                                        value={formData.lastName} 
                                        onChange={onChangeHandler} 
                                        placeholder="Sobrenome"
                                        type="text"
                                        className="border border-indigo-300 rounded px-2 py-1 w-1/2 focus:outline-indigo-500" 
                                    />
                                </div>

                                
                                    <input 
                                        name="cpf" 
                                        value={formData.cpf} 
                                        onChange={onChangeHandler} 
                                        placeholder="CPF"
                                        className="border border-indigo-300 rounded px-2 py-1 w-full mb-3 focus:outline-indigo-500"  
                                    />                                
                                

                                
                                    <PhoneInput
                                        country={'br'}
                                        value={formData.phone}
                                        onChange={(phone) => setFormData((data) => ({ ...data, phone }))}
                                        inputProps={{ name: 'phone', required: true }}
                                        containerClass="w-1/2"
                                        className="mb-3"
                                    />
                                

                                <input 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={onChangeHandler} 
                                    placeholder="E-mail"
                                    className="border border-indigo-300 rounded px-2 py-1 w-full mb-2 focus:outline-indigo-500" 
                                />

                                <div className="flex gap-2 mb-2">
                                    <input 
                                        name="city" 
                                        value={formData.city} 
                                        onChange={onChangeHandler} 
                                        placeholder="Cidade"
                                        className="border border-indigo-300 rounded px-2 py-1 w-1/2 focus:outline-indigo-500" 
                                    />

                                    <input 
                                        name="state" 
                                        value={formData.state} 
                                        onChange={onChangeHandler} 
                                        placeholder="Estado"
                                        className="border border-indigo-300 rounded px-2 py-1 w-1/2 focus:outline-indigo-500" 
                                    />
                                </div>

                                <input 
                                    name="country" 
                                    value={formData.country} 
                                    onChange={onChangeHandler} 
                                    placeholder="País"
                                    className="border border-indigo-300 rounded px-2 py-1 w-full mb-3 focus:outline-indigo-500" 
                                />

                                <button 
                                    onClick={() => {
                                        if (user) {
                                            localStorage.setItem(`checkoutData_${user.id}`, JSON.stringify(formData))
                                        }
                                        setShowAddress(false)
                                    }}
                                    className="w-full py-1.5 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
                                >
                                    Salvar Dados
                                </button>



                            </div>
                        )}
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Tipo de Pagamento</p>

                    <select 
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
                    >
                        <option value="Pix">PIX</option>
                        <option value="boleto">Boleto</option>
                        <option value="credit_card">Cartão de Crédito</option>
                    </select>

                    {/* Aplicar Cupom */}
                    <p className="text-sm font-medium uppercase mt-6">Cupom de Desconto</p>
                    <div className="relative flex justify-between items-start mt-2">
                        {cupom ? (
                            <p className="text-gray-600 text-sm">Cupom ativo: {cupom}% de desconto</p>
                        ) : (
                            <p className="text-gray-500">Nenhum cupom aplicado</p>
                        )}

                        <button
                            onClick={() => setShowCupom(!showCupom)}
                            className="text-indigo-500 hover:underline cursor-pointer"
                        >
                            {showCupom ? "Fechar" : "Aplicar"}
                        </button>

                        {showCupom && (
                            <div className="absolute top-10 left-0 bg-white border border-gray-300 text-sm w-full z-10 p-4 shadow-md rounded">
                            <input
                                type="text"
                                value={cupomInput}
                                onChange={(e) => setCupomInput(e.target.value)}
                                placeholder="Digite o código do cupom"
                                className="border border-indigo-300 rounded px-2 py-1 w-full mb-3 focus:outline-indigo-500"
                            />

                            <button
                                onClick={() => {
                                if (cupomInput.toLowerCase() === "magica100") {
                                    localStorage.setItem("cupom", "100")
                                    toast.success("Cupom aplicado com sucesso! 🎉")
                                } else {
                                    localStorage.removeItem("cupom")
                                    toast.error("Cupom inválido 😕")
                                }
                                setShowCupom(false)
                                setCupomInput("")
                                }}
                                className="w-full py-1.5 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
                            >
                                Aplicar Cupom
                            </button>
                            </div>
                        )}
                    </div>

                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Preço</span><span>{currency} {subtotal.toFixed(2)}</span>
                    </p>                    
                    <p className="flex justify-between">
                        <span>Cupom</span><span>- {currency} {desconto.toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total:</span><span>{currency} {totalFinal <= 0 ? "0.00" : totalFinal.toFixed(2)}</span>
                    </p>
                </div>

                <button
                    onClick={finalizarPedido} 
                    className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition">
                    Finalizar Pedido
                </button>
            </div>
        </div>
    )
}

export default Carrinho
