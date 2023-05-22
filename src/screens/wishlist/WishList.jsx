import Navbar from "../../components/navigation/Navbar";
import { useContext } from "react";
import { storeContext } from "../../utils/storeContext";

const WishList = () => {
    const { wishlist } = useContext(storeContext);
    return (
        <section>
            <Navbar />
            <h2>Wishlist</h2>
            {wishlist.map((product) => {
                return <p>{product.name}</p>;
            })}
        </section>
    );
};

export default WishList;
