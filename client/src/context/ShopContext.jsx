import { createContext, useEffect, useState } from "react";
import { dummyProducts, dummyUserData, orderProducts } from "../assets/assets";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export const ShopContext = createContext()


const ShopContextProvider = (props) => {

    const currency = import.meta.env.VITE_CURRENCY
    const discount = 10

    const { user } = useUser()
    const { getToken } = useAuth()
    const navigate = useNavigate()

    const [ isAdmin, setIsAdmin ] = useState(false)
    const [ isAdminLoading, setIsAdminLoading ] = useState(true);

    const [ search, setSearch ] = useState('')
    const [ showSearch, setShowSearch] = useState(false);
    const [ cartItems, setCartItems ] = useState({})
    const [ selected, setSelected ] = useState(false)
    const [ cupom, setCupom ] = useState(0);                        // cupom guarda o percentual; setCupom atualiza
    const [ favoriteItems, setFavoriteItems ] = useState([]);




    // --------------------------- Adicionar Ebook ao Carrinho ----------------------------------
    const addToCart = async (itemId) => {
        if (cartItems[itemId]) {
            toast('Este eBook já está no carrinho.', {icon: '🛒'})
            return
        }

        try {
            // const token = await getToken()
            // if (token) {
            //     // Usuário autenticado: envia para backend
            //     await axios.post('api/cart/add', {itemId}, {headers: {Authorization: `Bearer ${token}`}})
            // }

            // Atualiza estado local e salva no localStorage
            let cartData = structuredClone(cartItems)            
            cartData[itemId] = 1;
            setCartItems(cartData);
            localStorage.setItem('cartItems', JSON.stringify(cartData));

            toast.success('EBook adicionado ao carrinho!');            
        } catch (error) {
            console.log(error);
            toast.error("Erro ao adicionar ao carrinho");
        }        
    } 



    // --------------------------- Quantidade de Itens no Carrinho ----------------------------------
    const getCartCount = () => {
        let totalCount = 0
        for(const item in cartItems) {
            try {
                if (cartItems[item]) {
                    totalCount += 1
                }
            } catch (error) {}
        }
        return totalCount
    }




    // --------------------------- Remover Itens do Carrinho ----------------------------------
    const removeFromCart = async (itemId) => {
        try {
            let cartData = structuredClone(cartItems);
            delete cartData[itemId];
            setCartItems(cartData);
            localStorage.setItem("cartItems", JSON.stringify(cartData));
            toast.success('Ebook removido com sucesso!')
            
            // const token = await getToken()
            // if (!token) throw new Error("Usuário não autenticado");
            
            // await axios.post('/api/cart/update', {itemId, quantity: 0 }, {headers: {Authorization: `Bearer ${token}`}})

        } catch (error) {
            console.log(error);
            toast.error("Erro ao remover o ebook da sacola");    
        }
    }



    // --------------------------- Obter Valor Total do Carrinho ---------------------------------- 
    const getCartAmount = () => {
        return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
            const itemInfo = dummyProducts.find(product => product._id === itemId)
            if (itemInfo && quantity > 0) {
                return total + itemInfo.price * quantity
            }
            return total
        }, 0)
    }   




    // --------------------------- Função para Calcular a Avaliação Média do Ebook ---------------------------
    const calculateRating = (product) => {

        const ratings = product.ebookRatings || []

        if (ratings.length === 0) {
        return 0;
        }

        const totalRating = ratings.reduce((sum, r) => {
        return typeof r.rating === 'number' ? sum + r.rating : sum
        }, 0)

        return Math.round(totalRating / ratings.length)
    };



    // --------------------------- Remover Ebooks Favoritos ---------------------------
    const removeFromFavorites = (productId) => {
        setFavoriteItems(prev => {
            const newFavs = { ...prev }
            delete newFavs[productId]
            return newFavs
        })
    }


    // --------------------------- Ebooks Favoritos ---------------------------
    const toggleFavorite = (productId) => {
        setFavoriteItems(prev => prev[productId] ? (() => {
            const newFavs = { ...prev }
            delete newFavs[productId]
            return newFavs
        })()
        : { ...prev, [productId] : true }
       )
    }    



    



    // Mostra o Token do Clerk no console da página
    useEffect(() => {
        if (user) {
            getToken().then((token) => console.log(token))
        }
    },[user])
    







    const value = {
        dummyProducts,
        orderProducts,
        dummyUserData,
        currency,
        navigate,
        user,
        isAdmin,
        isAdminLoading,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,       
        selected,
        setSelected,
        calculateRating,
        addToCart,
        getCartCount,
        removeFromCart,
        getCartAmount,
        favoriteItems,
        removeFromFavorites,
        toggleFavorite,
        cupom,
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider
