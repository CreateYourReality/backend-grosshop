import "./OrderHistory.css"

import FooterNav from "../../components/FooterNav/FooterNav";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const OrderHistory = () => {
    const {user} = useContext(UserContext);
    console.log(user);
    return (
        <>
            <HeaderNav/>
            <main>
                <h2>Order History Page</h2>
            </main>
            <FooterNav/>
        </>
      );
}
 
export default OrderHistory;