import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import ContactUs from '../components/ContactUs'
import { motion } from 'motion/react'


const Contato = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-center text-2xl pt-10"
      >
        <Title text1={"Entre em"} text2={"Contato"} />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="my-10 flex flex-col justify-center md:flex-row gap-2 mb-28 items-start"
      >
        <motion.img
          initial={{ opacity: 0, scale: 0.9, x: -30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          src={assets.contact_img} 
          alt="" 
          className="w-full md:max-w-[480px]" 
        />

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col items-start"
        >
          <ContactUs />
        </motion.div>
      </motion.div>

      <NewsletterBox />      
    </motion.div>
  )
}

export default Contato
