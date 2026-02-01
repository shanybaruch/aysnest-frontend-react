import { useState } from 'react'

export function AddStayModal({ onClose }) {
    const [step, setStep] = useState(1)

    const [stay, setStay] = useState({
        name: '',
        type: '',
        price: '',
        capacity: '',
        amenities: []
    })

    function nextStep() {
        setStep(prev => prev + 1)
    }

    function prevStep() {
        setStep(prev => prev - 1)
    }

    function updateStay(field, value) {
        setStay(prev => ({ ...prev, [field]: value }))
    }

    function toggleAmenity(amenity) {
        setStay(prev => {
            const amenities = prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity]

            return { ...prev, amenities }
        })
    }

    function onFinish() {
        console.log('NEW STAY:', stay)
        onClose()
    }

    return (
        <section className="add-stay-modal">
            <section className="modal">
                <div className="add-stay-header">
                    <button className="btn-close" onClick={onClose}>✕</button>
                    <h2>What would you like to host?</h2>
                </div>

                {/* ---------------- STEP 1 ---------------- */}
                {step === 1 && (
                    <section className="step">

                        <div className="add-stay-options">
                            <div className={`add-stay-card ${stay.add-stay === 'Home' ? 'selected' : ''}`}  onClick={() => updateStay('add-stay', 'Home')}>
                                <img src="/img/home-logo.png" alt="home-logo" className="add-stay-card-img" />
                                <div className="add-stay-card-label">Home</div>
                            </div>
                        </div>

                        <div className="add-stay-bottom">
                            <button className={`btn-next ${!stay.type ? 'disabled' : 'active'}`} 
                                disabled={!stay.type} onClick={nextStep}>
                                Next
                            </button>
                        </div>
                    </section>
                )}

                {/* ---------------- STEP 2 ---------------- */}
                {step === 2 && (
                    <section className="step">
                        <h2>Tell us about your place</h2>

                        <input
                            placeholder="Stay name"
                            value={stay.name}
                            onChange={ev => updateStay('name', ev.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="Price per night"
                            value={stay.price}
                            onChange={ev => updateStay('price', +ev.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="Capacity"
                            value={stay.capacity}
                            onChange={ev => updateStay('capacity', +ev.target.value)}
                        />

                        <div className="actions">
                            <button onClick={prevStep}>Back</button>
                            <button
                                className="btn-next"
                                disabled={!stay.name || !stay.price}
                                onClick={nextStep}
                            >
                                Next
                            </button>
                        </div>
                    </section>
                )}

                {/* ---------------- STEP 3 ---------------- */}
                {step === 3 && (
                    <section className="step">
                        <h2>Amenities</h2>

                        <div className="amenities">
                            {['Wifi', 'Kitchen', 'Pool', 'TV', 'AirConditioning'].map(amenity => (
                                <label key={amenity}>
                                    <input
                                        type="checkbox"
                                        checked={stay.amenities.includes(amenity)}
                                        onChange={() => toggleAmenity(amenity)}
                                    />
                                    {amenity}
                                </label>
                            ))}
                        </div>

                        <div className="actions">
                            <button onClick={prevStep}>Back</button>
                            <button className="btn-next" onClick={onFinish}>
                                Finish
                            </button>
                        </div>
                    </section>
                )}

            </section>
        </section>
    )
}
