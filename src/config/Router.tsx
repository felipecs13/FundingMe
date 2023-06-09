import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import NotFound from '../components/NotFound'
import FormProject from '../views/NewProject'
import Login from '../views/Login'
import Register from '../views/Register'
import Dashboard from '../views/Dashboard'
import ProjectDetail from '../views/ProjectDetail'
import Profile from '../views/Profile'
import Layout from '../components/Layout'
import AdminTable from '../views/AdminTable'
import MyProjects from '../views/MyProjects'
import FormEditProject from '../views/EditProject'
import UserDetails from '../views/UserDetails'

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        {
          path: 'new',
          element: <FormProject />,
          errorElement: <NotFound />,
        },
        {
          path: 'project/:id',
          element: <ProjectDetail/>,
          errorElement: <NotFound />,
        },
        {
          path: 'me',
          element: <Profile />,
          errorElement: <NotFound />,
        },
        {
          path: 'admin',
          element: <AdminTable />,
          errorElement: <NotFound />,
        },
        {
          path: 'my-projects',
          element: <MyProjects />,
          errorElement: <NotFound />,
        },
        {
          path: 'edit/:id',
          element: <FormEditProject />,
          errorElement: <NotFound />,
        },
        {
          path: 'users/:id',
          element: <UserDetails />,
          errorElement: <NotFound />,
        },
        {
          element: (
            <Navigate
              replace
              to="/"
            />
          ),
          path: '*',
        },
      ],
    },
    {
      path: 'login',
      element: <Login />,
      errorElement: <NotFound />,
    },
    {
      path: 'register',
      element: <Register />,
      errorElement: <NotFound />,
    },
  ])
  return <RouterProvider router={router} />
}

export default Router
