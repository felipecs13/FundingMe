import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { LoadingContainer } from './Dashboard'
import { apiUrl } from '../styles/constants'
import { Spin } from 'antd'
import { BigText } from './Login'
import { colors } from '../styles/constants'
import { message } from 'antd'
import { IProfile, IUser } from '../helpers/interfaces'

const Profile = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [dataUser, setDataUser] = useState<IProfile>({} as IProfile)
  const [user, setUser] = useState<IUser>({} as IUser)
  const [loadingGeneral, setLoadingGeneral] = useState<boolean>(true)

  const getUserData = async (id: number, token: string) => {
    try {
      const response = await fetch(apiUrl + `/users/${id}`, {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      })
      if (response.status !== 200) {
        throw new Error('Error')
      }
      const data = await response.json()
      setUser(data)
      setDataUser({
        image: data.image_url,
        name: data.name,
        email: data.email,
        rut: data.rut,
        bankAccount: data.bank_account,
      })
    } catch (error) {
      message.error('Error: problemas al cargar, intente más tarde.')
      window.location.href = '/'
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      const parsedUser = JSON.parse(user)
      getUserData(parsedUser.id, parsedUser.token)
    } else {
      setLoading(false)
    }
  }, [])

  if (Object.keys(user).length === 0 && !loading) {
    return (
      <div>
        <BigText>Debes iniciar sesión para ver tu perfil</BigText>
      </div>
    )
  }

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
            <Title>Datos</Title>
            <FieldInfo>
              <BoldText>Nombre</BoldText>
              <div>{dataUser.name}</div>
            </FieldInfo>
            <FieldInfo>
              <BoldText>Email</BoldText>
              <div>{dataUser.email}</div>
            </FieldInfo>
            <FieldInfo>
              <BoldText>Rut</BoldText>
              <div>{dataUser.rut}</div>
            </FieldInfo>
          </>
        )}
      </Card>
    </>
  )
}

export const Card = styled.div`
  margin: 3rem;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  max-width: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  color: ${colors.fontColor};
  font-size: 14px;
  background-color: ${colors.backgroundCard};
`

const FieldInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`

export const Title = styled(BigText)`
  margin: 0 0 1rem 0;
`

const BoldText = styled.div`
  font-weight: bold;
`

export default Profile
