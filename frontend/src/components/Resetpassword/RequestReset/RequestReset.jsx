import axios from "axios";
import checkmark from "../../../assets/img/checkmark.svg";
import logo from "../../../assets/img/signInLogo.svg";
import BackBtn from "../../../components/BackBtnWelcome/BackBtn";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";


const RequestReset = () => {
    const nav = useNavigate();
    const [error, setError] = useState(null);
    const [togglePopup, setTogglePopup] = useState(false)

    const submit = async (e) => {
        e.preventDefault();
        setError(null);
    
        const data = new FormData(e.currentTarget);
        try {
          await axios.post("/api/users/resetPassword", data);
          //setUser(user.data.data)
          setTogglePopup(true)
          setTimeout(() => {
              setTogglePopup(false)
            nav("/signin");
          }, 1500);
          e.target.reset();
        } catch (err) {
          //console.log(err);
          setError("Please check your Email");
          e.target.reset();
        }
      };
    return ( 
        <>
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
              {error && <small style={{ color: "red" }}>{error}</small>}
              <button>Send reset Mail</button>
            </form>
          </div>
        </section>
        <section className="signUpLink-section">
          <article className="signUpLink-box">
            <p>Remember your Password?</p>
            <NavLink to="/signin">Sign In</NavLink>
          </article>
        </section>
      </div>
      {togglePopup?
      <section className={togglePopup ? "popup visible": "popup"}>
         <div className="welcome-contentWrapper">
         <article>
          <img src={checkmark} alt="checkmark" />
        </article>
        <article className="welcome-textBox">
          <h2>A mail to reset your password has been send!</h2>
        </article>
        </div>
         </section>:null}
        </>
     );
}
 
export default RequestReset;