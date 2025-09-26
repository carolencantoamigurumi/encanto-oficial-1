import React from 'react'
import { motion } from 'motion/react'


const NewsletterBox = () => {
    
    const onSubmitHandler = async (event) => {
        event.preventDefault()
    }

  return (
    <motion.div
        initial={{opacity: 0, y: 30 }}
        whileInView={{opacity: 1, y: 0 }}
        transition={{duration: 0.6,  ease: 'easeOut'}}
        viewport={{once: true, amount: 0.3}}
        className="text-center">
        <p className="text-2xl font-medium text-indigo-800">Inscreva-se</p>
        <p className="text-indigo-400 mt-3">E receba novidades encantadoras sempre que lançarmos uma nova receita</p>

        <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border border-indigo-500 pl-3">
            <input
                name='email'
                type="email"
                placeholder='Seu E-mail'
                className="w-full sm:flex-1 outline-none placeholder-indigo-300"
                required
            />

            <button type='submit' className="bg-indigo-700 text-white text-sm px-10 py-4" >CADASTRAR</button>
        </form>      
    </motion.div>
  )
}

export default NewsletterBox
