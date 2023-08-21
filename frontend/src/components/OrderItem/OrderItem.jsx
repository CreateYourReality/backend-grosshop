import "./OrderItem.css"
const OrderItem = ({order}) => {

    const {_id, invoice, transportStatus, payedStatus, date, user, products} = order
    return ( 
        <>
            <h2>{user} Hier entsteht deine Ordershistoryitem</h2>
        </>
     );
}
 
export default OrderItem;