import { useEffect, useState } from 'react'
import { stayService } from '../services/stay/stay.service.remote'
import { Loader } from './Loader'
import { StayPreview } from './StayPreview'

import { IoIosClose } from "react-icons/io";
import { updateUser } from '../store/actions/user.actions';
import { showErrorMsg } from '../services/event-bus.service';



export function Wishlist() {
    const user = userService.getLoggedinUser()
    const [stays, setStays] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (user?.saved?.length > 0) {
            loadSavedStays()
        } else {
            setIsLoading(false)
        }
    }, [])

    async function loadSavedStays() {
        try {
            const promises = user.saved.map(async (id) => {
                try {
                    return await stayService.getById(id)
                } catch (err) {
                    console.warn(`Stay ${id} not found in DB - skipping`)
                    return null
                }
            })
            const savedStays = await Promise.all(promises)
            const validStays = savedStays.filter(stay => stay !== null)
            setStays(validStays)
        } catch (err) {
            console.log('Cannot load wishlist:', err)
        } finally {
            setIsLoading(false)
        }
    }

    async function removeSave(stayId) {
        const updatedSavedIds = user.saved.filter(id => id !== stayId)
        const userToUpdate = { ...user, saved: updatedSavedIds }

        try {
            await updateUser(userToUpdate)
            setStays(prevStays => prevStays.filter(stay => stay._id !== stayId))
        } catch (err) {
            showErrorMsg('Could not remove from wishlist')
        }
    }

    console.log('user, stays: ', user, stays)

    if (!user) return <Loader />
    if (isLoading) return <Loader />

    return (
        <section className="wishlist-page">
            <header>
                <h1 className="title">Wishlists</h1>
            </header>
            {!stays.length && <p>Wishlist is empty</p>}
            <ul className='saved-list'>
                {stays.map((stay) => (
                    <li key={stay._id}>
                        <StayPreview stay={stay} />
                        <button> <IoIosClose onClick={() => removeSave(stay._id)} /></button>
                    </li>
                ))}
            </ul>
        </section>
    )
}