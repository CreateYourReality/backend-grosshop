import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';

//Pages
import SplashScreen from './pages/SplashScreen/SpashScreen';
import Welcome from './pages/Welcome/Welcome';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';
import ProductList from "./pages/ProductList/ProductList";
import DetailProduct from './pages/DetailProduct/DetailProduct';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart';
import Favorites from './pages/Favorites/Favorites';
import Admin from './pages/Admin/Admin';
import Profile from './pages/Profile/Profile';
import OrderHistory from './pages/OrderHistory/OrderHistory';

//Context
import {loadingContext, dataContext, categoryContext, priceContext, favoritesContext} from "./context/Context";


function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState()
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [priceFilter, setPriceFilter] = useState({min:0,max:Infinity})
  const [favorites, setFavorites] = useState([ //"64da41b6da5607a595466d3a","64da41d2da5607a595466d3b"
    {
      id:"64da41b6da5607a595466d3a",
      amount:7
    },
    {
      id:"64da41d2da5607a595466d3b",
      amount:3
    } 
  ])

  return (
    <> 
        <loadingContext.Provider value={{ loading, setLoading }}>
          <dataContext.Provider value={{data,setData}}>
            <categoryContext.Provider value={{categoryFilter,setCategoryFilter}}>
            <priceContext.Provider value={{priceFilter,setPriceFilter}}>
            <favoritesContext.Provider value={{favorites,setFavorites}}>
            <BrowserRouter>
              <Routes>
              {loading ? <Route path='*' element={<SplashScreen />}/> : (
                <>
                  <Route path='/' element={<Welcome />}/>
                  <Route path="/home" element={<Home/>}/>
                  <Route path="/signup" element={<SignUp/>}/>
                  <Route path="/productlist" element={<ProductList/>}/>
                  <Route path="/shoppingcart" element={<ShoppingCart/>}/>
                  <Route path="/favorites" element={<Favorites/>}/>

                  <Route path="/profile" element={<Profile/>}/>
                  <Route path="/admin" element={<Admin/>}/>
                  <Route path="/orderhistory" element={<OrderHistory/>}/>

                  <Route path="/detailproduct/:id" element={<DetailProduct/>}/>
                </>
              )}
              </Routes>
            </BrowserRouter>
            </favoritesContext.Provider>
            </priceContext.Provider>
            </categoryContext.Provider>
          </dataContext.Provider>
        </loadingContext.Provider>
    </>
  )
}

export default App
