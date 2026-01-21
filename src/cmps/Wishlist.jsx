import { useEffect, useState } from 'react'
import { stayService } from '../services/stay/stay.service.local'
import { Loader } from './Loader'
import { StayPreview } from './StayPreview'


export function Wishlist() {
    const user = userService.getLoggedinUser()
    const [stays, setStays] = useState([])

    useEffect(() => {
        if (user && user.saved && user.saved.length > 0) {
            loadSavedStays()
        }
    }, [])

    async function loadSavedStays() {
        try {
            const promises = user.saved.map(id => stayService.getById(id))
            const savedStays = await Promise.all(promises)
            setStays(savedStays)
        } catch (err) {
            console.log('Cannot load stays', err)
        }
    }

    console.log('user, stays: ', user, stays)

    if (!user) return <Loader />
    if (!stays.length && user.saved?.length > 0) return <Loader />
    if (!stays.length) return <div>No items in wishlist</div>

    return (
        <section className="wishlist-page">
            <header>
                <h1 className="title">Wishlists</h1>
            </header>
            <ul className='saved-list'>
                {stays.map((stay) => (
                    <li key={stay._id}>
                        <StayPreview stay={stay} />
                    </li>
                ))}
            </ul>
        </section>
    )
}