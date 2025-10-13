import userModel from "../models/userModel.js";


// ------------------------ Adicionar Produtos ao Carrinho do Cliente: /api/cart/add ------------------------
const addToCart = async (req, res) => {
    try {
        const { userId } = await req.auth()
        if (!userId) {
            return res.status(401).json({ success: false, message: "Cliente não autenticado" });
        }

        const { itemId } = req.body
        if (!itemId) {
            return res.status(400).json({ success: false, message: "ID do item não fornecido" });
        }

        // Busca o usuário no banco
        const userData = await userModel.findById(userId)
        if (!userData) {
            return res.status(404).json({ success: false, message: "Dados do Cliente não encontrado" });
        }

        const cartData = userData.cartData || {}

        // Garante que o produto será adicionado com 1 unidade
        cartData[itemId] = 1;

        await userModel.findByIdAndUpdate( userId, { cartData } )

        res.json({ success: true, message: 'Ebook adicionado ao carrinho'})
    } catch (error) {
        console.error("Erro ao adicionar ao carrinho:", error);
        res.status(500).json({ success: false, message: error.message })
    }
}



// ------------------------ Atualizar Carrinho do Cliente: /api/cart/update ------------------------
const updateCart = async (req, res) => {
    try {
        const { userId } = await req.auth()
        if (!userId) {
            return res.status(401).json({ success: false, message: "Cliente não autenticado" });
        }

        const { itemId } = req.body
        if (!itemId) {
            return res.status(400).json({ success: false, message: "ID do item não fornecido" });
        }

        const { quantity } = req.body;
        // Garantir que só aceita 0 (remover) ou 1 (adicionar)
        if (quantity !== 1 && quantity !== 0) {
            return res.status(400).json({ success: false, message: "Só é permitido 1 unidade de cada ebook no carrinho." });
        }

        // Busca o usuário no banco
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "Dados do Cliente não encontrado" });
        }

        let cartData = userData.cartData || {}; 

        if (quantity === 0) {
            // Se a quantidade for 0, remove o ebook do carrinho
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: 'Carrinho atualizado'})
    } catch (error) {
        console.error("Erro ao adicionar ao carrinho:", error);
        res.status(500).json({ success: false, message: error.message })
    }
}



// ------------------------ Obter Dados do Carrinho do Cliente: /api/cart/get ------------------------
const getUserCart = async (req, res) => {
    try {
        const { userId } = await req.auth()
        if (!userId) {
            return res.status(401).json({ success: false, message: "Cliente não autenticado" });
        }

        // Busca o usuário no banco
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "Dados do Cliente não encontrado" });
        }

        let cartData = userData.cartData || {};

        res.json({ success: true, cartData})
    } catch (error) {
        console.error("Erro ao adicionar ao carrinho:", error);
        res.status(500).json({ success: false, message: error.message })
    }
}


export { addToCart, updateCart, getUserCart }