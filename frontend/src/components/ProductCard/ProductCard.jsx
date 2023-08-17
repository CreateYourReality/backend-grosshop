import "./ProductCard.css"
import { Link, useLocation } from "react-router-dom"
import { useState, useContext,useEffect } from "react"
import { favoritesContext } from "../../context/Context"
import ChangeAmount from "../ChangeAmount/ChangeAmount"
import emtpyHearth from "../../assets/img/heart.svg"
import fullHearth from "../../assets/img/heartActive.svg"

const ProductCard = ({product,setSelectedFavs,setSelectedCartItems}) => {
  const {favorites, setFavorites} = useContext(favoritesContext)
  const [favItem, setFavItem] = useState(undefined)

  const location = useLocation()

  const removeFromFavorites = (idToRemove) => {
    //TODO AXIOS, setFavorites nur wenn erfolgreich
    setFavorites(prevFavorites => prevFavorites.filter(fav => fav.id !== idToRemove));
  }

  const addToFavorites = (newFavorite) => {
    //TODO AXIOS, setFavorites nur wenn erfolgreich
    setFavorites(prevFavorites => [...prevFavorites, newFavorite]);
  }

  const toggleFavorite = () => {
    if(favItem != undefined && favItem.id == product._id) {
      removeFromFavorites(favItem.id)
      setFavItem(undefined)
    }else{
      addToFavorites({id:product._id,amount:1})
    }
  }

  const handleFavItemSelect = () => {
    setSelectedFavs(prev => {
        if (prev.includes(product._id)) {
            return prev.filter(id => id !== product._id);
        } else {
            return [...prev, product._id];
        }
    });
};

  const handleCartItemSelect = () => {
      setSelectedCartItems(prev => {
          if (prev.includes(product._id)) {
              return prev.filter(id => id !== product._id);
          } else {
              return [...prev, product._id];
          }
      });
  };

  useEffect(() => { //TODO ? FavItem nur setzen wenn noch nicht gesetzt?
      const foundFavItem = favorites.find(fav => fav.id === product._id);
      setFavItem(foundFavItem);
  }, [favorites,favItem,product._id]);

  return ( 
    <>
      {product?
      <article className={`product-article ${location.pathname=="/favorites"?
      "product-card-favorites":location.pathname=="/shoppingcart"?
      "product-card-userShoppingCart" : ""}`}>
      { // Wenn Favoriten oder ShoppingCart Page>> Füge Select hinzu
      location.pathname == "/favorites" || location.pathname == "/shoppingcart" ? 
        <div className="product-card-select">
          <input name="fav-select" type="checkbox" onChange={location.pathname == "/favorites"? handleFavItemSelect : handleCartItemSelect}/>
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
          <ChangeAmount favItem={favItem} product={product} setFavorites={setFavorites}/>  
      </article> : null}
    </>
  );
}
 
export default ProductCard;