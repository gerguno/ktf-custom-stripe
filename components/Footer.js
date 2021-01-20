import Link from "next/link";

export default function Footer() {
    return (
        <>
            <div className='footer'>
                <div>
                    <Link href={`http://www.newsletter.com`} target="_blank">
                        <a>Newsletter</a>
                    </Link>
                    {' · '}
                    <Link href={`http://www.facebook.com`} target="_blank">
                        <a>Facebook</a>
                    </Link>
                    {' · '}
                    <Link href={`http://www.instagram.com`} target="_blank">
                        <a>Instagram</a>
                    </Link>
                </div>
                <div>
                    Copyright © 2005 – 2021. All rights reserved
                </div>
            </div>
        </>
    )
}