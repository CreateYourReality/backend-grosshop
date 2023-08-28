import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext, UserProvider } from "./context/UserContext";

//Pages
import SplashScreen from "./pages/SplashScreen/SplashScreen";
import WelcomeScreen from "./pages/WelcomeScreen/WelcomeScreen";
import WelcomeScreenHome from "./pages/WelcomeScreen/WelcomeScreenHome";
import Welcome from "./pages/Welcome/Welcome";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import ProductList from "./pages/ProductList/ProductList";
import DetailProduct from "./pages/DetailProduct/DetailProduct";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import Favorites from "./pages/Favorites/Favorites";
import Admin from "./pages/Admin/Admin";
import Profile from "./pages/Profile/Profile";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import Filter from "./pages/Filter/Filter";
import axios from "axios";

//Context
import {
  loadingContext,
  dataContext,
  sortContext,
  categoryContext,
  priceContext,
  favoritesContext,
  userShoppingCartContext,
  selectedFavsContext,
  selectedCartItemsContext,
  sortFavsContext,
  sortCartContext,
  searchContext,
} from "./context/Context";
import Resetpassword from "./pages/Resetpassword/Resetpassword";

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: Infinity });
  const [sortBy, setSortBy] = useState("abc");
  const { user, refetch, setUser } = useContext(UserContext);
  const [selectedFavs, setSelectedFavs] = useState([]);
  const [selectedCartItems, setSelectedCartItems] = useState([]);
  const [sortByFavs, setSortByFavs] = useState("abc")
  const [sortByCart, setSortByCart] = useState("abc")
  const [searchfield,setSearchfield] = useState("")

  const [userShoppingCart, setUserShoppingCart] = useState(
    user ? user.ProductCart : []
  );
  const [favorites, setFavorites] = useState(user ? user.favProducts : []);

   useEffect(()=>{
    refetch()
    if (user) {
      setUserShoppingCart(user.ProductCart)
      setFavorites(user.favProducts)
    }
  },[])  

  return (
    <>
      <loadingContext.Provider value={{ loading, setLoading }}>
        <dataContext.Provider value={{ data, setData }}>
          <searchContext.Provider value={{searchfield, setSearchfield}}>
          <sortContext.Provider value={{ sortBy, setSortBy }}>
          <sortFavsContext.Provider value={{ sortByFavs, setSortByFavs }}>
          <sortCartContext.Provider value={{ sortByCart, setSortByCart }}>
            <categoryContext.Provider
              value={{ categoryFilter, setCategoryFilter }}>
              <priceContext.Provider value={{ priceFilter, setPriceFilter }}>
                <UserProvider>
                  <favoritesContext.Provider
                    value={{ favorites, setFavorites }}>
                    <selectedFavsContext.Provider
                      value={{ selectedFavs, setSelectedFavs }}>
                      <selectedCartItemsContext.Provider
                        value={{ selectedCartItems, setSelectedCartItems }}>
                        <userShoppingCartContext.Provider
                          value={{ userShoppingCart, setUserShoppingCart }}>
                          <Routes>
                            {loading ? (
                              <Route path="*" element={<SplashScreen />} />
                            ) : (
                              <>
                                <Route path="/" element={<Welcome />} />
                                <Route path="/home" element={<Home />} />
                                <Route path="/signup" element={<SignUp />} />
                                <Route
                                  path="/welcomescreen"
                                  element={<WelcomeScreen />}
                                />
                                <Route
                                  path="/welcomescreenhome"
                                  element={<WelcomeScreenHome />}
                                />
                                <Route path="/signin" element={<SignIn />} />
                                <Route path="/resetpassword" element={<Resetpassword/>} />
                            <Route
                                  path="/productlist"
                                  element={<ProductList />}
                                />
                                <Route
                                  path="/shoppingcart"
                                  element={<ShoppingCart />}
                                />
                                <Route
                                  path="/favorites"
                                  element={<Favorites />}
                                />
                                <Route path="/filter" element={<Filter />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/admin" element={<Admin />} />
                                <Route
                                  path="/orderhistory"
                                  element={<OrderHistory />}
                                />
                                <Route
                                  path="/detailproduct/:id"
                                  element={<DetailProduct />}
                                />
                              </>
                            )}
                          </Routes>
                        </userShoppingCartContext.Provider>
                      </selectedCartItemsContext.Provider>
                    </selectedFavsContext.Provider>
                  </favoritesContext.Provider>
                </UserProvider>
              </priceContext.Provider>
            </categoryContext.Provider>
            </sortCartContext.Provider>
            </sortFavsContext.Provider>
          </sortContext.Provider>
          </searchContext.Provider>
        </dataContext.Provider>
      </loadingContext.Provider>
    </>
  );
}

export default App;
