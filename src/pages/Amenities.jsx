import { useState } from "react";
import { AmenitiesModal } from "./AmenitiesModal.jsx";

export function Amenities({ amenities, iconMap }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const amenitiesToShow = amenities.slice(0, 10);

  return (
    <>
      <ul className="amenities-list">
        {amenitiesToShow.map((item, idx) => (
          <li key={idx} className="amenity-item">
            {iconMap[item] || null}
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {amenities.length > 10 && (
        <button
          className="btn-amenities-more"
          onClick={() => setIsModalOpen(true)}
        >
          Show all amenities
        </button>
      )}

      {isModalOpen && (
        <AmenitiesModal
          amenities={amenities}
          iconMap={iconMap}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
