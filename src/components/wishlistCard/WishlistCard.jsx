import { useContext } from "react";
import { storeContext } from "../../utils/storeContext";
import "./wishlist.css";
import bin from "../../assets/bin.svg";

const WishlistCard = ({ name, price, product, image }) => {
    const { moveToCart, removeFromWishlist } = useContext(storeContext);

    return (
        <div className="wishlist-card">
            <img
                src={bin}
                alt="delete"
                className="bin-icon"
                onClick={() => removeFromWishlist(product)}
            />
            <img className="product-img" src={image} alt={`image of ${name}`} />
            <p>
                <strong>{name}</strong>
            </p>
            <p>{price}</p>
            <button className="cta" onClick={() => moveToCart(product)}>
                Move to Cart
            </button>
        </div>
    );
};

export default WishlistCard;
