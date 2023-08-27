import "./ShoppingCart.css";
import trash from "../../assets/img/trash.svg";
import FooterNav from "../../components/FooterNav/FooterNav";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import { useContext } from "react";
import { userShoppingCartContext, dataContext, favoritesContext } from "../../context/Context";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useState, useEffect } from "react";
import TotalCost from "../../components/TotalCost/TotalCost";
import SelectSort from "../../components/SelectSort/SelectSort";
import { selectedCartItemsContext } from "../../context/Context";
import { UserContext } from "../../context/UserContext";
import cartEmpty from "../../assets/img/cartEmpty.svg";
import axios from "axios";
import { NavLink } from "react-router-dom";
import NoFeature from "../../components/nofeature/Nofeature";

const ShoppingCart = () => {
  const { data } = useContext(dataContext);
  const {setFavorites} = useContext(favoritesContext)
  const { userShoppingCart, setUserShoppingCart } = useContext(
    userShoppingCartContext
  );

  const { user, refetch } = useContext(UserContext);
  

  const { selectedCartItems, setSelectedCartItems } = useContext(
    selectedCartItemsContext
  );

  const deleteSelectedShoppingItems = () => {
    let updatedShoppingItems = [...userShoppingCart];
    selectedCartItems.forEach(async (id) => {
      updatedShoppingItems = updatedShoppingItems.filter(
        (cartItem) => cartItem.id !== id
      );
      try {
        await axios.put(`/api/users/deleteUserProductCart/${user._id}`, {
          id: id,
        });
      } catch (e) {
        console.log(e);
      }
    });
    setUserShoppingCart(updatedShoppingItems);
    setSelectedCartItems([]);
  };

  const [selectAllText, setSelectAllText] = useState("SELECT ALL");

  const selectAll = () => {
    let selectAll = [];
    if (selectedCartItems.length < userShoppingCart.length) {
      userShoppingCart.forEach((cartItem) => {
        selectAll.push(cartItem.id);
      });
    }
    setSelectedCartItems(selectAll);
  };

  const isSelected = (id) => {
    return selectedCartItems.some((cartItem) => cartItem == id);
  };

  useEffect(() => {
    if (selectedCartItems.length == userShoppingCart.length) {
      setSelectAllText("DESELECT ALL");
    } else {
      setSelectAllText("SELECT ALL");
    }
  }, [selectedCartItems]);

  const findShoppingItemBy = (favID) => {
    return data.find((favoriteItem) => favoriteItem._id === favID);
  };

  // <SelectSort sortArray={userShoppingCart} setSortArray={setUserShoppingCart}/>
  // TODO PRODUKTE WERDEN NACH NAMEN SORTIERT, HABEN IM CART ABER NUR ID's

  useEffect(()=>{
    refetch()
    if (user) {
      setUserShoppingCart(user.ProductCart)
      setFavorites(user.favProducts)
    }
  },[]) 
  return (
    <>
      <HeaderNav />
      <main>
        {user ? (
          <section className="shoppingCart-section">
            {userShoppingCart ? (
              userShoppingCart.length != 0 ? (
                <>
                  <div className="favorite-selection-btns">
                    <a onClick={selectAll}>{selectAllText}</a>
                    {
                      <SelectSort
                        setSortArray={setUserShoppingCart}
                        sortArray={userShoppingCart}
                      />
                    }
                    <a onClick={deleteSelectedShoppingItems}>
                      <img src={trash} alt="delete" />
                    </a>
                  </div>
                  {userShoppingCart.map((cartItem, index) => (
                    <article key={index}>
                      {
                        <ProductCard
                          isSelected={isSelected}
                          setSelectedCartItems={setSelectedCartItems}
                          product={findShoppingItemBy(cartItem.id)}
                        />
                      }
                    </article>
                  ))}
                </>
              ) : (
                <article className="cart-empty">
                  <div>
                    <img src={cartEmpty} alt="cart-empty" />
                  </div>
                  <NavLink to="/home">Start Shopping </NavLink>
                </article>
              )
            ) : (
              <p>loading shopping items...</p>
            )}

            {userShoppingCart.length !== 0 ? (
              <section className="checkOut-section">
                <TotalCost />
              </section>
            ) : null}
          </section>
        ) : (
          <NoFeature />
        )}
      </main>
      <FooterNav />
      {/* {userShoppingCart.length !== 0 && <FooterNav />} Alternative */}
    </>
  );
};

export default ShoppingCart;
