import { useContext, useEffect, useState } from "react";
import "./TotalCost.css";
import {
  dataContext,
  userShoppingCartContext,
  selectedCartItemsContext,
} from "../../context/Context";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

const TotalCost = () => {
  const { setUserShoppingCart, userShoppingCart } = useContext(
    userShoppingCartContext
  );
  const { selectedCartItems, setSelectedCartItems } = useContext(
    selectedCartItemsContext
  );
  const { data } = useContext(dataContext);
  const { user,refetch } = useContext(UserContext);

  const updateTotalCost = () => {
    return userShoppingCart.reduce((total, cartItem) => {
      const newProduct = data.find((prod) => prod._id === cartItem.id);
      let itemTotal = 0;
      if (newProduct.isDeal ) {
        itemTotal = newProduct.reducedDealPrice * cartItem.amount;

      } else if(newProduct.isMemberDeal) {
        itemTotal = newProduct.reducedMemberPrice * cartItem.amount;

      } else {
        
        itemTotal = newProduct.price * cartItem.amount;
      }
      return total + itemTotal;
    }, 0);
  };

  const updateSelectedCost = () => {
    return selectedCartItems.reduce((total, cartItem) => {
      const cartProduct = data.find((prod) => prod._id == cartItem);
      if (cartProduct) {
        const cartAmount = userShoppingCart.find(
          (cartItem) => cartItem.id == cartProduct._id
        ).amount;
        let itemTotal = 0;
        if (newProduct.isDeal ) {
          itemTotal = newProduct.reducedDealPrice * cartItem.amount;
  
        } else if(newProduct.isMemberDeal) {
          itemTotal = newProduct.reducedMemberPrice * cartItem.amount;
  
        } else {
          
          itemTotal = newProduct.price * cartItem.amount;
        }
        return total + itemTotal;
      } else {
        return total;
      }
    }, 0);
  };

    //TODO CHECKOUT
    const checkoutCartItems = async () => {
        console.log("CHECKOUT CART ITEMS");
        //wenn alle oder nix selected dann userShoppingcart checkout
        if(userShoppingCart.length == selectedCartItems.length || selectedCartItems.length == 0){
            await axios.post("/api/orders/", {products:userShoppingCart.map(item => ({
              id:item._id,
              amount:item.amount
            })),user:user,invoice:updateTotalCost()})
            userShoppingCart.forEach(async cartItem => {
              try {
                await axios.put(`/api/users/deleteUserProductCart/${user._id}`, {
                  id: cartItem.id,
                });
              } catch (e) {
                console.log(e);
              }
            });
            refetch();
            setUserShoppingCart([])
            setSelectedCartItems([])
        }else{ //wenn einzelne ausgewählt dann nur die einzelnen checkout
                
          console.log(userShoppingCart);
          console.log(selectedCartItems);
          
          const deleteArray = userShoppingCart.filter(item => selectedCartItems.includes(item.id));


                console.log(deleteArray);

          //TODO           
          await axios.post("/api/orders/", {
            products: userShoppingCart.filter(item => selectedCartItems.includes(item.id)
              ).map(item => ({
                id: item._id,
                amount: item.amount
              })),
            user: user,
            invoice: updateSelectedCost()
          });

     

          //TODO jedes sekected item was in shoppingcart vorkommt
          deleteArray.forEach(async cartItem => {
            try {
              await axios.put(`/api/users/deleteUserProductCart/${user._id}`, {
                id: cartItem.id,
              });
            } catch (e) {
              console.log(e);
            }
          });
          refetch();
          setUserShoppingCart(userShoppingCart.filter(item => !deleteArray.includes(item)))
          setSelectedCartItems([])        }
  };

  return (
    <section className="totalCost-section">
      {selectedCartItems.length == 0 ||
      selectedCartItems.length == userShoppingCart.length ? (
        <button onClick={checkoutCartItems}>
          Check Out - Total ${updateTotalCost().toFixed(2)}
        </button>
      ) : (
        <button onClick={checkoutCartItems}>
          Check Out - Selected ${updateSelectedCost().toFixed(2)}
        </button>
      )}
    </section>
  );
};

export default TotalCost;
