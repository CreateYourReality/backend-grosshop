import "./Home.css";
import { Link } from "react-router-dom";

import FooterNav from "../../components/FooterNav/FooterNav";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import ProductListComponente from "../../components/ProductListComponente/ProductListComponente";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

const Home = () => {
  const { isLoggedIn, logout } = useContext(UserContext);
  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  const TEST = async () => {
    await axios.get("/api/users/secure");
  };

  console.log("User Logged in?",isLoggedIn);
    return ( 
        <>
            <HeaderNav/>
            <main>
              <section className="home-section">
              <ProductListComponente/>
                <Link to="/productlist">Productlist</Link>
                </section>
            </main>
            <FooterNav/>
        </>
     );
}
 
export default Home;
