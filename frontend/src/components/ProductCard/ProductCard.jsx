import "./ProductCard.css"
import { Link, useLocation } from "react-router-dom"
import { useState, useContext,useEffect } from "react"
import { favoritesContext } from "../../context/Context"
import ChangeAmount from "../ChangeAmount/ChangeAmount"
import emtpyHearth from "../../assets/img/heart.svg"
import fullHearth from "../../assets/img/heartActive.svg"
import axios from "axios"
import { UserContext } from "../../context/UserContext"

const ProductCard = ({product,setSelectedFavs,setSelectedCartItems,isSelected}) => {
  const {favorites, setFavorites} = useContext(favoritesContext)
  const [favItem, setFavItem] = useState(undefined)
  const {user} = useContext(UserContext)

  let isThisProductSelected = false;
  const productID = product._id;

  //TODO ####### AUSLAGERN ? ##############
  const location = useLocation()

  const locationIsFavorites = () => {
    const locationFavorites = "/favorites"
    return location.pathname == locationFavorites;
  }
  const locationIsDetailProduct = () => {
    const locationDetails = "/detailproduct"
    return location.pathname == locationDetails;
  }
  const locationIsShoppingCart = () => {
    const locationShoppingCart = "/shoppingcart"
    return location.pathname == locationShoppingCart;
  }
//TODO #######################################

  if(locationIsFavorites() || locationIsShoppingCart()){
    isThisProductSelected = isSelected(productID)
  }

  const removeFromFavorites = async (idToRemove) => {
    try{
      await axios.delete(`/api/users/deleteUserFavProducts/${user._id}`, idToRemove )
      setFavorites(prevFavorites => prevFavorites.filter(fav => fav.id !== idToRemove));
    }catch(e){
   //   console.error(e);
    }
  }

  const addToFavorites = async (newFavorite) => {
    try{
      await axios.put(`/api/users/updateUserFavProducts/${user._id}`, newFavorite )
          setFavorites(prevFavorites => [...prevFavorites, newFavorite]);
    }catch(e){
          //   console.error(e);
    }
  }

  const toggleFavorite = () => {
    if(favItem != undefined && favItem.id == productID) {
      removeFromFavorites(favItem.id)
      setFavItem(undefined)
    }else{
      addToFavorites({id:productID,amount:1})
    }
  }

  const handleCheckbox = () => {
    locationIsFavorites()? handleItemSelect(setSelectedFavs) : handleItemSelect(setSelectedCartItems)
  }

  const handleItemSelect = (setFunction) => {
    setFunction(prev => {
      if (prev.includes(productID)) {
          return prev.filter(id => id !== productID);
      } else {
          return [...prev, productID];
      }
    })
  }

  useEffect(() => { //TODO ? FavItem nur setzen wenn noch nicht gesetzt?
      const foundFavItem = favorites.find(fav => fav.id === productID);
      setFavItem(foundFavItem);
  }, [favorites,favItem,productID]);


  return ( 
    <>
      {product?
      <article className={`product-article ${locationIsFavorites()?"product-card-favorites"
      :locationIsShoppingCart()?"product-card-userShoppingCart" : ""}`}>
      { // Wenn Favoriten oder ShoppingCart Page>> Füge Select hinzu
      locationIsFavorites() || locationIsShoppingCart() ? 
        <div className="product-card-select">
          <input checked={isThisProductSelected} name="fav-select" type="checkbox" onChange={handleCheckbox}/>
        </div>
      : null }
        <div>
          <Link to={"/detailproduct/"+productID}>
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