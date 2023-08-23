import { useContext, useEffect } from "react";
import "./TotalCost.css";
import { dataContext, userShoppingCartContext, selectedCartItemsContext } from "../../context/Context";

const TotalCost = () => {
    const {userShoppingCart} = useContext(userShoppingCartContext)
    const {selectedCartItems, setSelectedCartItems} = useContext(selectedCartItemsContext)
    const {data} = useContext(dataContext)

    const updateTotalCost = () => {
        return userShoppingCart.reduce((total, cartItem) => {
            const newProduct = data.find(prod => prod._id === cartItem.id);
            const itemTotal = newProduct.price * cartItem.amount;
            return total + itemTotal;
        }, 0);
    }

    const updateSelectedCost = () => {
      return selectedCartItems.reduce((total, cartItem) => {
          const cartProduct = data.find(prod => prod._id == cartItem);
          console.log(cartProduct);
          if (cartProduct) {
              const cartAmount = userShoppingCart.find(cartItem => cartItem._id == cartProduct._id).amount;
              console.log();
              const itemTotal = cartProduct.price * cartAmount
              return total + itemTotal;
          } else {
              return total;
          }
      }, 0);
  }

    //TODO CHECKOUT
    const checkoutCartItems = () => {
        console.log("CHECKOUT CART ITEMS");
          //wenn alle oder nix selected dann userShoppingcart checkout
        //wenn einzelne ausgewählt dann nur die einzelnen checkout
    }

    return ( 
      <section className="totalCost-section">

        {selectedCartItems.length == 0 || selectedCartItems.length == userShoppingCart.length?
            <button onClick={checkoutCartItems}>CHECKOUT - Total ${updateTotalCost()}</button>
            :<button onClick={checkoutCartItems}>CHECKOUT - Selected ${updateSelectedCost()}</button>
          }    
      </section>     
     );
}
 
export default TotalCost;
