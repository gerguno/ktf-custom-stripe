export function FullsizeImage({src}) {
    return (
        <div className="fullsize" style={{background: `url('${src}')`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
        </div>
    )
}