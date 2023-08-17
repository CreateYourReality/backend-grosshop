import "./ChangeAmount.css"
import { useContext, useState } from "react"
import { favoritesContext, userShoppingCartContext } from "../../context/Context"
import { useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import { dataContext } from "../../context/Context"

const ChangeAmount = ({product,setFavorites,favItem}) => {
    const {userShoppingCart,setUserShoppingCart} = useContext(userShoppingCartContext)
    const [shoppingCartItem, setShoppingCartItem] = useState("")

    const findShoppingItemBy = (prodID) => {
        return userShoppingCart.find(cartItem => cartItem._id === prodID);
    };

    const location = useLocation()
    const detailProduct = "/" + location.pathname.split('/')[1]; //useParams id

    useEffect(()=> {
      if(location.pathname == "/shoppingcart" || detailProduct == "/detailproduct"){
        const foundCartItem = userShoppingCart.find(cartItem => cartItem.id === product._id);
        setShoppingCartItem(foundCartItem)
      }
    },userShoppingCart)


    const increaseAmountCart = (incOrDecrement) => {
        setUserShoppingCart(prevCartItem => {
            return prevCartItem.map(cartItem => {
                if (cartItem.id === product._id) {
                    return { ...cartItem, amount: cartItem.amount + incOrDecrement <= 0 ? 1 : cartItem.amount + incOrDecrement  };
                }
                return cartItem;
            });
        });
      }

      const increaseAmountFav = (incOrDecrement) => {
        setFavorites(prevFavorites => {
            return prevFavorites.map(fav => {
                if (fav.id === product._id) {
                    return { ...fav, amount: fav.amount + incOrDecrement <= 0 ? 1 : fav.amount + incOrDecrement  };
                }
                return fav;
            });
        });
    };

    return (
        <>
                  { // Wenn Favoriten oder ShoppingCart Page >> Füge - + hinzu
        location.pathname == "/favorites" || location.pathname == "/shoppingcart" || detailProduct == "/detailproduct" ? 
          <div className="product-card-amount">
            <button onClick={() => location.pathname=="/favorites"?increaseAmountFav(-1):increaseAmountCart(-1)}>-</button>
            <p>{
                location.pathname=="/favorites"?
                    favItem?favItem.amount:null 
                :shoppingCartItem?shoppingCartItem.amount:null}</p>
            <button onClick={() => location.pathname=="/favorites"?increaseAmountFav(+1):increaseAmountCart(+1)}>+</button>
          </div>
        : null}




        </>
    );
}

export default ChangeAmount;