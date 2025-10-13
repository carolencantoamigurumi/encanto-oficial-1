import React, { useContext, useEffect, useState } from 'react'
import AdminTitle from './AdminTitle'
import { assets } from '../assets/assets'
import { ClipboardPen, Trash2 } from 'lucide-react'
import { ShopContext } from '../context/ShopContext'
import toast from 'react-hot-toast'

const Lista = () => {

  const { axios, getToken, currency } = useContext(ShopContext)

  const [ list, setList ] = useState([])
  const [ showModal, setShowModal ] = useState(false);
  const [ productToEdit, setProductToEdit ] = useState(null);



  // ------------------------ Buscar Lista de Produtos ------------------------
  const fetchList = async () => {
      try {
        const { data } = await axios.get('/api/product/list')

        if (data.success) {
          setList(data.products)
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }   
  }



  // ------------------------ Remover Produto ------------------------
  const removeProduct = async (id) => {
    if (!window.confirm("Tem certeza que deseja remover este produto?")) 
      return;
    try {      
      const { data } = await axios.post('/api/product/remove', {productId: id}, {headers: {Authorization: `Bearer ${await getToken()}`}})
      if (data.success) {
        toast.success(data.message)
        await fetchList()        
      } else {
        toast.error(data.message || "Erro ao remover produto.")
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message) 
    }
  }  




  // ------------------------ Editar Produto ------------------------
  const editProduct = async (productData) => {
    try {      
      const { data } = await axios.put("/api/product/edit", productData, {headers: { Authorization: `Bearer ${await getToken()}`}});

      if (data.success) {
        toast.success(data.message);
        await fetchList(); // Atualiza a lista
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  // Função para abrir o Modal de Edição
  const openEditModal = (product) => {
    setProductToEdit(product);
    setShowModal(true);
  };


  // Função para fechar o Modal de Edição
  const closeEditModal = () => {
    setShowModal(false);
    setProductToEdit(null);
  };




  // Executa a função de buscar a lista de produtos
  useEffect(() => {
    fetchList()
  },[])




  return (
    <>
      <AdminTitle text1='EBooks' text2='Cadastrados' />

      <div className='max-w-screen-lg mx-auto flex flex-col gap-2 mt-6'>

        {/* -------------- Lista dos Produtos ----------------- */}
        {
          list.map((item, index) => (
            <div key={index} className='grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_0.5fr_0.5fr] justify-items-center items-center gap-x-4 py-1 px-2 border border-indigo-300 text-sm'>
              <img src={item.image?.[0] || assets.placeholder} alt="" className='w-12 h-12 object-cover rounded' />
              <p className='text-center'>{item.name}</p> 
              <p className='text-center'>{item.category}</p>
              <p className='text-center'>{item.subCategory}</p>
              <p className='text-center'>{currency} {item.price.toFixed(2)}</p>
              <p className='text-center'>{item.discount}%</p>
              <p onClick={() => openEditModal(item)} className="flex justify-center items-center cursor-pointer" aria-label="Editar produto" title="Editar produto" >
                <ClipboardPen color='#6160ac' />
              </p>
              <p onClick={() => removeProduct(item._id)} className='flex justify-center items-center cursor-pointer' aria-label="Excluir produto" title="Excluir produto">                
                <Trash2 color='red' />
                
              </p>
            </div>
          ))
        }
      </div>


      
      {/* -------------- MODAL ----------------- */}
      {
        showModal && productToEdit && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
              <h2 className="text-xl font-semibold mb-4">Editar Produto</h2>

              <p className="mb-2">Nome do Produto</p>
              <input
                type="text"
                value={productToEdit.name}
                onChange={(e) => setProductToEdit({ ...productToEdit, name: e.target.value })}
                className="w-full px-3 py-2 mb-2 border"
              />

              <label className="mb-2">Arquivo do Ebook (URL)</label>
              <input
                type="text"
                value={productToEdit.ebookFile || ""}
                onChange={(e) => setProductToEdit({ ...productToEdit, ebookFile: e.target.value })}
                className="w-full px-3 py-2 mb-2 border"
              />

              <label className="mb-2">Descrição</label>
              <textarea
                value={productToEdit.description || ""}
                rows={7}
                onChange={(e) => setProductToEdit({ ...productToEdit, description: e.target.value })}
                className="w-full px-3 py-2 mb-2 border"
              />

              <label className="mb-2">Categoria</label>
              <input
                type="text"
                value={productToEdit.category || ""}
                onChange={(e) => setProductToEdit({ ...productToEdit, category: e.target.value })}
                className="w-full px-3 py-2 mb-2 border"
              />

              <label className="mb-2">Subcategoria</label>
              <input
                type="text"
                value={productToEdit.subCategory || ""}
                onChange={(e) => setProductToEdit({ ...productToEdit, subCategory: e.target.value })}
                className="w-full px-3 py-2 mb-2 border"
              />

              <p className="mb-2">Preço</p>
              <input
                type="number"
                value={productToEdit.price || ""}
                onChange={(e) => setProductToEdit({ ...productToEdit, price: Number(e.target.value) })}
                className="w-full px-3 py-2 mb-2 border"
              />

              <label className="mb-2">Desconto (%)</label>
              <input
                type="number"
                value={productToEdit.discount || ""}
                onChange={(e) => setProductToEdit({ ...productToEdit, discount: Number(e.target.value) })}
                className="w-full px-3 py-2 mb-2 border"
                min={0}
                max={100}
              />


              <div className="flex justify-end gap-2 mt-4">
                <button onClick={closeEditModal} className="px-4 py-2 bg-gray-300 rounded cursor-pointer">
                  Cancelar
                </button>

                <button 
                  onClick={async () => {
                    try {
                      const { data } = await axios.put('/api/product/edit', productToEdit, { headers: {Authorization: `Bearer ${await getToken()}`}})

                      if (data.success) {
                        toast.success("Produto atualizado com sucesso!");
                        closeEditModal()
                        fetchList()
                      } else {
                        toast.error(data.message);
                      }
                    } catch (error) {
                      console.log(error);
                      toast.error(error.message);
                    }
                  }}
                  className="px-4 py-2 bg-indigo-700 text-white rounded cursor-pointer"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )
      }     
    </>
  )
}

export default Lista
