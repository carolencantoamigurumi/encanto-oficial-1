import React, { useContext, useState } from 'react'
import AdminTitle from './AdminTitle';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import toast from 'react-hot-toast';


const Add = () => {  


  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Animais");
  const [subCategory, setSubCategory] = useState("Diversos");
  const [discount, setDiscount] = useState(0);
  const [ebookFile, setEbookFile] = useState(null);
  const [ebookStatus, setEbookStatus] = useState(null);


  const onSubmitHandler = async (e) => {
    e.preventDefault(); // evita reload da página

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("discount", discount);

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4); 

      if (!ebookFile) {
        return toast.error("Por favor, selecione um arquivo PDF.");
      }

      ebookFile && formData.append("ebookFile", ebookFile);

      // const { data } = await axios.post('/api/product/add', formData, { headers: { Authorization: `Bearer ${await getToken()}`}})

      // Se o formulário for enviado, ele limpa os campos
      // if (data.success) {
      //       toast.success(data.message)
      //       setName("");
      //       setDescription("");
      //       setImage1(false);
      //       setImage2(false);
      //       setImage3(false);
      //       setImage4(false);
      //       setPrice("");
      //       setCategory("Animais");
      //       setSubCategory("Diversos");
      //       setDiscount(0);
      //       setEbookFile(null);
      //       setEbookStatus(null);         
      //   } else {
      //       toast.error(data.message);
      //   }
    } catch (error) {
      // console.log(error);
      // toast.error(error.message);
    }    
  }



  return (
    <>
      <AdminTitle text1='Adicionar' text2='EBooks' />
      <div className="py-3 flex flex-col justify-between bg-white">

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-6 mt-3" >

          {/* Upload de imagens */}
          <div className="max-w-[500px] w-full">
            <p className="mb-2" >Upload de Imagens</p>

            <div className="flex gap-2" >
              <label htmlFor="image1">
                <img src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt=""  className="w-32 cursor-pointer" />
                <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden/>
              </label>

              <label htmlFor="image2">
                <img src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" className="w-32 cursor-pointer"/>
                <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' hidden/>
              </label>

              <label htmlFor="image3">          
                <img src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" className="w-32 cursor-pointer" />
                <input onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' hidden/>
              </label>

              <label htmlFor="image4">
                <img src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" className="w-32 cursor-pointer"/>
                <input onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' hidden />
              </label>
            </div>
          </div>


          {/* Ebook PDF */}
          <div className="max-w-[500px] w-full">
            <p className="mb-2">Arquivo do Ebook (PDF)</p>
            <input 
              onChange={(e) => {
                const file = e.target.files[0];
                setEbookFile(file);
                if (file && file.size <= 10 * 1024 * 1024) {
                  setEbookStatus("Arquivo pronto para upload");
                } else if (file) {
                  setEbookStatus("Arquivo excede o limite de 10MB");
                } else {
                  setEbookStatus(null);
                }
              }}
              type="file" 
              accept=".pdf" 
              className="w-full px-3 py-2 ebook-input" required/>
              {ebookStatus && (
                <p className={`mt-1 text-sm ${ebookStatus.includes("excede") ? "text-red-500" : "text-green-600"}`}>
                  {ebookStatus}
                </p>
              )}
          </div>

          {/* Nome Produto */}
          <div className="max-w-[500px] w-full">
            <p className="mb-2">Nome do Produto</p>
            <input 
              onChange={(e) => setName(e.target.value)} 
              value={name} 
              type="text" 
              placeholder="Digite aqui" 
              className="w-full px-3 py-2 ebook-input" 
              required
            />
          </div>

          {/* Descrição */}
          <div className="max-w-[500px] w-full">
            <p className="mb-2">Descrição do Produto</p>
            <textarea 
              onChange={(e) => setDescription(e.target.value)} 
              value={description} 
              type="text" rows={5} 
              placeholder="Digite as caracteristicas aqui" 
              required
              className="w-full px-3 py-2 ebook-input" 
            />
          </div>

          {/* Categoria */}
          <div className="max-w-[500px] w-full">
            <p className="mb-2">Categorias</p>
            <select onChange={(e) => setCategory(e.target.value)} className="w-full outline-none py-2.5 px-3 rounded border border-indigo-500/40 ebook-input">
              <option value="Animais">Animais</option>
              <option value="Personagens">Personagens</option>
              <option value="Personalizados">Personalizados</option>
              <option value="Religiosos">Religiosos</option>
            </select>
          </div>


          {/* Subcategoria */}
          <div className="max-w-[500px] w-full">
            <p className="mb-2">Sub Categorias</p>
            <select onChange={(e) => setSubCategory(e.target.value)} className="w-full px-3 py-2 ebook-input">
              <option value="Anime">Anime</option>
              <option value="Diversos">Diversos</option>
              <option value="Heróis">Heróis</option>
              <option value="Natal">Natal</option>
              <option value="TV">TV</option>
            </select>
          </div>
         

          {/* Preço e Desconto lado a lado */}
          <div className="flex flex-wrap gap-5 max-w-[500px] w-full">
            <div className="flex-1 min-w-[120px]">
              <p className="mb-2">Preço (R$)</p>
              <input 
                onChange={(e) => setPrice(e.target.value)} 
                value={price} 
                type="number" 
                placeholder="150"
                className="w-full px-3 py-2 ebook-input" 
              />
            </div>

            <div className="flex-1 min-w-[120px]">
              <p className="mb-2">Desconto (%)</p>
              <input 
                onChange={(e) => setDiscount(e.target.value)} 
                value={discount} 
                type="number" 
                min="0" 
                max="100"
                placeholder="0"
                required
                className="w-full px-3 py-2 ebook-input"
              />
            </div>
          </div>

          <button type='submit' className="w-36 py-3 bg-indigo-700 text-white rounded mt-4 cursor-pointer">ADICIONAR</button>
        </form>
      </div>

    </>
  )
}

export default Add
