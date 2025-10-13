import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js';




// ------------------------ Função para adicionar produto : /api/product/add ------------------------
const addProduct = async (req, res) => {
    try {
        // Recebendo os dados do produto
        const { name, description, price, category, subCategory, discount } = req.body

        if (!req.files) {
            return res.status(400).json({ success: false, message: "Arquivos não enviados" });
        }


        // Recebendo e processando as imagens
        const imageFiles = [
            req.files.image1 && req.files.image1[0],
            req.files.image2 && req.files.image2[0],
            req.files.image3 && req.files.image3[0],
            req.files.image4 && req.files.image4[0],
        ].filter(Boolean)


        //  Enviando as imagens para o Cloudinary
        const imagesUrl = await Promise.all(
            imageFiles.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, {resource_type: "image"});
                return result.secure_url;
            })
        );


        // Recebendo o arquivo PDF (ebook)
        const ebookFile = req.files.ebookFile && req.files.ebookFile[0];

        if (!ebookFile) {
          return res.status(400).json({ success: false, message: "Arquivo de ebook é obrigatório" });
        }

        const ebookResult = await cloudinary.uploader.upload(ebookFile.path, {
            resource_type: "raw",
            folder: "ebooks",
        });


        // Criando o objeto do produto
        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            discount: Number(discount),
            image: imagesUrl,
            ebookFile: ebookResult.secure_url,     
            date: Date.now(),
        };

        console.log(productData);


        // Salvando no Banco de Dados
        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Produto Adicionado" });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });        
    }
}



// ------------------------ Função para listar produtos : /api/product/list ------------------------
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}



// ------------------------ Função para editar produto : /api/product/edit ------------------------
const editProduct = async (req, res) => {
    try {
        const { _id, name, description, price, category, subCategory, discount } = req.body

        if (!_id) {
            return res.status(400).json({ success: false, message: "ID do produto é obrigatório" });
        }

        const updatedProduct = await productModel.findByIdAndUpdate(
            _id, {$set: {
                    name,
                    description,
                    price,
                    category,
                    subCategory,
                    discount
                    }
                }, { new: true }) // retorna o documento atualizado

        res.status(200).json({ success: true, message: "Produto atualizado com sucesso", product: updatedProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}



// ------------------------ Função para remover produto : /api/product/remove ------------------------
const removeProduct = async (req, res) => {
    try {
        // Extrai o ID do produto do corpo da requisição
        const { productId } = req.body
        if (!productId) {
            return res.status(400).json({ success: false, message: 'ID do Produto não fornecido'})
        }

        const removed = await productModel.findByIdAndDelete(productId);
        if (!removed) {
            return res.status(404).json({ success: false, message: "Produto não encontrado" });
        }
        res.status(200).json({ success: true, message: "Produto Removido" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}




// ------------------------ Função para informações de um produto : /api/product/id ------------------------
const singleProduct = async (req, res) => {
    try {
        // Extrai o ID do produto do corpo da requisição
        const { productId } = req.body;
        
        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: "Produto não encontrado" });
        }
        
        res.status(200).json({ success: true, product });
    } catch (error) {        
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}



// ------------------------ Função para download de ebook : /api/product/download/:productId ------------------------
const ebookProduct = async (req, res) => {
    try {
        const { userId } = await req.auth();
        const { productId } = req.params;

        // verificar se o usuário comprou este produto e o pagamento foi aprovado
        const hasPurchased = await orderModel.findOne({
            userId,
            payment: true,
            "items.productId": productId,
        });

        if (!hasPurchased) {
            return res.status(403).json({success: false, message: "Acesso negado. Produto não comprado ou pagamento não aprovado."});
        }

        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Produto não encontrado" });
        }

        return res.status(200).json({ success: true, url: product.ebookFile });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Erro ao processar download", error });
    }
}


export { addProduct, listProducts, removeProduct, editProduct, singleProduct, ebookProduct }