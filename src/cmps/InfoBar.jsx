import { SvgIcon } from './SvgIcon.jsx';

export function InfoBar({ stay, isPhotosInView, photosRef, amenitiesRef, reviewsRef }) {
  const infoItems = ['Cleanliness', 'Accuracy', 'Communication', 'Location', 'CheckIn', 'Value'];

  if (!stay) return null
  return (
    <section className='info-bar'>
      <ul className="info-bar-list">
        <li>
          <span className='info-bar-item-1'>Overall rating</span>
          <div className="info-rating">
            {[5, 4, 3, 2, 1].map(num => {
              const fillPercent = {
                5: '100%',
                4: '70%',
                3: '0%',
                2: '20%',
                1: '0%',
              }[num];

              return (
                <div key={num} className="rating-row">
                  <span className="rating-number">{num}</span>
                  <div className="bar">
                    <div
                      className="bar-fill"
                      style={{ width: fillPercent }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </li>

        {infoItems.map((item, idx) => {
          const key = item.charAt(0).toLowerCase() + item.slice(1);
          const rating = stay.reviewStats?.[key] || stay.rating || 5.0;

          return (
            <li key={idx} className="info-bar-item">
              <span>{item}</span>
              <span className='randomInt-point'>
                {rating.toFixed(1)}
              </span>
              <SvgIcon iconName={item} />
            </li>
          );
        })}

      </ul>
    </section>
  )
}