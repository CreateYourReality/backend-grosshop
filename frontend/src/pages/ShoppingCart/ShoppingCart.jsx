import "./ShoppingCart.css";
import trash from "../../assets/img/trash.svg";
import FooterNav from "../../components/FooterNav/FooterNav";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import { useContext } from "react";
import { userShoppingCartContext, dataContext } from "../../context/Context";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useState, useEffect } from "react";
import TotalCost from "../../components/TotalCost/TotalCost";

const ShoppingCart = () => {
  const { data } = useContext(dataContext);
  const { userShoppingCart, setUserShoppingCart } = useContext(
    userShoppingCartContext
  );
  const [selectedCartItems, setSelectedCartItems] = useState([]);

  const deleteSelectedShoppingItems = () => {
    let updatedShoppingItems = [...userShoppingCart];
    selectedCartItems.forEach((id) => {
      updatedShoppingItems = updatedShoppingItems.filter(
        (cartItem) => cartItem.id !== id
      );
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

  /*  useEffect(()=>{
    },[selectedCartItems]) */

  return (
    <>
      <HeaderNav />
      <main>
        <section className="shoppingCart-section">
          {userShoppingCart ? (
            userShoppingCart.length != 0 ? (
              <>
                <div className="favorite-selection-btns">
                  <a onClick={selectAll}>{selectAllText}</a>
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
              <>
                <h3>NO SHOPPINGCARTITEMS IMG</h3>
                <button>Start Shopping</button>
              </>
            )
          ) : (
            <p>loading shopping items...</p>
          )}
          <section className="checkOut-section">
            <TotalCost />
          </section>
        </section>
      </main>
      <FooterNav />
    </>
  );
};

export default ShoppingCart;
