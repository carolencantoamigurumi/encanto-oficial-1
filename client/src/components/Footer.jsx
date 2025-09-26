import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'


const Footer = () => {
  return (
    <div>
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} 
            className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-10 my-10 mt-40 text-sm">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <motion.img
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    src={assets.logo} alt="Logo Encanto" className="mb-5 w-52" 
                />
                <p className="w-full md:w-2/3 text-indigo-600">
                    Na Encanto Amigurumi, nossa missão é espalhar criatividade e
                    encantar com receitas que ajudam você a criar amigurumis únicos e
                    transformar isso em uma renda extra cheia de amor!
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <p className="text-xl font-medium mb-5 text-indigo-700">EMPRESA</p>
                <ul className="flex flex-col gap-1 text-indigo-600">
                    <Link to="/">
                        <li>Home</li>
                    </Link>

                    <Link to="/sobre">
                        <li>Sobre</li>
                    </Link>

                    <Link to="/">
                        <li>Política da empresa</li>
                    </Link>

                    <Link to="/">
                        <li>Política de privacidade</li>
                    </Link>
                </ul>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <p className="text-xl font-medium mb-5 text-indigo-700">Nossas Mídias Sociais</p>
                <div className="flex items-center gap-3 text-indigo-600">
                    <a href="https://www.instagram.com/encantoo.amigurumi?igsh=MXJ2bDIzYXBiaHRlcQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">                    
                        <img src={assets.instagram_icon} alt="ícone instagram" width={25} />
                    </a>
                    <a href="http://wa.me/5561994065445" target="_blank" rel="noopener noreferrer">
                        <img src={assets.whatsapp_icon} alt="ícone whatsapp" width={25} />
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=100088530683681" target="_blank" rel="noopener noreferrer">
                        <img src={assets.facebook_icon} alt="ícone whatsapp" width={25} />
                    </a>
                    <a href='https://www.youtube.com/@Encantoamigurumi' target="_blank" rel="noopener noreferrer" >
                        <img src={assets.youtube_icon} alt="ícone whatsapp" width={30} />
                    </a>
                </div>                   
            </motion.div>
        </motion.div>

        <div>
            <hr />
            <p className="py-5 text-sm text-center">Copyright 2025 © encantoamigurumi.com - Todos os direitos reservados - CNPJ: 60.155.466/0001-98.</p>
        </div>     
    </div>
  )
}

export default Footer
