import "./ProductCard.css";
import { Link, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { favoritesContext, selectedFavsContext } from "../../context/Context";
import ChangeAmount from "../ChangeAmount/ChangeAmount";
import emtpyHearth from "../../assets/img/like.svg";
import fullHearth from "../../assets/img/likeActive.svg";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import star from "../../assets/img/star.svg";
import placeholderImg from "../../assets/img/testimg.svg";
//{product,setSelectedFavs,setSelectedCartItems,isSelected,test}
const ProductCard = ({ product, setSelectedCartItems, isSelected }) => {
  const { favorites, setFavorites } = useContext(favoritesContext);
  const [favItem, setFavItem] = useState(undefined);
  const { user, refetch } = useContext(UserContext);
  const { selectedFavs, setSelectedFavs } = useContext(selectedFavsContext);

  let isThisProductSelected = false;
  const productID = product._id;

  //TODO ####### AUSLAGERN ? ##############
  const location = useLocation();

  const locationIsFavorites = () => {
    const locationFavorites = "/favorites";
    return location.pathname == locationFavorites;
  };
  const locationIsDetailProduct = () => {
    const locationDetails = "/detailproduct";
    return location.pathname == locationDetails;
  };
  const locationIsShoppingCart = () => {
    const locationShoppingCart = "/shoppingcart";
    return location.pathname == locationShoppingCart;
  };
  const locationIsHome = () => {
    const locationHome = "/home";
    return location.pathname == locationHome;
  };

  //TODO #######################################

  if (locationIsFavorites() || locationIsShoppingCart()) {
    isThisProductSelected = isSelected(productID);
  }

  const removeFromFavorites = async (id) => {
    try {
      await axios.put(`/api/users/deleteUserFavProducts/${user._id}`, {
        id: id,
      });
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav.id !== id)
      );
    } catch (e) {
      //   console.error(e);
    }
  };

  const addToFavorites = async (newFavorite) => {
    try {
      await axios.put(
        `/api/users/updateUserFavProducts/${user._id}`,
        newFavorite
      );
      setFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
    } catch (e) {
      //   console.error(e);
    }
  };

  const toggleFavorite = () => {
    if (favItem != undefined && favItem.id == productID) {
      removeFromFavorites(favItem.id);
      setFavItem(undefined);
    } else {
      addToFavorites({ id: productID, amount: 1 });
    }
    refetch();
  };

  const handleCheckbox = () => {
    locationIsFavorites()
      ? handleItemSelect(setSelectedFavs)
      : handleItemSelect(setSelectedCartItems);
  };

  const handleItemSelect = (setFunction) => {
    setFunction((prev) => {
      if (prev.includes(productID)) {
        return prev.filter((id) => id !== productID);
      } else {
        return [...prev, productID];
      }
    });
  };

  useEffect(() => {
    //TODO ? FavItem nur setzen wenn noch nicht gesetzt?
    const foundFavItem = favorites.find((fav) => fav.id === productID);
    setFavItem(foundFavItem);
  }, [favorites, productID]);

  return (
    <>
      {product ? (
        <article
          className={`product-article ${
            locationIsFavorites()
              ? "product-card-favorites"
              : locationIsShoppingCart()
              ? "product-card-userShoppingCart"
              : "product-card-home"
          }`}>
          {
            // Wenn Favoriten oder ShoppingCart Page>> Füge Select hinzu
            locationIsFavorites() || locationIsShoppingCart() ? (
              <div className="product-card-select">
                <input
                  checked={isThisProductSelected}
                  className="custom-checkbox"
                  name="fav-select"
                  type="checkbox"
                  onChange={handleCheckbox}
                />
              </div>
            ) : null
          }
          <div
            className={`productCard-wrapper ${
              location.pathname == "/home" ||
              location.pathname == "/productlist"
                ? "productCard-wrapper-home"
                : "productCard-wrapper-cartFavorite"
            }`}>
            <div className="wrappwrapp">
              <Link to={"/detailproduct/" + productID}>
              <div className="product-img-wrapper">
            <img className="product-img" src={product.image.url} alt="placeholderImg" />
            </div>
            </Link>

            {location.pathname === "/home"?
                        <a className="fav-a" onClick={toggleFavorite}>
                        <img
                          src={favItem != undefined ? fullHearth : emtpyHearth}
                          alt="hearth"
                          />
                      </a>:null}

                </div>
            <div className="product-card-details">
            <Link to={"/detailproduct/" + productID}>

                <h3>{product.productName}</h3>
                </Link>
                <article className="product-rating">
                  {location.pathname == "/home" ? <><p className={product.isDeal || product.isMemberDeal?"underline":null}>${product.price}</p>{product.isDeal?<p>${product.reducedDealPrice.toFixed(2)}</p>:product.isMemberDeal?<p>${product.reducedMemberPrice.toFixed(2)}</p>:null}</> : ""}

                  <div>
                    <img src={star} alt="star" />
                    <p>{product.rating}</p>
                  </div>
                </article>

              <article
                className={`product-favor ${
                  location.pathname == "/home" ? "product-favor-home" : ""
                }`}>
                {location.pathname != "/home" ? <><p className={product.isDeal || product.isMemberDeal?"underline":null}>${product.price}</p>{product.isDeal?<p>${product.reducedDealPrice.toFixed(2)}</p>:product.isMemberDeal?<p>${product.reducedMemberPrice.toFixed(2)}</p>:null}</> : ""}
                {location.pathname !== "/home"?
                        <a className="fav-a" onClick={toggleFavorite}>
                        <img
                          src={favItem != undefined ? fullHearth : emtpyHearth}
                          alt="hearth"
                          />
                      </a>:null}
              </article>
            </div>
            <ChangeAmount
              favItem={favItem}
              product={product}
              setFavorites={setFavorites}
              />
          </div>
        </article>
      ) : null}
    </>
  );
};

export default ProductCard;
