import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { CircleChevronDownIcon } from 'lucide-react';
import Title from '../components/Title';
import ProductCard from '../components/ProductCard';
import { motion } from 'motion/react'


const Ebooks = () => {

  const { products, search, showSearch, calculateRating } = useContext(ShopContext)

  const [showFilter, setShowFilter] = useState(true); // mostrar fitros em smartphones
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("recentes");


  // Função para Filtrar por Categorias
  const toggleCategory = (e) => {
      if (category.includes(e.target.value)) {     //Verifica se o valor da categoria já existe dentro do array category (ou seja, já foi selecionada).
        setCategory((prev) => prev.filter((item) => item !== e.target.value))  //Se já existe, então remove do array
      } else {
        setCategory((prev) => [...prev, e.target.value]) //Se não existe, então adiciona o valor ao array
      }
  }


  // Função para Filtrar por SubCategorias
  const toggleSubCategory = (e) => {
      if (subCategory.includes(e.target.value)) {
        setSubCategory((prev) => prev.filter((item) => item !== e.target.value));      
      } else {
        setSubCategory((prev) => [...prev, e.target.value]);
      }
  }


  // Função para filtrar Categoria e SubCategoria ao mesmo tempo + Buscar na Barra de Busca
  const applyFilter = () => {
      let productsCopy = products.slice();

      if (showSearch && search) {
        productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
      }

      if (category.length > 0) {
        productsCopy = productsCopy.filter((item) => category.includes(item.category))
      }

      if (subCategory.length > 0 ) {
        productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory))
      }
      setFilterProducts(productsCopy)
  }


  // Função para Ordenar os Produtos por Preço
  const sortProduct = () => {
      let filterProductCopy = filterProducts.slice();

      switch(sortType) {
      case "menor-maior":
          setFilterProducts(filterProductCopy.sort((a,b) => a.price - b.price))
          break

      case "maior-menor":
          setFilterProducts(filterProductCopy.sort((a,b) => b.price - a.price))
          break

      default:
          applyFilter()
          break
      }
  }


  // Executa os Filtros
  useEffect(() => {
      applyFilter()
  },[category, subCategory, search, showSearch, products])



  // Exibe os Ebooks
  useEffect(() => {
      sortProduct()
  },[sortType]);



  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10" >
      
      {/* Opções de Filtro */}
      <div className="min-w-60">
        <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTROS
          <CircleChevronDownIcon className={`h-7 sm:hidden ${showFilter ? '' : 'rotate-270'}`} />
        </p>

        {/* Filtro de Categoria */}
        <div className={`border border-indigo-300 pl-5 py-3 mt-6 ${ showFilter ? "" : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIAS</p>

          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input 
                type="checkbox"
                value={"Animais"}
                className="w-3"
                onChange={toggleCategory}
              />
              Animais
            </p>

            <p className="flex gap-2">
              <input 
                type="checkbox"
                value={"Personagens"}
                className="w-3"
                onChange={toggleCategory}
              />
              Personagens
            </p>

            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Religiosos"}
                className="w-3"
                onChange={toggleCategory}
              />
              Religiosos
            </p>
          </div>
        </div>


        {/* Filtro de Subcategoria */}
        <div className={`border border-indigo-300 pl-5 py-3 my-5 ${ showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">TIPOS</p>

          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox" 
                value={"Anime"}
                className="w-3"
                onChange={toggleSubCategory}
              />
              Anime
            </p>

            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Diversos"}
                onChange={toggleSubCategory}
              />
              Diversos
            </p>

            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Heróis"}
                onChange={toggleSubCategory}
              />
              Heróis
            </p>

            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"TV"}
                onChange={toggleSubCategory}
              />
              TV
            </p>

            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Natal"}
                onChange={toggleSubCategory}
              />
              Natal
            </p>
          </div>
        </div>
      </div>


      {/* Lado Direito */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"Ebooks"} text2={"Encantadores"} />

          {/* Filtro de Preço */}
          <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-indigo-300 text-sm px-2">
            <option value="recentes">Ordenar: Recentes</option>
            <option value="menor-maior">Ordenar: Menor Preço</option>
            <option value="maior-menor">Ordenar: Maior Preço</option>
          </select>
        </div>


        {/* Exibir Produtos com animação individual */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: 'easeOut',
                delay: 0.18 * index // atraso progressivo para cada produto
              }}
              viewport={{ once: true }}
            >
              <ProductCard 
                key={index}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
                rating={calculateRating(item)}
              />
            </motion.div>
          ))}          
        </div>
      </div>
    </div>
  )
}

export default Ebooks
