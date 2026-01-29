import { OrderCard } from "../cmps/OrderCard"


export function StayDetailsHeader({ photosRef, amenitiesRef, reviewsRef, hidden, showOrderCard }) {

    function scrollTo(ref) {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <nav className={`stay-header ${hidden ? 'hidden' : ''}`}>
            <ul className="stay-header-nav">

                <div className="small-stay-header">
                    <li onClick={scrollToTop}>Photos</li>
                    <li onClick={() => scrollTo(amenitiesRef)}>Amenities</li>
                    <li onClick={() => scrollTo(reviewsRef)}>Reviews</li>
                </div>
                
                <section className={`header-order ${showOrderCard ? '' : 'hidden'}`}>
                    <OrderCard />
                </section>
            </ul>
        </nav>
    )
}
