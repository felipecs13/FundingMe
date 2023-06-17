import styled from 'styled-components'
import { useState } from 'react'
import { colors } from '../styles/constants'
import { Form, Button, Input, Slider } from 'antd'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { motion } from 'framer-motion'

const fixNumber = (number : number) => {
  return "$" + Number(number).toLocaleString('es-AR');
};

const Login = () => {

  const projects = [
    {
      name: "Construyendo Sonrisas",
      description: "Construyendo Sonrisas es un proyecto que tiene como objetivo brindar asistencia médica y dental gratuita a comunidades de escasos recursos. Queremos proporcionar servicios de salud bucal y tratamientos médicos básicos para mejorar la calidad de vida de las personas.",
      goalAmount: 500000,
      collectedAmount: 250000,
      image: "https://source.unsplash.com/800x600/?smile",
    },
    {
      name: "Educación para Todos",
      description: "Educación para Todos es una iniciativa que busca proveer materiales educativos y recursos didácticos a escuelas rurales en zonas remotas. Nuestro objetivo es garantizar que los niños tengan acceso a una educación de calidad, independientemente de su ubicación geográfica.",
      goalAmount: 300000,
      collectedAmount: 120000,
      image: "https://source.unsplash.com/800x600/?education",
    },
    {
      name: "Alimentando Esperanzas",
      description: "Alimentando Esperanzas es un proyecto que tiene como meta combatir la malnutrición infantil en comunidades vulnerables. A través de programas de alimentación balanceada y educación nutricional, buscamos mejorar la salud y el bienestar de los niños y sus familias.",
      goalAmount: 800000,
      collectedAmount: 400000,
      image: "https://source.unsplash.com/800x600/?kids",
    },
    {
      name: "Hogar Seguro",
      description: "Hogar Seguro es una iniciativa que se dedica a brindar refugio y apoyo a mujeres y niños víctimas de violencia doméstica. Nuestro objetivo es proporcionar un entorno seguro y empoderador, además de ofrecer servicios de asesoramiento y capacitación para fomentar la autonomía de las sobrevivientes.",
      goalAmount: 200000,
      collectedAmount: 80000,
      image: "https://source.unsplash.com/800x600/?home",
    },
    {
      name: "Cultivando Oportunidades",
      description: "Cultivando Oportunidades es un proyecto que promueve la agricultura sostenible en comunidades rurales. Buscamos enseñar técnicas de cultivo ecológicas, impulsar el emprendimiento agrícola y mejorar las condiciones de vida de los agricultores, fomentando la seguridad alimentaria y el desarrollo económico local.",
      goalAmount: 400000,
      collectedAmount: 300000,
      image: "https://source.unsplash.com/800x600/?agriculture",
    },
    {
      name: "Arte en Acción",
      description: "Arte en Acción es una iniciativa que busca llevar actividades artísticas y culturales a niños y jóvenes en situaciones de vulnerabilidad. A través de talleres de pintura, música y danza, buscamos fomentar la creatividad, fortalecer la autoestima y promover la inclusión social.",
      goalAmount: 600000,
      collectedAmount: 450000,
      image: "https://source.unsplash.com/800x600/?art",
    },
  ];

  const minPrice = Math.min(...projects.map((project) => project.goalAmount));
  const maxPrice = Math.max(...projects.map((project) => project.goalAmount));

  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [filteredPriceRange, setFilteredPriceRange] = useState([minPrice, maxPrice]);
  const [searchText, setSearchText] = useState("");
  const [filteredSearchText, setFilteredSearchText] = useState("");

  const handleFilterButton = () => {
    setFilteredPriceRange(priceRange);
    setFilteredSearchText(searchText);
  };

  const filteredProjects = projects
    .filter((project) => project.goalAmount >= filteredPriceRange[0] && project.goalAmount <= filteredPriceRange[1])
    .filter((project) => project.name.toLowerCase().includes(filteredSearchText.toLowerCase()))

  return (
      <ViewContainer>
        <BigText>Hola User 👋🏻</BigText>
        <BoldText>¡Explora estos proyectos y aporta para llevarlos a cabo! 🌱</BoldText>

        <DashboardContainer>
          <ProjectsContainer>
            {filteredProjects
              .map((project, index) => (
                <ProjectCard
                  name={project.name}
                  description={project.description}
                  goalAmount={project.goalAmount}
                  collectedAmount={project.collectedAmount}
                  image={project.image}
                  index={index}
                  key={index + filteredPriceRange[0] + filteredPriceRange[1] + filteredSearchText}
                />
              ))}
            {filteredProjects.length === 0 && <BoldText2>No se encontraron proyectos con los filtros realizados 😢</BoldText2>}
          </ProjectsContainer>
            <FiltersContainer
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay : 0.6 }}
            >
              <FilterTitle>Filtra los proyectos 🔍</FilterTitle>
              <BoldText2>Encuentra tu proyecto favorito 👀</BoldText2>
              <StyledInput
                placeholder="Nombre del proyecto"
                onChange={(e) => setSearchText(e.target.value)}
              />
              <BoldText2>Filtrar por recaudación requerida 💸</BoldText2>
              <Slider
                range
                min={minPrice}
                max={maxPrice}
                defaultValue={[minPrice, maxPrice]}
                onChange={(value) => setPriceRange(value)}
                trackStyle={{ backgroundColor: colors.primary }}
                handleStyle={{ borderColor: colors.primary }}
              />
              <text>
                {fixNumber(priceRange[0])} - {fixNumber(priceRange[1])}
              </text>
              <StyledButton type="primary" onClick={handleFilterButton}>Filtrar</StyledButton>
            </FiltersContainer>
        </DashboardContainer>
      </ViewContainer>
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
`;

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
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
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
