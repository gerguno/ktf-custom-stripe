import {FullsizeImage} from "./FullsizeImage";
import {FullsizeVideo} from "./FullsizeVideo";

export function FullsizeMedium({src, ext}) {
    return (
        <>
            {(ext === 'image/jpeg' || ext === 'image/png') &&
            <FullsizeImage src={src}/>}

            {(ext === 'video/mp4' || ext === 'video/quicktime') &&
            <FullsizeVideo src={src} ext={ext}/>}
        </>
    )
}
