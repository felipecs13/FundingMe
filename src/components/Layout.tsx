import styled from 'styled-components'
import LogoImg from '../assets/logo_white.png'
import { Link } from 'react-router-dom'
import { colors } from '../styles/constants'

const Layout = () => (
  <Wrapper>
    <Logo>
      <Img
        src={LogoImg}
        alt="Logo"
      />
      <BoldText>FundingMe</BoldText>
    </Logo>
    <ContainerLinks>
      <Link to={'/'}>Inicio</Link>
      <Link to={'/me'}>Mi perfil</Link>
      <Link to={'/projects'}>Mis proyectos</Link>
      <Link to={'/dashboard'}>Explorar</Link>
      <Link to={'/new'}>Crear Proyecto</Link>
    </ContainerLinks>
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  background-color: ${colors.primary};
  align-items: center;
  padding: 0 3rem;
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 10px;
`

const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
`

const BoldText = styled.h1`
  font-size: 24px;
  font-weight: 500;
  color: ${colors.background};
`

const ContainerLinks = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 2rem;
`

export default Layout
