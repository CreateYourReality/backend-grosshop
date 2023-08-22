import "./HeaderNav.css";
import BackBtn2 from "../BackBtn2Home/BackBtn2"; // Navigation auf HomePage
import BackBtn3 from "../BackBtn3OneBack/BackBtn3"; // navigation ein Schritt zurück
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

const HeaderNav = () => {
  const { isLoggedIn, logout } = useContext(UserContext);
  const location = useLocation();
  const detailProduct = "/" + location.pathname.split("/")[1];

  return (
    <>
      <header className="headerNav-section">
        <section className="backBtn-box">
          {/* Home Filter-Popup */}
          {location.pathname == "/home" ? (
            <NavLink to="/filter">Filter-Popup</NavLink>
          ) : (
            ""
          )}
          {/* Navigation one Back */}
          {location.pathname == "/productlist" ||
          detailProduct == "/detailproduct" ||
          location.pathname == "/filter" ? (
            <BackBtn3 />
          ) : (
            ""
          )}
          {/* Navigation to HomePage */}
          {location.pathname == "/shoppingcart" ||
          location.pathname == "/orderhistory" ||
          location.pathname == "/favorites" ||
          location.pathname == "/profile" ? (
            <BackBtn2 />
          ) : (
            ""
          )}
        </section>
        {/* Searchbar for Home & Productlist */}
        <section className="location-name">
          {location.pathname == "/home" ||
          location.pathname == "/productlist" ? (
            <div className="headerNav-searchBox">
              <input type="search" placeholder="Search for Product" />
            </div>
          ) : (
            ""
          )}
          {/* Location Name & TrashBin */}
          {location.pathname == "/orderhistory" ? <h2>Order History</h2> : ""}
          {location.pathname == "/shoppingcart" ? (
            <div className="myCart-navBox">
              <h2>My Cart</h2>
            </div>
          ) : (
            ""
          )}
          {location.pathname == "/favorites" ? (
            <div className="myCart-navBox">
              <h2>Wishlist</h2>
            </div>
          ) : (
            ""
          )}
          <article className="profile-logout-section">
            {location.pathname == "/profile" ? <h2>My Profile</h2> : ""}
            {location.pathname == "/profile" && isLoggedIn && (
              <button type="button" onClick={logout}>
                Logout
              </button>
            )}
          </article>
          {location.pathname == "/filter" ? <h2>Filters</h2> : ""}
          {detailProduct == "/detailproduct" ? <h2>Grocery Deals</h2> : ""}
        </section>
      </header>
    </>
  );
};

export default HeaderNav;
