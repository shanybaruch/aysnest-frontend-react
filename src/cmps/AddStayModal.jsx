import { useState, useEffect } from 'react'

export function AddStayModal({ onClose }) {
    const [step, setStep] = useState(1)
    const [subStep, setSubStep] = useState(1)

    const [stay, setStay] = useState({
        name: '',
        type: '',
        country: '',
        city: '',
        street: '',
        description: '',
        capacity: 0,
        bedrooms: 0,
        beds: 0,
        bathrooms: 0,
        price: 0,
        amenities: []
    })

    const isStep2Part1Valid = stay.name && stay.country && stay.city && stay.street && stay.description
    const isStep2Part2Valid = stay.capacity > 0 && stay.bedrooms >= 0 && stay.beds >= 0 && stay.bathrooms >= 0 && stay.price > 0


    useEffect(() => {
        setSubStep(1)
    }, [step])

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

    function goToSubStep2() {
        if (!isStep2Part1Valid) return
        setSubStep(2)
    }


    return (
        <section className="add-stay-modal">
            <section className="modal">
                <div className="add-stay-header">
                    <button className="btn-close" onClick={onClose}>✕</button>
                </div>

                {/* ---------------- STEP 1 ---------------- */}
                {step === 1 && (
                    <section className="step1">
                        <h2>What would you like to host?</h2>

                        <div className="add-stay-options">
                            <div className={`add-stay-card ${stay.type === 'Home' ? 'selected' : ''}`} onClick={() => updateStay('type', 'Home')}>
                                <img src="/img/home-logo.png" alt="home-logo" className="add-stay-card-img" />
                                <div className="add-stay-card-label">Home</div>
                            </div>
                        </div>

                        {/*ACTIONS*/}
                        <div className="add-stay-bottom">
                            <button className={`btn-next ${!stay.type ? 'disabled' : 'active'}`} 
                                disabled={!stay.type} onClick={nextStep}>
                                Next
                            </button>
                        </div>
                    </section>
                )}

                {/* ---------------- STEP 2 ---------------- */}
                {step === 2 && subStep === 1 && (
                    
                    <section className="step2">
                        <div className="step2-header">
                            <h2>Tell us about your place</h2>
                            <p>Basic info about your place</p>
                        </div>
                        
                        <div className="about">
                            {/* NAME */}
                            <div className="form-group">
                                <label>Name</label>
                                <input value={stay.name} placeholder="Enter The Name Of The Property"
                                onChange={ev => updateStay('name', ev.target.value)}/>
                            </div>
                            
                            {/* ADDRESS */}
                            <div className="form-group">
                                <label>Address</label>
                                <div className="address-grid">
                                    <input placeholder="Country" onChange={ev => updateStay('country', ev.target.value)} />
                                    <input placeholder="City" onChange={ev => updateStay('city', ev.target.value)} />
                                    <input placeholder="Street" onChange={ev => updateStay('street', ev.target.value)} />
                                </div>
                            </div>
                            
                            {/* DESCRIPTION */}
                            <div className="form-group">
                                <label>Description</label>
                                <textarea rows="5"  placeholder="Description"
                                onChange={ev => updateStay('description', ev.target.value)}/>
                            </div>
                        </div>
                        
                        <div className="actions">
                            <button className="btn-back" onClick={prevStep}>Back</button>
                            <button className={`btn-next ${isStep2Part1Valid ? 'active' : 'disabled'}`}
                            disabled={!isStep2Part1Valid} onClick={goToSubStep2}> 
                            Next 
                            </button>
                        </div>
                    </section>
                )}

                {step === 2 && subStep === 2 && (
                    <section className="step2">
                        <div className="step2-header">
                            <h2>Place details</h2>
                            <p>Capacity, rooms and pricing</p>
                            </div>
                            
                            <div className="about">
                                {/* NUMBERS */}
                                <div className="form-group">
                                    <label>Capacity</label>
                                    <input type="number" min="0" value={stay.capacity}
                                    onChange={ev => updateStay('capacity', Math.max(0, +ev.target.value))}/>
                                </div>
                                
                                <div className="grid-3">
                                    <div className="form-group">
                                        <label>Bedrooms</label>
                                        <input type="number" min="0" value={stay.bedrooms} 
                                        onChange={ev => updateStay('bedrooms', Math.max(0, +ev.target.value))}/>
                                    </div>
                                    
                                    <div className="form-group">
                                        <label>Beds</label>
                                        <input type="number" min="0" value={stay.beds}
                                        onChange={ev => updateStay('beds', Math.max(0, +ev.target.value))}/>
                                    </div>
                                    
                                    <div className="form-group">
                                        <label>Bathrooms</label>
                                        <input type="number" min="0" value={stay.bathrooms}
                                        onChange={ev => updateStay('bathrooms', Math.max(0, +ev.target.value))}/>
                                    </div>
                                </div>
                                
                                <div className="form-group">
                                    <label>Price per night</label>
                                    <input type="number" min="0" value={stay.price}
                                    onChange={ev => updateStay('price', Math.max(0, +ev.target.value))}/>
                                </div>
                            </div>
                            
                            <div className="actions">
                                <button className="btn-back" onClick={() => setSubStep(1)}>Back</button>
                                <button className={`btn-next ${isStep2Part2Valid ? 'active' : 'disabled'}`}
                                disabled={!isStep2Part2Valid} onClick={nextStep}> 
                                Next
                                </button>
                        </div>
                    </section>
                )}


                {/* ---------------- STEP 3 ---------------- */}
                {step === 3 && (
                    <section className="step3">
                        <div className="header" >
                            <h2>Step 2 - Make it stand out</h2>
                            <p>
                                Add 5 or more photos plus a title and description—we’ll help you out.
                            </p>
                        </div>

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
