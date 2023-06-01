import "./productcard.css";
import iphoneImage from "../../assets/iphoneImage.jpeg";
import wishlistOutline from "../../assets/wishlist_outline.svg";
import wishlistAdded from "../../assets/wishlist_added.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { storeContext } from "../../utils/storeContext";
import { useEffect } from "react";

const ProductCard = ({
    name,
    description,
    price,
    image,
    rating,
    id,
    product,
}) => {
    const navigate = useNavigate();
    const { addToCart, addToWishlist, wishlist, cart, removeFromWishlist } =
        useContext(storeContext);
    const [inCart, setInCart] = useState(
        cart.filter((item) => item._id === id).length > 0 ? true : false
    );
    const [inWishlist, setInWishlist] = useState(
        wishlist.filter((item) => item._id === id).length > 0 ? true : false
    );

    console.log(cart.filter((item) => item._id === id));

    useEffect(() => {
        if (inWishlist) {
            addToWishlist(product);
        } else {
            removeFromWishlist(product);
        }
    }, [inWishlist]);

    // useEffect(() => {
    //     setInWishlist(
    //         wishlist.find((item) => item === product) !== undefined
    //             ? true
    //             : false
    //     );
    // }, [wishlist]);

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
                    loading="lazy"
                />
            ) : (
                <img
                    className="wishlist"
                    src={wishlistOutline}
                    alt="wishlist"
                    onClick={() => setInWishlist(true)}
                    loading="lazy"
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
                        loading="lazy"
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
            </div>
            <button onClick={() => addToCart(product)}>
                {inCart ? "In Cart" : "Add To Cart"}
            </button>
        </div>
    );
};

export default ProductCard;
