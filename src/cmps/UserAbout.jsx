import { useSelector } from "react-redux"
import { ImgUploader } from "./ImgUploader"
import { updateUser } from '../store/actions/user.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { UserImg } from "./UserImg"
import { Loader } from "./Loader"

export function UserAbout() {
    const user = useSelector(storeState => storeState.userModule.watchedUser)

    async function onUploaded(imgUrl) {
        const userToUpdate = { ...user, imgUrl }
        try {
            await updateUser(userToUpdate)
            showSuccessMsg('Profile updated and saved!')
        } catch (err) {
            showErrorMsg('Could not save image to database')
        }
    }

    if (!user) return <Loader />
    return (
        <section className='user-about'>
            <section className='top'>
                <h1 className='title'>About me</h1>
                <ImgUploader onUploaded={onUploaded} />
            </section>
            <section className='main'>
                <UserImg
                    fullname={user.fullname}
                    url={user.imgUrl}
                    className='img-profile'
                    alt="img-profile"
                />
                <h1 className='name'>{user?.firstName}</h1>
            </section>
        </section>
    )
}