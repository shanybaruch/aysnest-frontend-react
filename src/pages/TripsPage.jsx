import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadOrders } from '../store/actions/order.actions'
import { Loader } from '../cmps/Loader'

export function TripPage() {
    const user = useSelector(storeState => storeState.userModule.user)

    useEffect(() => {
    }, [])

    function getFormattedDate(dateStr) {
        const date = new Date(dateStr)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    if (!user) return <Loader />
    return (
        <section className="trips-page ">
            <h1 className="title">Trips</h1>

            {user.trips.length === 0 ? (
                <div className="no-trips">
                    <h3>No trips booked... yet!</h3>
                    <p>Time to dust off your bags and start planning your next adventure.</p>
                </div>
            ) : (
                <div className="trips-grid">
                    {user.trips.map(trip => (
                        <div key={trip._id} className="trip-card">
                            <div className="img-container">
                                <img src={trip.stay.imgUrls[0]} alt={trip.stay.name} />
                                <span className={`status-badge ${trip.status}`}>{trip.status}</span>
                            </div>
                            <div className="trip-details">
                                <h3 className="stay-name">{trip.stay.name}</h3>
                                <p className="stay-host">Hosted by {trip.hostName || 'Host'}</p>
                                <p className="trip-dates">{getFormattedDate(trip.startDate)} – {getFormattedDate(trip.endDate)}</p>
                                <p className="trip-price">₪{trip.totalPrice.toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}