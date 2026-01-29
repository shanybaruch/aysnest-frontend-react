import { useState } from "react"

export function UserImg({ fullname = '', url, alt = 'User avatar', className = '' }) {
    const [isImgError, setIsImgError] = useState(false)

    const fallbackImg = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"

    function getInitial() {
        if (!fullname) return ''
        return fullname.charAt(0).toUpperCase()
    }

    const showFallback = !url || isImgError

    return (
        <section className={`user-img ${className}`}>
            {url && !isImgError ? (
                <img
                    src={url}
                    alt={alt}
                    className="user-img-src"
                    onError={() => setIsImgError(true)}
                />
            ) : (
                <div className="user-initials-fallback">
                    {getInitial()}
                </div>
            )}
        </section>
    )
}