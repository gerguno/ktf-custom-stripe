import Link from "next/link"
import {useContext} from "react";
import {UserContext} from "../contexts/UserContext";
import { useRouter} from "next/router";
import React, { useEffect, useState } from "react"

export default function Navigation() {
    const { user, storeUser } = useContext(UserContext)
    const router = useRouter()

    const logoUrls = [
        '/logo_eng.svg',
        '/logo_cyr.svg'
    ]

    const [logo, setLogo] = useState(logoUrls[0])

    useEffect(() => {
        const handleRouteChange = (url) => {
            // console.log(`App is changing to ${url}`)
            if (router.pathname !== url) {
                logo === logoUrls[0] ? setLogo(logoUrls[1]) : setLogo(logoUrls[0])
            }
        }
        router.events.on('beforeHistoryChange', handleRouteChange)
    }, [router])

    return (
        <>
            <nav>
                <div id='logo'>
                    <Link href={`/`}>
                        <a>
                            <div id='logo-container'>
                                <img src={logo} alt=''/>
                            </div>
                        </a>
                    </Link>
                </div>
                <div>
                    <Link href={`/cart`}>
                        <a>
                            Cart
                            { user.products.length > 0 ? ` (${user.products.length})` : '' }
                        </a>
                    </Link>
                </div>
            </nav>
        </>
    )
}