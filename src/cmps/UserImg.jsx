
export function UserImg({ url, alt = 'User avatar', className }) {

    const fallbackImg = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"

    return (
        <section className="user-img">
            <img
                src={url || fallbackImg}
                alt={alt}
                className={className}
                onError={(e) => {
                    e.target.onerror = null
                    e.target.src = fallbackImg
                }}
                style={{ objectFit: 'cover' }}
            />
        </section>
    )
}