import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { orderService } from '../services/order/order.service.remote.js'

export function HostOrder() {
    const [orders, setOrders] = useState([])
    const loggedinUser = useSelector(storeState => storeState.userModule.user)
    // for (let i = 0; i < orders.length; i++) {
    //     const stayOrder = orders[i].stay

    // }

    useEffect(() => {
        if (loggedinUser) {
            loadOrders()
        }
    }, [loggedinUser])

    async function loadOrders() {
        try {
            const filterBy = { hostId: loggedinUser._id }
            const fetchedOrders = await orderService.query(filterBy)
            setOrders(fetchedOrders)
        } catch (err) {
            console.error('Had issues loading orders', err)
        }
    }

    async function onUpdateStatus(orderId, newStatus) {
        try {
            const orderToUpdate = orders.find(order => order._id === orderId)
            const updatedOrder = { ...orderToUpdate, status: newStatus }

            await orderService.save(updatedOrder)

            setOrders(prevOrders =>
                prevOrders.map(order => order._id === orderId ? updatedOrder : order)
            )
        } catch (err) {
            console.error('Could not update order status', err)
        }
    }

    function getFormattedDate(dateStr) {
        const date = new Date(dateStr)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    return (
        <section className="host-order">
            {orders.length === 0 ? (
                <p>No orders yet</p>
            ) : (
                <table className="orders-table">
                    <thead>
                        <tr>
                            {/* <th>Guest</th>
                            <th>Stay</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>
                                    <img src={order.stay.imgUrls?.[0]} alt="" />
                                </td>
                                <td>{order.buyer.fullname}</td>
                                <td>{order.stay.name}</td>
                                <td className="order-dates">{getFormattedDate(order.startDate)} – {getFormattedDate(order.endDate)}</td>
                                <td>${order.totalPrice}</td>
                                <td>
                                    <span className={`status-${order.status}`}>{order.status}</span>
                                </td>
                                <td className="order-actions">
                                    {order.status === 'pending' ? (
                                        <>
                                            <button className="btn-approve" onClick={() => onUpdateStatus(order._id, 'approved')}>Approve</button>
                                            <button className="btn-reject" onClick={() => onUpdateStatus(order._id, 'rejected')}>Reject</button>
                                        </>
                                    ) : (
                                        <span>Done</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    )
}