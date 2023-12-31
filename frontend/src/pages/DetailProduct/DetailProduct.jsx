import { useContext } from "react";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import "./DetailProduct.css";
import { dataContext, userShoppingCartContext } from "../../context/Context";
import { useLocation } from "react-router-dom";
import FooterNav from "../../components/FooterNav/FooterNav";
import { UserContext } from "../../context/UserContext";
import { favoritesContext } from "../../context/Context";
import { useState } from "react";
import { useEffect } from "react";
import ChangeAmount from "../../components/ChangeAmount/ChangeAmount";
import emtpyHearth from "../../assets/img/like.svg";
import fullHearth from "../../assets/img/likeActive.svg";
import axios from "axios";
import star from "../../assets/img/star.svg";

const DetailProduct = () => {
  const { data } = useContext(dataContext);
  const location = useLocation();
  const pathProductID = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const { setUserShoppingCart } = useContext(
    userShoppingCartContext
  );

  // TODO DRY AUSLAGERN?????
  const { favorites, setFavorites } = useContext(favoritesContext);
  const [favItem, setFavItem] = useState(undefined);
  const { user, refetch } = useContext(UserContext);

  let isThisProductSelected = false;
  const productID = pathProductID;

  const removeFromFavorites = async (id) => {
    try {
      await axios.put(`/api/users/deleteUserFavProducts/${user._id}`, {
        id: id,
      });
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav.id !== id)
      );
    } catch (e) {
      console.error(e);
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
      console.error(e);
    }
  };

  const toggleFavorite = () => {
    if (favItem != undefined && favItem.id == productID) {
      removeFromFavorites(favItem.id);
      setFavItem(undefined);
    } else {
      addToFavorites({ id: productID, amount: 1 });
    }
  };

  useEffect(() => {
    //TODO ? FavItem nur setzen wenn noch nicht gesetzt?
    const foundFavItem = favorites.find((fav) => fav.id === productID);
    setFavItem(foundFavItem);
  }, [favorites, favItem, productID]);

  //TODO ###################

  const findProductById = () => {
    return data.find((product) => product._id === pathProductID);
  };
  //TODO WEIGHT!!!!!!!!

  useEffect(()=>{
    refetch()
    if (user) {
      setUserShoppingCart(user.ProductCart)
    }
  },[]) 
  const product = findProductById();
  return (
    <>
      <main>
        <HeaderNav />
        <section className="detailProduct-section">
          {product ? (
            <>
              <div className="detailProduct-image product-detail-fav-wrap">
                <img src={product.image.url} alt="" />
                <a className="product-detail-fav" onClick={toggleFavorite}>
            <img className={favItem != undefined ? "" : "empty"}
              src={favItem != undefined ? fullHearth : emtpyHearth}
              alt="hearth"
            />
          </a>
              </div>
              <p className="detailProduct-weight">{product.weight}kg</p>
              <p className="detailProduct-price">${product.price}</p>
              <p className="detailProduct-name">{product.productName}</p>
              <p className="detailProduct-rating">
                <img src={star} alt="star" />
                {product.rating}
              </p>
              <div className="detailProduct-div">
                <ChangeAmount product={product} />
              </div>
            </>
          ) : null}

        </section>
        <FooterNav />
      </main>
    </>
  );
};

export default DetailProduct;
