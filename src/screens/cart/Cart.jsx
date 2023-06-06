import Navbar from "../../components/navigation/Navbar";
import { useContext } from "react";
import { storeContext } from "../../utils/storeContext";
import CartCard from "../../components/cartProductCard/CartCard";
import { useNavigate } from "react-router-dom";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import "./cart.css";

const CartScreen = () => {
    const { cart, clearCart } = useContext(storeContext);
    const [parent] = useAutoAnimate();
    const navigate = useNavigate();
    return (
        <section>
            <Navbar />
            <main className="screen screen-cart">
                <h2 className="center">my cart ({cart.length} products)</h2>
                <br />
                <br />

                <div className="cart-screen">
                    <div>
                        {cart.length === 0 ? (
                            <p>no products in cart</p>
                        ) : (
                            <div ref={parent}>
                                {cart.map((product) => {
                                    return (
                                        <CartCard
                                            key={product._id}
                                            name={product.name}
                                            price={product.price}
                                            quantity={product.quantity}
                                            product={product}
                                            image={product.image}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    <div className="summary">
                        <h4>Price Details</h4>
                        <hr />
                        <br />
                        <div className="flex">
                            <span>
                                Price(
                                {cart.reduce(
                                    (totalItems, currentItem) =>
                                        totalItems + currentItem.quantity,
                                    0
                                )}{" "}
                                items)
                            </span>
                            <span>
                                <strong>
                                    ₹
                                    {cart.reduce(
                                        (totalCost, currentItem) =>
                                            totalCost +
                                            currentItem.price *
                                                currentItem.quantity,
                                        0
                                    )}
                                </strong>
                            </span>
                        </div>
                        <div className="flex">
                            <span>Discount</span>
                            <span>
                                <strong>₹ 0</strong>
                            </span>
                        </div>
                        <div className="flex">
                            <span>Delivery Charges</span>
                            <span>
                                <strong>₹ 0</strong>
                            </span>
                        </div>
                        <hr />
                        <div className="flex">
                            <span>Total Amount</span>
                            <span>
                                <strong>
                                    ₹
                                    {cart.reduce(
                                        (totalCost, currentItem) =>
                                            totalCost +
                                            currentItem.price *
                                                currentItem.quantity,
                                        0
                                    )}
                                </strong>
                            </span>
                        </div>
                        <hr />
                        <p>
                            <small>No delivery charge for this order!</small>
                        </p>
                        <button
                            onClick={() => navigate(`/checkout`)}
                            className="cta"
                        >
                            place order
                        </button>
                    </div>
                </div>
            </main>
        </section>
    );
};

export default CartScreen;
