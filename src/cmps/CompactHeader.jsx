import { useInView } from "react-intersection-observer"

export function compactHeader({ isAtTop }) {
    const isCompact = (!isAtTop)

    return (
        <section className={`app-header ${isCompact ? 'compact' : ''}`}>
            {isCompact && (
                <button className="search-bar-mini">
                    <span className="label">Anywhere</span>
                    <div className="v-line"></div>
                    <span className="label">Any week</span>
                    <div className="v-line"></div>
                    <span className="label guests">Add guests</span>
                    <div className="search-icon"><IoSearch /></div>
                </button>
            )}
        </section>
    )
}

function RootCmp() {
    const { ref, inView } = useInView({
        threshold: 0,
        initialInView: true,
    })
    return (
        < AppHeader isAtTop={inView} />
    )
}