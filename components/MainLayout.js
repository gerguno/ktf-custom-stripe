import React from "react";
import Menu from "./Menu";
import Footer from "./Footer";
import Head from 'next/head';

export function MainLayout({children, title='Kyiv Type Foundry'}) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="keywords" content='kyiv, type, typography, code'/>
                <meta name="description" content='Letters from Kyiv'/>
                <meta charSet="utf-8"/>
            </Head>
            <main>
                {children}
            </main>
        </>
    )
}