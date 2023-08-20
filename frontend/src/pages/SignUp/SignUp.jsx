import "./SignUp.css";
import { NavLink, useNavigate } from "react-router-dom";
import BackBtn from "../../components/BackBtnWelcome/BackBtn";
import { useEffect, useState } from "react";
import axios from "axios";
import PopUp from "../../components/Popup/PopUp";

export default function SignUp() {
  const [error, setError] = useState(null);
  const nav = useNavigate();
  // const [welcome, setWelcome] = useState(false);
  // const [refresh, setRefresh] = useState();
  // let welcome = false;

  // useEffect(() => {
  //   console.log(welcome);
  // }, [refresh]);

  // useEffect(() => {
  //   setWelcome((prev) => prev);
  // }, [welcome]);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    // const test = () => {
    //   setTimeout(() => {
    //   }, 2000);
    // };

    const data = new FormData(e.currentTarget);
    try {
      await axios.post("http://localhost:3001/api/users/signup", data);
      // setTimeout(() => {
      //   setWelcome(true);
      //   console.log(welcome);
      // });
      setTimeout(() => {
        nav("/welcomescreen");
        // test();
      }, 1000);
      // welcome = true;
      // setRefresh((prev) => !prev);

      // if (welcome === true) {
      //   console.log("erfolg");
      //   console.log(welcome);
      // } else {
      //   console.log("verkakt");
      //   console.log(welcome);
      // }
    } catch (e) {
      if (e?.response?.data?.error?.message) {
        setError(e?.response?.data?.error?.message);
      } else {
        setError("An Error occured, try again later");
      }
    }
  };

  return (
    <div className="signUp-wrapper">
      <section className="newAccount-section">
        <div className="newAccount-wrapper">
          <article className="backBtn-section-box">
            <BackBtn />
          </article>
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
            {error && <small style={{ color: "red" }}>{error}</small>}
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
      {/* <div className="signupContainer">
        {welcome === true ? <BackBtn /> : ""}
      </div> */}
    </div>
  );
}
