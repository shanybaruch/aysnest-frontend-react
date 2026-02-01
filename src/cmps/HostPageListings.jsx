import { SvgIcon } from "./SvgIcon"
import { AddStayModal } from "./AddStayModal "

import { useState } from 'react'


export function HostPageListings() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <section className="host-page-listings">
            <section className="listings-header">
                <h1>Your Listings </h1>
                {/* <p>This is the host listings page content.</p> */}

                <div className="btn-action">
                    {/* <button className="btn-layout"></button> */}
                    <button className="btn-add-listing" onClick={() => setIsModalOpen(true)} > <SvgIcon iconName="Plus" /></button>
                </div>
            </section>

            <section className="listings-content">
                <ul>
                    <li> listings 1</li>
                    <li> listings 2</li>
                    <li> listings 3</li>
                </ul>
            </section>

            {isModalOpen && (
                <AddStayModal onClose={() => setIsModalOpen(false)} />
            )}
        </section>
    )
}