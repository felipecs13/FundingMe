import styled from 'styled-components'
import LogoImg from '../assets/logo_white.png'
import { Link, Outlet } from 'react-router-dom'
import { colors } from '../styles/constants'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const Layout = () => {
  const [user, setUser] = useState(null)
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setAdmin(JSON.parse(storedUser).is_admin)
    }
  }, [])

  const goToHome = () => {
    window.location.href = '/'
  }

  const logOut = () => {
    // Ask the user if they are sure
    const confirm = window.confirm('¿Estás seguro de que quieres cerrar sesión?')
    if (confirm) {
      localStorage.removeItem('user')
      setUser(null)
      window.location.href = '/'
    }
  }

  return (
    <>
      <Wrapper>
        <Logo
          onClick={goToHome}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Img
            alt="Logo"
            src={LogoImg}
          />
          <BoldText>FundingMe</BoldText>
        </Logo>
        <ContainerLinks>
          <StyledLink to={'/'}>Inicio</StyledLink>
          {user && <StyledLink to={'/me'}>Mi perfil</StyledLink>}
          {user && <StyledLink to={'my-projects'}>Mis proyectos</StyledLink>}
          {user && <StyledLink to={'/new'}>Crear Proyecto</StyledLink>}
          {!user && <StyledLink to={'/login'}>Iniciar sesión</StyledLink>}
          {!user && <StyledLink to={'/register'}>Registrarse</StyledLink>}
          {admin && <StyledLink to={'/admin'}>Administrador</StyledLink>}
          {user && <StyledText onClick={logOut}>Cerrar sesión</StyledText>}
        </ContainerLinks>
      </Wrapper>
      <ChildrenContainer>
        <Outlet />
      </ChildrenContainer>
    </>
  )
}

const ChildrenContainer = styled.div`
  overflow-y: auto;
  max-height: calc(100vh - 70px);
`

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  background-color: ${colors.primary};
  align-items: center;
  padding: 0 3rem;
`

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  width: auto;
  height: 80%;
  gap: 10px;
  cursor: pointer;
`

const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
`

const BoldText = styled.div`
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

const StyledLink = styled(Link)`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.background};
  text-decoration: inherit;
  transition: color 0.3s ease-in-out;
  &:hover {
    color: ${colors.fontColor};
  }
`

const StyledText = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.background};
  text-decoration: inherit;
  cursor: pointer;

  &:hover {
    color: ${colors.fontColor};
  }
`

export default Layout
