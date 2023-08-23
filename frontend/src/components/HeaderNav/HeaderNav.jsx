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
        {/* Home Section*/}
        <section className="home-box">
          {location.pathname == "/home" ? (
            <NavLink to="/filter">
              <img src={filterPopup} alt="filter-popup" />
            </NavLink>
          ) : (
            ""
          )}
          {location.pathname == "/home" ? (
            <div className="headerNav-searchBox">
              <input
                type="search"
                className="search-bar"
                placeholder="Search for Product1"
              />
              <span className="search-icon">
                <img src={lupe} alt="lupe" />
              </span>
            </div>
          ) : (
            ""
          )}
          {/* Productlist Section*/}
          <article className="productlist-box">
            {location.pathname == "/productlist" ? <BackBtn3 /> : ""}
            {location.pathname == "/productlist" ? (
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
          </article>
        </section>
        <section className="backBtn-box">
          {/* Navigation one Back */}
          {detailProduct == "/detailproduct" ||
          location.pathname == "/filter" ? (
            <BackBtn3 />
          ) : (
            ""
          )}
          {/* Navigation to HomePage */}
          {location.pathname == "/shoppingcart" ||
          location.pathname == "/orderhistory" ||
          location.pathname == "/favorites" ? (
            <BackBtn2 />
          ) : (
            ""
          )}
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
        </section>
        {/* Profile Section*/}
        <section className="profile-logout-section">
          <article className="profile-box">
            {location.pathname == "/profile" ? <BackBtn2 /> : ""}
            {location.pathname == "/profile" ? (
              <span>
                <h2>My Profile</h2>
              </span>
            ) : (
              ""
            )}
          </article>
          {location.pathname == "/profile" && isLoggedIn && (
            <button type="button" onClick={logout}>
              Logout
            </button>
          )}
        </section>
      </header>
    </>
  );
};

export default HeaderNav;
