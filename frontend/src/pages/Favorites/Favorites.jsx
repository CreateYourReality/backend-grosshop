import "./Favorites.css";
import trash from "../../assets/img/trash.svg";
import FooterNav from "../../components/FooterNav/FooterNav";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import {
  dataContext,
  favoritesContext,
  userShoppingCartContext,
} from "../../context/Context";
import { useContext, useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";

const Favorites = () => {
  const { data } = useContext(dataContext);
  const { favorites, setFavorites } = useContext(favoritesContext);
  const { userShoppingCart, setUserShoppingCart } = useContext(
    userShoppingCartContext
  );
  const [selectedFavs, setSelectedFavs] = useState([]);

  const findFavoriteById = (favID) => {
    return data.find((favoriteItem) => favoriteItem._id === favID);
  };

  const deleteSelectedFavs = () => {
    let updatedFavorites = [...favorites];
    selectedFavs.forEach((id) => {
      updatedFavorites = updatedFavorites.filter((fav) => fav.id !== id);
    });
    setFavorites(updatedFavorites);
    setSelectedFavs([]);
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
  };

  return (
    <>
      <HeaderNav />
      <main>
        <section className="favorites-section">
          {favorites ? (
            favorites.length != 0 ? (
              <>
                <div className="favorite-selection-btns">
                  <a onClick={selectAll}>{selectAllText}</a>
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
                      />
                    }
                  </article>
                ))}
                <article className="add-to-cart-box">
                  <button
                    onClick={addSelectedFavsToShoppingCart}
                    className="add-to-cart-btn">
                    ADD TO CART
                  </button>
                </article>
              </>
            ) : (
              <>
                <h3>NO FAVORITES IMG</h3>
                <button>Continue Shopping</button>
              </>
            )
          ) : (
            <p>loading favorites...</p>
          )}
        </section>
      </main>
      <FooterNav />
    </>
  );
};

export default Favorites;
