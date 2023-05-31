import axios from "axios";
import {createContext, useEffect, useState} from "react";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { backendUrl } from "./config";

export const storeContext = createContext();

export function CartProvider({children}){
    const notify = (text) => toast.success(text, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {});
    const [cart, setCart] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []);
    const [wishlist, setWishlist] = useState(localStorage.getItem("wishlist") ? JSON.parse(localStorage.getItem("wishlist")) : []);
    const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token") ? localStorage.getItem("access_token") : undefined);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState();
    const [searchedProducts, setSearchedProducts] = useState([]);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("access_token", accessToken);
    }, [user])

    const store = {
        user,
        cart,
        wishlist,
        loading,
        categories,
        products,
        product,
        searchedProducts,
        implementSearch : (searchText) => {
            setSearchedProducts(products.filter(product => product.name.toUpperCase().includes(searchText.toUpperCase()) || product.description.toUpperCase().includes(searchText.toUpperCase())));
            console.log(searchedProducts);
        },
        fetchCategories : async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(`${backendUrl}/api/categories`);
                setCategories(data);
                setLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        },
        fetchProducts : async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(`${backendUrl}/api/products`);
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        },
        fetchProductDetails : async (productId) => {
            console.log("fetchinf")
            setLoading(true)
            try {
                const { data } = await axios.get(
                    `${backendUrl}/api/product/${productId}`
                );
                console.log(data)
                setProduct(data);
                console.log(product);
                setLoading(false)
            } catch (error) {
                console.log(error.message)
            }
        },
        updateUser : (name) => setUser(name),
        addToCart : (product, quantity = 1) => {
            const exists = [...cart].find(item => item._id === product._id);
            if(exists){
                notify("item already in cart")
            }
            else{
                setCart([...cart, {...product, quantity : Number(quantity)}]);
                notify("added to cart")
            }
        },
        addToWishlist : product => {
            const exists = [...wishlist].find(item => item._id === product._id);
            if(exists === undefined){
                setWishlist([...wishlist, product]);
                notify("product added to wishlist");
            }

        },
        removeFromWishlist : product => {
            const exists = [...wishlist].find(item => item._id === product._id);
            if(exists !== undefined){
                setWishlist([...wishlist].filter(item => item !== product)); 
            }            
        },
        removeFromCart : product => setCart([...cart].filter(item => item !== product)),
        clearCart : () => setCart([]),
        clearWishlist : () => setWishlist([]),
        moveToWishlist : product => {
            store.removeFromCart(product);
            store.addToWishlist(product);
        },
        moveToCart : (product, quantity = 1) => {
            store.removeFromWishlist(product);
            store.addToCart(product, quantity);
        },
        updateQuantity: (product, quantity) => {
            const updatedCart = cart.map(item => item._id === product._id ? {...item, quantity : quantity} : item);
            setCart(updatedCart);
        },
        signupUser : async (signupCredentials) => {
            try {
                setLoading(true);
                const {data} = await axios.post(`${backendUrl}/api/auth/signup`, signupCredentials);
                const {user, token} = data;
                setUser(user);
                setAccessToken(token);
                setLoading(false);
            } catch (error) {
                console.log(error.message)
            }  
        },
        loginUser : async (loginCredentials) => {
            try {
                setLoading(true)
                const {data} = await axios.post(`${backendUrl}/api/auth/login`, loginCredentials);
                const {user, access_token, message, status} = data;
                setLoading(false);
                if(status === 200){
                    setUser(user);
                    setAccessToken(access_token);
                    return true
                }
                else {
                    setUser([])
                    setAccessToken([])
                    return message
                }
            } catch (error) {
                console.log(error.message)
            }
        },
        logout : () => {
            setUser({})
            setAccessToken("")
        },
        newAddress : async (addressData) => {
            console.log(addressData)
            setLoading(true)
            try {
                const {data} = await axios.post(`${backendUrl}/api/user/address`, {userId : user._id, addressDetails : addressData});
                setUser(data);
                setLoading(false)
            } catch (error) {
                console.error(error.message)
            }
        },
        deleteAddress : async (addressId) => {
            setLoading(true)
            try {
                const {data} = await axios.delete(`${backendUrl}/api/user/address/${addressId}`, {
                    headers : {
                        authorization : accessToken,
                    }
                });
                setUser(data);
                setLoading(false);
            } catch (error) {
                console.log(error.message)
            }
        },
        updateAddress : async (addressDetails) => {
            setLoading(true);
            try {
                const {data} = await axios.put(`${backendUrl}/api/user/address`, {addressDetails : addressDetails}, {
                    headers : {
                        authorization : accessToken,
                    }
                });
                setUser(data);
                setLoading(false);
            } catch (error) {
                console.log(error.message)
                alert(`${error.message}`)
                setLoading(false)
            }
        }
    };

    return(
        <storeContext.Provider value={store}>
            <ToastContainer limit={3} transition={Slide} />
            {children}
        </storeContext.Provider>
    )
};