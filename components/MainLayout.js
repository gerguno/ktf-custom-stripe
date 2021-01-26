import React from "react";
import Menu from "./Menu";
import Footer from "./Footer";
import Head from 'next/head';

export function MainLayout({children, title='Kyiv Type Foundry'}) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="keywords" content='oles, gergun, ui, design, type, typography, code'/>
                <meta name="description" content='oles, gergun, ui, design, type, typography, code'/>
                <meta charSet="utf-8"/>
            </Head>
            <main>
                {children}
            </main>
        </>
    )
}