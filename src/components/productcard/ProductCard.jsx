import "./productcard.css";
import iphoneImage from "../../assets/iphoneImage.jpeg";
import wishlistOutline from "../../assets/wishlist_outline.svg";
import wishlistAdded from "../../assets/wishlist_added.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ name, description, price, image, rating, id }) => {
    const [inWishlist, setInWishlist] = useState(false);
    const navigate = useNavigate();

    const imageContainerStyles = {
        height: 0,
        paddingBottom: "90%", // Example aspect ratio, adjust as needed
        position: "relative",
    };

    const imageStyles = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "contain",
    };

    return (
        <div className="product-card">
            {inWishlist ? (
                <img
                    className="wishlist"
                    src={wishlistAdded}
                    alt="wishlist"
                    onClick={() => setInWishlist(false)}
                />
            ) : (
                <img
                    className="wishlist"
                    src={wishlistOutline}
                    alt="wishlist"
                    onClick={() => setInWishlist(true)}
                />
            )}
            <div
                onClick={() => navigate(`/product/${id}`)}
                className="inner-product-div"
            >
                <div style={imageContainerStyles}>
                    <img
                        src={iphoneImage}
                        alt="iphoneimage"
                        style={imageStyles}
                    />
                </div>
                <br />
                <br />
                <h3>{name}</h3>
                <br />
                <p>{description}</p>
                <br />
                <div className="flex">
                    <p>{rating}</p>
                    <p>₹{price}</p>
                </div>
                <br />
                <button>Add to cart</button>
            </div>
        </div>
    );
};

export default ProductCard;