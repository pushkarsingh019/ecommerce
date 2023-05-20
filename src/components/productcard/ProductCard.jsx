import "./productcard.css";
import iphoneImage from "../../assets/iphoneImage.jpeg";

const ProductCard = ({ name, description, price, image, rating, id }) => {
    const imageContainerStyles = {
        height: 0,
        paddingBottom: "70%", // Example aspect ratio, adjust as needed
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
            <div style={imageContainerStyles}>
                <img src={iphoneImage} alt="iphoneimage" style={imageStyles} />
            </div>
            <h3>{name}</h3>
            <br />
            <p>{description}</p>
            <br />
            <div className="flex">
                <p>4.5</p>
                <p>₹{price}</p>
            </div>
            <br />
            <button>Add to cart</button>
        </div>
    );
};

export default ProductCard;
