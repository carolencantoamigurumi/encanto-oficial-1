import { clerkClient } from "@clerk/express";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";



// ------------------------ Obter dados do usuário: /api/user/data ------------------------
const getUserData = async (req,res) => {
    try {
        const { userId } = await req.auth()
        if (!userId) {
            return res.status(401).json({ success: false, message: "Usuário não autenticado" });
        }

        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(404).json({ success: false, message: "Cliente não encontrado" });
        }

        const name = (user.name || "").trim();
        const [firstName = "", ...rest] = name.split(" ");
        const lastName = rest.join(" ").trim() || "";

        return res.json({
            success: true,
            user: {
                id: user._id,
                firstName,
                lastName,
                email: user.email || "",
                cpf: user.cpf || "",
                phone: user.phone || "",
                role: user.role || "user",
            },
        })
    } catch (error) {
        console.error("Erro ao obter dados do usuário:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}



// ------------------------ API para adicionar Ebooks favoritos nos metadados do Clerk: /api/user/update-favorite ------------------------
const updateFavorite = async (req,res) => {
    try {
        const { productId } = req.body
        const { userId } = await req.auth()

        if (!productId) {
            return res.status(400).json({ success: false, message: "ID do produto é obrigatório" });
        }        

        // Busca usuário
        const user = await clerkClient.users.getUser(userId)
        const prevFavorites = Array.isArray(user.privateMetadata?.favorites) ? user.privateMetadata.favorites : []

        let newFavorites
        if (!prevFavorites.includes(productId)) {
            newFavorites = [...prevFavorites, productId]
        } else {
            newFavorites = prevFavorites.filter(item => item !== productId)
        }

        await clerkClient.users.updateUserMetadata(userId, {privateMetadata: {...user.privateMetadata, favorites: newFavorites}})

        res.json({success: true, message: 'Ebook favorito Atualizado', favorites: newFavorites})
    } catch (error) {
        console.error("Erro ao atualizar favoritos:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}



// ------------------------ API para buscar Ebooks favoritos nos metadados do Clerk: /api/user/favorites ------------------------
const getFavorites = async (req,res) => {
    try {
        const { userId } = await req.auth()
        const user = await clerkClient.users.getUser(userId)
        const favorites = Array.isArray(user.privateMetadata.favorites) ? user.privateMetadata.favorites : [];

        // Pegando os Ebbooks do banco de dados
        let ebooks = []
        if (favorites.length > 0) {
            ebooks = await productModel.find({_id: {$in: favorites}})            
        }

        res.json({success: true, ebooks})
    } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}


// ------------------------ Adicionar classificações de usuários ao Ebook: /api/user/add-rating ------------------------
const addUserRating = async (req, res) => {

}



// ------------------------ Adicionar Comentários de usuários ao Ebook: /api/user/add-review ------------------------
const addUserReview = async (req, res) => {

}


export { getUserData, updateFavorite, getFavorites, addUserRating, addUserReview }