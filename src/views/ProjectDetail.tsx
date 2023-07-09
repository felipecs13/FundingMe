import { useState, useEffect } from 'react'
import { apiUrl, colors } from '../styles/constants'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Title } from './Profile'
import { motion } from 'framer-motion'
import { message, Spin, Input, Button, Modal, Form } from 'antd'
import { LoadingContainer } from './Dashboard'
import {
  AppstoreOutlined,
  MessageOutlined,
  PushpinOutlined,
  UserOutlined,
  CalendarOutlined,
} from '@ant-design/icons'

import { formatterNumber, parserNumber } from '../helpers/formatters'

import { StyledInput, Item } from './Login'

import { StyledInputNumber } from './NewProject'

import { IProject, IUser, IComment } from '../helpers/interfaces'
import Cards from 'react-credit-cards-2'
import 'react-credit-cards-2/dist/es/styles-compiled.css'

const categorias = {
  EDUCATION: 'Educación',
  HEALTH: 'Salud',
  ENVIRONMENT: 'Medio Ambiente',
  ANIMALS: 'Animales',
}

type CategoryKey = keyof typeof categorias

const fixNumber = (number: number) => {
  // Convertir a string el número
  if (!number) return '$ 0'
  let numStr = number.toString()

  // Agregar puntos cada 3 dígitos usando regex
  numStr = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  return '$' + numStr
}

const dateToLocale = (date: string) => {
  return new Date(date).toLocaleDateString('es-AR')
}

