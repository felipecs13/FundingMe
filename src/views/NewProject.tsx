import { Button, DatePicker, Form, InputNumber, Select, Upload, Input } from 'antd'
import {
  UploadOutlined,
  IdcardOutlined,
  BankOutlined,
  SafetyCertificateOutlined,
  PushpinOutlined,
  GiftOutlined,
} from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import moment from 'moment'
import { colors, apiUrl } from '../styles/constants'
import { Card as BaseCard } from './Profile'
import { StyledInput, Item, StyledButton } from './Login'
import { formatterNumber, parserNumber } from '../helpers/formatters'
import { IUser } from '../helpers/interfaces'

const FormProject = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [user, setUser] = useState<IUser>({ token: '', id: 0, email: '', rut: '', name: '', is_admin: false })

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])
  const onFinish = async (values: {
    name_project: string
    bank_account: string
    description: string
    minimum_donation: number
    type_project: string
    goal_amount: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: any | null
    location: string
    end_date: string
    category: string
  }) => {
    setLoading(true)
    try {
      const photo = values.image?.fileList[0].originFileObj
      const formData = new FormData()
      formData.append('project[image]', photo)
      formData.append('project[name_project]', values.name_project)
      formData.append('project[bank_account]', values.bank_account)
      formData.append('project[description]', values.description)
      formData.append('project[minimum_donation]', values.minimum_donation.toString())
      formData.append('project[type_project]', values.type_project)
      formData.append('project[goal_amount]', values.goal_amount.toString())
      formData.append('project[location]', values.location)
      formData.append('project[end_date]', values.end_date)
      formData.append('project[category]', values.category)

      const data = await fetch(apiUrl + '/projects', {
        method: 'POST',
        headers: {
          Authorization: user.token,
        },
        body: formData,
      })
      if (data.status != 201) {
        throw new Error('Error')
      }
      // Redirect to home
      window.location.href = '/'
    } catch (error) {
      setLoading(false)
      console.log(loading)
      console.log('Error:', error)
    }
  }

  const onReset = () => {
    form.resetFields()
  }

  // if (user.id === 0) { 
  //   return (
  //     <div>
  //       <BigText>Debes iniciar sesión para crear proyectos</BigText>
  //     </div>
  //   )
  // }

  return (
    <Wrapper>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <BoldText>Crea tu propio proyecto 🪴</BoldText>
          </motion.div>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <SubText>¡Crea tu proyecto y comienza a recibir donaciones para desarrollarlo!</SubText>
          </motion.div>

          <Form
            autoComplete="off"
            form={form}
            initialValues={{ remember: true }}
            layout="vertical"
            name="create_project"
            onFinish={onFinish}
            requiredMark={false}
            style={{ width: '100%' }}
          >
            <FormGrid>
              <Column>
                {/* descripcion del proyecto */}
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Item
                    label="Descripción del proyecto"
                    name="description"
                    rules={[
                      {
                        required: true,
                        message: 'Debe ingresar una descripción del proyecto',
                      },
                    ]}
                  >
                    <StyledInputText
                      placeholder="El proyecto consiste en..."
                      autoSize={{ minRows: 8, maxRows: 8 }}
                    />
                  </Item>
                </motion.div>
                {/* imagen del proyecto */}
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Item
                    label="Imágen"
                    name="image"
                    rules={[
                      {
                        required: true,
                        message: 'Debe ingresar una imagen para su proyecto',
                      },
                    ]}
                  >
                    <StyledUpload
                      beforeUpload={() => {
                        return false
                      }}
                      maxCount={1}
                    >
                      <ImgButton>
                        <UploadOutlined />
                        Sube una imagen de tu proyecto 📷{' '}
                      </ImgButton>
                    </StyledUpload>
                  </Item>
                </motion.div>
              </Column>
              <Column>
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Item
                    label="Nombre del proyecto"
                    name="name_project"
                    rules={[
                      {
                        required: true,
                        message: 'Debe ingresar el nombre de su proyecto',
                      },
                    ]}
                  >
                    <StyledInput
                      placeholder="Ejemplo proyecto"
                      prefix={<IdcardOutlined />}
                    />
                  </Item>
                </motion.div>
                {/* tipo de proyecto */}
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Item
                    label="Tipo de proyecto"
                    name="type_project"
                    rules={[
                      {
                        required: true,
                        message: 'Debe seleccionar un tipo de proyecto',
                      },
                    ]}
                  >
                    <StyledSelect
                      allowClear
                      placeholder="Seleccione tipo"
                    >
                      <StyledSelectOption value="ONG">ONG</StyledSelectOption>
                      <StyledSelectOption value="PERSONAL">Personal</StyledSelectOption>
                    </StyledSelect>
                  </Item>
                </motion.div>

                {/* ubicacion */}
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Item
                    label="Locación"
                    name="location"
                    rules={[
                      {
                        required: true,
                        message: 'Debe ingresar la locación del proyecto',
                      },
                    ]}
                  >
                    <StyledInput
                      placeholder="Comuna, Ciudad"
                      prefix={<PushpinOutlined />}
                    />
                  </Item>
                </motion.div>

                {/* fecha de termino */}
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Item
                    label="Fecha de término"
                    name="end_date"
                    rules={[
                      {
                        required: true,
                        message:
                          'Debe ingresar una fecha máxima de término para recibir donaciones',
                      },
                    ]}
                  >
                    <StyledDatePicker
                      placeholder="dd-mm-yyyy"
                      format={'DD-MM-YYYY'}
                      disabledDate={(current) => {
                        return moment().add(-1, 'days') >= current
                      }}
                    />
                  </Item>
                </motion.div>
              </Column>
              <Column>
                {/* categoria */}
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Item
                    label="Categoría"
                    name="category"
                    rules={[
                      {
                        required: true,
                        message: 'Debe seleccionar una categoría',
                      },
                    ]}
                  >
                    <StyledSelect placeholder="Selecciona categoría">
                      <StyledSelectOption value="EDUCATION">Educación</StyledSelectOption>
                      <StyledSelectOption value="HEALTH">Salud</StyledSelectOption>
                      <StyledSelectOption value="ENVIRONMENT">Medio ambiente</StyledSelectOption>
                      <StyledSelectOption value="ANIMALS">Animales</StyledSelectOption>
                    </StyledSelect>
                  </Item>
                </motion.div>
                {/* cuenta bancaria */}
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Item
                    label="Cuenta bancaria"
                    name="bank_account"
                    rules={[
                      {
                        required: true,
                        message: 'Debe ingresar su cuenta bancaria',
                      },
                    ]}
                  >
                    <StyledInput
                      placeholder="0000 0000 0000 0000"
                      prefix={<BankOutlined />}
                    />
                  </Item>
                </motion.div>

                {/* monto de meta */}
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Item
                    label="Monto meta"
                    name="goal_amount"
                    rules={[
                      {
                        required: true,
                        message: 'Debe ingresar un monto de meta',
                      },
                    ]}
                  >
                    <StyledInputNumber
                      step={10000}
                      min={1}
                      placeholder="$ 123.456 CLP"
                      prefix={<SafetyCertificateOutlined />}
                      precision={0}
                      formatter={(value) => `$ ${formatterNumber(value)}`}
                      parser={parserNumber}
                    />
                  </Item>
                </motion.div>

                {/* monto minimo de donacion */}
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Item
                    label="Monto mínimo de donación"
                    name="minimum_donation"
                    rules={[
                      {
                        required: true,
                        message: 'Debe ingresar un monto mínimo de donación',
                      },
                    ]}
                  >
                    <StyledInputNumber
                      step={1000}
                      min={1}
                      placeholder="$ 1.234 CLP"
                      prefix={<GiftOutlined />}
                      precision={0}
                      formatter={(value) => `$ ${formatterNumber(value)}`}
                      parser={parserNumber}
                    />
                  </Item>
                </motion.div>
              </Column>
            </FormGrid>
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <ButtonContainer>
                <ButtonSubmit
                  htmlType="submit"
                  type="primary"
                >
                  Enviar proyecto
                </ButtonSubmit>
                <ButtonSubmit
                  htmlType="button"
                  type="primary"
                  onClick={onReset}
                >
                  Limpiar campos
                </ButtonSubmit>
              </ButtonContainer>
            </motion.div>
          </Form>
        </Card>
      </motion.div>
    </Wrapper>
  )
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Card = styled(BaseCard)`
  max-width: 100%;
  width: 1200px;
  align-items: center;
  background-color: ${colors.backgroundCard};
`

