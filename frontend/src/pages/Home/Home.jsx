import "./Home.css";

import FooterNav from "../../components/FooterNav/FooterNav";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import ProductListComponente from "../../components/ProductListComponente/ProductListComponente";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import HomeCategory from "../../components/HomeCategory/HomeCategory";
import HomeSlider from "../../components/HomeSlider/HomeSlider";

const Home = () => {
  const { isLoggedIn, logout } = useContext(UserContext);
  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }


  console.log("User Logged in?",isLoggedIn);
    return ( 
        <>
            <HeaderNav/>
            <main>
              <section className="home-section">
                <HomeSlider/>
                <HomeCategory/>
                <ProductListComponente/>
              </section>
            </main>
            <FooterNav/>
        </>
     );
}
 
export default Home;
