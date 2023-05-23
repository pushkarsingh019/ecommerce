import Navbar from "../../components/navigation/Navbar";
import { useContext } from "react";
import { storeContext } from "../../utils/storeContext";
import WishlistCard from "../../components/wishlistCard/WishlistCard";

const WishList = () => {
    const { wishlist, clearWishlist } = useContext(storeContext);
    return (
        <section>
            <Navbar />
            <main className="screen wishlist-screen">
                <h2>Shopping Wishlist ({wishlist.length} items)</h2>
                <br />
                <br />
                <div className="wishlist-items">
                    {wishlist.length > 0 ? (
                        wishlist.map((item) => {
                            return (
                                <WishlistCard
                                    key={item._id}
                                    name={item.name}
                                    price={item.price}
                                    product={item}
                                />
                            );
                        })
                    ) : (
                        <p>there is nothing here</p>
                    )}
                </div>
            </main>
            <button onClick={() => clearWishlist()}>Clear Wishlist</button>
        </section>
    );
};

export default WishList;
