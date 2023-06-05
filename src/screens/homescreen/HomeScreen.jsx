// importing layouts and components
import Navbar from "../../components/navigation/Navbar";
import CategoryCard from "../../components/categoryCard/CategoryCard";
import Spinner from "../../components/spinner/Spinner";

// importing css
import "./home.css";

// importing context
import { useContext } from "react";
import { storeContext } from "../../utils/storeContext";

// external dependencies
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
    const { categories, loading, fetchCategories, implementSearch } =
        useContext(storeContext);

    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
        // eslint-disable-next-line
    }, []);
    return (
        <section className="home-screen">
            <Navbar />
            <main className="screen">
                <h1>shop by category</h1>
                <div className="categories-flex">
                    {loading ? (
                        <div className="center-form">
                            <Spinner />
                        </div>
                    ) : (
                        categories?.map((category) => {
                            return (
                                <CategoryCard
                                    key={category._id}
                                    name={category.categoryName}
                                    description={category.description}
                                    image={category.image}
                                />
                            );
                        })
                    )}
                </div>
            </main>
        </section>
    );
};

export default HomeScreen;
