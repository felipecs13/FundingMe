import { Button, Carousel, Form, Input, InputNumber, Select, Upload } from 'antd'
import { UploadOutlined, IdcardOutlined, BankOutlined, FileTextOutlined, SafetyCertificateOutlined, PushpinOutlined, GiftOutlined } from '@ant-design/icons'
import NavBar from '../components/Layout'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components';
import { colors, apiUrl } from '../styles/constants'
import PictureForm from '../components/PictureForm'

interface User{
  token: string
  id: number
  email: string
  rut : string
  name : string
}

const FormProject = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [user, setUser] = useState<User>({ token: '', id: 0, email: '', rut: '', name: '' });

  const img1 = "https://www.grupocibernos.com/hs-fs/hubfs/gestion-de-proyectos-empresariales.jpg?width=1440&name=gestion-de-proyectos-empresariales.jpg"
  const img2 = "https://www.grupocibernos.com/hs-fs/hubfs/gestion-de-proyectos-empresariales.jpg?width=1440&name=gestion-de-proyectos-empresariales.jpg"
  const img3 = "https://www.grupocibernos.com/hs-fs/hubfs/gestion-de-proyectos-empresariales.jpg?width=1440&name=gestion-de-proyectos-empresariales.jpg"
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const onFinish = async (values: {
    "name_project": string,
    "bank_account": string,
    "description": string,
    "minimum_donation": number,
    "type_project" : string,
    "goal_amount": number,
    "image": any | null
  }) => {
    console.log('Success:', values)
    setLoading(true)
    try {
      const photo = values.image?.fileList[0].originFileObj;
      console.log(photo)
      const formData = new FormData();
      formData.append('project[image]', photo);
      formData.append('project[name_project]', values.name_project);
      formData.append('project[bank_account]', values.bank_account);
      formData.append('project[description]', values.description);
      formData.append('project[minimum_donation]', values.minimum_donation.toString());
      formData.append('project[type_project]', values.type_project);
      formData.append('project[goal_amount]', values.goal_amount.toString());

      const data = await fetch(apiUrl + '/projects', {
        method: 'POST',
        headers: {
          // No 'Content-Type' header
          "Authorization" : user.token
        },
        body: formData,
      })
      console.log(data)
      if (data.status != 201) {
        throw new Error('Error')
      }
      // Redirect to login page
      window.location.href = '/'
    } catch (error) {
      setLoading(false)
      console.log(loading)
      console.log('Error:', error)
    }
  }

  

  // const onFinishFailed = (errorInfo: string) => {
  //   console.log('Failed:', errorInfo);
  // };
  const onReset = () => {
    form.resetFields()
  }
  return (
    <div>
      <NavBar />
      <ImgFormContainer>
        <FormContainer>
          <BoldText>Crear Proyecto 🪴</BoldText>
          <SubText>
            ¡Crea tu proyecto y comienza a recibir donaciones!
          </SubText>
          <div className="Form">
            <Form
              form={form}
              name="create_project"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="name_project"
                rules={[{ required: true, message: 'Ingresa el nombre de tu proyecto' }]}
              >
                <StyledInput
                  placeholder="Nombre del proyecto"
                  prefix={<IdcardOutlined />}
                />
              </Form.Item>

              <Form.Item
                name="bank_account"
                rules={[{ required: true, message: 'Ingresa tu cuenta bancaria' }]}
              >
                <StyledInput
                  placeholder="Cuenta bancaria"
                  prefix={<BankOutlined />}
                />
              </Form.Item>

              <Form.Item
                name="description"
                rules={[{ required: true, message: 'Ingresa la descripción de tu proyecto' }]}
              >
                <StyledInput 
                  placeholder="Descripción del proyecto"
                  prefix={<FileTextOutlined />}
                />
              </Form.Item>

              <Form.Item
                name="goal_amount"
                rules={[{ required: true, message: 'Ingresa el monto meta' }]}
              >
                <StyledInputNumber
                  placeholder="Monto meta del proyecto (CLP)"
                  prefix={<SafetyCertificateOutlined />}
                />
              </Form.Item>

              <Form.Item
                name="type_project"
                rules={[{ required: true, message: 'Ingresa el tipo de proyecto' }]}
              >
                <StyledSelect
                  placeholder="Selecciona tipo de proyecto"
                  allowClear
                >
                  <StyledSelectOption value="ONG">ONG</StyledSelectOption>
                  <StyledSelectOption value="PERSONAL">PERSONAL</StyledSelectOption>
                </StyledSelect>
              </Form.Item>

              <Form.Item
                name="category"
                rules={[{ required: true, message: 'Ingresa una categoría' }]}
              >
                <StyledSelect
                  placeholder="Selecciona categoría"
                >
                  <StyledSelectOption value="EDUCATION">Educación</StyledSelectOption>
                  <StyledSelectOption value="HEALTH">Salud</StyledSelectOption>
                  <StyledSelectOption value="ENVIROMENT">Medio ambiente</StyledSelectOption>
                  <StyledSelectOption value="ANIMALS">Animales</StyledSelectOption>
                </StyledSelect>
              </Form.Item>

              <Form.Item
                name="location"
                rules={[{ required: true, message: 'Ingresa la locación del proyecto' }]}
              >
                <StyledInput
                  placeholder="Locación del proyecto"
                  prefix={<PushpinOutlined />}
                />
              </Form.Item>

              <Form.Item
                name="minimum_donation"
                rules={[{ required: true, message: 'Ingresa un monto mínimo de donación' }]}
              >
                <StyledInputNumber
                  placeholder="Monto mínimo de donación (CLP)"
                  prefix={<GiftOutlined />}
                />
              </Form.Item>
              <Form.Item
                label="Imágen"
                name="image"
              >
                <Upload beforeUpload={(_) => {return false}} maxCount={1}>
                  <Button icon={<UploadOutlined />}>Sube una imagen de tu proyecto 📷 </Button>
                </Upload>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  Enviar proyecto
                </Button>
                <Button
                  htmlType="button"
                  onClick={onReset}
                >
                  Limpiar campos
                </Button>
              </Form.Item>
            </Form>
          </div>
        </FormContainer>
      </ImgFormContainer>
    </div>
  )
}

export const FormContainer = styled(motion.div)`
  padding: 2%;
  width: 60%;
  margin-left: 30%;
  display: flex;
  flex-direction: column;
  text {
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    margin-bottom: 20px;
  }
`

export const ImgFormContainer = styled.div`
  flex-direction: row;
  display: flex;
  width: 100%;
`

const BoldText = styled.h1`
  font-size: 25px;
  font-weight: 600;
  color: ${colors.fontColor};
`

const SubText = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.fontColor};
`

export const StyledInput = styled(Input)`
  border-radius: 2px;
  border: 1px solid #b1b2b5;
  width: 120%;
  margin-bottom: 0px;
  padding: 5px 10px;
`

export const StyledInputNumber = styled(InputNumber)`
  border-radius: 2px;
  border: 1px solid #b1b2b5;
  width: 120%;
  margin-bottom: 0px;
  padding: 5px 10px;
`
export const StyledSelect = styled(Select)`

`

export const StyledCarousel = styled(Carousel)`
  width: 50%;
  height: 100%;
`

export const StyledSelectOption = styled(Select.Option)`
  border-radius: 2px;
  border: 1px solid #b1b2b5;
  width: 100%;
  margin-bottom: 0px;
`


export default FormProject
