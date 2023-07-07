import { useEffect, useState } from 'react';
import { apiUrl } from '../styles/constants';
import { Button } from 'antd';

interface AdminTableData {
    id: number;
    name_project: string;
    status: string;
    goal_amount: number;
    current_amount: number;
}

interface User {
    token: string
    id: number
    email: string
    rut: string
    name: string
  }

const AdminTable = () => {
    const [data, setData] = useState<AdminTableData[]>([]);
    const [user, setUser] = useState<User>({ token: '', id: 0, email: '', rut: '', name: '' })

    
    useEffect(() => {
        const fetchData = async () => {
        const response = await fetch(apiUrl + '/projects/');
        const data = await response.json();
        setData(data);
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
        };
        fetchData();
    }, []);

    const handleDelete = async (id: number) => {
        try {
        const response = await fetch(apiUrl + '/projects/' + id, {
            method: 'DELETE',
            headers: {
                Authorization: user.token,
            },
        });
        console.log(response);
        if (response.status !== 204) {
            throw new Error('Error');
        }
        const data = await response.json();
        setData(data);
        }
        catch (error) {
            console.log(error);
        }
    };

    const handleEdit = async (id: number) => {
        window.location.href = '/edit/' + id;
    };
    
    return (
        <div>
        <h1>Admin Table</h1>
        <table>
            <thead>
            <tr>
                <th>id</th>
                <th>Nombre del proyecto</th>
                <th>Dinero Recaudado</th>
                <th>Meta</th>
                <th>Estado</th>
                <th>Editar</th>
                <th>Eliminar</th>
            </tr>
            </thead>
            <tbody>
            {data.map((row) => (
                <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name_project}</td>
                <td>{row.current_amount}</td>
                <td>{row.goal_amount}</td>
                <td>{row.status}</td>
                <td>
                <Button onClick={() => handleEdit(row.id)}>Editar</Button>
                </td>
                <td>
                <Button onClick={() => handleDelete(row.id)}>Eliminar</Button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
    }
export default AdminTable;