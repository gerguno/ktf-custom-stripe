import '../styles/globals.scss'

import React from 'react'
import App from 'next/app'
import UserContextProvider from "../contexts/UserContext";
import Menu from "../components/Menu";
import Footer from "../components/Footer";

export default function MyApp({Component, pageProps}) {
    return (
        <>
            <UserContextProvider>
                <Menu/>
                <Component {...pageProps} />
                <Footer/>
            </UserContextProvider>
        </>
    )
}
