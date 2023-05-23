import Navbar from "../../components/navigation/Navbar";
import { useContext } from "react";
import { storeContext } from "../../utils/storeContext";
import CartCard from "../../components/cartProductCard/CartCard";

import "./cart.css";

const CartScreen = () => {
    const { cart, clearCart } = useContext(storeContext);
    return (
        <section>
            <Navbar />
            <main className="screen">
                <h2>my shopping cart ({cart.length} items)</h2>
                <br />
                <br />

                <div className="cart-screen">
                    <div>
                        {cart.length === 0 ? (
                            <p>no products in cart</p>
                        ) : (
                            <div>
                                {cart.map((product) => {
                                    return (
                                        <CartCard
                                            key={product._id}
                                            name={product.name}
                                            price={product.price}
                                            quantity={product.quantity}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    <div className="summary">sumary of the items</div>
                </div>
            </main>
            <button onClick={() => clearCart()}>clear cart</button>
        </section>
    );
};

export default CartScreen;
