import { useContext } from "react";
import "./TotalCost.css";
import { dataContext, userShoppingCartContext } from "../../context/Context";

const TotalCost = () => {
  const { userShoppingCart } = useContext(userShoppingCartContext);
  const { data } = useContext(dataContext);

  const updateTotalCost = () => {
    return userShoppingCart.reduce((total, cartItem) => {
      const newProduct = data.find((prod) => prod._id === cartItem.id);
      const itemTotal = newProduct.price * cartItem.amount;
      return total + itemTotal;
    }, 0);
  };

  //TODO CHECKOUT
  const checkoutCartItems = () => {
    console.log("CHECKOUT CART ITEMS");
  };

  return (
    <section className="totalCost-section">
      <button onClick={checkoutCartItems}>
        CHECKOUT - Total ${updateTotalCost()}
      </button>
    </section>
  );
};

export default TotalCost;
