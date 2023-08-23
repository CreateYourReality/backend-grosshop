import "./OrderHistory.css";
import FooterNav from "../../components/FooterNav/FooterNav";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import OrderItem from "../../components/OrderItem/OrderItem";

const OrderHistory = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      if (user) {
        const order = await axios.get(`/api/orders/userId/${user._id}`);
        setOrders(order.data);
      }
    };
    getOrders();
  }, []);

  return (
    <>
      <HeaderNav />
      <main>
        <section className="orderHistory">
          {orders?.map((order, i) => (
            <OrderItem order={order} key={i} />
          ))}
        </section>
      </main>
      <FooterNav />
    </>
  );
};

export default OrderHistory;
