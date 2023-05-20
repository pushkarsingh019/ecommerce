import { useLocation, useParams } from "react-router-dom";
import Navbar from "../../components/navigation/Navbar";

const ProductScreen = () => {
    const { category } = useParams();
    const location = useLocation();
    const { selectedCategory } = location.state;
    return (
        <section>
            <Navbar />
            <h2>Products page</h2>
            <p>{category}</p>
            <p>selected category -- {selectedCategory}</p>
        </section>
    );
};

export default ProductScreen;
