import "./Home.css";

import FooterNav from "../../components/FooterNav/FooterNav";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import ProductListComponente from "../../components/ProductListComponente/ProductListComponente";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import {userShoppingCartContext, favoritesContext} from "../../context/Context"
import HomeCategory from "../../components/HomeCategory/HomeCategory";
import HomeSlider from "../../components/HomeSlider/HomeSlider";


const Home = () => {
  const { user, refetch } = useContext(UserContext);
  const {  setFavorites } = useContext(favoritesContext);
  const { setUserShoppingCart } = useContext(
    userShoppingCartContext
  );
  const { isLoggedIn, logout } = useContext(UserContext);
  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  useEffect(()=>{
    refetch()
    if (user) {
      setUserShoppingCart(user.ProductCart)
      setFavorites(user.favProducts)
    }
    console.log(user);
  },[]) 

  return (
    <>
      <HeaderNav />
      <main>
        <section className="home-section">
          <HomeSlider />
          <HomeCategory />
          <ProductListComponente />
        </section>
      </main>
      <FooterNav />
    </>
  );
};

export default Home;
