import {FullsizeImage} from "./FullsizeImage";
import {FullsizeVideo} from "./FullsizeVideo";

export function FullsizeMedium({src, ext}) {
    return (
        <>
            {ext === 'image/jpeg' &&
            <FullsizeImage src={src}/>}

            {ext === 'video/mp4' &&
            <FullsizeVideo src={src} ext={ext}/>}
        </>
    )
}
