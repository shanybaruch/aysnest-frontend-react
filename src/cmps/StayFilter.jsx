import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Calendar } from './Calendar'
import { GuestPicker } from './GuestPicker'
import { IoSearch } from 'react-icons/io5'
import { SET_FILTER_BY } from '../store/reducers/stay.reducer'

export function StayFilter(
    { isEditingWhere, isEditingWhen, isEditingWho,
        setIsEditingWhere, setIsEditingWhen, setIsEditingWho,
        getGuestLabel
    }) {

    const dispatch = useDispatch()
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const isAnyActive = isEditingWhere || isEditingWhen || isEditingWho
    const guests = filterBy.guests || { adults: 0, children: 0, infants: 0, pets: 0 }

    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    function onUpdateGuests(type, diff) {
        const newVal = Math.max(0, guests[type] + diff)
        dispatch({
            type: SET_FILTER_BY,
            filterBy: { ...filterBy, guests: { ...guests, [type]: newVal } }
        })
    }

    function onSearch() {
        const totalGuests = filterBy.guests.adults + filterBy.guests.children
        const filterToSave = { ...filterBy, minCapacity: totalGuests }
        dispatch({ type: SET_FILTER_BY, filterBy: filterToSave })
        loadStays(filterToSave)
        setIsEditingWhere(false)
        setIsEditingWhen(false)
        setIsEditingWho(false)
    }

    function onSetRange(range) {
        dispatch({
            type: SET_FILTER_BY,
            filterBy: { ...filterBy, from: range?.from || null, to: range?.to || null }
        })
    }

    const rangeForCalendar = {
        from: filterBy.from ? new Date(filterBy.from) : undefined,
        to: filterBy.to ? new Date(filterBy.to) : undefined
    }

    const destinations = [
        { id: '1', name: 'Paris, France', desc: 'Because you wishlisted it' },
        { id: '2', name: 'Budapest, Hungary', desc: 'For its bustling nightlife' },
        { id: '3', name: 'Rome, Italy', desc: 'For sights like Trevi Fountain' },
        { id: '4', name: 'Eilat, Israel', desc: 'Because your wishlist has stays in Eilat' },
    ]

    const handleSelect = (destinationName) => {
        setSearchTerm(destinationName)
        dispatch({ type: SET_FILTER_BY, filterBy: { ...filterBy, txt: destinationName } })
        setIsEditingWhere(false)
    }
    // const [filterToEdit, setFilterToEdit] = useState(() => {
    //     const copy = structuredClone(filterBy)
    //     if (copy.minCapacity === '') copy.minCapacity = 0
    //     return copy
    // })
    // console.log("filterToEdit: ", filterToEdit);



    // useEffect(() => {
    //     setFilterBy(filterToEdit)
    // }, [filterToEdit])

    // function handleChange(ev) {
    //     const { name: field, type, value: val } = ev.target
    //     let value = val

    //     switch (type) {
    //         case 'text':
    //         case 'radio':
    //             value = field === 'sortDir' ? +value : value
    //             if (!filterToEdit.sortDir) filterToEdit.sortDir = 1
    //             break
    //         case 'number':
    //             value = val !== '' ? +val : 0
    //             break
    //     }
    //     setFilterToEdit({ ...filterToEdit, [field]: value })
    // }
    function handleChange({ target }) {
        const { name: field, type, value: val } = target
        const value = type === 'number' ? +val : val

        dispatch({ type: 'SET_FILTER_BY', filterBy: { [field]: value } })
    }

    function clearFilter() {
        setFilterToEdit({ ...filterToEdit, txt: '', minCapacity: 0, maxPrice: '' })
    }

    function clearSort() {
        setFilterToEdit({ ...filterToEdit, sortField: '', sortDir: '' })
    }

    function handleSearch() {
        setFilterBy(filterToEdit)
    }

    return (
        <section className='stay-filter'>
            <div className='selection'>
                <section
                    className={`select-where ${isEditingWhere ? 'active' : ''}`}
                    onClick={(ev) => {
                        ev.stopPropagation()
                        setIsEditingWhere(!isEditingWhere)
                        setIsEditingWhen(false)
                        setIsEditingWho(false)
                    }}
                >
                    <section className='sec'>
                        <p>Where</p>
                        {isEditingWhere && (
                            <div className="suggestions-modal" onClick={(e) => e.stopPropagation()}>
                                <p>Suggested destinations</p>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {destinations.map((dest) => (
                                        <li
                                            key={dest.id}
                                            onClick={() => handleSelect(dest.name)}
                                            className="suggestion-item"
                                        >
                                            <h4>{dest.name}</h4>
                                            <span>{dest.desc}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {isEditingWhere ? (
                            <input
                                type="text"
                                autoFocus
                                placeholder="Search destinations"
                                value={searchTerm || filterBy.txt || ''}
                                onChange={(ev) => {
                                    setSearchTerm(ev.target.value)
                                    dispatch({ type: SET_FILTER_BY, filterBy: { ...filterBy, txt: ev.target.value } })
                                }}
                            />
                        ) : (
                            <span>{filterBy.txt || 'Search destinations'}</span>
                        )}
                    </section>
                    <div className="v-line"></div>
                </section>

                <section
                    className={`select-when ${isEditingWhen ? 'active' : ''}`}
                    onClick={(e) => {
                        e.stopPropagation()
                        setIsEditingWhen(!isEditingWhen)
                        setIsEditingWhere(false)
                        setIsEditingWho(false)
                    }}
                >
                    <section className='sec'>
                        <p>When</p>
                        <span>
                            {filterBy.from ?
                                `${new Date(filterBy.from).toLocaleDateString()} - ${filterBy.to ? new Date(filterBy.to).toLocaleDateString() : ''}`
                                : 'Add dates'}
                        </span>
                    </section>
                    {isEditingWhen && (
                        <div className="calendar-dropdown" onClick={(e) => e.stopPropagation()}>
                            <Calendar range={rangeForCalendar} setRange={onSetRange} />
                        </div>
                    )}
                    <div className="v-line"></div>
                </section>

                <section
                    className={`select-who ${isEditingWho ? 'active' : ''}`}
                    onClick={(e) => {
                        e.stopPropagation()
                        setIsEditingWhere(false)
                        setIsEditingWhen(false)
                        setIsEditingWho(!isEditingWho)
                    }}
                >
                    <section className='sec'>
                        <p>Who</p>
                        <span>{getGuestLabel()}</span>
                    </section>
                    {isEditingWho && (
                        <GuestPicker guests={guests} onUpdateGuests={onUpdateGuests} />
                    )}
                </section>

                <section className={`sec-search ${isAnyActive ? 'expanded' : ''}`} onClick={onSearch}>
                    <IoSearch />
                    {isAnyActive && <span className="search-text">Search</span>}
                </section>
            </div>
        </section>
    )
    // <section className="stay-filter">
    //     <h3>Filter:</h3>
    //     <input
    //         type="text"
    //         name="txt"
    //         value={filterBy.txt}
    //         placeholder="Free text"
    //         onChange={handleChange}
    //     // required
    //     />
    //     <input
    //         type="number"
    //         min="0"
    //         name="minCapacity"
    //         value={filterBy.minCapacity || ''}
    //         placeholder="min capacity"
    //         onChange={handleChange}
    //     // required
    //     />
    //     <button
    //         className="btn-clear"
    //         onClick={clearFilter}>Clear</button>
    //     <h3>Sort:</h3>
    //     <div className="sort-field">
    //         <label>
    //             <span>Capacity</span>
    //             <input
    //                 type="radio"
    //                 name="sortField"
    //                 value="capacity"
    //                 checked={filterToEdit.sortField === 'capacity'}
    //                 onChange={handleChange}
    //             />
    //         </label>
    //         <label>
    //             <span>Type</span>
    //             <input
    //                 type="radio"
    //                 name="sortField"
    //                 value="type"
    //                 checked={filterToEdit.sortField === 'type'}
    //                 onChange={handleChange}
    //             />
    //         </label>
    //     </div>
    //     <div className="sort-dir">
    //         <label>
    //             <span>Asce</span>
    //             <input
    //                 type="radio"
    //                 name="sortDir"
    //                 value="1"
    //                 checked={filterToEdit.sortDir === 1}
    //                 onChange={handleChange}
    //             />
    //         </label>
    //         <label>
    //             <span>Desc</span>
    //             <input
    //                 type="radio"
    //                 name="sortDir"
    //                 value="-1"
    //                 onChange={handleChange}
    //                 checked={filterToEdit.sortDir === -1}
    //             />
    //         </label>
    //     </div>
    //     <button
    //         className="btn-clear"
    //         onClick={clearSort}>Clear</button>
    // </section>
}