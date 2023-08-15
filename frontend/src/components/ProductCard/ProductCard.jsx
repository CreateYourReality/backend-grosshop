import "./ProductCard.css"
import emtpyHearth from "../../assets/img/heart.svg"
import fullHearth from "../../assets/img/heartActive.svg"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { favoritesContext } from "../../context/Context"

const ProductCard = ({product}) => {
    const [isFav, setIsFav] = useState(false) //muss auch an detailsseite usw. ??? dann eventuell context array??
    const {favorites, setFavorites} = useContext(favoritesContext)

    const toggleFavorite = () => {
      // isInFavArray ? (
      // >> lösche die ID aus favorites
      // >> setIsFav(false)
      // )
      //ansonsten : (
      // >> füge fav zu favorites hinzu
      // >> setIsFav(true)
      // )
    }

    const isInFavArray = () => {
      // wenn productId in favorites vorkommt
      // return true
      // ansonsten
      // return false
    }


    const setStartToggle = () => {
      console.log("ich starte einmalig pro card, right?");
      //wenn productID in favorites vorkommt
      //setze State auf True
      //ansonsten
      //setze State auf False
    }

    setStartToggle();

    useEffect(() => {
    },[isFav])
 
    return ( 
        <>
        <article className="product-article">
          <Link  to={"/detailproduct/"+product._id}>
            <div>
              <h3>{product.productName}</h3>
              <p>{product.price}$</p>
              <p>{product.rating}*</p>
            </div>
          </Link>
            <a href="#" onClick={toggleFavorite()}>
              <img src={isFav?fullHearth:emtpyHearth} alt="hearth" />
            </a>
        </article>
        </>
     );
}
 
export default ProductCard;