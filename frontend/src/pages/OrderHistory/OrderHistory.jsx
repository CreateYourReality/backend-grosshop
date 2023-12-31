import "./OrderHistory.css";
import FooterNav from "../../components/FooterNav/FooterNav";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import OrderItem from "../../components/OrderItem/OrderItem";
import NoFeature from "../../components/Nofeature/Nofeature";


const OrderHistory = () => {
  const { user, refetch } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      if (user) {
        const order = await axios.get(`/api/orders/userId/${user._id}`);
        setOrders(order.data);
      }
    };
    getOrders();
    refetch()
  }, []);

  return (
    <>
      <HeaderNav />
      <main>
        {user?
        <section className="orderHistory">
          {orders?.map((order, i) => (
            <OrderItem order={order} key={i} />
          ))}
        </section>
        :
        <NoFeature/>
        }
      </main>
      <FooterNav />
    </>
  );
};

export default OrderHistory;
