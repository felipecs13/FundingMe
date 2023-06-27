import ReactDOM from 'react-dom/client'
import Router from './config/Router.tsx'
import GlobalStyle from './styles/GlobalStyles.tsx'
import ConfigProviderAntd from './styles/ConfigProvider.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <div>
    <GlobalStyle />
    <ConfigProviderAntd>
      <Router />
    </ConfigProviderAntd>
  </div>
)
