import Navbar from "../../components/navigation/Navbar";
import { useContext } from "react";
import { storeContext } from "../../utils/storeContext";

const CartScreen = () => {
    const { cart, clearCart } = useContext(storeContext);
    return (
        <section>
            <Navbar />
            <h2>Cart page</h2>
            <div>
                {cart.length === 0 ? (
                    <p>no products in cart</p>
                ) : (
                    <div>
                        {cart.map((product) => {
                            return <p key={product._id}>{product.name}</p>;
                        })}
                    </div>
                )}
            </div>
            <button onClick={() => clearCart()}>clear cart</button>
        </section>
    );
};

export default CartScreen;
