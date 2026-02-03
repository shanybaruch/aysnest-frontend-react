import { getRandomIntInclusive } from '../services/util.service.js'
import { SvgIcon } from './SvgIcon.jsx';

export function InfoBar({ stay, isPhotosInView, photosRef, amenitiesRef, reviewsRef }) {
  const infoItems = ['Cleanliness', 'Accuracy', 'Communication', 'Location', 'CheckIn', 'Value'];

  return (
    <section className='info-bar'>
      <ul className="info-bar-list">
        <li>
          <span className='info-bar-item-1'>Overall rating</span>
          <div className="info-rating">
            {[1,2,3,4,5].map(num => (
              <div key={num} className="rating-row">
                <span className="rating-number">{num}</span>
                <div className={`bar ${num === 1 ? 'filled' : ''}`}></div>
              </div>
            ))}
          </div>
        </li>

        {infoItems.map((item, idx) => {
          const randomInt = getRandomIntInclusive(4, 5);
          return (
            <li key={idx} className="info-bar-item">
              <span>{item}</span>
              <span className='randomInt-point'>{randomInt}.0</span>
              <SvgIcon iconName={item} />
            </li>
          );
        })}
      </ul>
    </section>
  )
}
