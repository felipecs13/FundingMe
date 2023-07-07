import styled from 'styled-components'
import { useState, useEffect, SetStateAction } from 'react'
import { colors, apiUrl } from '../styles/constants'
import { Form, Button, Input, Slider, Spin } from 'antd'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { motion } from 'framer-motion'
import { message } from 'antd'
import { IDataProject, IUser } from '../helpers/interfaces'

const fixNumber = (number: number) => {
  return '$' + Number(number).toLocaleString('es-AR')
}

const Dashboard = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [sliderVisible, setSliderVisible] = useState<boolean>(false)
  const [projects, setProjects] = useState<IDataProject[]>([])
  const [user, setUser] = useState<IUser>({} as IUser)
  const [maxPrice, setMaxPrice] = useState<number>(0)
  const [priceRange, setPriceRange] = useState<number[]>([0, 0])

  const fetchProjects = async () => {
    try {
      const response = await fetch(apiUrl + '/projects/')
      if (response.status !== 200) {
        throw new Error('Error')
      }
      const data = await response.json()
      setProjects(data)
      const maxPrice = Math.max(...data.map((project: IDataProject) => project.goal_amount))
      setPriceRange([0, maxPrice])
      setMaxPrice(maxPrice)
      setSliderVisible(true)
    } catch (error) {
      message.error('Error: problemas al cargar, intente más tarde.')
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
                  collectedAmount={project.current_amount}
                  description={project.description}
                  goalAmount={project.goal_amount}
                  id={project.id}
                  image={
                    project.image
                      ? project.image
                      : 'https://source.unsplash.com/800x600/?' + project.name_project
                  }
                  index={index}
                  key={index + filteredPriceRange[0] + filteredPriceRange[1] + filteredSearchText}
                  name={project.name_project}
                />
              ))}
              {filteredProjects.length === 0 && (
                <BoldText2>No se encontraron proyectos con los filtros realizados 😢</BoldText2>
              )}
            </ProjectsContainer>
            <FiltersContainer
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <FilterTitle>Filtra los proyectos 🔍</FilterTitle>
              <BoldText2>Encuentra tu proyecto favorito 👀</BoldText2>
              <StyledInput
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setSearchText(e.target.value)
                }
                placeholder="Nombre del proyecto"
              />
              <BoldText2>Filtrar por donación mínima 💰</BoldText2>
              <StyledInput
                onChange={(e: { target: { value: string } }) =>
                  setMinDonationRequired(parseInt(e.target.value.replace(/\D/g, '')))
                }
                placeholder="Donación mínima requerida"
              />
              <BoldText2>Filtrar por recaudación requerida 💸</BoldText2>
              {sliderVisible && (
                <Slider
                  defaultValue={[priceRange[0], priceRange[1]]}
                  max={maxPrice}
                  min={0}
                  onChange={(value) => setPriceRange(value)}
                  range
                />
              )}
              <text>
                {fixNumber(priceRange[0])} - {fixNumber(priceRange[1])}
              </text>
              <StyledButton
                onClick={handleFilterButton}
                type="primary"
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

export default Dashboard
