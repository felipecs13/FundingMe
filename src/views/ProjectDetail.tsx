import { useState, useEffect } from 'react'
import { apiUrl } from '../styles/constants'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Card, Title } from './Profile'
import { message, Spin } from 'antd'
import { LoadingContainer } from './Dashboard'

interface Project {
  name_project: string
  description: string
  image: string
  goal_amount: number
  current_amount: number
}

const ProjectDetail = () => {
  const [project, setProject] = useState<Project>({} as Project)
  const [loading, setLoading] = useState<boolean>(true)
  const { id } = useParams<Record<string, string>>()

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

  useEffect(() => {
    setLoading(true)
    fetchProject()
  }, [])

  return (
    <>
      <Card>
        {loading ? (
          <LoadingContainer>
            <Spin size="large">
              <div className="content" />
            </Spin>
          </LoadingContainer>
        ) : (
          <>
            <Title>{project.name_project}</Title>
            <div>
              <p>{project.description}</p>
              <ImageWrapper>
                <img
                  src={
                    project.image
                      ? project.image
                      : 'https://source.unsplash.com/800x600/?' + project.name_project
                  }
                  alt={project.name_project}
                />
              </ImageWrapper>
              <p>Meta del proyecto: {project.goal_amount}</p>
              <p>Actual monto recolectado: {project.current_amount}</p>
              
            </div>
          </>
        )}
      </Card>
    </>
  )
}

const ImageWrapper = styled.div`
  height: 45%;
  overflow: hidden;

  img {
    width: 50%;
    height: 50%;
    object-fit: cover;
  }
`

export default ProjectDetail
