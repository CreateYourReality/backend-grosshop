import "./ShoppingCart.css"

import FooterNav from "../../components/FooterNav/FooterNav";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import { useContext } from "react";
import { userShoppingCartContext, dataContext } from "../../context/Context";
import ProductCard from "../../components/ProductCard/ProductCard";

const ShoppingCart = () => {
    const {userShoppingCart, setUserShoppingCart} = useContext(userShoppingCartContext)
    const {data} = useContext(dataContext)

    const findShoppingItemBy = (favID) => {
        return data.find(favoriteItem => favoriteItem._id === favID);
    };

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
                                    {<ProductCard product={findShoppingItemBy(cartItem.id)}/>}
                                </article>
                            )
                        )}
                        <button>CHECKOUT - Total $</button>
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