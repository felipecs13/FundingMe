import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/constants';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  name: string;
  description: string;
  goalAmount: number;
  collectedAmount: number;
  image: string;
  index: number;
}

const fixNumber = (number: number) => {
    return number.toLocaleString('es-AR');
}

const ProjectCard: React.FC<ProjectCardProps> = ({ name, description, goalAmount, collectedAmount, image, index }) => {
  const percentage = Math.round((collectedAmount / goalAmount) * 100);
  console.log(index)
  return (
    <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.99 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, transition : { duration: 0.5, delay: index * 0.1 } }}
    >
        <Wrapper>
        <ImageWrapper>
            <img src={image} alt={name} />
        </ImageWrapper>
        <Content>
            <h2>{name}</h2>
            <p className='project-description'>{description}</p>
            <text>
                Este proyecto necesita ${fixNumber(goalAmount)} pesos ⚒️
            </text>
            <ProgressBar>
            <Progress percentage={percentage}>
                <ProgressLabel>{percentage}%</ProgressLabel>
            </Progress>
            </ProgressBar>
        </Content>
        </Wrapper>
    </motion.div>
  );
};

const Wrapper = styled.div`
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  width: 320px;
  height: 320px;
  display: flex;
  flex-direction: column;
  .project-description {
    font-size: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-align: justify;
  }
  text {
    text-align: left;
    font-size: 0.75rem;
    margin-bottom: 10px;
  }
  cursor: pointer;
  background-color: #f5f5f5;

`;

const ImageWrapper = styled.div`
  height: 45%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Content = styled.div`
  padding: 0.75rem;
  width: 100%;
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
    margin-top: 0px;
  }

  p {
    font-size: 0.75rem;
    margin-bottom: 10px;
    margin-top: 0px;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 18px;
  background-color: #eee;
  border-radius: 5px;
  position: relative;
`;

const Progress = styled.div<{ percentage: number }>`
  width: ${({ percentage }) => percentage}%;
  height: 100%;
  background-color: ${colors.primary};
  border-radius: 5px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProgressLabel = styled.span`
  color: white;
  font-size: 0.75rem;
  font-weight: 500; 
  z-index: 1;
`;

export default ProjectCard;