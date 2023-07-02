import { useEffect, useState } from 'react';
import { apiUrl } from '../styles/constants';
import { Select } from 'antd';
interface AdminTableData {
    id: number;
    name_project: string;
    status: string;
    goal_amount: number;
    current_amount: number;
}

const AdminTable = () => {
    const [data, setData] = useState<AdminTableData[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
        const response = await fetch(apiUrl + '/projects/');
        const data = await response.json();
        setData(data);
        };
        fetchData();
    }, []);

    const handleDelete = async (id: number) => {
        try {
        const response = await fetch(apiUrl + '/projects/' + id, {
            method: 'DELETE',
        });
        if (response.status !== 200) {
            throw new Error('Error');
        }
        const data = await response.json();
        setData(data);
        } catch (error) {
        message.error('Error: problemas al eliminar, intente más tarde.');
        }
    };

    const handleEdit = async (id: number) => {
        window.location.href = '/projects/edit/' + id;
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
                <button onClick={() => handleEdit(row.id)}>Editar</button>
                <button onClick={() => handleDelete(row.id)}>Eliminar</button>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
    }
export default AdminTable;