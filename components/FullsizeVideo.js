export function FullsizeVideo({src, ext}) {
    return (
        <div className="fullsize">
            <video src={src} type={ext} loop autoPlay muted playsInline/>
        </div>
    )
}