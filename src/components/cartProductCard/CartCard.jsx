import { useState } from "react";
import { useContext } from "react";
import { storeContext } from "../../utils/storeContext";
import iphoneImage from "../../assets/iphoneImage.jpeg";
import "./cartCard.css";
import { useEffect } from "react";

const CartCard = ({ name, image, price, quantity, product }) => {
    const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [cartQuantity, setCartQuantity] = useState(quantity);
    const { moveToWishlist, removeFromCart, updateQuantity } =
        useContext(storeContext);

    const imageStyles = {
        width: "200px",
        height: "200px",
        borderRadius: "2px",
    };

    useEffect(() => {
        updateQuantity(product, Number(cartQuantity));
    }, [cartQuantity]);

    return (
        <div className="cart-card">
            <img src={image} alt={name} style={imageStyles} />
            <div className="product-details">
                <h4>{name}</h4>
                <br />
                <p>₹{price}</p>
                <br />
                <div className="quantiy">
                    <label>Qty : </label>
                    <select
                        defaultValue={cartQuantity}
                        onChange={(event) =>
                            setCartQuantity(event.target.value)
                        }
                    >
                        {options.map((option) => {
                            return <option value={option}>{option}</option>;
                        })}
                    </select>
                </div>
                <br />
                <div className="flex">
                    <button
                        className="button"
                        onClick={() => moveToWishlist(product)}
                    >
                        move to wishlist
                    </button>
                    <button
                        className="button"
                        onClick={() => removeFromCart(product)}
                    >
                        remove from cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartCard;
