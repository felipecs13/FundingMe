import { useEffect, useState } from 'react'
import { apiUrl } from '../styles/constants'
import { StyledButton } from './Login'
import { IUser } from '../helpers/interfaces'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import styled from 'styled-components'
import { colors } from '../styles/constants'
import { BigText } from './Dashboard'
import { formatterNumber } from '../helpers/formatters'

interface AdminTableData {
  id: number
  name_project: string
  state_project: string
  goal_amount: number
  current_amount: number
}


const AdminTable = () => {
  const [data, setData] = useState<AdminTableData[]>([])
  const [user, setUser] = useState<IUser>({} as IUser)
  const [usersData, setUsersData] = useState<IUser[]>([] as IUser[])

  const fetchData = async () => {
    const response = await fetch(apiUrl + '/projects/')
    const data = await response.json()
    setData(data)
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }

  const fetchUsersData = async () => {
    const response = await fetch(apiUrl + '/users/')
    const data = await response.json()
    setUsersData(data)
  }
  useEffect(() => {
    fetchData()
    fetchUsersData()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(apiUrl + '/projects/' + id, {
        method: 'DELETE',
        headers: {
          Authorization: user.token,
        },
      })
      if (response.status !== 204) {
        throw new Error('Error')
      }
      const data = await response.json()
      setData(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = async (id: number) => {
    window.location.href = '/edit/' + id
  }
  
  const handleGoToProject = async (id: number) => {
    window.location.href = '/project/' + id
  }

  const handleGoToUser = async (id: number) => {
    window.location.href = '/users/' + id
  }

  const approveProject = async (id: number) => {
    try{
      const formData = new FormData()
      formData.append('project[state_project]', 'ACTIVE')
      fetch(`${apiUrl}/projects/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: user.token,
          cors: 'cors',
        },
        body: formData,
      })
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }


  const columns: ColumnsType<AdminTableData> = [
    {
      dataIndex: 'id',
      key: 'id',
      title: 'Id',
    },
    {
      dataIndex: 'name_project',
      key: 'name_project',
      title: 'Nombre del proyecto',
    },
    {
      dataIndex: 'current_amount',
      key: 'current_amount',
      title: 'Dinero recaudado',
      render: (value) => `$ ${formatterNumber(value)}`,
    },
    {
      dataIndex: 'goal_amount',
      key: 'goal_amount',
      title: 'Meta',
      render: (value) => `$ ${formatterNumber(value)}`,
    },
    {
      dataIndex: 'state_project',
      key: 'state_project',
      title: 'Estado',
      render: (value) => {
        if (value === 'ACTIVE') {
          return 'Activo'
        }
        if (value === 'REJECTED') {
          return 'Rechazado'
        }
        return 'Pendiente'
      }
    },
    {
      key: 'details',
      render: (row) => (
        <CustomButton
          type="primary"
          onClick={() => handleGoToProject(row.id)}
        >
          Ver Detalles
        </CustomButton>
      ),
      title: 'Detalles',
    },
    {
      key: 'edit',
      title: 'Editar',
      render: (row) => (
        <CustomButton
          type="primary"
          onClick={() => handleEdit(row.id)}
        >
          Editar
        </CustomButton>
      ),
    },
    {
      key: 'approve',
      render: (row) => (
        (row.state_project === 'PENDING') ? (
        <CustomButton
          type="primary"
          onClick={() => approveProject(row.id)}
        >
          Aprobar proyecto
        </CustomButton>
        ) : (
          <CustomButton
            type="primary"
            disabled
          >
            Aprobar proyecto
          </CustomButton>
        )
      ),
      title: 'Aprobar',
    },
    {
      key: 'delete',
      render: (row) => (
        <CustomButton
          type="primary"
          onClick={() => handleDelete(row.id)}
        >
          Eliminar
        </CustomButton>
      ),
      title: 'Eliminar',
    },
  ]

  const columnsUsers: ColumnsType<IUser> = [
    {
      dataIndex: 'id',
      key: 'id',
      title: 'Id',
    },
    {
      dataIndex: 'email',
      key: 'email',
      title: 'Email',
    },
    {
      dataIndex: 'rut',
      key: 'rut',
      title: 'RUT',
    },
    {
      dataIndex: 'name',
      key: 'name',
      title: 'Nombre',
    },
    {
      key: 'details',
      render: (row) => (
        <CustomButton
          type="primary"
          onClick={() => handleGoToUser(row.id)}
        >
          Ver Detalles
        </CustomButton>
      ),
      title: 'Detalles',
    },
  ]

  return (
    (user.is_admin === true) ?(
      <Wrapper>
        <BigText>Gestión de proyectos</BigText>
        <Table
          columns={columns}
          dataSource={data}
        />
        <BigText>Gestión de usuarios</BigText>
        <Table
          columns={columnsUsers}
          dataSource={usersData}
        />
      </Wrapper>
    )
    : (
      <Wrapper>
        <BigText>No tienes permisos para ver esta página</BigText>
      </Wrapper>
    )
  )
}

const CustomButton = styled(StyledButton)`
  color: white;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 40px;
  padding: 40px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: ${colors.backgroundCard};
`

export default AdminTable
