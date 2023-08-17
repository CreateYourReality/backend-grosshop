import { useState, useContext, useEffect } from "react";
import "./TotalCost.css"
import { dataContext, userShoppingCartContext } from "../../context/Context";

const TotalCost = () => {
    const {userShoppingCart} = useContext(userShoppingCartContext)
    const [updateTotal,setUpdateTotal] = useState(false) //toogle refresher
    const {data} = useContext(dataContext)

    useEffect(() =>{
        setUpdateTotal(prev => !prev)
    },[updateTotal])


    const updateTotalCost = () => {
        return userShoppingCart.reduce((total, cartItem) => {
            const newProduct = data.find(prod => prod._id === cartItem.id); ; // Funktion, um Produktinformationen zu erhalten
            const itemTotal = newProduct.price * cartItem.amount;
            return total + itemTotal;
        }, 0);
    }

    return ( 
        <>
            <button>CHECKOUT - Total ${updateTotalCost()}</button>
        </>
     );
}
 
export default TotalCost;