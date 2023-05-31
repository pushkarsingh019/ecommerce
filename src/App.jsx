import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartScreen from "./screens/cart/Cart";

import HomeScreen from "./screens/homescreen/HomeScreen";
import Product from "./screens/product/Product";
import ProductScreen from "./screens/productsPage/ProductsScreen";
import ProfileScreen from "./screens/profilePage/ProfileScreen";
import WishList from "./screens/wishlist/WishList";
import Signup from "./screens/signup/Signup";
import Login from "./screens/login/Login";

import "react-toastify/dist/ReactToastify.css";
import CheckoutScreen from "./screens/checkout/CheckoutScreen";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/products/:category" element={<ProductScreen />} />
                <Route path="/products" element={<ProductScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/wishlist" element={<WishList />} />
                <Route path="/cart" element={<CartScreen />} />
                <Route path="/product/:productId" element={<Product />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/checkout" element={<CheckoutScreen />} />
                <Route path="*" element={<h3>someting is wrong</h3>} />
            </Routes>
        </BrowserRouter>
    );
}
