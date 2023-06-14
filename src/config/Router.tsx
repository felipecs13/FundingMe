import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../components/Layout'
import NotFound from '../components/NotFound'
import FormProject from '../views/NewProject'
import Login from '../views/Login'
import Register from '../views/Register'

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
          path: 'new',
          element: <FormProject />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
      errorElement: <NotFound />,
    },
    {
      path: '/register',
      element: <Register />,
      errorElement: <NotFound />,
    },
  ])
  return <RouterProvider router={router} />
}

export default Router
