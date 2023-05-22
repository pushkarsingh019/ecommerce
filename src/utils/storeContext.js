import {createContext, useEffect, useState} from "react";

export const storeContext = createContext();

export function CartProvider({children}){
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
        addToCart : product => setCart([...cart, product]),
        addToWishlist : product => setWishlist([...wishlist, product])
    };

    return(
        <storeContext.Provider value={store}>
            {children}
        </storeContext.Provider>
    )
};