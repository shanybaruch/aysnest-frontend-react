import { userService } from '../services/user'
import { StayPreview } from './StayPreview'

// export function StayList({ stays, onRemoveStay, onUpdateStay }) {

//     function shouldShowActionBtns(stay) {
//         const user = userService.getLoggedinUser()
//         if (!user) return false
//         if (user.isAdmin) return true
//         return stay.host?._id === user._id
//     }
//     const staysByLocation = stays.reduce((acc, stay) => {
//         const locationKey = `${stay.loc?.city}, ${stay.loc?.country}`
//         if (!acc[locationKey]) acc[locationKey] = []
//         acc[locationKey].push(stay)
//         return acc
//     }, {})

//     return (
//     <section>
//         <ul className="stay-list">
//             {Object.keys(staysByLocation).map(location => (
//                 <div key={location} className="location-group">
//                     <h2 className="location-title">{location}</h2>

//                     <ul className="stays-grid">
//                         {staysByLocation[location].map(stay => (
//                             <li key={stay._id} className="stay-item">
//                                 <StayPreview stay={stay} />
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             ))}
//         </ul>
//     </section>
//     )
// }
export function StayList({ stays, onRemoveStay, onUpdateStay }) {

    function shouldShowActionBtns(stay) {
        const user = userService.getLoggedinUser()
        if (!user) return false
        if (user.isAdmin) return true
        return stay.host?._id === user._id
    }

    const staysByLocation = stays.reduce((acc, stay) => {
        const isGreece = stay.loc?.country === 'Greece'
        
        const locationKey = isGreece 
            ? stay.loc?.country + ' and the Islands'
            : `${stay.loc?.city}, ${stay.loc?.country}`

        if (!acc[locationKey]) acc[locationKey] = []
        acc[locationKey].push(stay)
        return acc
    }, {})

    return (
        <section className="stay-list">
            {Object.keys(staysByLocation).map(location => (
                <div key={location} className="location-group">
                    <h2 className="location-title">{location}</h2>
                    <ul className="stays-grid">
                        {staysByLocation[location].map(stay => (
                            <li key={stay._id} className="stay-item">
                                <StayPreview stay={stay} />
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </section>
    )
}

// {stays.map(stay =>
//     <li key={stay._id}>
//         <StayPreview stay={stay} />
//         {shouldShowActionBtns(stay) && <div className="actions">
//             {/* <button onClick={() => onUpdateStay(stay)}>Edit</button>
//             <button onClick={() => onRemoveStay(stay._id)}>x</button> */}
//         </div>}
//     </li>)
// }