import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from '../components/NotFound'
import FormProject from '../views/NewProject'
import Login from '../views/Login'
import Register from '../views/Register'
import Dashboard from '../views/Dashboard'
import ProjectDetail from '../views/ProjectDetail'
import Profile from '../views/Profile'
import Layout from '../components/Layout'

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {index: true, element: <Dashboard />},
        {
          path: 'new',
          element: <FormProject />,
          errorElement: <NotFound />,
        },
        {
          path: 'project/:id',
          element: <ProjectDetail />,
          errorElement: <NotFound />,
        },
        {
          path: 'me',
          element: <Profile />,
          errorElement: <NotFound />,
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
      ],
    },
  ])
  // const router = createBrowserRouter([
  //   {
  //     path: '/',
  //     element: <Dashboard />,
  //     errorElement: <NotFound />,
  //   },
  //   {
  //     path: '/login',
  //     element: <Login />,
  //     errorElement: <NotFound />,
  //   },
  //   {
  //     path: '/register',
  //     element: <Register />,
  //     errorElement: <NotFound />,
  //   },
  //   {
  //     path: '/new',
  //     element: <FormProject />,
  //     errorElement: <NotFound />,
  //   },
  //   {
  //     path: '/project/:id',
  //     element: <ProjectDetail />,
  //     errorElement: <NotFound />,
  //   },
  //   {
  //     path: '/me',
  //     element: <Profile />,
  //     errorElement: <NotFound />,
  //   },
  // ])
  return <RouterProvider router={router} />
}

export default Router
