import {createContext, useState} from "react";

export const storeContext = createContext();

export function CartProvider({children}){
    const [user, setUser] = useState("pushkar singh");

    const store = {
        user,
        updateUser : (name) => setUser(name)
    };

    return(
        <storeContext.Provider value={store}>
            {children}
        </storeContext.Provider>
    )
};