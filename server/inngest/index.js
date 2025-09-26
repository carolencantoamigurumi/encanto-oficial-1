import { Inngest } from "inngest";
import userModel from "../models/userModel.js";



// Crie um cliente para enviar e receber eventos
export const inngest = new Inngest({ id: "encanto-oficial" });


// Função do Inngest para SALVAR dados do usuário em um banco de dados
const syncUserCreation = inngest.createFunction(
    { id: 'sync-user-from-clerk' },
    { event: 'clerk/user.created' },
    async ({ event }) => {
        const {id, first_name, last_name, email_addresses, image_url} = event.data

        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: `${first_name} ${last_name}`,
            imageUrl: image_url
        }
        await userModel.create(userData)
    }
)



// Função do Inngest para DELETAR dados do usuário em um banco de dados
const syncUserDeletion = inngest.createFunction(
    { id: 'delete-user-with-clerk' },
    { event: 'clerk/user.deleted' },
    async ({ event }) => {
        const {id} = event.data
        await userModel.findByIdAndDelete(id)       
    }
)



// Função do Inngest para ATUALIZAR dados do usuário em um banco de dados
const syncUserUpdation = inngest.createFunction(
    { id: 'update-user-from-clerk' },
    { event: 'clerk/user.updated' },
    async ({ event }) => {
        const {id, first_name, last_name, email_addresses, image_url} = event.data
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: `${first_name} ${last_name}`,
            imageUrl: image_url
        }
        await userModel.findByIdAndUpdate(id, userData, { new: true, upsert: false })               
    }
)




// Crie um array vazio para onde exportaremos as futuras funções Inngest
export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];