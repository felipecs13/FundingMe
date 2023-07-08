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
  status: string
  goal_amount: number
  current_amount: number
}

const AdminTable = () => {
  const [data, setData] = useState<AdminTableData[]>([])
  const [user, setUser] = useState<IUser>({} as IUser)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(apiUrl + '/projects/')
      const data = await response.json()
      setData(data)
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    }
    fetchData()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(apiUrl + '/projects/' + id, {
        method: 'DELETE',
        headers: {
          Authorization: user.token,
        },
      })
      console.log(response)
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
      dataIndex: 'status',
      key: 'status',
      title: 'Estado',
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

  return (
    <Wrapper>
      <BigText>Gestión de proyectos</BigText>
      <Table
        columns={columns}
        dataSource={data}
      />
    </Wrapper>
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