const calculateDateDiffIntoString = (date: string, endDate: string) => {
  const date1 = new Date(date)
  const date2 = new Date(endDate)
  const diffTime = Math.abs(date2.getTime() - date1.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}

const ProjectDetail = () => {
  const [form] = Form.useForm()
  const [commentForm] = Form.useForm()
  const [project, setProject] = useState<IProject>({} as IProject)
  const [comments, setComments] = useState<IComment[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [loadingPayment, setLoadingPayment] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [donationAmount, setDonationAmount] = useState<number>(0)
  const [paymentStep, setPaymentStep] = useState<boolean>(false)
  const [cardNumber, setCardNumber] = useState<string>('')
  const [cardName, setCardName] = useState<string>('')
  const [cardExpiry, setCardExpiry] = useState<string>('')
  const [cardCvc, setCardCvc] = useState<string>('')

  type Focused = 'name' | 'number' | 'expiry' | 'cvc' | ''
  const [cardFocus, setCardFocus] = useState<Focused>('')
  const { id } = useParams<Record<string, string>>()
  const [user, setUser] = useState<IUser>({} as IUser)

  const diffDays = calculateDateDiffIntoString(project.created_at, project.end_date)

  const fetchProject = async () => {
    try {
      const response = await fetch(`${apiUrl}/projects/${id}`)
      if (response.status !== 200) {
        throw new Error('Error')
      }
      const data = await response.json()
      setProject(data)
    } catch (error) {
      message.error('Error: problemas al cargar, intente más tarde.')
      window.location.href = '/'
    } finally {
      setLoading(false)
    }
  }

  const fetchComments = async () => {
    try {
      const response = await fetch(`${apiUrl}/comments`)
      if (response.status !== 200) {
        throw new Error('Error')
      }
      const data = await response.json()
      setComments(data)
    } catch (error) {
      message.error('Error: problemas al cargar, intente más tarde.')
    } finally {
      setLoading(false)
    }
  }

  const submitComment = async () => {
    try {
      const textComment = commentForm.getFieldValue('comment')
      const response = await fetch(`${apiUrl}/comments`, {
        method: 'POST',
        headers: {
          Authorization: user.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project_id: parseInt(id || '0'),
          user_id: user.id,
          comment_text: textComment,
          state: 'ACTIVE',
        }),
      })
      if (response.status !== 201) {
        throw new Error('Error')
      }
      commentForm.resetFields()
      fetchComments()
    } catch (error) {
      message.error('Error: problemas al cargar, intente más tarde.')
    }
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    if (!paymentStep) {
      setPaymentStep(true)
    } else {
      handlePayment()
    }
  }

  const handleCancel = () => {
    if (paymentStep) {
      return setPaymentStep(false)
    }
    setCardNumber('')
    setCardName('')
    setCardExpiry('')
    setCardCvc('')
    setCardFocus('')
    setDonationAmount(0)
    form.resetFields()
    setIsModalOpen(false)
  }

  const handlePayment = async () => {
    setLoadingPayment(true)
    setCardFocus('')
    await new Promise((resolve) => setTimeout(resolve, 3000))
    // Return error with a 20% chance
    if (Math.random() < 0.4) {
      message.error('Hubo un error al realizar el pago, intente nuevamente.')
      return setLoadingPayment(false)
    }
    try {
      const response = await fetch(`${apiUrl}/donations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: user.token,
        },
        body: JSON.stringify({
          donation: {
            user_id: user.id,
            project_id: id,
            amount: donationAmount,
          },
        }),
      })
      if (response.status !== 201) {
        throw new Error('Error')
      }
      const data = await response.json()
      console.log(data)
      message.success('Donación realizada con éxito!')
      handleCancel()
      setCardNumber('')
      setCardName('')
      setCardExpiry('')
      setCardCvc('')
      setCardFocus('')
      setDonationAmount(0)
      form.resetFields()
      setIsModalOpen(false)
    } catch (error) {
      message.error('Hubo un error al realizar el pago, intente nuevamente.')
    } finally {
      setLoadingPayment(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    fetchProject()
    fetchComments()
  }, [])

  return loading ? (
    <LoadingContainer>
      <Spin size="large">
        <div className="content" />
      </Spin>
    </LoadingContainer>
  ) : (
    <InfoContainer>
      <Modal
        title=" "
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={paymentStep ? 'Donar ' + fixNumber(donationAmount) + ' CLP' : 'Continuar'}
        cancelText={paymentStep ? 'Volver' : 'Cancelar'}
        okButtonProps={{
          disabled:
            loadingPayment ||
            donationAmount < project.minimum_donation ||
            (paymentStep && (!cardNumber || !cardName || !cardExpiry || !cardCvc)) ||
            (paymentStep && cardNumber.length != 16) ||
            (paymentStep && cardName.length < 3) ||
            (paymentStep && cardExpiry.length < 4) ||
            (paymentStep && cardCvc.length != 3),
        }}
        cancelButtonProps={{ disabled: loadingPayment }}
      >
        {!paymentStep && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SpecialText>Ingresa el monto de tu donación 💰</SpecialText>

            <p>
              Con tu donación estarás apoyando a <b>{project.owner}</b> en su proyecto{' '}
              <b>{project.name_project}</b>. Una vez se llegue a la meta, los administradores de
              FundingMe se encargarán de hacer llegar tu donación a <b>{project.owner}</b>. Si es
              que no se alcanza la meta, tu dinero será devuelto.
            </p>

            <GreenText>El monto mínimo es de {fixNumber(project.minimum_donation)} CLP</GreenText>

            <StyledInputNumber
              value={donationAmount}
              parser={parserNumber}
              step={1}
              placeholder="$ 1.234 CLP"
              precision={0}
              formatter={(value) => `$ ${formatterNumber(value)}`}
              onChange={(value) => setDonationAmount(parseInt((value || '0').toString()))}
            />
          </motion.div>
        )}
        {paymentStep && (
          <motion.div
            id="PaymentForm"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Cards
              number={cardNumber}
              name={cardName}
              expiry={cardExpiry}
              cvc={cardCvc}
              focused={cardFocus}
            />

            {loadingPayment ? (
              <LoadingContainer>
                <Spin size="large">
                  <div className="content" />
                </Spin>
              </LoadingContainer>
            ) : (
              <Form
                form={form}
                layout="vertical"
                onFinish={() => console.log('Finish')}
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
                    onChange={(e) => setCardName(e.target.value)}
                    onFocus={() => setCardFocus('name')}
                  />
                </Item>
                <Item
                  label="Número de tarjeta"
                  name="cardNumber"
                  rules={[
                    {
                      required: true,
                      message: 'Debe ingresar un número de tarjeta',
                    },
                    {
                      pattern: /^[0-9]*$/gm,
                      message: 'El número de tarjeta debe contener solo números',
                    },
                    () => ({
                      validator(_, value) {
                        if (value.replace(/ /g, '').length === 16) {
                          return Promise.resolve()
                        }
                        return Promise.reject(
                          new Error('El número de tarjeta debe tener 16 dígitos')
                        )
                      },
                    }),
                  ]}
                >
                  <StyledInput
                    value={cardNumber}
                    placeholder="1234 1234 1234 1234"
                    type="text"
                    onChange={(e) => setCardNumber(e.target.value)}
                    onFocus={() => setCardFocus('number')}
                  />
                </Item>
                <Item
                  label="Vencimiento"
                  name="cardExpiry"
                  rules={[
                    {
                      required: true,
                      message: 'Debe ingresar una contraseña',
                    },
                  ]}
                >
                  <StyledInput
                    placeholder="MM/AA"
                    type="text"
                    onChange={(e) => setCardExpiry(e.target.value)}
                    onFocus={() => setCardFocus('expiry')}
                  />
                </Item>
                <Item
                  label="CVC"
                  name="cardCvc"
                  rules={[
                    {
                      required: true,
                      message: 'Debes ingresar los 3 dígitos del reverso de tu tarjeta',
                    },
                    () => ({
                      validator(_, value) {
                        if (value.replace(/ /g, '').length === 3) {
                          return Promise.resolve()
                        }
                        return Promise.reject(new Error('El CVC debe tener 3 dígitos'))
                      },
                    }),
                  ]}
                >
                  <StyledInput
                    placeholder="123"
                    type="text"
                    onChange={(e) => setCardCvc(e.target.value)}
                    onFocus={() => setCardFocus('cvc')}
                  />
                </Item>
              </Form>
            )}
          </motion.div>
        )}
      </Modal>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 35 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%' }}
      >
        <InfoSide>
          <ProjectPrincipalInfo>
            <CustomTitle>{project.name_project}</CustomTitle>
            <ImageWrapper>
              <img
                alt={project.name_project}
                src={
                  project.image
                    ? project.image
                    : 'https://source.unsplash.com/800x600/?' + project.name_project
                }
              />
            </ImageWrapper>
            <DescriptionText>{project.description}</DescriptionText>
          </ProjectPrincipalInfo>
          <ProjectPrincipalInfo>
            {comments.length > 0 && (
              <CommentsContainer>
                {comments.map(
                  (comment) =>
                    comment.state === 'ACTIVE' && (
                      <CommentBox key={comment.id}>
                        <GreenText>{comment.user_id} comenta:</GreenText>
                        <Comment>{comment.comment_text}</Comment>
                      </CommentBox>
                    )
                )}
              </CommentsContainer>
            )}
            <Form
              form={commentForm}
              onFinish={submitComment}
            >
              <CommentItem name="comment">
                <WriteComment>
                  <Input
                    size="large"
                    placeholder="Escribe un comentario..."
                    prefix={<MessageOutlined />}
                    onSubmit={submitComment}
                  />
                  <Button
                    onClick={submitComment}
                    type="primary"
                  >
                    Enviar
                  </Button>
                </WriteComment>
              </CommentItem>
            </Form>
          </ProjectPrincipalInfo>
        </InfoSide>
      </motion.div>

      {!loading && (
        <InfoSide
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 35 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ProjectInfo>
            <ActionRowContainer>
              <UserOutlined
                style={{
                  fontSize: '40px',
                  color: colors.primary,
                }}
              />
              <SpecialText>{project.owner}</SpecialText>
            </ActionRowContainer>

            <ActionRowContainer>
              <AppstoreOutlined
                style={{
                  fontSize: '40px',
                  color: colors.primary,
                }}
              />
              <SpecialText>{categorias[project.category as CategoryKey]}</SpecialText>
            </ActionRowContainer>

            <ActionRowContainer>
              <PushpinOutlined
                style={{
                  fontSize: '40px',
                  color: colors.primary,
                }}
              />
              <SpecialText>{project.location}</SpecialText>
            </ActionRowContainer>

            <ActionRowContainer>
              <CalendarOutlined
                style={{
                  fontSize: '40px',
                  color: colors.primary,
                }}
              />
              <SpecialText>
                {dateToLocale(project.created_at)} - {dateToLocale(project.end_date)}
              </SpecialText>
            </ActionRowContainer>
          </ProjectInfo>

          <DonationInfo>
            <DonationInfoRow>
              <RowContent>
                <BoldText>{fixNumber(project.goal_amount)}</BoldText>
                <BoldText>de objetivo</BoldText>
              </RowContent>
              <RowContent>
                <BoldText>{fixNumber(project.current_amount)}</BoldText>
                <BoldText>recaudados</BoldText>
              </RowContent>
            </DonationInfoRow>
            <DonationInfoRow>
              <RowContent>
                <BoldText>{fixNumber(project.minimum_donation)}</BoldText>
                <BoldText>donación mínima</BoldText>
              </RowContent>
              <RowContent>
                {diffDays < 1 ? (
                  <>
                    <BoldText>Finaliza</BoldText>
                    <BoldText>hoy ⌛</BoldText>
                  </>
                ) : (
                  <>
                    <BoldText>Quedan</BoldText>
                    <BoldText> {diffDays} días 🗓️ </BoldText>
                  </>
                )}
              </RowContent>
            </DonationInfoRow>
            <DonationInfoRow>
              {user.id ? (
              <DonateButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={showModal}
              >
                Donar
              </DonateButton>
              ) : (
              <DonateButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => window.location.href = '/login'}
              >
                Donar
              </DonateButton>
              )
              }
            </DonationInfoRow>
          </DonationInfo>
        </InfoSide>
      )}
    </InfoContainer>
  )
}

const ImageWrapper = styled.div`
  overflow: hidden;
  align-self: center;

  img {
    max-height: 400px;
    max-width: 100%;
  }
`

const InfoSide = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: flex-start;
  width: 100%;
`

const InfoContainer = styled.div`
  display: grid;
  padding: 40px;
  grid: 1fr / 0.7fr 0.3fr;
  gap: 40px;
`

const ProjectInfo = styled.div`
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${colors.backgroundCard};
  border-radius: 10px;
  padding: 1.5rem;
  gap: 20px;
`

const ProjectPrincipalInfo = styled(ProjectInfo)`
  padding: 2rem;
  gap: 30px;
`

const CommentsContainer = styled.div`
  max-height: 300px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const Comment = styled.div`
  font-size: 14px;
  margin-left: 15px;
`

const CommentItem = styled(Item)`
  margin-bottom: 0;
`

const GreenText = styled.div`
  color: ${colors.primary};
  font-weight: 500;
  font-size: 14px;
`

const DonationInfo = styled.div`
  display: grid;
  grid: 1fr 1fr 1fr / 1fr;
  width: 100%;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  background-color: ${colors.backgroundCard};
  justify-content: space-around;
  padding: 1.5rem;
`

const DonationInfoRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  vertical-align: middle;
  gap: 20px;
`

const RowContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`

const ActionRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  vertical-align: middle;
  gap: 20px;
`

const SpecialText = styled.div`
  font-size: 17px;
  font-weight: 500;
  text-align: left;
  margin-bottom: 10px;
  color: ${colors.fontColor};
`

const BoldText = styled.div`
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  color: ${colors.fontColor};
`

const DescriptionText = styled.h2`
  font-size: 15px;
  font-weight: 400;
  text-align: left;
  color: ${colors.fontColor};
`

const DonateButton = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.primary};
  color: white;
  border-radius: 20px;
  margin: 15%;
  width: 100%;
  height: 50px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 20px;
`

const CustomTitle = styled(Title)`
  margin: 0 0 0 0;
`

const WriteComment = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  height: 32px;
`

export default ProjectDetail
