import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/navigation/Navbar";
import { useState } from "react";
import iphoneImage from "../../assets/iphoneImage.jpeg";
import { useContext } from "react";
import { storeContext } from "../../utils/storeContext";
import Spinner from "../../components/spinner/Spinner";

import "./product.css";

const Product = () => {
    const { productId } = useParams();
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const { addToCart, addToWishlist, product, fetchProductDetails, loading } =
        useContext(storeContext);

    useEffect(() => {
        fetchProductDetails(productId);
    }, []);

    if (loading) {
        return (
            <section>
                <Navbar />
                <div className="center-form">
                    <Spinner />
                </div>
            </section>
        );
    }

    if (product === undefined) {
        return <p>product is not defined</p>;
    }

    return (
        <section>
            <Navbar />
            <main className="screen">
                <span onClick={() => navigate(-1)} className="go-back">
                    ←
                </span>
                <br />
                <br />
                <br />
                <div className="product-page">
                    <div className="product-image-section">
                        <img
                            className="product-page-img"
                            src={product.image}
                            alt={product.name}
                        />
                    </div>
                    <div className="product-details">
                        <h2>{product.name}</h2>
                        <br />
                        <p>{product.description}</p>
                        <br />
                        <br />
                        <div className="flex">
                            <span>{product.rating}</span>
                            <span>
                                <strong>₹{product.price}</strong>
                            </span>
                        </div>
                        <br />
                        <div className="flex">
                            <span>Status</span>
                            <span>
                                {product.stockUnits > 0
                                    ? "In Stock"
                                    : "Out Of Stock"}
                            </span>
                        </div>
                        <br />
                        <div className="flex">
                            <span>Quantity</span>
                            <select
                                className="select"
                                onChange={(event) =>
                                    setQuantity(event.target.value)
                                }
                                value={quantity}
                            >
                                {options.map((option) => {
                                    return (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                        <br />
                        <br />
                        <p className="underline">
                            {product.stockUnits > 0 &&
                            quantity <= product.stockUnits
                                ? "In Stock"
                                : "Out of Stock"}
                        </p>
                        <br />
                        <button
                            className="cta secondary"
                            onClick={() => addToWishlist(product)}
                        >
                            Add to Wishlist
                        </button>
                        <br />
                        <br />
                        <button
                            className="cta primary"
                            onClick={() => addToCart(product, quantity)}
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            </main>
        </section>
    );
};

export default Product;
