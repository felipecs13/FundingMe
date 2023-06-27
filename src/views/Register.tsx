import PictureForm from '../components/PictureForm'
import { Form, message } from 'antd'
import { useState } from 'react'
import {
  Footer,
  StyledLink,
  StyledButton,
  StyledInput,
  StyledPassword,
  FormContainer,
  BigText,
  Item,
} from './Login'
import { Spin } from 'antd'
import { LoadingContainer } from './Dashboard'
import { BrowserRouter } from 'react-router-dom'
import { rutFormatter } from '../helpers/formatters'

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
      message.error('Error: correo registrado o RUT inexistente.')
    } finally {
      setLoading(false)
    }
  }

  const handleRut = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rut = e.target.value
    form.setFieldsValue({ rut: rutFormatter(rut) })
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
            onFinish={onFinish}
            requiredMark={false}
          >
            <Item
              label="Nombre"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Debe ingresar su nombre',
                },
              ]}
            >
              <StyledInput
                placeholder="Nombre Apellido"
                type="text"
              />
            </Item>
            <Item
              label="RUT"
              name="rut"
              rules={[
                {
                  required: true,
                  message: 'Debe ingresar su RUT',
                },
              ]}
            >
              <StyledInput
                maxLength={12}
                onChange={handleRut}
                placeholder="12.345.678-9"
                type="text"
              />
            </Item>
            <Item
              label="Correo electrónico"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Debe ingresar un correo electrónico',
                },
                {
                  type: 'email',
                  message: 'El correo electrónico no es válido',
                },
              ]}
            >
              <StyledInput
                placeholder="ejemplo@ejemplo.com"
                type="email"
              />
            </Item>
            <Item
              label="Contraseña"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Debe ingresar una contraseña',
                },
                {
                  min: 8,
                  max: 14,
                  message: 'La contraseña debe tener entre 8 y 14 caracteres',
                },
              ]}
            >
              <StyledPassword
                placeholder="Contraseña"
                type="password"
              />
            </Item>
            <Item
              dependencies={['password']}
              label="Confirmar contraseña"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: 'Debe confirmar su contraseña',
                },
                {
                  validator: (_, value) => validatePasswords('password', value),
                  message: 'Las contraseñas no coinciden',
                },
              ]}
            >
              <StyledPassword
                placeholder="Repite contraseña"
                type="password"
              />
            </Item>
            <StyledButton
              htmlType="submit"
              type="primary"
            >
              Crear
            </StyledButton>
          </Form>
          <Footer>
            <BrowserRouter>
            <div>¿Ya tienes una cuenta? </div>
            <StyledLink to={'/login'}>Ingresa aquí</StyledLink>
            </BrowserRouter>
          </Footer>
        </FormContainer>
      )}
    </PictureForm>
  )
}

export default Register
