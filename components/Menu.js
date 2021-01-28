import Link from "next/link"
import {useContext} from "react";
import {UserContext} from "../contexts/UserContext";
import { useRouter} from "next/router";
import React, { useEffect, useState, useRef } from "react"

export default function Menu() {
    const { user, storeUser } = useContext(UserContext)
    const [open, setOpen] = useState(false)
    const nav = useRef(null)
    const menuOpen = useRef(null)

    const router = useRouter()

    const logoUrls = [
        '/logo_eng.svg',
        '/logo_cyr.svg'
    ]

    const [logo, setLogo] = useState(logoUrls[0])

    const toggleMenu = () => {
        setOpen(!open)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (nav.current && !nav.current.contains(event.target)) {
                toggleMenu()
            }
        }
        if (open) {
            document.addEventListener("mousedown", handleClickOutside)
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [nav, open])


    useEffect(() => {
        const handleRouteChange = (url) => {
            if (router.pathname !== url) {
                logo === logoUrls[0] ? setLogo(logoUrls[1]) : setLogo(logoUrls[0])
            }
        }
        router.events.on('beforeHistoryChange', handleRouteChange)
    }, [router])

    return (
        <>
            <nav className={`menu${open ? ' menu-opened' : ''}`} ref={nav}>
                <div id='bar'>
                    <div id='bar-logo' className={open ? 'bar-logo-white' : ''}>
                        <Link href={`/`}>
                            <a>
                                <img src={logo} alt=''/>
                            </a>
                        </Link>
                    </div>
                    <div id="bar-opts">
                        <Link href={`/cart`}>
                            <a id='bar-cart' className={open ? 'bar-cart-white' : ''}>
                                <span>Cart</span>
                                {user.products.length > 0
                                    ?
                                        <span id='bar-cart-count'>{user.products.length}</span>
                                    :
                                        ''
                                }
                            </a>
                        </Link>
                        <button ref={menuOpen} id="bar-menu-open" className={open ? 'inset' : ''} onClick={toggleMenu}>
                            {!open
                                ?
                                    <img src='/more.svg' alt=''/>
                                :
                                <img src='/more_close.svg' alt=''/>
                            }

                        </button>
                    </div>
                </div>
                <div id='menu-opts'>
                    <div>
                        <Link href={`/about`}>
                            <a>
                                About
                            </a>
                        </Link>
                    </div>
                    <div>
                        <Link href={`/licenses`}>
                            <a>
                                Licenses
                            </a>
                        </Link>
                    </div>
                    <div>
                        <Link href={`/inuse`}>
                            <a>
                                In use
                            </a>
                        </Link>
                    </div>
                </div>
            </nav>
            {open ? <div className="help-to-close"></div> : ''}

        </>
    )
}