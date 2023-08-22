import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useState } from "react";
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

//Context
import {
  loadingContext,
  dataContext,
  sortContext,
  categoryContext,
  priceContext,
  favoritesContext,
  userShoppingCartContext,
} from "./context/Context";

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: Infinity });
  const [sortBy, setSortBy] = useState("abc");
  const { user } = useContext(UserContext);
  const [userShoppingCart, setUserShoppingCart] = useState([
    {
      id: "64da41a2da5607a595466d39",
      amount: 10,
    },
    {
      id: "64da415eda5607a595466d38",
      amount: 7,
    },
  ]);
  const [favorites, setFavorites] = useState(user ? user.favProducts : []);

  //console.log(user?user:"nix da");
  //console.log(user?user.favProducts:"nix da");

  /* [ //"64da41b6da5607a595466d3a","64da41d2da5607a595466d3b"
    {
      id: "64da41b6da5607a595466d3a",
      amount: 7,
    },
    {
      id: "64da41d2da5607a595466d3b",
      amount: 3,
    }, 
  ] */

  return (
    <>
      <loadingContext.Provider value={{ loading, setLoading }}>
        <dataContext.Provider value={{ data, setData }}>
          <sortContext.Provider value={{ sortBy, setSortBy }}>
            <categoryContext.Provider
              value={{ categoryFilter, setCategoryFilter }}>
              <priceContext.Provider value={{ priceFilter, setPriceFilter }}>
                <UserProvider>
                  <favoritesContext.Provider
                    value={{ favorites, setFavorites }}>
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
                            <Route
                              path="/productlist"
                              element={<ProductList />}
                            />
                            <Route
                              path="/shoppingcart"
                              element={<ShoppingCart />}
                            />
                            <Route path="/favorites" element={<Favorites />} />
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
                  </favoritesContext.Provider>
                </UserProvider>
              </priceContext.Provider>
            </categoryContext.Provider>
          </sortContext.Provider>
        </dataContext.Provider>
      </loadingContext.Provider>
    </>
  );
}

export default App;
