import "./nav.css";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navigation-bar">
            <div className="logo">
                <Link to="/">the shopping site</Link>
            </div>
            <div className="search">
                <i class="material-icons">search</i>
                <input type="text" placeholder="search" />
            </div>
            <div className="options">
                <Link to={`/products`} className="explore-text">
                    Explore
                </Link>
                <Link to={`/profile`} class="material-icons">
                    account_circle
                </Link>
                <Link to={`/wishlist`} class="material-icons">
                    favorite
                </Link>
                <Link to={`/cart `} class="material-icons">
                    shopping_cart
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
