import { useParams } from "react-router-dom";
import Navbar from "../../components/navigation/Navbar";
import { useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../../utils/config";
import { useState } from "react";
import ProductCard from "../../components/productcard/ProductCard";

import "./products.css";

const ProductScreen = () => {
    const { category } = useParams();
    console.log(category);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const fetchProducts = async () => {
        const { data } = await axios.get(`${backendUrl}/api/products`);
        category
            ? setProducts(
                  data.filter((product) => product.category === category)
              )
            : setProducts(data);
    };

    const fetchCategories = async () => {
        const { data } = await axios.get(`${backendUrl}/api/categories`);
        setCategories(data);
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    return (
        <section>
            <Navbar />
            <main className="screen">
                <br />
                <section className="products-screen">
                    <h3 style={{ marginLeft: "15rem" }}>
                        {category
                            ? `Showing results for ${category} (${products.length} products)`
                            : `Showing all products (${products.length} products)`}
                    </h3>
                    <br />
                    <div className="sidebar">
                        <div className="flex">
                            <h4>Filters</h4>
                            <p>clear</p>
                        </div>
                        <br />
                        <div>
                            <strong>Category</strong>
                            <br />
                            <div>
                                {categories.map((category) => {
                                    return (
                                        <div key={category._id}>
                                            <input type="checkbox" />{" "}
                                            <span>{category.categoryName}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <br />
                        <br />
                        <div>
                            <strong>Sort By</strong>
                            <br />
                            <div>
                                <input type="radio" /> <span>Low to High</span>
                                <br />
                                <input type="radio" /> <span>High to Low</span>
                            </div>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div>
                            <strong>Filter By Rating</strong>
                            <br />
                            <span>1 </span>
                            <input type="range" min={1} max={5} />
                            <span> 5</span>
                        </div>
                    </div>
                    <div className="products-listing">
                        {products.map((product) => {
                            return (
                                <ProductCard
                                    key={product._id}
                                    name={product.name}
                                    description={product.description}
                                    price={product.price}
                                    image={product.image}
                                    id={product._id}
                                />
                            );
                        })}
                    </div>
                </section>
            </main>
        </section>
    );
};

export default ProductScreen;
