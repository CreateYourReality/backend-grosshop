import "./SignUp.css";
import { NavLink } from "react-router-dom";
import PopUp from "../../components/Popup/PopUp";
import BackBtn from "../../components/BackBtn/BackBtn";

const SignUp = () => {
  const submit = async (e) => {};

  return (
    <div className="signUp-wrapper">
      <section className="newAccount-section">
        <div className="newAccount-wrapper">
          <BackBtn />
          <article className="newAccount-textBox">
            <h1>Create New Account</h1>
            <h2>Enter Your details to create account</h2>
          </article>
          <form className="signUp-form" onSubmit={submit}>
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
            <button>Sign up</button>
          </form>
        </div>
      </section>
      <section className="signInLink-section">
        <article className="signInLink-box">
          <p>Already Have Account ?</p>
          <NavLink to="/signin">Sign In</NavLink>
        </article>
      </section>
    </div>
  );
};

export default SignUp;
