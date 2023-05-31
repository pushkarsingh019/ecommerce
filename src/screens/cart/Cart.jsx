import Navbar from "../../components/navigation/Navbar";
import { useContext } from "react";
import { storeContext } from "../../utils/storeContext";
import CartCard from "../../components/cartProductCard/CartCard";
import { useNavigate } from "react-router-dom";

import "./cart.css";

const CartScreen = () => {
    const { cart, clearCart } = useContext(storeContext);
    const navigate = useNavigate();
    return (
        <section>
            <Navbar />
            <main className="screen">
                <h2>my shopping cart ({cart.length} products)</h2>
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
                                            product={product}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    <div className="summary">
                        <h3>
                            Subtotal (
                            {cart.reduce(
                                (totalItems, currentItem) =>
                                    totalItems + currentItem.quantity,
                                0
                            )}{" "}
                            items)
                        </h3>
                        <br />
                        <p>
                            Total cost : ₹
                            {cart.reduce(
                                (totalCost, currentItem) =>
                                    totalCost +
                                    currentItem.price * currentItem.quantity,
                                0
                            )}
                        </p>
                        <br />
                        <button
                            className="button"
                            onClick={() => navigate(`/checkout`)}
                        >
                            checkout
                        </button>
                    </div>
                </div>
            </main>
            <button onClick={() => clearCart()}>clear cart</button>
        </section>
    );
};

export default CartScreen;
