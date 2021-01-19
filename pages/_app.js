import '../styles/globals.css'

import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import UserContextProvider from "../contexts/UserContext";
import Navigation from "../components/Navigation";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
        <div>
          <div>
            <Head>
            </Head>
          </div>
            <UserContextProvider>
                <Navigation />
                <Component {...pageProps} />
            </UserContextProvider>
        </div>
    )
  }
}
export default MyApp
