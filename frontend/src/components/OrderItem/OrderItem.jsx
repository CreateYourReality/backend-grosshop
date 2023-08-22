import "./OrderItem.css"
const OrderItem = ({order}) => {

    const {_id, invoice, transportStatus, payedStatus, date} = order
    return ( 
        <>
            <article className="orderItem">
                <div>
                    <h3>{_id.slice(_id.length-6)}</h3>
                    <p>{invoice}</p>
                </div>
                <div>
                    <div>
                        <div className={transportStatus}>{transportStatus}</div>
                        <div className={payedStatus}>{payedStatus}</div>
                    </div>
                    <div>
                        {date}
                    </div>
                </div>
            </article>
        </>
     );
}
 
export default OrderItem;