import Navbar from "../../components/navigation/Navbar";
import { useContext } from "react";
import { storeContext } from "../../utils/storeContext";
import WishlistCard from "../../components/wishlistCard/WishlistCard";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useNavigate } from "react-router-dom";

import "./wishlist.css";
import nothing from "../../assets/nothing.svg";

const WishList = () => {
    const { wishlist, clearWishlist } = useContext(storeContext);
    const [parent] = useAutoAnimate();
    const navigate = useNavigate();
    return (
        <section>
            <Navbar />
            <main className="screen wishlist-screen">
                <h2>Shopping Wishlist ({wishlist.length} items)</h2>
                <br />
                <br />
                <div className="wishlist-grid" ref={parent}>
                    {wishlist.length > 0 ? (
                        wishlist.map((item) => {
                            return (
                                <WishlistCard
                                    key={item._id}
                                    name={item.name}
                                    price={item.price}
                                    product={item}
                                    image={item.image}
                                />
                            );
                        })
                    ) : (
                        <div>
                            <p>
                                there is nothing here.{" "}
                                <span
                                    className="blue"
                                    onClick={() => navigate(`/products`)}
                                >
                                    continue shopping
                                </span>
                            </p>
                            <br />
                            <img
                                src={nothing}
                                alt="no products in wishlist"
                                className="nothing"
                            />
                        </div>
                    )}
                </div>
            </main>
        </section>
    );
};

export default WishList;
