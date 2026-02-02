import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { stayService } from '../services/stay/stay.service.remote'
import { SvgIcon } from "./SvgIcon"
import { AddStayModal } from "./AddStayModal"
import { Loader } from './Loader'

export function HostListing() {
    const [stays, setStays] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    
    const loggedinUser = useSelector(storeState => storeState.userModule.user)

    useEffect(() => {
        if (loggedinUser) {
            loadHostStays()
        }
    }, [loggedinUser])

    async function loadHostStays() {
        if (!loggedinUser?._id) return
        try {
            setIsLoading(true)
            const filterBy = { hostId: loggedinUser._id }
            console.log('Fetching stays for host:', loggedinUser._id)
            const fetchedStays = await stayService.query(filterBy)
            setStays(fetchedStays)
        } catch (err) {
            console.error('Had issues loading stays', err)
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) return <Loader />

    return (
        <section className="host-listing">
            <section className="listings-header">
                <h1>Your Listings ({stays.length})</h1>
                <div className="btn-action">
                    <button className="btn-add-listing" onClick={() => setIsModalOpen(true)}> 
                        <SvgIcon iconName="Plus" />
                    </button>
                </div>
            </section>

            <section className="listings-content">
                {stays.length === 0 ? (
                    <p>You don't have any listings yet.</p>
                ) : (
                    <ul className="listings-list">
                        {stays.map(stay => (
                            <li key={stay._id} className="listing-item">
                                <img src={stay.imgUrls[0]} alt={stay.name} />
                                <div className="stay-info">
                                    <h3>{stay.name}</h3>
                                    <p>{stay.loc.city}, {stay.loc.country}</p>
                                    <p className="price">₪{stay.price} <span> per night</span></p>
                                </div>
                                <div className="actions">
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {isModalOpen && (
                <AddStayModal onClose={() => setIsModalOpen(false)} onAddStay={loadHostStays} />
            )}
        </section>
    )
}