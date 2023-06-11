import styled from 'styled-components'
import LogoImg from '../assets/logo_white.png'
import { Link } from 'react-router-dom'

const Layout = () => (
  <Wrapper>
    <Logo>
      <Img
        src={LogoImg}
        alt="Logo"
      />
      <BoldText>FundingMe</BoldText>
    </Logo>
    <ContainerButttons>
      <Link to={'/me'}>Mi perfil</Link>
      <Link to={'/projects'}>Mis proyectos</Link>
      <Link to={'/dashboard'}>Explorar</Link>
    </ContainerButttons>
  </Wrapper>
)

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 70px;
  gap: 20px;
  background-color: #379f7a;
  align-items: center;
  padding: 0 30px;
`

const ContainerButttons = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 30px;
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
  color: white;
`

export default Layout
