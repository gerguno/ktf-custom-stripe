import '../styles/globals.scss'

import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import UserContextProvider from "../contexts/UserContext";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
        <>
            <Head>
            </Head>
            <UserContextProvider>
                <Navigation />
                    <Component {...pageProps} />
                <Footer/>
            </UserContextProvider>
        </>
    )
  }
}
export default MyApp