const FormGrid = styled.div`
  padding: 1rem;
  gap: 2.5rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
`

const BoldText = styled.div`
  font-size: 25px;
  font-weight: 600;
  color: ${colors.fontColor};
`

const SubText = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.fontColor};
`

export const StyledInputNumber = styled(InputNumber)`
  border-radius: 4px;
  border: 1px solid #b1b2b5;
  width: 100%;
  margin-bottom: 0px;

  .ant-input-number-input-wrap {
    height: 33.6px;
  }
`

export const StyledSelect = styled(Select)`
  .ant-select-selector {
    height: 33.6px !important;
    border-radius: 4px !important;
    border: 1px solid #b1b2b5 !important;
    :hover {
      border-color: ${colors.primary} !important;
    }
  }
`

const StyledDatePicker = styled(DatePicker)`
  border-radius: 4px;
  border: 1px solid #b1b2b5;
  width: 100%;
  margin-bottom: 0px;
`

const StyledInputText = styled(Input.TextArea)`
  border-radius: 4px;
  border: 1px solid #b1b2b5;
  width: 100%;
  height: 100%;
  margin-bottom: 0px;
`

const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const StyledUpload = styled(Upload)`
  .ant-upload-select {
    width: 100%;
  }
`

export const StyledSelectOption = styled(Select.Option)``

const ImgButton = styled(Button)`
  width: 100%;
  height: 33.6px;
  text-align: left;
  border-radius: 4px;
  border: 1px solid #b1b2b5;
  :hover {
    border-color: ${colors.primary};
  }
  span {
    color: rgba(48, 50, 54, 0.8);
    svg path {
      color: #494b4e;
    }
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 2rem;
  margin-bottom: 0.5rem;
`

const ButtonSubmit = styled(StyledButton)`
  width: 200px;
`

// const BigText = styled.div`
//   font-size: 25px;
//   font-weight: 600;
//   padding: 1rem;
//   `

export default FormProject
