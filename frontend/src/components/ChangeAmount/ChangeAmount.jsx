import "./ChangeAmount.css";
import { useContext, useState } from "react";
import { userShoppingCartContext } from "../../context/Context";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import shoppingCart from "../../assets/img/shopping-cart-small.svg";

import minus from "../../assets/img/minus.png"
import plus from "../../assets/img/plus.png"

const ChangeAmount = ({ product, setFavorites, favItem }) => {
  const { userShoppingCart, setUserShoppingCart } = useContext(
    userShoppingCartContext
  );
  const [shoppingCartItem, setShoppingCartItem] = useState(undefined);
  const [tempShoppingCartItem, setTempShoppingCartItem] = useState(undefined);
  const [updateTotal, setUpdateTotal] = useState(false); //toogle refresher
  const [stop, setStop] = useState(false);
  const { user, refetch } = useContext(UserContext);
  const findShoppingItemBy = (prodID) => {
    return userShoppingCart.find((cartItem) => cartItem._id === prodID);
  };

  const location = useLocation();
  const detailProduct = "/" + location.pathname.split("/")[1]; //useParams id

  useEffect(() => {
    if (
      location.pathname == "/shoppingcart" ||
      detailProduct == "/detailproduct"
    ) {
      const foundCartItem = userShoppingCart.find(
        (cartItem) => cartItem.id === product._id
      );
      setShoppingCartItem(foundCartItem);
    }
  }, [userShoppingCart]);

  const updateProductCart = async (id, amount) => {
    await axios.put(`/api/users/updateUserProductCart/${user._id}`, {
      id: id,
      amount: amount,
    });
  };

  const updateFavs = async (id, amount) => {
    await axios.put(`/api/users/updateUserFavProducts/${user._id}`, {
      id: id,
      amount: amount,
    });
  };

  //TODO add +1 -1
  const increaseAmountCart = (incOrDecrement) => {
    setUserShoppingCart((prevCartItem) => {
      return prevCartItem.map((cartItem) => {
        if (cartItem.id === product._id) {
          //axios
          const updateCount =
            cartItem.amount + incOrDecrement <= 0
              ? 1
              : cartItem.amount + incOrDecrement;
          updateProductCart(cartItem.id, updateCount);
          return {
            ...cartItem,
            amount: updateCount,
          };
        }
        return cartItem;
      });
    });
    increaseTempAmountCart(incOrDecrement);
    setUpdateTotal((prev) => !prev);
  };

  const increaseTempAmountCart = (incOrDecrement) => {
    setTempShoppingCartItem((prevCartItem) => {
      if (prevCartItem.id === product._id) {
        return {
          ...prevCartItem,
          amount:
            prevCartItem.amount + incOrDecrement <= 0
              ? 1
              : prevCartItem.amount + incOrDecrement,
        };
      }
      return prevCartItem;
    });
    setUpdateTotal((prev) => !prev);
    refetch();
  };

  const increaseAmountFav = (incOrDecrement) => {
    favItem.amount =
      favItem.amount + incOrDecrement <= 0
        ? 1
        : favItem.amount + incOrDecrement;

    setFavorites((prevFavorites) => {
      return prevFavorites.map((fav) => {
        if (fav.id === product._id) {
          //axios

          const updateCount = favItem.amount;
          //updateFavs(fav.id, updateCount);
          return {
            ...fav,
            amount: updateCount,
          };
        }
        return fav;
      });
    });
    setUpdateTotal((prev) => !prev);
  };

  const getTempShoppingCartItem = () => {
    if (tempShoppingCartItem == undefined) {
      const amount = 1;
      setTempShoppingCartItem({ id: product._id, amount: amount });
      setStop(false);
    }
  };

  useEffect(() => {
    getTempShoppingCartItem();
    if (
      location.pathname == "/shoppingcart" ||
      detailProduct == "/detailproduct"
    ) {
      if (
        shoppingCartItem != undefined &&
        tempShoppingCartItem.amount != shoppingCartItem.amount &&
        stop == false
      ) {
        setTempShoppingCartItem({
          id: product._id,
          amount: shoppingCartItem.amount,
        }); //TODO
        setStop(true);
      }
    }
  }, [tempShoppingCartItem]);

  useEffect(() => {
    refetch();
    const foundCartItem = user?.ProductCart.find(
      (cartItem) => cartItem.id === product._id
    );
    if (foundCartItem) {
      setShoppingCartItem(foundCartItem);

      // keine ahnung warum +1 need maybe fix
      setTempShoppingCartItem({
        id: product._id,
        amount: foundCartItem?.amount + 1,
      });
    } else {
      setTempShoppingCartItem({
        id: product._id,
        amount: 1,
      });
    }
  }, []);

  //TODO added gerade n neues obj

  const updateCart = async () => {
    const obj = {
      id: tempShoppingCartItem.id,
      amount: tempShoppingCartItem.amount,
    };
    try {
      await axios.put(`/api/users/updateUserProductCart/${user._id}`, obj);
      setUserShoppingCart((prevShoppingCart) => {
        const updatedCart = prevShoppingCart.map((item) => {
          if (item.id === obj.id) {
            return { ...item, amount: obj.amount };
          }
          return item;
        });
        return [...updatedCart];
      });
      refetch();
    } catch (e) {
      // Fehlerbehandlung hier
      console.error(e);
    }
  };

  const putInCart = async () => {
    const obj = {
      id: tempShoppingCartItem.id,
      amount: tempShoppingCartItem.amount,
    };
    try {
      await axios.put(`/api/users/updateUserProductCart/${user._id}`, obj);
      refetch();
    } catch (e) {
      //   console.error(e);
    }
    setUserShoppingCart((prevShoppingCart) => [...prevShoppingCart, obj]);
    
  };
  return (
    <>
      {detailProduct == "/detailproduct" ? <h2>Quantity</h2> : null}

      {
        // Wenn Favoriten oder ShoppingCart Page >> Füge - + hinzu
        location.pathname == "/favorites" ||
        location.pathname == "/shoppingcart" ||
        detailProduct == "/detailproduct" ? (
          <div
            className={`product-card-amount ${
              detailProduct == "/detailproduct"
                ? "detail-amount"
                : "cart-favorite-amount"
            }`}>
            <button
              className={detailProduct == "/detailproduct" ? "detail-btn" : "other-btn"}
              onClick={() =>
                location.pathname == "/favorites"
                  ? increaseAmountFav(-1)
                  : !shoppingCartItem
                  ? increaseTempAmountCart(-1)
                  : detailProduct == "/detailproduct"
                  ? increaseTempAmountCart(-1)
                  : increaseAmountCart(-1)
              }>-</button>
            <p>
              {location.pathname == "/favorites" ? (
                favItem ? (
                  favItem.amount
                ) : null
              ) : tempShoppingCartItem ? (
                detailProduct == "/detailproduct" ? ( //TODO * weight
                  <>
                    {(tempShoppingCartItem.amount * product.weight).toFixed(1)}
                    {detailProduct == "/detailproduct"
                      ? "KG"
                      : location.pathname == "/favorites"
                      ? ""
                      : ""}
                    <span>{"$" + tempShoppingCartItem.amount}</span>
                  </>
                ) : (
                  tempShoppingCartItem.amount
                )
              ) : (
                0
              )}
            </p>
            <button
              className={detailProduct == "/detailproduct" ? "detail-btn" : "other-btn"}
              onClick={() =>
                location.pathname == "/favorites"
                  ? increaseAmountFav(+1)
                  : !shoppingCartItem
                  ? increaseTempAmountCart(+1)
                  : detailProduct == "/detailproduct"
                  ? increaseTempAmountCart(+1)
                  : increaseAmountCart(+1)
              }>+</button>
          </div>
        ) : null
      }

        {detailProduct == "/detailproduct" && tempShoppingCartItem ? (
      <div>
          <div className="cart-icon-container">
            <img
              src={shoppingCart}
              alt="shopping-cart-small"
              className="cart-icon"
            />
            <div className="cart-item-count">
              <p>{shoppingCartItem?shoppingCartItem.amount:tempShoppingCartItem.amount}</p>
            </div>
          </div>
      </div>
        ) : (
          ""
        )}

        {detailProduct == "/detailproduct" ? (
          shoppingCartItem ? (
            <div>
            <button className="updateOrPutInCart-btn" onClick={updateCart}>
              UPDATE CART
            </button></div>
          ) : (
            <div>
            <button className="updateOrPutInCart-btn" onClick={putInCart}>
              PUT IN CART
            </button></div>
          )
        ) : null}
    </>
  );
};

export default ChangeAmount;
