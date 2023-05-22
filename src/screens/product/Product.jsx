import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/navigation/Navbar";

const Product = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    if (productId === undefined) {
        navigate("/products");
    }
    return (
        <section>
            <Navbar />
            <h2>Product Page</h2>
            {productId}
        </section>
    );
};

export default Product;
