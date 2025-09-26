import React from 'react'
import { dummyTestimonial } from '../assets/assets';
import Title from './Title';
import { motion } from 'motion/react'

const Testimonial = () => {
        
    const CreateCard = ({ card }) => (
        <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0">
            <div className="flex gap-2 items-center">
                <img className="size-11 rounded-full" src={card.image} alt={card.name} />
                <div className="flex flex-col">
                    <span className="text-base font-medium">{card.name}</span>
                    <span className="text-xs text-slate-500">{card.city}</span>
                </div>
            </div>

            <div className="flex items-center gap-1 mt-2">
                {[...Array(5)].map((_, idx) => (
                    <span key={idx} className={card.rating > idx ? "text-yellow-500" : "text-indigo-200"}>&#9733;</span>
                ))}
            </div>
            <p className="text-sm py-4 text-gray-800">{card.review}</p>
        </div>
    );

    return (
        <>
            <style>{`
                @keyframes marqueeScroll {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }

                .marquee-inner {
                    animation: marqueeScroll 25s linear infinite;
                }

                .marquee-reverse {
                    animation-direction: reverse;
                }
            `}</style>

            <motion.div 
                initial={{opacity: 0, y: 20 }}
                whileInView={{opacity: 1, y: 0 }}
                transition={{duration: 1, delay: 0.5}} 
                className="text-center py-8 text-3xl">
                <Title text1={"O que dizem nossos"} text2={"Encantadores"}/>
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                    Veja como nossas receitas digitais ajudam apaixonados por amigurumi a transformar linhas em verdadeiras obras de arte. Inspire-se nos relatos de quem já embarcou nessa aventura!
                </p>
            </motion.div>
        
            <motion.div 
                initial={{opacity: 0, y: 40 }}
                whileInView={{opacity: 1, y: 0 }}
                transition={{duration: 0.6, ease: 'easeOut'}}
                className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
                <div className="marquee-inner flex transform-gpu min-w-[200%] pt-10 pb-5">
                    {[...dummyTestimonial, ...dummyTestimonial].map((card, index) => (
                        <CreateCard key={index} card={card} />
                    ))}
                </div>
                <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
            </motion.div>            
        </>
    )
}

export default Testimonial
