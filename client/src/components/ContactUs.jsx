import React from 'react'
import Title from './Title'
import { Mail, UserRound } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactUs = () => {

    const onSubmit = async (event) => {
        event.preventDefault()

        const formData = new FormData(event.target)

        formData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });
    
            const data = await response.json();
    
            if (data.success) {
                toast.success("Obrigado pelo seu contato");
                event.target.reset();
            } else {
                toast.error(data.message)
            }            
        } catch (error) {
            toast.error(error.message)            
        }
    }



  return (
    <div 
        id='caontact-us'
        className='flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-32 text-gray-700'     
    >
        <Title text1='Fale' text2='Conosco'/>

        <form onSubmit={onSubmit} className='grid sm:grid-cols-2 gap-3 sm:gap-5 max-w-2x1 w-full'>
            
            {/* Nome do Cliente */}
            <div>
                <p className='mb-2 text-sm font-medium'>Nome</p>
                <div className='flex pl-3 rounded-lg border border-indigo-500 items-center'>
                    <UserRound color='#6160ac' />
                    <input 
                        name='name'
                        type="text"
                        placeholder='Seu nome'
                        required
                        className='w-full p-3 text-sm outline-none' 
                    />
                </div>
            </div>

            {/* E-mail do Cliente */}
            <div>
                <p className='mb-2 text-sm font-medium'>E-mail</p>
                <div className='flex pl-3 rounded-lg border border-indigo-500 items-center'>
                    <Mail color='#6160ac' />
                    <input 
                        name='email'
                        type="email"
                        placeholder='Seu E-mail'
                        required
                        className='w-full p-3 text-sm outline-none' 
                    />
                </div>
            </div>

            <div className='sm:col-span-2'>
                <p className='mb-2 text-sm font-medium'>Mensagem</p>
                <textarea 
                    name='message'
                    rows={8}
                    required
                    placeholder='Digite sua mensagem'
                    className='w-full p-3 text-sm outline-none rounded-lg border border-indigo-500' 
                />
            </div>

            <button type='submit' className='w-max flex gap-2 bg-indigo-500 text-white text-sm px-10 py-3 cursor-pointer hover:scale-103 transition-all'>
                Enviar
            </button>


            
        </form>
      
    </div>
  )
}

export default ContactUs
