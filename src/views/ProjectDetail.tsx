import { useState, useEffect } from 'react'
import { apiUrl, colors } from '../styles/constants'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Title } from './Profile'
import { motion } from 'framer-motion'
import { message, Spin, Input, Button } from 'antd'
import { LoadingContainer } from './Dashboard'
import {
  AppstoreOutlined,
  MessageOutlined,
  PushpinOutlined,
  UserOutlined,
  CalendarOutlined,
} from '@ant-design/icons'
import { IProject, IUser } from '../helpers/interfaces'

const categorias = {
  EDUCATION: 'Educación',
  HEALTH: 'Salud',
  ENVIRONMENT: 'Medio Ambiente',
  ANIMALS: 'Animales',
}

type CategoryKey = keyof typeof categorias

const fixNumber = (number: number) => {
  return '$' + Number(number).toLocaleString('es-AR')
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
  const [project, setProject] = useState<IProject>({} as IProject)
  const [loading, setLoading] = useState<boolean>(true)
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
      console.log(data)
    } catch (error) {
      message.error('Error: problemas al cargar, intente más tarde.')
    } finally {
      setLoading(false)
    }
  }

  const submitComment = async () => {
    try {
      const response = await fetch(`${apiUrl}/comments`, {
        method: 'POST',
        headers: {
          Authorization: user.token,
        },
        body: JSON.stringify({
          project_id: id,
          user_id: user.id,
          comment_text: 'Muy buena idea!',
          state: 'default',
        }),
      })
      if (response.status !== 201) {
        throw new Error('Error')
      }
      const data = await response.json()
      console.log(data)
    } catch (error) {
      message.error('Error: problemas al cargar, intente más tarde.')
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
            {/* 
            if comments are empty,dont show this
            map de comentarios
            */}
            <CommentsContainer>
              <CommentBox>
                <GreenText>Juan Pablo dice:</GreenText>
                <Comment>¡Muy buena idea!</Comment>
              </CommentBox>
              <CommentBox>
                <GreenText>Juan Pablo dice:</GreenText>
                <Comment>¡Muy buena idea!</Comment>
              </CommentBox>
            </CommentsContainer>
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
              <DonateButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                Donar
              </DonateButton>
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
  max-height: 400px;
  // agregar scrollbar style
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
  font-weight: 400;
  text-align: left;
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
