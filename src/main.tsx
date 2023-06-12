import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './config/Router.tsx'
import GlobalStyle from './styles/GlobalStyles.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <Router />
  </React.StrictMode>
)
