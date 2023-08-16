import { NavLink } from "react-router-dom";
import "./SignIn.css";
import logo from "../../assets/img/signinlogo.svg";
import BackBtn from "../../components/BackBtn/BackBtn";

const SignIn = () => {
  const submit = async (e) => {};

  return (
    <div className="signIn-wrapper">
      <section className="existAccount-section">
        <div className="existAccount-wrapper">
          <BackBtn />
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
};

export default SignIn;
