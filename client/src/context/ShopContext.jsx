import { createContext, useEffect, useState } from "react";
import { dummyProducts, dummyUserData, orderProducts } from "../assets/assets";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL


export const ShopContext = createContext()


const ShopContextProvider = (props) => {

    const currency = import.meta.env.VITE_CURRENCY
    const discount = 10

    const { user } = useUser()
    const { getToken } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const [ isAdmin, setIsAdmin ] = useState(false)
    const [ isAdminLoading, setIsAdminLoading ] = useState(true);

    const [ products, setProducts ] = useState([])
    const [ search, setSearch ] = useState('')
    const [ showSearch, setShowSearch] = useState(false);
    const [ cartItems, setCartItems ] = useState({})
    const [ selected, setSelected ] = useState(false)
    const [ cupom, setCupom ] = useState(0);                        // cupom guarda o percentual; setCupom atualiza
    const [ favoriteItems, setFavoriteItems ] = useState([]);



    // --------------------------- Função para verificar se o usuário é Admin ---------------------------
    const fetchIsAdmin = async () => {
        try {
            const { data } = await axios.get('/api/admin/is-admin', {headers: {Authorization: `Bearer ${await getToken()}`}})
            setIsAdmin(data.isAdmin)

            if (!data.isAdmin && location.pathname.startsWith('/admin')) {
                navigate('/')
                toast.error('Você não possui autorização para acessar o painel de Admin')
            }
        } catch (error) {
            setIsAdmin(false);
        } finally {
            setIsAdminLoading(false)
        }
    }



    // --------------------------- Mostrar Ebooks no Site ---------------------------------- 
    const getProductsData = async () => {
        try {
            const { data } = await axios.get('/api/product/list')

            if (data.success) {
                setProducts(data.products || [])
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }



    // --------------------------- Adicionar Ebook ao Carrinho ----------------------------------
    const addToCart = async (itemId) => {
        if (cartItems[itemId]) {
            toast('Este eBook já está no carrinho.', {icon: '🛒'})
            return
        }

        try {
            const token = await getToken()
            if (token) {
                // Usuário autenticado: envia para backend
                await axios.post('/api/cart/add', {itemId}, {headers: {Authorization: `Bearer ${token}`}})
            }

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
            
            const token = await getToken()

            if (!token) throw new Error("Usuário não autenticado");

            await axios.post('/api/cart/update', {itemId, quantity: 0 }, {headers: {Authorization: `Bearer ${token}`}})
        } catch (error) {
            console.log(error);
            toast.error("Erro ao remover o ebook da sacola"); 
        }      
    }



    // --------------------------- Obter carrinho do cliente ----------------------------------
    const getUserCart = async () => {
        const token = await getToken()
        if (!token) throw new Error("Usuário não autenticado");

        try {
            const { data } = await axios.get('/api/cart/get', {headers: {Authorization: `Bearer ${token}`}})
            if (data.success) {
                let backendCart = data.cartData || {}
                let localCart = JSON.parse(localStorage.getItem("cartItems")) || {}

                // Mescla localStorage com backend (prioridade: backend)
                let mergedCart = { ...localCart, ...backendCart }

                // Atualiza estado e localStorage
                setCartItems(mergedCart)
                localStorage.setItem("cartItems", JSON.stringify(mergedCart))

                // Envia pro backend os itens que só estavam offline
                for (const [itemId, qty] of Object.entries(localCart)) {
                    if (!backendCart[itemId]) {
                        await axios.post('/api/cart/add', { itemId, quantity: qty }, {headers: {Authorization: `Bearer ${token}`}})
                    }
                }
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message) 
        }
    }

    


    // --------------------------- Obter Valor Total do Carrinho ---------------------------------- 
    const getCartAmount = () => {
        return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
            const itemInfo = products.find(product => product._id === itemId)
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



    // --------------------------- alternar (adicionar/remover) Ebooks Favoritos ---------------------------
    const toggleFavorite = async (productId) => {
        try {
            if (!user) return toast.error('Faça o login para adicionar aos favoritos');

            const token = await getToken();
            const { data } = await axios.post('/api/user/update-favorite', { productId }, { headers: { Authorization: `Bearer ${token}` } });

            if (data.success) {
                await fetchFavoriteEbooks()  // Atualiza o estado com lista do backend
                toast.success(data.message);
            } else {
                toast.error('Erro ao atualizar favoritos');
            }
        } catch (error) {
            toast.error('Erro ao comunicar com servidor');
        }        
    }


    // --------------------------- Buscar Ebooks Favoritos ---------------------------
    const fetchFavoriteEbooks = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get('/api/user/favorites', {headers: {Authorization: `Bearer ${await getToken()}`}})

            // Atualize a partir dos IDs
            if (data.success) {
                setFavoriteItems(data.ebooks.map(e => e._id));
            } else {
                setFavoriteItems([]);
                toast.error(data.message)
            }
        } catch (error) {
            setFavoriteItems([]);
            toast.error('Erro ao buscar favoritos');
        }
    }

    



    // Executa a função para selecionar se o usuário é ou não Admin
    useEffect(() => {
        if (user) {
            fetchIsAdmin()
            fetchFavoriteEbooks()
        }
    },[user])



    // Executa a função de mostrar os Ebooks no Site
    useEffect(() => {
        getProductsData()
    },[])


    // Executa a função de buscar itens no carrinho do cliente
    useEffect(() => {
        const savedCart = localStorage.getItem('cartItems')
        if (savedCart) {
            setCartItems(JSON.parse(savedCart))
        }
    },[])


    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    },[cartItems])
    



    // Mostra o Token do Clerk no console da página
    useEffect(() => {
        if (user) {
            getToken().then((token) => console.log(token))
        }
    },[user])
    







    const value = {
        products,
        orderProducts,
        dummyUserData,
        currency,
        navigate,
        user,
        getToken,
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
        toggleFavorite,
        cupom,
        axios,
        fetchIsAdmin,
        fetchFavoriteEbooks

    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider
