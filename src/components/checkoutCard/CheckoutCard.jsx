import "./checkoutcard.css";
import { useNavigate } from "react-router-dom";

const CheckoutCard = ({ id, name, price, quantity, image }) => {
    const navigate = useNavigate();
    return (
        <div className="checkout-card">
            <img src={image} alt={`image of ${name}`} />
            <p onClick={() => navigate(`/product/${id}`)}>{name}</p>
            <p>
                ₹{price} x {quantity}
                {/* ₹{price} x {quantity} = <strong>₹{price * quantity}</strong> */}
            </p>
        </div>
    );
};

export default CheckoutCard;
