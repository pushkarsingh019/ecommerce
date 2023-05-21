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
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(
        category ? [category] : []
    );
    console.log(selectedCategories);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    useEffect(() => {
        const filteredProducts = products.filter((product) => {
            let flag = false;
            selectedCategories.forEach((selectedCategory) => {
                if (selectedCategory === product.category) {
                    flag = true;
                }
            });
            return flag;
        });
        setFilteredProducts(filteredProducts);

        if (selectedCategories.length === 0) {
            setFilteredProducts(products);
        }
    }, [selectedCategories]);

    const fetchProducts = async () => {
        const { data } = await axios.get(`${backendUrl}/api/products`);
        setProducts(data);
        category
            ? setFilteredProducts(
                  data.filter((product) => product.category === category)
              )
            : setFilteredProducts(data);
    };
    const fetchCategories = async () => {
        const { data } = await axios.get(`${backendUrl}/api/categories`);
        setCategories(data);
    };
    const onSelectedCategoryChange = async (categoryName) => {
        const CategorySelected = selectedCategories.includes(categoryName);
        if (CategorySelected) {
            setSelectedCategories(
                selectedCategories.filter(
                    (category) => category !== categoryName
                )
            );
        } else {
            setSelectedCategories([...selectedCategories, categoryName]);
        }
    };
    const clearFilters = () => {
        setSelectedCategories([]);
        setFilteredProducts(products);
    };

    return (
        <section>
            <Navbar />
            <main className="screen">
                <br />
                <section className="products-screen">
                    <h3 style={{ marginLeft: "15rem" }}>
                        {selectedCategories.length !== 0
                            ? `Showing results for ${selectedCategories} (${filteredProducts.length} products)`
                            : `Showing all products (${filteredProducts.length} products)`}
                    </h3>
                    <br />
                    <div className="sidebar">
                        <div className="flex">
                            <h4>Filters</h4>
                            <p onClick={() => clearFilters()} className="clear">
                                clear
                            </p>
                        </div>
                        <br />
                        <div>
                            <strong>Category</strong>
                            <br />
                            <div>
                                {categories.map((category) => {
                                    return (
                                        <div key={category._id}>
                                            <input
                                                type="checkbox"
                                                onChange={() =>
                                                    onSelectedCategoryChange(
                                                        category.categoryName
                                                    )
                                                }
                                                checked={selectedCategories.includes(
                                                    category.categoryName
                                                )}
                                            />{" "}
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
                        {filteredProducts.map((product) => {
                            return (
                                <ProductCard
                                    key={product._id}
                                    name={product.name}
                                    description={product.description}
                                    price={product.price}
                                    image={product.image}
                                    id={product._id}
                                    rating={product.rating}
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
