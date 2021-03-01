import React from 'react'
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
      <section className={`hero`}>
        <Header/>
        {children}
        <Footer/>
      </section>
    </ThemeProvider>
  )
}