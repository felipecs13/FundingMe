import ReactDOM from 'react-dom/client'
import Router from './config/Router.tsx'
import GlobalStyle from './styles/GlobalStyles.tsx'
import ConfigProviderAntd from './styles/ConfigProvider.tsx'
import React from 'react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <div>
    <GlobalStyle />
    <ConfigProviderAntd>
      <React.StrictMode>
      <Router />
      </React.StrictMode>
    </ConfigProviderAntd>
  </div>
)
