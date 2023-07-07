import { useState, useEffect } from 'react'
import { apiUrl, colors } from '../styles/constants'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Title } from './Profile'
import { motion } from 'framer-motion'
import { message, Spin, Input, Button, Space } from 'antd'
import { LoadingContainer } from './Dashboard'
import { AppstoreOutlined, MessageOutlined, PushpinOutlined, UserOutlined } from '@ant-design/icons'
import { IProject, IUser } from '../helpers/interfaces'

const categorias = {
  EDUCATION: 'Educación',
  HEALTH: 'Salud',
  ENVIRONMENT: 'Medio Ambiente',
  SOCIAL: 'Social',
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

  if (diffDays < 1) {
    return 'Finaliza hoy ⌛'
  }

  return 'Quedan ' + diffDays + ' días 🗓️'
}

const ProjectDetail = () => {
  const [project, setProject] = useState<IProject>({} as IProject)
  const [loading, setLoading] = useState<boolean>(true)
  const { id } = useParams<Record<string, string>>()
  const [user, setUser] = useState<IUser>({} as IUser)

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

  return (
    <InfoContainer>
      <InfoLeftSide>
        {loading ? (
          <LoadingContainer>
            <Spin size="large">
              <div className="content" />
            </Spin>
          </LoadingContainer>
        ) : (
          <InfoLeftSide>
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 35 }}
              transition={{ duration: 0.5 }}
            >
              <Title>Proyecto: {project.name_project}</Title>
              <div>
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
                <SmallText>
                  Publicado {dateToLocale(project.created_at)} - Finaliza{' '}
                  {dateToLocale(project.end_date)}
                </SmallText>
                <DescriptionText>{project.description}</DescriptionText>
                <Space.Compact style={{ width: '100%' }}>
                  <Input
                    size="large"
                    placeholder="Escribe un comentario..."
                    prefix={<MessageOutlined />}
                  />
                  <Button
                    onClick={submitComment}
                    onSubmit={submitComment}
                    type="primary"
                  >
                    Enviar
                  </Button>
                </Space.Compact>
              </div>
            </motion.div>
          </InfoLeftSide>
        )}
      </InfoLeftSide>

      {!loading && (
        <InfoRightSide
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 35 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <CardInfo>
            <ActionRowContainer>
              <UserOutlined
                style={{
                  fontSize: '40px',
                  marginRight: '10px',
                  color: colors.primary,
                }}
              />
              <SpecialText>{project.owner}</SpecialText>
            </ActionRowContainer>

            <ActionRowContainer>
              <AppstoreOutlined
                style={{
                  fontSize: '40px',
                  marginRight: '10px',
                  color: colors.primary,
                }}
              />
              <SpecialText>{categorias[project.category as CategoryKey]}</SpecialText>
            </ActionRowContainer>

            <ActionRowContainer>
              <PushpinOutlined
                style={{
                  fontSize: '40px',
                  marginRight: '10px',
                  color: colors.primary,
                }}
              />
              <SpecialText>{project.location}</SpecialText>
            </ActionRowContainer>
          </CardInfo>

          <CardInfo2>
            <MiniChildCard>
              <BoldText>{fixNumber(project.goal_amount)} de objetivo</BoldText>
            </MiniChildCard>

            <MiniChildCard>
              <BoldText>{fixNumber(project.current_amount)} recaudados</BoldText>
            </MiniChildCard>

            <MiniChildCard>
              <BoldText>{fixNumber(project.minimum_donation)} donación mínima</BoldText>
            </MiniChildCard>

            <MiniChildCard>
              <BoldText>
                {calculateDateDiffIntoString(project.created_at, project.end_date)}
              </BoldText>
            </MiniChildCard>

            <DonateButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Donar
            </DonateButton>
          </CardInfo2>
        </InfoRightSide>
      )}
    </InfoContainer>
  )
}

const ImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 10px;

  img {
    width: 100%;
    height: 30%;
    object-fit: cover;
  }
`

export const InfoLeftSide = styled(motion.div)`
  width: 50%;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 2%;
`

export const InfoRightSide = styled(motion.div)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 35%;
  padding: 2%;
`

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
  padding: 1%;
`

const CardInfo = styled.div`
  margin-top: 58px;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  width: 100%;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
`

const CardInfo2 = styled.div`
  margin-top: 20px;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #f5f5f5;
  justify-content: space-around;
  padding-bottom: 30px;
`

const MiniChildCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  width: 150px;
  height: 60px;
  margin: 5%;
  justify-content: center;
`

const ActionRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 20px;
  margin-top: 30px;
  align-items: center;
  justify-content: flex-start;
  vertical-align: middle;
  gap: 10px;
`

const SpecialText = styled.h2`
  margin: 0px;
  font-size: 15px;
  font-weight: 400;
  text-align: left;
  vertical-align: middle;
  color: ${colors.fontColor};
`

const BoldText = styled.h2`
  margin: 0px;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  vertical-align: middle;
  color: ${colors.fontColor};
`

const SmallText = styled.h2`
  margin: 5px;
  font-size: 17px;
  font-weight: 400;
  text-align: left;
  vertical-align: middle;
  color: ${colors.fontColor};
`

const DescriptionText = styled.h2`
  margin: 5px;
  margin-top: 20px;
  font-size: 17px;
  font-weight: 400;
  text-align: left;
  vertical-align: middle;
  margin-bottom: 60px;
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

export default ProjectDetail
