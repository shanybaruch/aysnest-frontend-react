import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { FaHeart, FaArrowLeft } from "react-icons/fa6";
import { FiShare } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';
import { ShareModal } from './ShareModal.jsx'
import { updateUser } from '../store/actions/user.actions'
import { useNavigate } from 'react-router-dom';

export function StayDetailsPhotos() {
  const { stayId } = useParams();
  const [isShareOpen, setIsShareOpen] = useState(false)
  const navigate = useNavigate()

  const loggedInUser = useSelector(storeState => storeState.userModule.user)
  const isSaved = loggedInUser?.saved?.includes(stayId)
  const location = useLocation()
  const stay = location.state
  if (!stay) return <p>Loading...</p>;

  const photos = stay.imgUrls?.length ? stay.imgUrls : Array(10).fill(stay.imgUrl);


  async function onSaveHeart(stayId) {
    if (!loggedInUser) return showErrorMsg('Please log in to save')

    const newSavedIds = loggedInUser.saved?.includes(stayId)
      ? loggedInUser.saved.filter(id => id !== stayId)
      : [...(loggedInUser.saved || []), stayId]

    try {
      await updateUser({ ...loggedInUser, saved: newSavedIds })
      showSuccessMsg('Updated successfully')
    } catch (err) {
      showErrorMsg('Could not save')
    }
  }


  return (
    <section className="photos-page">
      <div className="heading flex">
        <button className='arrow-responsive' onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <div className="right-heading flex">
          {/* <button
            className='share'
            onClick={() => setIsShareOpen(true)}>
            <FiShare />
            <span className='btn-responsive'>Share</span>
          </button>

          {isShareOpen && (
            <ShareModal
              stayId={stayId}
              onClose={() => setIsShareOpen(false)}
            />
          )} */}

          <button className="save" onClick={() => onSaveHeart(stay?._id)}>
            {isSaved
              ? <FaHeart style={{ color: '#ff385c' }} />
              : <FaRegHeart />}
            <span className='btn-responsive'>Save</span>
          </button>
        </div>
      </div>
      <div className="photos-grid">
        {photos.map((url, idx) => (
          <div key={idx} className={`photo-item photo-${idx % 4}`}>
            <img src={url} alt={`Stay photo ${idx + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
}
