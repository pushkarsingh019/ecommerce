// importing layouts and components
import Navbar from "../../components/navigation/Navbar";
import CategoryCard from "../../components/categoryCard/CategoryCard";

// importing css
import "./home.css";

// importing context
import { useContext } from "react";
import { storeContext } from "../../utils/storeContext";

// external dependencies
import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../../utils/config";

const HomeScreen = () => {
    const { categories, loading, fetchCategories } = useContext(storeContext);

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <section>
            <Navbar />
            <main className="screen">
                <h1>shop by category</h1>
                <div className="categories-flex">
                    {loading ? (
                        <p>loading...</p>
                    ) : (
                        categories?.map((category) => {
                            return (
                                <CategoryCard
                                    key={category._id}
                                    name={category.categoryName}
                                    description={category.description}
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
