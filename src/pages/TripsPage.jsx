import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadOrders } from '../store/actions/order.actions'
import { Loader } from '../cmps/Loader'

export function TripPage() {
    const orders = useSelector(storeState => storeState.orderModule.orders)

    useEffect(() => {
        loadOrders()
    }, [])

    function getFormattedDate(dateStr) {
        const date = new Date(dateStr)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    if (!orders) return <Loader />
    return (
        <section className="trips-page ">
            <h1 className="title">Trips</h1>

            {orders.length === 0 ? (
                <div className="no-trips">
                    <hr />
                    <h3>No trips booked... yet!</h3>
                    <p>Time to dust off your bags and start planning your next adventure.</p>
                </div>
            ) : (
                <div className="orders-grid">
                    {orders.map(order => (
                        <div key={order._id} className="order-card">
                            <div className="img-container">
                                <img src={order.stay.imgUrls[0]} alt={order.stay.name} />
                                <span className={`status-badge ${order.status}`}>{order.status}</span>
                            </div>
                            <div className="order-details">
                                <h3 className="stay-name">{order.stay.name}</h3>
                                <p className="stay-host">Hosted by {order.hostName || 'Host'}</p>
                                <p className="order-dates">{getFormattedDate(order.startDate)} – {getFormattedDate(order.endDate)}</p>
                                <p className="order-price">₪{order.totalPrice.toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}