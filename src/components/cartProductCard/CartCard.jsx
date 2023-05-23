import { useState } from "react";
import { useContext } from "react";
import { storeContext } from "../../utils/storeContext";
import iphoneImage from "../../assets/iphoneImage.jpeg";
import "./cartCard.css";

const CartCard = ({ name, image, price, quantity, product }) => {
    const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [cartQuantity, setCartQuantity] = useState(quantity);
    const { moveToWishlist, removeFromCart } = useContext(storeContext);

    const imageStyles = {
        width: "200px",
        height: "200px",
        borderRadius: "2px",
    };

    return (
        <div className="cart-card">
            <img src={iphoneImage} alt={name} style={imageStyles} />
            <div className="product-details">
                <div className="flex">
                    <h3 className="product-name">{name}</h3>
                    <p>
                        <strong>₹{price}</strong>
                    </p>
                </div>
                <br />
                <br />
                <div className="quantiy">
                    <label>Qty : </label>
                    <select
                        defaultValue={cartQuantity}
                        onChange={(event) => console.log(event)}
                    >
                        {options.map((option) => {
                            return <option value={option}>{option}</option>;
                        })}
                    </select>
                </div>
                <br />
                <br />
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
                    <p className="button">share</p>
                </div>
            </div>
            <br />
            <br />
            <br />
        </div>
    );
};

export default CartCard;
