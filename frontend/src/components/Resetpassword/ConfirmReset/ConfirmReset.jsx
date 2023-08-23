import axios from "axios";
import checkmark from "../../../assets/img/checkmark.svg";
import logo from "../../../assets/img/signinlogo.svg";
import BackBtn from "../../../components/BackBtnWelcome/BackBtn";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const ConfirmReset = ({id, token}) => {

    const nav = useNavigate();
    const [error, setError] = useState(null);
    const [togglePopup, setTogglePopup] = useState(false)

    const submit = async (e) => {
        e.preventDefault();
        setError(null);
    
        const data = new FormData(e.currentTarget);
        data.append("id", id)
        data.append("token", token)
        try {
            await axios.post("/api/users/resetPasswordConfirm", data);
            setTogglePopup(true)
            setTimeout(() => {
                setTogglePopup(false)
              nav("/signin");
            }, 1500);
            e.target.reset();
        } catch (err) {
          setError(err.response.data.message);
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
              <label htmlFor="newpassword">Password</label>
              <input
                id="newpassword"
                type="password"
                name="newpassword"
                autoComplete="new-password"
                required
              />
            <label htmlFor="confirmpassword">Confirm Password</label>
              <input
                id="confirmpassword"
                type="password"
                name="confirmpassword"
                autoComplete="new-password"
                required
              />
              {error && <small style={{ color: "red" }}>{error}</small>}
              <button>Reset your password</button>
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
          <h2>Your password has been resetted</h2>
        </article>
        </div>
         </section>:null}
        </> 
     );
}
 
export default ConfirmReset;