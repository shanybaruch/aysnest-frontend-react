import { Link, useLocation } from 'react-router-dom'

export function StayPreview({ stay }) {
    const location = useLocation()

    function getRandomDateRange() {
        const now = new Date()
        const startTimestamp = now.getTime() + Math.random() * (180 * 24 * 60 * 60 * 1000)
        const startDate = new Date(startTimestamp)
        const nights = Math.floor(Math.random() * 4) + 2
        const endDate = new Date(startDate)
        endDate.setDate(startDate.getDate() + nights)
        const monthOptions = { month: 'short' }
        const startMonth = startDate.toLocaleDateString('en-US', monthOptions)
        const endMonth = endDate.toLocaleDateString('en-US', monthOptions)
        const startDay = startDate.getDate()
        const endDay = endDate.getDate()

        if (startMonth === endMonth) {
            return `${startMonth} ${startDay}-${endDay}`
        } else {
            return `${startMonth} ${startDay}-${endMonth} ${endDay}`
        }
    }

    if (!stay) return
    return <article className="stay-preview">
        <Link to={`/stay/${stay._id}${location.search}`}>
            <div className="image-container">
                <img src={stay.imgUrl} alt={stay.name} />
            </div>
            <p className='name'>{stay.name}</p>
            <div className="stay-info">
                <p>{getRandomDateRange()}</p>
                <p>
                    <span>₪{stay.price} for night ★ {stay.rate}</span>
                </p>
            </div>
        </Link>
    </article>
}