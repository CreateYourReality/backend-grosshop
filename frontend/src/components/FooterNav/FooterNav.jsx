import "./FooterNav.css";
import home from "../../assets/img/home.svg";
import orders from "../../assets/img/document.svg";
import cart from "../../assets/img/cart.svg";
import heart from "../../assets/img/heart.svg";
import profile from "../../assets/img/profile.svg";
import { NavLink } from "react-router-dom";
import homeActive from "../../assets/img/homeActive.svg";
import ordersActive from "../../assets/img/documentActive.svg";
import cartActive from "../../assets/img/cartActive.svg";
import heartActive from "../../assets/img/heartActive.svg";
import profileActive from "../../assets/img/profileActive.svg";
import { useContext } from "react";
import { NavContext } from "../../context/Context";

const FooterNav = () => {
  //   const { nav, setNav } = useContext(NavContext);

  const list = document.querySelectorAll(".list");
  list.forEach((item) =>
    item.addEventListener("click", function (e) {
      list.forEach((li) => li.classList.remove("active"));
      e.currentTarget.classList.add("active");
    })
  );

  // list.forEach((item) =>
  //     item.addEventListener("click", function (e) {
  //         list.forEach((li) => li.classList.remove("clip"));
  //         e.currentTarget.classList.add("clip");
  //     })
  // );

  return (
    <footer className="footer-navBar">
      <nav className="navigation">
        <ul>
          <li className="list active">
            <NavLink to="/home">
              <span className="icon">
                <img src={homeActive} alt="home" />
              </span>
            </NavLink>
          </li>
          <li className="list">
            <NavLink to="/orderhistory">
              <span className="icon">
                <img src={orders} alt="orders" />
              </span>
            </NavLink>
          </li>
          <li className="list">
            <NavLink to="/shoppingcart">
              <span className="icon">
                <img className="cartActive" src={cartActive} alt="cart" />
              </span>
            </NavLink>
          </li>
          <li className="list">
            <NavLink to="/favorites">
              <span className="icon">
                <img src={heart} alt="heart" />
              </span>
            </NavLink>
          </li>
          <li className="list">
            <NavLink to="/profile">
              <span className="icon">
                <img src={profile} alt="profile" />
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
