import { useContext } from "react";
import { storeContext } from "../../utils/storeContext";
import "./wishlist.css";
import bin from "../../assets/bin.svg";

const WishlistCard = ({ name, price, product }) => {
    const { moveToCart, removeFromWishlist } = useContext(storeContext);

    return (
        <div className="wishlist-card">
            <div style={{ width: "300px", textAlign: "left" }}>
                <h3>{name}</h3>
            </div>
            <p style={{ width: "50px" }}>
                <strong>₹{price}</strong>
            </p>
            <span className="underline" onClick={() => moveToCart(product)}>
                Add to cart
            </span>
            <img
                src={bin}
                alt="delete"
                onClick={() => removeFromWishlist(product)}
            />
        </div>
    );
};

export default WishlistCard;
