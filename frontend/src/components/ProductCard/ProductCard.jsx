import "./ProductCard.css"
import emtpyHearth from "../../assets/img/heart.svg"
import fullHearth from "../../assets/img/heartActive.svg"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { favoritesContext } from "../../context/Context"

const ProductCard = ({product}) => {
  const {favorites, setFavorites} = useContext(favoritesContext)
  const isInFavArray = () => {
    if(favorites.includes(product._id)){
      return true
    }
    return false;
  }
    const [isFav, setIsFav] = useState(isInFavArray()) //muss auch an detailsseite usw. ??? dann eventuell context array??

    const toggleFavorite = () => {
      // isInFavArray ? (
      // >> lösche die ID aus favorites
      // >> axios.update
      // >> setIsFav(false)
      // )
      //ansonsten : (
      // >> füge fav zu favorites hinzu
      // >> axios.update
      // >> setIsFav(true)
      // )
    }

    
    
    return ( 
        <>
        <article className="product-article">

          {
            /*
              Wenn Favoriten oder ShoppingCart Page
              >> Füge Select hinzu
            */
          }

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

          {
            /*
              Wenn Favoriten oder ShoppingCart Page
              >> Füge - + hinzu
            */
          }

        </article>
        </>
     );
}
 
export default ProductCard;