import Link from "next/link"
import {useContext} from "react";
import {UserContext} from "../contexts/UserContext";
import { useRouter} from "next/router";
import React, { useEffect, useState } from "react"

export default function Navigation() {
    const { user, storeUser } = useContext(UserContext)
    const router = useRouter()

    return (
        <>
            <nav>
                <div>
                    <Link href={`/cart`}>
                        <a>
                            Cart
                            { user.products.length > 0 ? ` (${user.products.length})` : '' }
                        </a>
                    </Link>
                </div>
                <div>
                    <Link href={`/about`}>
                        <a>
                            About
                        </a>
                    </Link>
                </div>
            </nav>
        </>
    )
}