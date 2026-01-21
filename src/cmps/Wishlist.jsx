import { useEffect, useState } from 'react'
import { stayService } from '../services/stay/stay.service.local'
import { Loader } from './Loader'
import { StayPreview } from './StayPreview'

import { IoIosClose } from "react-icons/io";
import { updateUser } from '../store/actions/user.actions';
import { showErrorMsg } from '../services/event-bus.service';



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

    async function removeSave(stayId) {
        const updateSaveId = user.saved.filter(id => id !== stayId)
        const userToUpdate = {
            ...user,
            saved: updateSaveId
        }
        try {
            await updateUser(userToUpdate)
            setStays(prevStays => prevStays.filter(stay => stay._id !== stayId))
        } catch (err) {
            showErrorMsg('Could not save stay to favorites')
        }
    }

    console.log('user, stays: ', user, stays)

    if (!user) return <Loader />
    if (!stays.length && user.saved?.length > 0) return <Loader />

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