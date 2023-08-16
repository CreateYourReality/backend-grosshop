import "./ShoppingCart.css"

import FooterNav from "../../components/FooterNav/FooterNav";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import { useContext } from "react";
import { userShoppingCartContext, dataContext } from "../../context/Context";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useState, useEffect } from "react";

const ShoppingCart = () => {
    const {userShoppingCart, setUserShoppingCart} = useContext(userShoppingCartContext)

    const [updateTotal,setUpdateTotal] = useState(false) //toogle refresher

    const {data} = useContext(dataContext)

    const findShoppingItemBy = (favID) => {
        return data.find(favoriteItem => favoriteItem._id === favID);
    };

    const increaseAmountCart = (incOrDecrement, productID) => {
        setUserShoppingCart(prevCartItem => {
            return prevCartItem.map(cartItem => {
                if (cartItem.id === productID) {
                    return { ...cartItem, amount: cartItem.amount + incOrDecrement <= 0 ? 1 : cartItem.amount + incOrDecrement  };
                }
                return cartItem;
            });
        });
        setUpdateTotal(prev => !prev)
      };

    const updateTotalCost = () => {
        console.log("FIRE");
      }
  
      useEffect(()=>{
        updateTotalCost()
      },[updateTotal])
  
      let totalCost = 0;
     
  

    return ( 
        <>
            <HeaderNav/>
            <main>
                <h2>Shopping Cart Page</h2> 
                <section className="shoppingCart-section">
                {userShoppingCart? 
                    userShoppingCart.length != 0 ? (
                    <>
                        {userShoppingCart.map((cartItem,index) => (
                                <article key={index}>
                                    {<ProductCard increaseAmountCart={increaseAmountCart} product={findShoppingItemBy(cartItem.id)}/>}
                                </article>
                            )
                        )}
                        <button>CHECKOUT - Total ${totalCost}</button>
                        </>
                        )

                        : (
                            <>
                                <h3>NO SHOPPINGCARTITEMS IMG</h3>
                                <button>Start Shopping</button>
                            </>
                        )
                    : <p>loading shopping items...</p>
                }
                </section>   
            </main>    
            <FooterNav/>
        </> 
    );
}
 
export default ShoppingCart;