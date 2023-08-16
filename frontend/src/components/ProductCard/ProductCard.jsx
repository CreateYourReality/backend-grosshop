import "./ProductCard.css"
import emtpyHearth from "../../assets/img/heart.svg"
import fullHearth from "../../assets/img/heartActive.svg"
import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import { favoritesContext, userShoppingCartContext } from "../../context/Context"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const ProductCard = ({product,increaseAmountCart}) => {
  const {favorites, setFavorites} = useContext(favoritesContext)
  const {userShoppingCart,setUserShoppingCart} = useContext(userShoppingCartContext)
  
  const location = useLocation()

  const isInFavArray = () => {
    return favorites.some(fav => fav.id === product._id)
  }

  // TODO ### favItem wird gesetzt wenn das item einmalgefunden wurde. abfragen hier starten. ###

  const [isFav, setIsFav] = useState(false) //muss auch an detailsseite usw. ??? dann eventuell context array??
  const [favItem, setFavItem] = useState("")
  const [shoppingCartItem, setShoppingCartItem] = useState("")

  useEffect(() => {
    if(location.pathname == "/favorites"){
      const foundFavItem = favorites.find(fav => fav.id === product._id);
      setFavItem(foundFavItem);
    }else if(location.pathname == "/shoppingcart"){
      const foundCartItem = userShoppingCart.find(cartItem => cartItem.id === product._id);
      setShoppingCartItem(foundCartItem)
     }
    setIsFav(isInFavArray());
  }, [
    favorites,userShoppingCart
  ]);

    const toggleFavorite = () => {
      // isInFavArray ? (
      // >> lösche die ID aus favorites (setFavorites([...favorites].remove))
      // >> axios.update
      // >> setIsFav(false)
      // )
      //ansonsten : (
      // >> füge fav zu favorites hinzu
      // >> axios.update
      // >> setIsFav(true)
      // )
    }

    console.log("ich bin "+product.productName+" und habe den state "+isFav);



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


  const handleIncreaseAmountCart = (incOrDecrement) => {
    // Rufe die übergebene Funktion auf
    increaseAmountCart(incOrDecrement, product._id);
};

    
    return ( 
        <>
        <article className={`product-article ${location.pathname=="/favorites"?
          "product-card-favorites":location.pathname=="/shoppingcart"?
            "product-card-userShoppingCart"
        :null}`}>
      { // Wenn Favoriten oder ShoppingCart Page>> Füge Select hinzu
        location.pathname == "/favorites" || location.pathname == "/shoppingcart" ? 
          <div className="product-card-select">
            <input name="fav-select" type="checkbox" />
          </div>
        : null }
          <div>
            <Link  to={"/detailproduct/"+product._id}>
              <div>
                <h3>{product.productName}</h3>
                <p>{product.price}$</p>
                <p>{product.rating}*</p>
              </div>
           </Link>
              <a href="#" onClick={toggleFavorite}>
                <img src={isFav?fullHearth:emtpyHearth} alt="hearth" />
              </a>
          </div>
      { // Wenn Favoriten oder ShoppingCart Page >> Füge - + hinzu
        location.pathname == "/favorites" || location.pathname == "/shoppingcart" ? 
          <div className="product-card-amount">
            <button onClick={() => location.pathname=="/favorites"?increaseAmountFav(-1):handleIncreaseAmountCart(-1)}>-</button>
            <p>{location.pathname == "/favorites" ? favItem.amount : shoppingCartItem.amount}</p>
            <button onClick={() => location.pathname=="/favorites"?increaseAmountFav(+1):handleIncreaseAmountCart(+1)}>+</button>
          </div>
        : null }
        </article>
      </>
     );
}
 
export default ProductCard;