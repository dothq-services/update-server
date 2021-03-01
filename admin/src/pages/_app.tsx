import React from 'react'
import { Head } from 'next/document'
import '../styles.css'

function App({ Component, pageProps }) {
  return (
    <>
      <title>Dot HQ Update Service</title>
      <link rel="shortcut icon" href="/favicon.png" />
      <meta charSet="utf-8" />
      <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
      />
      <Component {...pageProps} />
    </>
  )
}

export default App
