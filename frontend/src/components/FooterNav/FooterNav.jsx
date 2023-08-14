import "./FooterNav.css"
import { NavLink } from "react-router-dom";
const FooterNav = () => {
    return (
        <>
        <footer>
            <h2>I bims, a footer nav</h2>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/orderhistory">Orders</NavLink>
            <NavLink to="/shoppingcart">ShoppingCart</NavLink>
            <NavLink to="/favorites">Wishlist</NavLink>
            <NavLink to="/profile">Profile</NavLink>
        </footer>
        </> 
    );
}
 
export default FooterNav;