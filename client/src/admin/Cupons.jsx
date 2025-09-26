import React, { useEffect, useState } from 'react'
import { couponDummyData } from '../assets/assets'
import AdminTitle from './AdminTitle'
import { DeleteIcon } from 'lucide-react'

const Cupons = () => {

  const [coupons, setCoupons] = useState([])

  const [newCoupon, setNewCoupon] = useState({
      code: '',
      description: '',
      discount: '',
      forNewUser: false,
      forMember: false,
      isPublic: false,
      expiresAt: new Date()
  })

  // Função de Buscar Cupom
  const fetchCoupons = async () => {
    setCoupons(couponDummyData)
  }


  const handleAddCoupon = async (e) => {
      e.preventDefault()
      // Logic to add a coupon
  }



  const handleChange = (e) => {
      setNewCoupon({ ...newCoupon, [e.target.name]: e.target.value })
  }


  const deleteCoupon = async (code) => {
      // Logic to delete a coupon
  }


  // Executa a função de Buscar Cupom
  useEffect(() => {
      fetchCoupons();
  }, [])




  return (
    <div className="text-slate-500 mb-40">

      <AdminTitle text1={"Adicionar"} text2={"Cupons"} />
      
      {/* Adicionar Cupom */}
      <form className="max-w-sm text-sm">
        <div className="flex gap-2 max-sm:flex-col mt-2">
          <input 
            onChange={handleChange}
            value={newCoupon.code}
            type="text"
            name='code'
            placeholder='Código do Cupom' 
            className="w-full mt-2 p-2 border border-indigo-500 outline-indigo-400 rounded-md" 
          />
          <input 
            onChange={handleChange}
            value={newCoupon.discount}
            type="text"
            placeholder="Desconto (%)"
            name="discount"
            min={1} 
            max={100} 
            className="w-full mt-2 p-2 border border-indigo-500 outline-indigo-400 rounded-md"
          />
        </div>

        <input 
          onChange={handleChange}
          value={newCoupon.description}
          type="text"
          placeholder="Descrição do Cupom" 
          name="description" 
          className="w-full mt-2 p-2 border border-indigo-500 outline-indigo-400 rounded-md"
        />

        <label>
            <p className="mt-3">Data que o Cupom Expira</p>
            <input 
              onChange={e => setNewCoupon({ ...newCoupon, expiresAt: new Date(e.target.value) })}
              value={newCoupon.expiresAt ? newCoupon.expiresAt.toISOString().substring(0, 10) : '' }
              type="date"
              placeholder="Coupon Expires At" 
              className="w-full mt-1 p-2 border border-indigo-500 outline-indigo-400 rounded-md"
              name="expiresAt"              
            />
        </label>

        <div className="mt-5">
          <div className="flex gap-2 mt-3">
              <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                  <input 
                    onChange={e => setNewCoupon({ ...newCoupon, forNewUser: e.target.checked })}
                    type="checkbox"
                    name="forNewUser" 
                    className="sr-only peer"
                    checked={newCoupon.forNewUser}                      
                  />
                  <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:bg-indigo-600 transition-colors duration-200"></div>
                  <span className="dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
              </label>
              <p>Cliente Novo</p>
          </div>
          <div className="flex gap-2 mt-3">
              <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                  <input 
                    onChange={e => setNewCoupon({ ...newCoupon, forMember: e.target.checked })}
                    type="checkbox" 
                    className="sr-only peer"
                    name="forMember" 
                    checked={newCoupon.forMember}                      
                  />
                  <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:bg-indigo-600 transition-colors duration-200"></div>
                  <span className="dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
              </label>
              <p>Membro da Loja</p>
          </div>
        </div>
        <button className="mt-4 p-2 px-10 rounded bg-indigo-700 text-white active:scale-95 transition cursor-pointer">Adicionar Cupom</button>
      </form>


      {/* Lista dos Cupons */}
      <div className="mt-14">
        <AdminTitle text1={'Lista de'} text2={'Cupons'} />

        <div className="overflow-x-auto mt-4 rounded-lg border border-slate-200 max-w-4xl">
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="py-3 px-4 text-left font-semibold text-slate-600">Código</th>
                <th className="py-3 px-4 text-left font-semibold text-slate-600">Descrição</th>
                <th className="py-3 px-4 text-left font-semibold text-slate-600">Desconto</th>
                <th className="py-3 px-4 text-left font-semibold text-slate-600">Expira em</th>
                <th className="py-3 px-4 text-left font-semibold text-slate-600">Cliente Novo</th>
                <th className="py-3 px-4 text-left font-semibold text-slate-600">Membro da Loja</th>
                <th className="py-3 px-4 text-left font-semibold text-slate-600">Remover</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {coupons.map((coupon) => (
                <tr key={coupon.code} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-medium text-slate-800">{coupon.code}</td>
                  <td className="py-3 px-4 text-slate-800">{coupon.description}</td>
                  <td className="py-3 px-4 text-slate-800">{coupon.discount}%</td>
                  <td className="py-3 px-4 text-slate-800">{new Date(coupon.expiresAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4 text-slate-800">{coupon.forNewUser ? 'Sim' : 'Não'}</td>
                  <td className="py-3 px-4 text-slate-800">{coupon.forMember ? 'Sim' : 'Não'}</td>
                    <td className="py-3 px-4 text-slate-800">
                      <DeleteIcon
                        onClick={() => toast.promise(deleteCoupon(coupon.code))}
                        className="w-5 h-5 text-red-500 hover:text-red-800 cursor-pointer"
                      />
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>      
    </div>
  )
}

export default Cupons
