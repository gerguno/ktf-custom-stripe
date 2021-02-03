import React from "react";
import Menu from "./Menu";
import Footer from "./Footer";
import Head from 'next/head';

export function MainLayout({
                               children,
                               title='Kyiv Type Foundry',
                               seoTitle = 'Kyiv Type Foundry. Retail and custom fonts with cyrillic heritage',
                               seoDescription = 'Kyiv Type Foundry is a typeface design practice established by Yevgeniy Anfalov and Oleś Gergun. Kyiv Type Foundry offers retail and custom fonts, opens new perspectives on cyrillic heritage and creates typographic means for the modern man'


}) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="title" content={seoTitle}/>
                <meta name="description" content={seoDescription}/>
                <meta charSet="utf-8"/>
            </Head>
            <main>
                {children}
            </main>
        </>
    )
}