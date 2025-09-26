import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import { motion } from 'motion/react'


const Sobre = () => {
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
        className="text-4xl text-center pt-8"
      >
        <Title text1={"Sobre a"} text2={"Artesã"} />
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="flex flex-col md:flex-row items-center justify-center gap-10 max-md:px-4 mt-6"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative shadow-2xl shadow-indigo-600/40 rounded-2xl overflow-hidden shrink-0"
        >
            <img className="max-w-md w-full object-cover rounded-2xl"
                src={assets.carol}
                alt="Imagem da Carol" />            
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-sm text-slate-600 max-w-lg"
        >
            <h1 className="text-xl uppercase font-semibold text-indigo-500">Bem-vinda a Encanto</h1>
            <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-indigo-600 to-[#DDD9FF]"></div>
              <p className="mt-8">Me chamo Carol Caetano, e sou a criadora da Encanto Amigurumi.</p>
              <p className="mt-4">
                Minha paixão pelo crochê começou como uma forma de relaxar e se
                transformou em uma jornada incrível de criatividade e conexão com
                pessoas que, como eu, amam transformar linhas em arte. Crochetando
                com meus filhos ao redor, entre risadas e novelos, descobri que o
                amigurumi não é só sobre criar bonecos, mas sobre contar histórias e
                espalhar amor.
              </p>
              <p className="mt-4">
                Foi assim que me tornei apaixonada por ensinar outras pessoas a
                mergulharem nesse mundo mágico! Aqui, quero compartilhar com você
                não só receitas, mas também um pedacinho do meu universo.
            </p>              
        </motion.div>
    </motion.section>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-xl py-4 mt-8"
      >
        <Title text1={"Escolha a"} text2={"ENCANTO"} />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="relative w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-8 md:px-0 pt-10 pb-20"
      >
          <div className="size-[520px] -top-80 left-1/2 -translate-x-1/2 rounded-full absolute blur-[300px] -z-10 bg-[#FBFFE1]"></div>

            <div className="py-10 border-b md:py-0 md:border-r md:border-b-0 md:px-10">                
                <div className="mt-5 space-y-2">
                    <h3 className="text-base font-medium text-indigo-500">Receitas Exclusivas e Temáticas:</h3>
                    <p className="text-sm text-slate-500">
                      As receitas que você encontra aqui são únicas e desenvolvidas com
                      muito carinho, trazendo personagens encantadores e cheios de
                      detalhes. Cada criação foi pensada para proporcionar um resultado
                      profissional e diferenciado, tornando seus amigurumis ainda mais
                      especiais.
                    </p>
                </div>
            </div>

            <div className="py-10 border-b md:py-0 lg:border-r md:border-b-0 md:px-10">                
                <div className="mt-5 space-y-2">
                    <h3 className="text-base font-medium text-indigo-500">Passo a Passo Detalhado e Fácil de Seguir:</h3>
                    <p className="text-sm text-slate-500">
                      Todas as receitas foram criadas com instruções claras, fotos
                      ilustrativas e dicas especiais para garantir que até iniciantes
                      consigam fazer amigurumis perfeitos. Você não precisa se preocupar
                      em errar — é só seguir o guia e criar sua própria magia!
                    </p>
                </div>
            </div>
            
            <div className="py-10 border-b md:py-0 md:border-b-0 md:px-10">              
              <div className="mt-5 space-y-2">
                  <h3 className="text-base font-medium text-indigo-500">Faça e Venda Seus Próprios Amigurumis:</h3>
                  <p className="text-sm text-slate-500">
                    Além de ser um hobby super prazeroso, aprender a fazer amigurumis
                    pode se tornar uma fonte de renda extra. Com nossas receitas, você
                    pode criar peças encantadoras e vendê-las, conquistando clientes
                    apaixonados pelo seu trabalho.
                  </p>
              </div>
            </div>
      </motion.div>

      <NewsletterBox />      
    </motion.div>
  )
}

export default Sobre
