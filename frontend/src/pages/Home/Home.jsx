import "./Home.css";

import FooterNav from "../../components/FooterNav/FooterNav";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import ProductListComponente from "../../components/ProductListComponente/ProductListComponente";
import { useContext, useEffect, useState } from "react";
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

  //use this state to sort deals (slides setting this)
  const [dealFilter, setDealFilter] = useState("")
  
/*   useEffect(()=>{
    refetch()
    if (user) {
      setUserShoppingCart(user.ProductCart)
      setFavorites(user.favProducts)
    }
    console.log("hi");
  },[])  */

  return (
    <>
      <HeaderNav />
      <main>
        <section className="home-section">
          <HomeSlider setDealFilter={setDealFilter}/>
          <HomeCategory />
          <ProductListComponente dealFilter={dealFilter}/>
        </section>
      </main>
      <FooterNav />
    </>
  );
};

export default Home;
