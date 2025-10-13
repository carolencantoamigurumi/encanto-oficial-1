import { clerkClient } from "@clerk/express";
import userModel from "../models/userModel.js";



// ------------------------ API para verificar se o usuário é Admin: /api/admin/is-admin ------------------------
const isAdmin = async (req, res) => {
    try {
        const { userId } = await req.auth()

        if (!userId) {
            return res.status(401).json({ success: false, message: "Usuário não autenticado", isAdmin: false });
        }

        const user = await clerkClient.users.getUser(userId);
        const isAdmin = user.privateMetadata?.role === 'admin'

        res.status(200).json({ success: true, isAdmin });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message, isAdmin: false });
    }
}


// ------------------------ API para definir usuário como administrador: /api/admin/set-admin ------------------------
const setUserAsAdmin = async (req, res) => {
    try {
        const { userId } = await req.auth() // Usuário admin que faz a solicitação
        const { targetUserId } = req.body;  // Usuário a ser promovido

        if (!userId) {
            return res.status(401).json({ success: false, message: "Usuário não autenticado" });
        }

        if (!targetUserId) {
            return res.status(400).json({ success: false, message: "ID do usuário a ser prommovido é obrigatório" });
        }

        // Atualiza o usuário alvo
        await clerkClient.users.updateUser(targetUserId, { privateMetadata: { role: "admin" } })   // promove a role admin

        await userModel.findByIdAndUpdate(targetUserId, { role: "admin" })    // atualiza o mongoDB

        res.status(200).json({ success: true, message: "Usuário definido como administrador" });
    } catch (error) {
        res.status(500).json({ success:false, message: error.message})
    }
}



// ------------------------ API  para remover o usuário de administrador: /api/admin/remove-admin ------------------------
const removeUserAdmin = async (req, res) => {
    try {
        const { userId } = await req.auth();  // Usuário admin que faz a solicitação
        const { targetUserId } = req.body;    // Usuário a remover do grupo admin

        if (!userId) {
            return res.status(401).json({ success: false, message: "Usuário não autenticado" });
        }

        if (!targetUserId) {
            return res.status(400).json({ success: false, message: "ID do usuário alvo é obrigatório" });
        }

        // Atualiza o usuário alvo para remover a role admin
        await clerkClient.users.updateUser(targetUserId, {privateMetadata: { role: "user"  }});  // remove a role admin

        await userModel.findByIdAndUpdate(targetUserId, { role: "user" });  // atualiza o mongoDB

        return res.status(200).json({ success: true, message: "Usuário removido do grupo de admins" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}


// ------------------------ Obter dados de todos os Clientes : /api/admin/clients ------------------------
const getAllUsers = async (req,res) => {
    try {
        const users = await userModel.find({})
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao buscar clientes', error: error.message });
    }
}



// ------------------------ API para obter dados para o Dashboard: /api/admin/dashboard ------------------------
const getDashboardData = async (req, res) => {
    try {
        
    } catch (error) {
        
    }

}


// ------------------------ API para obter todas as vendas: /api/admin/all-orders ------------------------
const getAllOrders = async (req, res) => {

}


export { isAdmin, setUserAsAdmin, removeUserAdmin, getAllUsers, getDashboardData, getAllOrders }
