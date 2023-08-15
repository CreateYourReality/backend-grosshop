import "./Welcome.css";
import { Link } from "react-router-dom";
import logo from "../../assets/img/Logo2.svg";

const Welcome = () => {
  return (
    <section className="welcome-section">
      <article className="logo-box">
        <img src={logo} alt="logo" />
      </article>
      <article className="welcome-content">
        <h1>Welcome to our GrosShop</h1>
        <h2>This is a grocery app for convenient home delivery</h2>
      </article>
      <article className="link-container">
        <Link to="/home">Start Demo</Link>
        <Link to="/signUp">Create New Account</Link>
        <Link to="/signIn">Sign In Your Account</Link>
      </article>
    </section>
  );
};

export default Welcome;
