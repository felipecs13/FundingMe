import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from '../components/NotFound'
import FormProject from '../views/NewProject'
import Login from '../views/Login'
import Register from '../views/Register'
import Dashboard from '../views/Dashboard'

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Dashboard/>,
      errorElement: <NotFound />,
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
    {
      path: '/new',
      element: <FormProject />,
      errorElement: <NotFound />,
    },
  ])
  return <RouterProvider router={router} />
}

export default Router
