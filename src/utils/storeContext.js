import {createContext, useEffect, useState} from "react";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const storeContext = createContext();

export function CartProvider({children}){
    const notify = (text) => toast.success(text, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    const [user, setUser] = useState("pushkar singh");
    const [cart, setCart] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []);
    const [wishlist, setWishlist] = useState(localStorage.getItem("wishlist") ? JSON.parse(localStorage.getItem("wishlist")) : []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const store = {
        user,
        cart,
        wishlist,
        updateUser : (name) => setUser(name),
        addToCart : (product, quantity = 1) => {
            setCart([...cart, {...product, quantity : Number(quantity)}]);
            notify("added to cart")
        },
        addToWishlist : product => setWishlist([...wishlist, product]),
        removeFromWishlist : product => setWishlist([...wishlist].filter(item => item !== product)),
        removeFromCart : product => setCart([...cart].filter(item => item !== product)),
        clearCart : () => setCart([]),
        clearWishlist : () => setWishlist([]),
        moveToWishlist : product => {
            store.removeFromCart(product);
            setWishlist([...wishlist, product])
        },
        moveToCart : (product, quantity = 1) => {
            store.removeFromWishlist(product);
            setCart([...cart, {...product, quantity : Number(quantity)}])
        },
    };

    return(
        <storeContext.Provider value={store}>
            <ToastContainer limit={1} transition={Slide} />
            {children}
        </storeContext.Provider>
    )
};