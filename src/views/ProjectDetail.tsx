import { useState, useEffect } from 'react';
import { apiUrl } from '../styles/constants';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Layout';

const ProjectDetail = () => {
  const [project, setProject] = useState<Project>({} as Project)
  const [loading, setLoading] = useState<boolean>(true)
  const { id } = useParams<Record<string, string>>();
  

  const fetchProject = async () => {
      try {
        const response = await fetch(apiUrl + '/projects/'+ id)
        const data = await response.json()
        setProject(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
        console.log(loading)
      }
    }
    useEffect(() => {
      setLoading(true)
      fetchProject()
    }, [])

    interface Project {
      name_project: string;
      description: string;
      image: string;
      goal_amount: number;
      current_amount: number;
    }

  return (
      <div>
        <Navbar />
          <h1>Project Detail</h1>
          <div style={{ width: 1100 }}>
              <p>Project Name: {project.name_project}</p>
              <p>Project Description: {project.description}</p>
              <ImageWrapper>
                <img src={project.image ? project.image : "https://source.unsplash.com/800x600/?" + project.name_project} alt={project.name_project} />
              </ImageWrapper>
              <p>Project Goal: {project.goal_amount}</p>
              <p>Project Collected: {project.current_amount}</p>
          </div>
      </div>
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
`;

export default ProjectDetail;