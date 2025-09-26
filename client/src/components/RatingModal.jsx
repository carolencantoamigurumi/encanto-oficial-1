import { XIcon } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const RatingModal = ({ ratingModal, setRatingModal }) => {

    const [ rating, setRating ] = useState(0);
    const [ review, setReview ] = useState('')


    const handleSubmit = async () => {
        if (rating < 0 || rating > 5) {
            return toast('Marque a quantidade de estrelas')
        }
        if (review && review.length < 5) {
            return toast('Faça um comentário sobre o Ebook')
        }
        setRatingModal(null)
    }


  return (
    <div className='fixed inset-0 z-120 flex items-center justify-center bg-black/10'>
        <div className='bg-white p-8 rounded-lg shadow-lg w-96 relative'>
            <button onClick={() => setRatingModal(null)} className='absolute top-3 right-3 text-indigo-500 hover:text-gray-700 cursor-pointer'>
                <XIcon size={20} />
            </button>
            <h2 className='text-xl font-medium text-slate-600 mb-4'>Avalie nosso Ebook</h2>
            <div className='flex items-center justify-center mb-4'>
                {Array.from({length: 5}, (_, index) => (                   
                    <span 
                        key={index} 
                        onClick={() => setRating(index + 1)}
                        className={`text-sm sm:text-base cursor-pointer transition-colors ${rating > index ? 'text-yellow-500' : 'text-indigo-200'}`} >
                        &#9733;
                    </span>                    
                ))}
            </div>

            <textarea
                className='w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400'
                placeholder='Deixe um comentário (opcional)'
                rows='4'
                value={review}
                onChange={(e) => setReview(e.target.value)}
            ></textarea>

            <button onClick={handleSubmit} className='w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition cursor-pointer'>
                Enviar avaliação
            </button>
        </div>      
    </div>
  )
}

export default RatingModal
