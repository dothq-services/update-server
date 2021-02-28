import React from 'react'
import Head from 'next/head'
import { Footer } from './Footer'
import { Header } from './Header'
import { ThemeProvider } from '@material-ui/core'
import { theme } from '../theme'

export const Layout = ({
  children,
}: {
  children?: any
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Dot HQ Update Service</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <section className={`hero`}>
        <Header/>
        {children}
        <Footer/>
      </section>
    </ThemeProvider>
  )
}