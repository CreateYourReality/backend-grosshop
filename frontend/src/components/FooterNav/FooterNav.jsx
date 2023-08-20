import "./FooterNav.css";
import home from "../../assets/img/home.svg";
import orders from "../../assets/img/document.svg";
import cart from "../../assets/img/cart.svg";
import heart from "../../assets/img/heart.svg";
import profile from "../../assets/img/profile.svg";
import { NavLink, useLocation } from "react-router-dom";
import homeActive from "../../assets/img/homeActive.svg";
import ordersActive from "../../assets/img/documentActive.svg";
import cartActive from "../../assets/img/cartActive.svg";
import heartActive from "../../assets/img/heartActive.svg";
import profileActive from "../../assets/img/profileActive.svg";
import { useContext, useEffect } from "react";
import { NavContext } from "../../context/Context";

const FooterNav = () => {
  const location = useLocation();
  //   const { nav, setNav } = useContext(NavContext);

  // useEffect(() => {
  //   const list = document.querySelectorAll(".list");
  //   list.forEach((item) =>
  //     item.addEventListener("click", function (e) {
  //       list.forEach((li) => li.classList.remove("active"));
  //       e.currentTarget.classList.add("active");
  //     })
  //   );
  // }, [location]);

  return (
    <footer className="footer-navBar">
      <nav className="navigation">
        <ul>
          <li className="list">
            <NavLink to="/home">
              <span className="icon">
                {location.pathname == "/home" ? (
                  <img src={homeActive} alt="home" />
                ) : (
                  <img src={home} alt="home" />
                )}
              </span>
            </NavLink>
          </li>
          <li className="list">
            <NavLink to="/orderhistory">
              <span className="icon">
                {location.pathname == "/orderhistory" ? (
                  <img src={ordersActive} alt="orders" />
                ) : (
                  <img src={orders} alt="orders" />
                )}
              </span>
            </NavLink>
          </li>
          <li className="list">
            <NavLink to="/shoppingcart">
              <span className="icon">
                <img
                  src={cartActive}
                  alt="shoppingcart"
                  className="cartActive"
                />
                {/* {location.pathname == "/shoppingcart" ? (
                  <img
                    src={cartActive}
                    alt="shoppingcart"
                    className="cartActive"
                  />
                ) : (
                  <img src={cart} alt="shoppingcart" className="cart" />
                )} */}
              </span>
            </NavLink>
          </li>
          <li className="list">
            <NavLink to="/favorites">
              <span className="icon">
                {location.pathname == "/favorites" ? (
                  <img src={heartActive} alt="favorites" />
                ) : (
                  <img src={heart} alt="favorites" />
                )}
              </span>
            </NavLink>
          </li>
          <li className="list">
            <NavLink to="/profile">
              <span className="icon">
                {location.pathname == "/profile" ? (
                  <img src={profileActive} alt="profile" />
                ) : (
                  <img src={profile} alt="profile" />
                )}
              </span>
            </NavLink>
          </li>
          <div className="indicator"></div>
        </ul>
      </nav>
    </footer>
  );
};

export default FooterNav;
