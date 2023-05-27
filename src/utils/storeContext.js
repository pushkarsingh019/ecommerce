import axios from "axios";
import {createContext, useEffect, useState} from "react";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { backendUrl } from "./config";

export const storeContext = createContext();

export function CartProvider({children}){
    const notify = (text) => toast.success(text, {
        position: "top-center",
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
                setWishlist([...wishlist, product])
            }
        },
        removeFromWishlist : product => setWishlist([...wishlist].filter(item => item !== product)),
        removeFromCart : product => setCart([...cart].filter(item => item !== product)),
        clearCart : () => setCart([]),
        clearWishlist : () => setWishlist([]),
        moveToWishlist : product => {
            store.removeFromCart(product);
            store.addToWishlist(product)
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
                const {data} = await axios.post(`${backendUrl}/api/auth/signup`, signupCredentials);
                const {user, token} = data;
                setUser(user);
                setAccessToken(token);
            } catch (error) {
                console.log(error.message)
            }  
        },
        loginUser : async (loginCredentials) => {
            try {
                const {data} = await axios.post(`${backendUrl}/api/auth/login`, loginCredentials);
                const {user, access_token, message, status} = data;
                console.log(data);
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
            console.log(addressData);
            try {
                const {data} = await axios.post(`${backendUrl}/api/user/updateAddress`, {userId : user._id, addressDetails : addressData});
                setUser(data);
            } catch (error) {
                console.error(error.message)
            }
        }
    };

    return(
        <storeContext.Provider value={store}>
            <ToastContainer limit={1} transition={Slide} />
            {children}
        </storeContext.Provider>
    )
};