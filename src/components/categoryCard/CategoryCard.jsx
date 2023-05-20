import "./categoryCard.css";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ name, description, image }) => {
    const navigate = useNavigate();

    const handleCategorySelection = (name) => {
        navigate(`/products/${name}`, { state: { selectedCategory: name } });
    };

    return (
        <div
            className="category-card"
            onClick={() => handleCategorySelection(name)}
        >
            {/* <div className="image"></div> */}
            <h3>{name}</h3>
            <br />
            <p>{description}</p>
        </div>
    );
};

export default CategoryCard;
