import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { colors, apiUrl } from '../styles/constants'
import { Form, Button, Input, Slider, Spin } from 'antd'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { motion } from 'framer-motion'
import NavBar from '../components/Layout'

const fixNumber = (number: number) => {
  return '$' + Number(number).toLocaleString('es-AR')
}

const Login = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [projects, setProjects] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)

  const fetchProjects = async () => {
    try {
      const response = await fetch(apiUrl + '/projects/')
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
    const user = localStorage.getItem('user')
    if (user) {
      setUser(JSON.parse(user))
    }
  }, [])

  const minPrice =
    projects.length > 0 ? Math.min(...projects.map((project) => project.goal_amount)) : 0
  const maxPrice =
    projects.length > 0 ? Math.max(...projects.map((project) => project.goal_amount)) : 1000

  const [priceRange, setPriceRange] = useState([minPrice, maxPrice])
  const [filteredPriceRange, setFilteredPriceRange] = useState([0, 0])
  const [searchText, setSearchText] = useState('')
  const [minDonationRequired, setMinDonationRequired] = useState(0)
  const [filterMinDonationRequired, setFilterMinDonationRequired] = useState(0)
  const [filteredSearchText, setFilteredSearchText] = useState('')

  const handleFilterButton = () => {
    setFilteredPriceRange(priceRange)
    setFilteredSearchText(searchText)
    setFilterMinDonationRequired(minDonationRequired)
  }

  const filteredProjects = projects.filter((project) => {
    return (
      (project.goal_amount >= filteredPriceRange[0] &&
        project.goal_amount <= filteredPriceRange[1] &&
        project.name_project.toLowerCase().includes(filteredSearchText.toLowerCase()) &&
        project.minimum_donation >= filterMinDonationRequired) ||
      (0 == filteredPriceRange[0] &&
        0 == filteredPriceRange[1] &&
        project.description.toLowerCase().includes(filteredSearchText.toLowerCase()))
    )
  })

  return (
    <div>
      <NavBar />
      <ViewContainer>
        {user && <BigText>Hola {user.name} 👋🏻</BigText>}
        {!user && <BigText>Bienvenido a FundingMe</BigText>}
        <BoldText>¡Explora estos proyectos y aporta para llevarlos a cabo! 🌱</BoldText>
        {loading && (
          <LoadingContainer>
            <Spin size="large">
              <div className="content" />
            </Spin>
          </LoadingContainer>
        )}
        {!loading && (
          <DashboardContainer>
            <ProjectsContainer>
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  id={project.id}
                  name={project.name_project}
                  description={project.description}
                  goalAmount={project.goal_amount}
                  collectedAmount={project.current_amount}
                  image={
                    project.image
                      ? project.image
                      : 'https://source.unsplash.com/800x600/?' + project.name_project
                  }
                  index={index}
                  key={index + filteredPriceRange[0] + filteredPriceRange[1] + filteredSearchText}
                />
              ))}
              {filteredProjects.length === 0 && (
                <BoldText2>No se encontraron proyectos con los filtros realizados 😢</BoldText2>
              )}
            </ProjectsContainer>
            <FiltersContainer
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <FilterTitle>Filtra los proyectos 🔍</FilterTitle>
              <BoldText2>Encuentra tu proyecto favorito 👀</BoldText2>
              <StyledInput
                placeholder="Nombre del proyecto"
                onChange={(e) => setSearchText(e.target.value)}
              />
              <BoldText2>Filtrar por donación mínima 💰</BoldText2>
              <StyledInput
                placeholder="Donación mínima requerida"
                onChange={(e) =>
                  setMinDonationRequired(parseInt(e.target.value.replace(/\D/g, '')))
                }
              />
              <BoldText2>Filtrar por recaudación requerida 💸</BoldText2>
              <Slider
                range
                min={0}
                max={maxPrice}
                defaultValue={[minPrice, maxPrice]}
                onChange={(value) => setPriceRange(value)}
              />
              <text>
                {fixNumber(priceRange[0])} - {fixNumber(priceRange[1])}
              </text>
              <StyledButton
                type="primary"
                onClick={handleFilterButton}
              >
                Filtrar
              </StyledButton>
            </FiltersContainer>
          </DashboardContainer>
        )}
      </ViewContainer>
    </div>
  )
}

const BoldText = styled.h1`
  font-size: 20px;
  font-weight: 500;
  color: ${colors.fontColor};
`

const FilterTitle = styled.h1`
  font-size: 20px;
  font-weight: 500;
  color: ${colors.fontColor};
  margin-top: 10%;
`

const BoldText2 = styled.h1`
  font-size: 16px;
  font-weight: 400;
  color: ${colors.fontColor};
`

export const ViewContainer = styled.div`
  width: 100%;
  padding: 2%;
  display: flex;
  flex-direction: column;
`

export const ProjectsContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 20px;
`

export const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 300px;
`

export const FiltersContainer = styled(motion.div)`
  padding-left: 2%;
  padding-right: 2%;
  margin-left: 2%;
  width: 25%;
  display: flex;
  flex-direction: column;
  text {
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    margin-bottom: 20px;
  }
  background-color: #f5f5f5;
  border-radius: 15px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
`

export const DashboardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 40px;
`

export const BigText = styled.div`
  font-size: 30px;
  font-weight: 500;
  color: ${colors.fontColor};
`

export const StyledInput = styled(Input)`
  border-radius: 2px;
  border: 1px solid #b1b2b5;
  width: 100%;
  margin-bottom: 10px;
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
  margin-bottom: 15%;
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
