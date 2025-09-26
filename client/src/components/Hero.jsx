import { ArrowRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'


const Hero = () => {
  return (
    <motion.div 
        initial={{y: 50, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        transition={{duration: 0.8, delay: 0.2}}
        className="bg-[url('/hero2.jpg')] w-full h-[36vw] my-7 bg-no-repeat bg-contain relative z-10">
        <div className="absolute flex flex-col items-start gap-[1.5vw] max-w-[50%] bottom-[10%] left-[6vw] animate-fadeIn">
            <h2 className="font-medium text-white text-[22px] md:text-[4.5vw]">
                Amigurumis para Encantar
            </h2>
            <p className="text-white text-[14px] md:text-[1vw]">
                Aqui você vai encontrar <br />
                receitas para te inspirar e fazer lindos Amigurumis
            </p>
            <Link to='/ebooks'>
                <button className="flex gap-2 items-center border-none text-[#6160ac] font-medium px-[2.3vw] py-[1vw] bg-white text-[13px] md:text-[1vw] rounded-full hover:scale-105 hover:shadow-md transition duration-300 cursor-pointer">
                    Ebooks
                    <ArrowRight />
                </button>
            </Link>
        </div>      
    </motion.div>
  )
}

export default Hero
