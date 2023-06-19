import styled from 'styled-components'
import { colors, apiUrl } from '../styles/constants'
import LogoGreen from '../assets/logo_green.png'
import PictureForm from '../components/PictureForm'
import { Form, Button, Input, Spin } from 'antd'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { LoadingContainer } from './Dashboard'

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const form = Form.useFormInstance()

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      setLoading(true)
      const data = await fetch(apiUrl + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      // Check if status is 200
      if (data.status !== 201) {
        throw new Error('Error')
      }
      // we will save the json as user
      const user = await data.json()
      // save to local storage
      localStorage.setItem('user', JSON.stringify(user))
      // Redirect to home
      window.location.href = '/'
    } catch (error) {
      console.log('Error:', error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <PictureForm>
      <Logo>
        <Img
          src={LogoGreen}
          alt="Logo"
        />
        <BoldText>FundingMe</BoldText>
      </Logo>
      {loading ? (
        <LoadingContainer>
          <Spin size="large">
            <div className="content" />
          </Spin>
        </LoadingContainer>
      ) : (
        <>
          <FormContainer>
            <BigText>Inicia sesión</BigText>

            <Form
              form={form}
              layout="vertical"
              requiredMark={false}
              onFinish={onFinish}
            >
              <Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'El correo electrónico es requerido',
                  },
                ]}
              >
                <StyledInput
                  placeholder="Correo electrónico"
                  type="email"
                />
              </Item>
              <Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'La contraseña es requerida',
                  },
                ]}
              >
                <StyledInput
                  placeholder="Contraseña"
                  type="password"
                />
              </Item>
              <StyledButton
                type="primary"
                htmlType="submit"
              >
                Entrar
              </StyledButton>
            </Form>
            <Footer>
              <div>¿No tienes una cuenta? </div>
              <StyledLink to={'/register'}>Crea una aquí</StyledLink>
            </Footer>
          </FormContainer>
        </>
      )}
    </PictureForm>
  )
}

const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
`

const BoldText = styled.h1`
  font-size: 70px;
  font-weight: 500;
  color: ${colors.fontColor};
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  max-height: 150px;
  gap: 10px;
`

export const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
`

export const BigText = styled.div`
  margin: 20px 0px;
  font-size: 36px;
  font-weight: 500;
  color: ${colors.fontColor};
`

export const StyledInput = styled(Input)`
  border-radius: 2px;
  border: 1px solid #b1b2b5;
  width: 100%;
  margin-bottom: 0px;
  padding: 5px 10px;
`

export const Item = styled(Form.Item)`
  :hover {
    border-color: #00c16c;
  }
  :focus {
    border-color: #00c16c;
    box-shadow: 0 0 0 2px rgba(0, 193, 108, 0.1);
    border-inline-end-width: 1px;
    outline: 0;
  }
  .ant-form-item-explain-error {
    font-size: 12px;
  }
`

export const StyledButton = styled(Button)`
  width: 100%;
  border-radius: 2px;
  background-color: ${colors.primary};
  color: 32px;
  font-size: 14px;
  &:hover {
    background-color: ${colors.secondary} !important;
  }
`

export const Footer = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 5px;
  font-size: 14px;
  color: ${colors.fontColor};
`

export const StyledLink = styled(Link)`
  color: ${colors.secondary};
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    color: ${colors.primary};
  }
`

export default Login
