import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


const FazerPedido = () => {
  
  const { navigate } = useContext(ShopContext);
  
  const [ method, setMethod ] = useState("mercadopago");
  const [ formData, setFormData ] = useState({
    firstName: "",
    lastName: "",
    cpf: "",
    email: "",
    phone: "",
  }); 


  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };


  return (
    <form className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]">

      {/* ------------------- Lado Esquerdo ------------------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"Finalizar"} text2={"Compra"} />
        </div>

        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            value={formData.firstName}
            className="border border-indigo-300 rounded py-1.5 px-3.5 w-full placeholder-indigo-300 focus:outline-indigo-500"
            required
            name="firstName"
            type="text"
            placeholder="Nome"
          />
          <input
            onChange={onChangeHandler}
            value={formData.lastName}
            className="border border-indigo-300 rounded py-1.5 px-3.5 w-full placeholder-indigo-300 focus:outline-indigo-500"
            required
            name="lastName"
            type="text"
            placeholder="Sobrenome"
          />
        </div>

        <input
          onChange={onChangeHandler}
          value={formData.cpf}
          className="border border-indigo-300 rounded py-1.5 px-3.5 w-full placeholder-indigo-300"
          required
          name="cpf"
          type="text"
          placeholder="CPF"
        />

        <input
          onChange={onChangeHandler}
          value={formData.email}
          className="border border-indigo-300 rounded py-1.5 px-3.5 w-full placeholder-indigo-300 focus:outline-indigo-500"
          required
          name="email"
          type="email"
          placeholder="E-mail"
        />
        <PhoneInput
          country={'br'}
          enableSearch
          value={formData.phone}
          onChange={(phone) => setFormData((data) => ({ ...data, phone}))}
          inputProps={{
            name: 'phone',
            required: true,
            autoFocus: false,
          }}          
          containerClass="phone-input-container"
        />
      </div>

      {/* ------------------- Lado Direito ------------------- */}
      <div>
        <div className="mt-8 min-w-80">
          <CartTotal/>
        </div>

        <div className="mt-12">
          <Title text1={"Formas de"} text2={"Pagamento"} />

        {/* ------------------- Seleção das Formas de Pagamento ------------------- */}
          <div className="flex gap-3 flex-col lg:flex-row">

            <div onClick={() => setMethod("mercadopago")} className="flex items-center gap-3 border border-indigo-300 p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border border-indigo-300 rounded-full ${method === "mercadopago" ? "bg-green-400" : ""}`}></p>
              <img className="h-5 mx-4" src={assets.mercado_pago} alt="" />
            </div>

            <div onClick={() => setMethod("pix")} className="flex items-center gap-3 border border-indigo-300 p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border border-indigo-300 rounded-full ${method === "pix" ? "bg-green-400" : ""}`}></p>
              <img className="h-5 mx-4" src={assets.pix_icon} alt="" />
            </div>

            <div onClick={() => setMethod("paypal")} className="flex items-center gap-3 border border-indigo-300 p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border border-indigo-300 rounded-full ${method === "paypal" ? "bg-green-400" : ""}`}></p>
              <img className="h-5 mx-4" src={assets.paypal_icon} alt="" />
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button onClick={() => navigate('/pedidos')} className="bg-indigo-700 text-white text-sm px-16 py-3 cursor-pointer" type="submit">
              FINALIZAR
            </button>
          </div>
        </div>      
      </div>
    </form>
  )
}

export default FazerPedido
