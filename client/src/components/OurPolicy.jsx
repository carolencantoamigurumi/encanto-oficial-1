import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'

const OurPolicy = () => {
  return (
    <motion.div 
      initial={{opacity: 0, y: 20 }}
      whileInView={{opacity: 1, y: 0 }}
      transition={{duration: 1, delay: 0.5}}
      className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
        <div>
            <img src={assets.exchange_icon} alt="Ícone de Troca" className="w-12 m-auto mb-5" />
            <p className="font-semibold">Receitas que trazem retorno</p>
            <p className="text-indigo-400">Aprenda como ganhar dinheiro com nossas receitas</p>
        </div>

        <div>
            <img src={assets.quality_icon} alt="Íconde de Selo de Qualidade" className="w-12 m-auto mb-5" />
            <p className="font-semibold">Qualidade sem igual no mercado</p>
            <p className="text-indigo-400">Nossas receitas são produzidas com cuidado e carinho</p>
        </div>

        <div>
            <img src={assets.support_img} alt="Ícone de Suporte ao Cliente" className="w-12 m-auto mb-5" />
            <p className="font-semibold">Melhor suporte ao cliente</p>
            <p className="text-indigo-400">Todas suas dúvidas serão respondidas o mais breve possível</p>
        </div>      
    </motion.div>
  )
}

export default OurPolicy
