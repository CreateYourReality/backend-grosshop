import { NavLink, useNavigate } from "react-router-dom";
import "./SignIn.css";
import logo from "../../assets/img/signinlogo.svg";
import BackBtn from "../../components/BackBtnWelcome/BackBtn";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

export default function SignIn() {
  const { refetch, setUser } = useContext(UserContext);
  const nav = useNavigate();
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    const data = new FormData(e.currentTarget);
    try {
      const user = await axios.post("/api/users/login", data);
      //setUser(user.data.data)
      refetch();
      setTimeout(() => {
        nav("/home");
      }, 2000);
      e.target.reset();
    } catch (err) {
      //console.log(err);
      setError("Please check your Password and Email");
      e.target.reset();
    }
  };

  return (
    <div className="signIn-wrapper">
      <section className="existAccount-section">
        <div className="existAccount-wrapper">
          <article className="backBtn2-section-box">
            <BackBtn />
          </article>
          <article className="existAccount-logoBox">
            <img src={logo} alt="logo" />
          </article>
          <form className="signIn-form" onSubmit={submit}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="hi@gmail.com"
              required
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="************"
              required
            />
            {error && <small style={{ color: "red" }}>{error}</small>}
            <NavLink to="#">Forgot password?</NavLink>
            <button>Sign in</button>
          </form>
        </div>
      </section>
      <section className="signUpLink-section">
        <article className="signUpLink-box">
          <p>Don't Have Account ?</p>
          <NavLink to="/signup">Sign Up</NavLink>
        </article>
      </section>
    </div>
  );
}
