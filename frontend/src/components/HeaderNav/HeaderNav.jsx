import "./HeaderNav.css";
import BackBtn2 from "../BackBtn2Home/BackBtn2"; // Navigation auf HomePage
import BackBtn3 from "../BackBtn3OneBack/BackBtn3"; // navigation ein Schritt zurück
import filterPopup from "../../assets/img/filterPopup.svg";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import lupe from "../../assets/img/lupe.svg";

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
            <NavLink to="/filter">
              <img src={filterPopup} alt="filter-popup" />
            </NavLink>
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
          {/* <section className="location-name"> */}
          {location.pathname == "/home" ||
          location.pathname == "/productlist" ? (
            <div className="headerNav-searchBox">
              <input
                type="search"
                className="search-bar"
                placeholder="Search for Product"
              />
              <span className="search-icon">
                <img src={lupe} alt="lupe" />
              </span>
            </div>
          ) : (
            ""
          )}
          {/* </section> */}
          {/* Navigation to HomePage */}
          {location.pathname == "/shoppingcart" ||
          location.pathname == "/orderhistory" ||
          location.pathname == "/favorites" ||
          location.pathname == "/profile" ? (
            <BackBtn2 />
          ) : (
            ""
          )}
          {/* Searchbar for Home & Productlist */}
          {/* Location Name */}
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
          {location.pathname == "/filter" ? <h2>Filters</h2> : ""}
          {detailProduct == "/detailproduct" ? <h2>Grocery Deals</h2> : ""}
          <article className="profile-logout-section">
            {location.pathname == "/profile" ? (
              <span>
                <h2>My Profile</h2>
              </span>
            ) : (
              ""
            )}
            {location.pathname == "/profile" && isLoggedIn && (
              <button type="button" onClick={logout}>
                Logout
              </button>
            )}
          </article>
        </section>
      </header>
    </>
  );
};

export default HeaderNav;
