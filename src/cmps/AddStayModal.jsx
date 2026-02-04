import { SvgIcon } from './SvgIcon'
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
        images: [],
        amenities: [],
    })
    
    const amenitiesByCategory = {
        "Scenic views": ["BayView", "GardenView"],

        "Bathroom": [
            "HotWater", "Bathtub", "Essentials",
            "Shampoo", "ShowerGel", "HairDryer"
        ],

        "Bedroom and laundry": [
            "Washer", "Dryer", "Hangers", "Iron", "ExtraPillowsAndBlankets"
        ],

        "Entertainment": ["TV", "SoundSystem", "PoolTable"],

        "Family": ["Crib", "BoardGames"],

        "Heating and cooling": ["AirConditioning", "Heating", "HotTub"],

        "Home safety": [
            "SmokeDetector", "CarbonMonoxideDetector",
            "FirstAidKit", "FireExtinguisher", "SafetyCard", "SecurityCameras"
        ],

        "Internet and office": ["Wifi", "Internet", "Workspace"],

        "Kitchen and dining": [
            "Kitchen", "Refrigerator", "Microwave",
            "Toaster", "Blender", "DiningTable"
        ],

        "Outdoor": ["Pool", "BBQGrill", "SunLoungers"],

        "Parking and facilities": ["parking", "Gym", "Elevator"],

        "Services": ["SelfCheckIn", "RoomDarkeningShades", "LongTermStaysAllowed"]
    }

    const isStep2Part1Valid = stay.name && stay.country && stay.city && stay.street && stay.description
    const isStep2Part2Valid = stay.capacity > 0 && stay.bedrooms >= 0 && stay.beds >= 0 && stay.bathrooms >= 0 && stay.price > 0 && stay.images.length >= 5


    
    function nextStep() {
        setStep(prev => prev + 1)
    }
    
    function prevStep() {
        setStep(prev => prev - 1)
    }
    
    function goToSubStep2() {
        if (!isStep2Part1Valid) return
        setSubStep(2)
    }

    useEffect(() => {
        setSubStep(1)
    }, [step])

    function updateStay(field, value) {
        setStay(prev => ({ ...prev, [field]: value }))
    }
    
    function onUploadImages(ev) {
        const files = Array.from(ev.target.files)
        
        setStay(prev => ({
            ...prev,
            images: [...prev.images, ...files]
        }))
    }

    function removeImage(idx) {
        setStay(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== idx)
        }))
    }
    

    function toggleAmenity(amenity) {
        setStay(prev => {
            const amenities = prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity]

            return { ...prev, amenities }
        })
    }

    function formatAmenityLabel(key) {
        return key
            .replace(/([A-Z])/g, ' $1') 
            .replace(/^./, str => str.toUpperCase()) 
            .trim()
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
                        
                        {/*ACTIONS*/}
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
                            {/* CAPACITY */}
                            <div className="form-group">
                                <label>Capacity</label>
                                <input type="number" min="0" value={stay.capacity}
                                onChange={ev => updateStay('capacity', Math.max(0, +ev.target.value))}/>
                            </div>
                            
                            <div className="grid-3">
                                {/* BEDROOMS */}
                                <div className="form-group">
                                    <label>Bedrooms</label>
                                    <input type="number" min="0" value={stay.bedrooms} 
                                    onChange={ev => updateStay('bedrooms', Math.max(0, +ev.target.value))}/>
                                </div>
                                
                                {/* BEDS */}
                                <div className="form-group">
                                    <label>Beds</label>
                                    <input type="number" min="0" value={stay.beds}
                                    onChange={ev => updateStay('beds', Math.max(0, +ev.target.value))}/>
                                </div>
                                
                                {/* BATHROOMS */}
                                <div className="form-group">
                                    <label>Bathrooms</label>
                                    <input type="number" min="0" value={stay.bathrooms}
                                    onChange={ev => updateStay('bathrooms', Math.max(0, +ev.target.value))}/>
                                </div>
                            </div>
                            
                            {/* PRICE */}
                            <div className="form-group">
                                <label>Price per night</label>
                                <input type="number" min="0" value={stay.price}
                                onChange={ev => updateStay('price', Math.max(0, +ev.target.value))}/>
                            </div>
                            
                            {/* IMAGES */}
                            <div className="form-group">
                                <label>Images (minimum 5)</label>
                                <div className="image-upload">
                                    <p>Drop images here or click to upload</p>
                                    <input type="file" accept="image/*" multiple onChange={onUploadImages} />
                                    <p className="images-count">
                                        {stay.images.length} / 5 images uploaded
                                    </p>
                                </div>
                            </div>

                            <div className="images-preview">
                                {stay.images.map((img, idx) => (
                                    <div className="image-preview-item" key={idx}>
                                        <img src={URL.createObjectURL(img)} alt="preview"/>
                                        <button className="btn-remove-image" onClick={() => removeImage(idx)}>
                                            <SvgIcon iconName="RemoveItem" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                        </div>
                        
                        {/*ACTIONS*/}
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
                        <div className="header">
                            <h2>Add Amenities</h2>
                            <p>Choose at least 3 amenities</p>
                        </div>
                        
                        <div className="content-scroll">
                            {Object.entries(amenitiesByCategory).map(([category, amenities]) => (
                                <div key={category} className="amenity-category">
                                    <h3>{category}</h3>
                                    <div className="amenities-grid">
                                        {amenities.map(amenity => {
                                            const isSelected = stay.amenities.includes(amenity)
                                            return (
                                            <button key={amenity} type="button" 
                                            className={`amenity-card ${isSelected ? 'selected' : ''}`}
                                            onClick={() => toggleAmenity(amenity)}>
                                                <SvgIcon iconName={amenity} />
                                            <span>{formatAmenityLabel(amenity)}</span>
                                            </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="actions">
                            <button className="btn-back" onClick={prevStep}> Back </button>
                            <button className={`btn-next ${stay.amenities.length >= 3 ? 'active' : 'disabled'}`}
                            disabled={stay.amenities.length < 3} onClick={onFinish}>
                                Finish
                            </button>
                        </div>
                    </section>
                )}
            </section>
        </section>
    )
}
