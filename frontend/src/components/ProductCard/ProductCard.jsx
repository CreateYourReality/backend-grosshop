import "./ProductCard.css"
import emtpyHearth from "../../assets/img/heart.svg"
import fullHearth from "../../assets/img/heartActive.svg"
import { Link } from "react-router-dom"
import { useState, useContext,useEffect } from "react"
import { favoritesContext } from "../../context/Context"

import ChangeAmount from "../ChangeAmount/ChangeAmount"

const ProductCard = ({product}) => {
  const {favorites, setFavorites} = useContext(favoritesContext)
  const [favItem, setFavItem] = useState(undefined)

  const isInFavArray = () => {
    return favorites.some(fav => fav.id === product._id)
  }

  // TODO ### favItem wird gesetzt wenn das item einmalgefunden wurde. abfragen hier starten. ###


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

    useEffect(() => {
      if(location.pathname == "/favorites"){
        const foundFavItem = favorites.find(fav => fav.id === product._id);
        setFavItem(foundFavItem);
      }
    }, [favorites]);

    //console.log("ich bin "+product.productName+" und habe den state "+isFav); // TODO FALSCHER PREV AM ANFANG


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
            <Link to={"/detailproduct/"+product._id}>
              <div>
                <h3>{product.productName}</h3>
                <p>{product.price}$</p>
                <p>{product.rating}*</p>
              </div>
           </Link>
              <a href="#" onClick={toggleFavorite}>
                <img src={favItem!=undefined?fullHearth:emtpyHearth} alt="hearth" />
              </a>
          </div>

          <ChangeAmount product={product} setFavorites={setFavorites}/>

        </article>
      </>
     );
}
 
export default ProductCard;