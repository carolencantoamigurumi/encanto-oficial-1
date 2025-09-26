import React, { useContext } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Ebooks from './pages/Ebooks'
import Sobre from './pages/Sobre'
import Contato from './pages/Contato'
import Produto from './pages/Produto'
import Carrinho from './pages/Carrinho'
import FazerPedido from './pages/FazerPedido'
import Pedidos from './pages/Pedidos'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import ScrollToTop from './components/ScrollToTop'
import Layout from './admin/Layout'
import Dashboard from './admin/Dashboard'
import Add from './admin/Add'
import Lista from './admin/Lista'
import Vendas from './admin/Vendas'
import Cupons from './admin/Cupons'
import Searchbar from './components/Searchbar'
import Downloads from './pages/Downloads'
import { ShopContext } from './context/ShopContext'
import Loading from './components/Loading'
import { SignIn } from '@clerk/clerk-react'
import Clientes from './admin/Clientes'
import Favoritos from './pages/Favoritos'

const App = () => {

  const isAdminRoute = useLocation().pathname.startsWith('/admin')
  const { user, isAdmin, isAdminLoading } = useContext(ShopContext)

  // if (isAdminRoute) {
  //   if (isAdminLoading) {
  //     return <Loading />
  //   }
  //   if (!user || !isAdmin) {
  //     return (
  //       <div className='min-h-screen flex justify-center items-center'>
  //         <SignIn fallbackRedirectUrl={'/admin'} />
  //       </div>
  //     )
  //   }
  // }



  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Toaster />
      {!isAdminRoute && <Navbar />}
      <ScrollToTop />
      <Searchbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ebooks' element={<Ebooks/>}/>
        <Route path='/sobre' element={<Sobre/>}/>
        <Route path='/contato' element={<Contato/>}/>
        <Route path='/produto/:productId' element={<Produto/>}/>
        <Route path='/carrinho' element={<Carrinho/>}/>
        <Route path='/fazer-pedido' element={<FazerPedido/>}/>
        <Route path='/pedidos' element={<Pedidos/>}/>
        <Route path='/downloads' element={<Downloads/>}/>
        <Route path='/favoritos' element={<Favoritos/>}/>

        {/* Admin Routes */}
        <Route path='/admin/*' element={<Layout />} >
          <Route index element={<Dashboard />} />
          <Route path='add' element={<Add />} />
          <Route path='lista' element={<Lista />} />
          <Route path='clientes' element={<Clientes />} />
          <Route path='vendas' element={<Vendas />} />
          <Route path='cupons' element={<Cupons />} />
        </Route>

      </Routes>  
      {!isAdminRoute && <Footer />}    
    </div>
  )
}

export default App
