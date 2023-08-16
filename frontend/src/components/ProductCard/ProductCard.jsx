import "./ProductCard.css"
import emtpyHearth from "../../assets/img/heart.svg"
import fullHearth from "../../assets/img/heartActive.svg"
import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import { favoritesContext } from "../../context/Context"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const ProductCard = ({product}) => {
  const {favorites, setFavorites} = useContext(favoritesContext)
  const location = useLocation()

  const isInFavArray = () => {
    return favorites.some(fav => fav.id === product._id)
  }

  const [isFav, setIsFav] = useState(false) //muss auch an detailsseite usw. ??? dann eventuell context array??
  const [favItem, setFavItem] = useState("")

  useEffect(() => {
    const foundFavItem = favorites.find(fav => fav.id === product._id);
    setFavItem(foundFavItem);
    setIsFav(isInFavArray());
  }, [favorites]);

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


    const increaseAmount = (incOrDecrement) => {
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
        <article className={`product-article ${location.pathname=="/favorites"?"product-card-favorites":null}`}>

          {
            /*
              Wenn Favoriten oder ShoppingCart Page
              >> Füge Select hinzu
            */

              location.pathname == "/favorites" ? 
              <div className="product-card-select">
                <input name="fav-select" type="checkbox" />
              </div>
               : null
          }

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

          {
            /*
              Wenn Favoriten oder ShoppingCart Page
              >> Füge - + hinzu
            */

              location.pathname == "/favorites" ? 
              <div className="product-card-amount">
                <button onClick={() => increaseAmount(-1)}>-</button>
                <p>{favItem.amount}</p>
                <button onClick={() => increaseAmount(+1)}>+</button>
              </div>
               : null
          }

        </article>


        </>

     );
}
 
export default ProductCard;