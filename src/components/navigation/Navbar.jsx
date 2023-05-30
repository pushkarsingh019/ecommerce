import "./nav.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { storeContext } from "../../utils/storeContext";
import { useNavigate } from "react-router-dom";

// importing icons
import shoppingCart from "../../assets/shopping_cart.svg";
import wishlistImage from "../../assets/wishlist.svg";
import profileImage from "../../assets/profileImage.svg";
import { useState } from "react";
import { useEffect } from "react";

const Navbar = () => {
    // onHomeSearch - handles the functionality when search is done on homescreen.
    // onProductSearch  handles the functionality when the search is done on productScreen.
    const { cart, wishlist, implementSearch } = useContext(storeContext);
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        implementSearch(searchText);
        // eslint-disable-next-line
    }, [searchText]);

    return (
        <nav className="navigation-bar">
            <div className="logo">
                <Link to="/">the shopping site</Link>
            </div>
            <div className="search">
                <i class="material-icons">search</i>
                <input
                    type="text"
                    placeholder="search"
                    onChange={(event) => setSearchText(event.target.value)}
                    value={searchText}
                    // onKeyPress={(e) => {
                    //     if (e.key === "Enter") {

                    //     }
                    // }}
                />
            </div>
            <div className="options">
                <Link to={`/products`} className="explore-text">
                    Explore
                </Link>
                <div className="link" onClick={() => navigate(`/profile`)}>
                    <img src={profileImage} alt="profile" />
                </div>
                <div className="link" onClick={() => navigate(`/wishlist`)}>
                    <img src={wishlistImage} alt="wishlist" />
                    <span className="notification">{wishlist.length}</span>
                </div>
                <div className="link" onClick={() => navigate(`/cart`)}>
                    <img src={shoppingCart} alt="cart" />
                    <span className="notification">{cart.length}</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
