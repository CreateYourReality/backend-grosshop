import { useContext } from "react";
import logo from "../../assets/img/signInLogo.svg"
import { UserContext } from "../../context/UserContext";
import { NavLink } from "react-router-dom";

const NoFeature = () => {
    const {user} = useContext(UserContext)
    return ( 
        
        <section className={!user ? "popup visible": "popup"}>
        <div className="welcome-contentWrapper">
        <article className="existAccount-logoBox logo-reSize">
            <img src={logo} alt="logo" />
          </article>
       <article className="welcome-textBox">
         <h2>To use this feature sign in <NavLink className="nofeatureLink" to="/signin">here</NavLink> or go <NavLink className="nofeatureLink" to="/home">home</NavLink></h2>
       </article>
       </div>
        </section>
        
     );
}
 
export default NoFeature;