import { createGlobalStyle } from 'styled-components'
import { colors } from './constants'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    transition: color 0.3s ease-in-out;
  }
  body {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    font-size: 12px;
    user-select: none;
    background-color: ${colors.background};	
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  a {
    font-size: 16px;
    font-weight: 500;
    color: ${colors.background};
    text-decoration: inherit;
  }
  a:hover {
    color: ${colors.fontColor};
  }
`

export default GlobalStyle
