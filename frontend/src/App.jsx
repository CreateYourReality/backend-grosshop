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
import {loadingContext, dataContext} from "./context/Context";


function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState()

  return (
    <> 
        <loadingContext.Provider value={{ loading, setLoading }}>
          <dataContext.Provider value={{data,setData}}>
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
          </dataContext.Provider>
        </loadingContext.Provider>
    </>
  )
}

export default App
