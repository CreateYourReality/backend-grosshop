import "./Favorites.css";
import trash from "../../assets/img/trash.svg";
import FooterNav from "../../components/FooterNav/FooterNav";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import favEmpty from "../../assets/img/favEmpty.svg";
import {
  dataContext,
  favoritesContext,
  userShoppingCartContext,
} from "../../context/Context";
import { useContext, useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { UserContext } from "../../context/UserContext";
import { selectedFavsContext } from "../../context/Context";
import axios from "axios";
import SelectSort from "../../components/SelectSort/SelectSort";
import { NavLink } from "react-router-dom";
import NoFeature from "../../components/nofeature/Nofeature";

const Favorites = () => {
  const { data } = useContext(dataContext);
  const { favorites, setFavorites } = useContext(favoritesContext);
  const { userShoppingCart, setUserShoppingCart } = useContext(
    userShoppingCartContext
  );
  const { selectedFavs, setSelectedFavs } = useContext(selectedFavsContext);
  const { user } = useContext(UserContext);

  const findFavoriteById = (favID) => {
    return data.find((favoriteItem) => favoriteItem._id === favID);
  };

  const [selectAllText, setSelectAllText] = useState("SELECT ALL");

  const selectAll = () => {
    let selectAll = [];
    if (selectedFavs.length < favorites.length) {
      favorites.forEach((fav) => {
        selectAll.push(fav.id);
      });
    }
    setSelectedFavs(selectAll);
  };

  const isSelected = (id) => {
    return selectedFavs.some((fav) => fav == id);
  };

  const deleteSelectedFavs = () => {
    let updatedFavorites = [...favorites];
    selectedFavs.forEach(async (id) => {
      updatedFavorites = updatedFavorites.filter((fav) => fav.id !== id);
      try {
        await axios.put(`/api/users/deleteUserFavProducts/${user._id}`, {
          id: id,
        });
      } catch (e) {
        console.log(e);
      }
    });
    setFavorites(updatedFavorites);
    setSelectedFavs([]);
  };

  useEffect(() => {
    if (selectedFavs.length == favorites.length) {
      setSelectAllText("DESELECT ALL");
    } else {
      setSelectAllText("SELECT ALL");
    }
  }, [selectedFavs]);

  //TODO ADD SELECTED FAVS TO USER SHOPPING CART
  const addSelectedFavsToShoppingCart = () => {
    console.log("HIER KÖNNTEN IHRE FAVS STEHEN");
    //AUS SELECTED LÖSCHEN
    //AUS FAVORITEN LÖSCHEN
    //ÜBERPRÜFEN OB IN USERSHOPPINGCART VORHANDEN
    //WENN JA ERHÖHE NUR AMOUNT
    //WENN NEIN SETZE DIE FAVS IN DEN SHOPPINGCART
    selectedFavs.forEach(async (selectedFavID) => {
      const cartItemToUpdate = userShoppingCart.find(
        (cartItem) => cartItem.id === selectedFavID
      );

      if (cartItemToUpdate) {
        cartItemToUpdate.amount ==
          favorites.filter((favItem) => favItem.id === selectedFavID).amount;
      } else {
        const selectedFav = favorites.find((fav) => fav.id === selectedFavID);
        const newCartItem = { id: selectedFavID, amount: selectedFav.amount };
        selectedFav.amount = 1;
        await axios.put(
          `/api/users/updateUserProductCart/${user._id}`,
          newCartItem
        );
        setUserShoppingCart((prevShoppingCart) => [
          ...prevShoppingCart,
          newCartItem,
        ]);
      }
    });
    setSelectedFavs([]);
  };

  return (
    <>
      <HeaderNav />
      <main>
        {user ? (
          <section className="favorites-section">
            {favorites ? (
              favorites.length != 0 ? (
                <>
                  <div className="favorite-selection-btns">
                    <a onClick={selectAll}>{selectAllText}</a>
                    {
                      <SelectSort
                        setSortArray={setFavorites}
                        sortArray={favorites}
                      />
                    }
                    <a onClick={deleteSelectedFavs}>
                      <img src={trash} alt="delete" />
                    </a>
                  </div>
                  {favorites.map((fav, index) => (
                    <article key={index}>
                      {
                        <ProductCard
                          isSelected={isSelected}
                          setSelectedFavs={setSelectedFavs}
                          setFavorites={setFavorites}
                          product={findFavoriteById(fav.id)}
                          selectedFavs={selectedFavs}
                        />
                      }
                    </article>
                  ))}
                  <article className="add-to-cart-box">
                    <button
                      onClick={addSelectedFavsToShoppingCart}
                      className="add-to-cart-btn">
                      Add to Cart
                    </button>
                  </article>
                </>
              ) : (
                <article className="fav-empty">
                  <div>
                    <img src={favEmpty} alt="fav-empty" />
                  </div>
                  <NavLink to="/home">Continue Shopping</NavLink>
                </article>
              )
            ) : (
              <p>loading favorites...</p>
            )}
          </section>
        ) : (
          <NoFeature />
        )}
      </main>
      <FooterNav />
      {/* {favorites.length != 0 && <FooterNav />} Alternative */}
    </>
  );
};

export default Favorites;
