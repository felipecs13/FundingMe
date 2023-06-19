import styled from 'styled-components'
import PictureForm from '../components/PictureForm'
import { colors } from '../styles/constants'
import { Form, message } from 'antd'
import { useState } from 'react'
import {
  Footer,
  StyledLink,
  StyledButton,
  StyledInput,
  FormContainer,
  BigText,
  Item as BaseItem,
} from './Login'
import { Spin } from 'antd'
import { LoadingContainer } from './Dashboard'

const Register = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const validatePasswords = (fieldName: string, value: string): Promise<void> => {
    const passwordUser = form.getFieldValue(fieldName)
    if (value && value !== passwordUser) {
      return Promise.reject(new Error('Las contraseñas no coinciden'))
    } else {
      return Promise.resolve()
    }
  }

  const onFinish = async (values: {
    name: string
    rut: string
    email: string
    password: string
    confirmPassword: string
  }) => {
    setLoading(true)
    try {
      const data = await fetch('https://softdeleteiic3143.onrender.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      if (data.status != 201) {
        throw new Error('Error')
      }
      // we will save the json as user
      const user = await data.json()
      // save to local storage
      localStorage.setItem('user', JSON.stringify(user))
      // Redirect to login page
      window.location.href = '/'
    } catch (error) {
      message.error('Error: revise los campos ingresados.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PictureForm>
      {loading ? (
        <LoadingContainer>
          <Spin size="large">
            <div className="content" />
          </Spin>
        </LoadingContainer>
      ) : (
        <FormContainer>
          <BigText>Registrate</BigText>
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            onFinish={onFinish}
          >
            <Item
              name="name"
              label="Nombre"
              rules={[
                {
                  required: true,
                  message: 'Tu nombre es requerido',
                },
              ]}
            >
              <StyledInput
                placeholder="Ingresa tus nombre"
                type="text"
              />
            </Item>
            {/* TODO: Add RUT validation and format */}
            <Item
              name="rut"
              label="RUT"
              rules={[
                {
                  required: true,
                  message: 'Tu rut es requerido',
                },
              ]}
            >
              <StyledInput
                placeholder="Ingresa tu rut"
                type="text"
              />
            </Item>
            <Item
              label="Correo electrónico"
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
              label="Contraseña"
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
            <Item
              name="confirmPassword"
              label="Confirmar contraseña"
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: 'Por favor confirma tu contraseña',
                },
                {
                  validator: (_, value) => validatePasswords('password', value),
                  message: 'Las contraseñas no coinciden',
                },
              ]}
            >
              <StyledInput
                placeholder="Ingresa nuevamente tu contraseña"
                type="password"
              />
            </Item>
            <StyledButton
              type="primary"
              htmlType="submit"
            >
              Crear
            </StyledButton>
          </Form>
          <Footer>
            <div>¿Ya tienes una cuenta? </div>
            <StyledLink to={'/login'}>Ingresa aquí</StyledLink>
          </Footer>
        </FormContainer>
      )}
    </PictureForm>
  )
}

const Item = styled(BaseItem)`
  label {
    font-weight: 500;
    font-color: ${colors.fontColor};
    margin: 0;
  }
  .ant-form-item-label {
    padding: 2px;
  }
`

export default Register
