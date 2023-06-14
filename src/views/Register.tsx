import styled from 'styled-components'
import PictureForm from '../components/PictureForm'
import { colors } from '../styles/constants'
import { Form } from 'antd'
import {
  Footer,
  StyledLink,
  StyledButton,
  StyledInput,
  FormContainer,
  BigText,
  Item as BaseItem,
} from './Login'

const Register = () => {
  const form = Form.useFormInstance()
  return (
    <PictureForm>
      <FormContainer>
        <BigText>Registrate</BigText>
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
        >
          <Item
            name="nombre"
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
            name="password"
            label="Confirmar contraseña"
            rules={[
              {
                required: true,
                message: 'La contraseña es requerida',
              },
            ]}
          >
            <StyledInput
              placeholder="Ingresa nuevamente tu contraseña"
              type="password"
            />
          </Item>
          <StyledButton type="primary">Crear</StyledButton>
        </Form>
        <Footer>
          <div>¿Ya tienes una cuenta? </div>
          <StyledLink to={'/login'}>Ingresa aquí</StyledLink>
        </Footer>
      </FormContainer>
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
