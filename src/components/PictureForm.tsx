import styled from 'styled-components'
import SocialProjectImg from '../assets/social_project.jpg'
import { ReactNode } from 'react'

interface IPictureForm {
  children: ReactNode
}

const PictureForm = ({children}: IPictureForm) => {
  return (
    <Wrapper>
      <ContainerImg
        src={SocialProjectImg}
        alt="imagen"
      />
      <Content>
        {children}
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
`

const ContainerImg = styled.img`
  display: block;
  height: 100%;
`

const Content = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3rem;
`

export default PictureForm