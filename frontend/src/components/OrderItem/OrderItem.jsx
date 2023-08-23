import "./OrderItem.css"
const OrderItem = ({order}) => {

    const {_id, invoice, transportStatus, payedStatus, date} = order
    const setDate = new Date(date)
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
    // 25May, 11:00am
    const dateFormat =  `${months[setDate.getUTCMonth()]} ${setDate.getUTCDate()} at ${setDate.getUTCHours() % 12 === 0?12: setDate.getUTCHours() % 12}:${setDate.getUTCMinutes()} ${setDate.getUTCHours() >= 12? "pm": "am"}`
    return ( 
        <>
            <article className="orderItem">
                <div>
                    <h3>{_id.slice(_id.length-6)}</h3>
                    <p>{invoice}$</p>
                </div>
                <div>
                    <div>
                        <div className={transportStatus}>{transportStatus}</div>
                        <div className={payedStatus}>{payedStatus}</div>
                    </div>
                    <div>
                        {dateFormat}
                    </div>
                </div>
            </article>
        </>
     );
}
 
export default OrderItem;