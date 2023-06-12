import { createBrowserRouter, Form, RouterProvider } from 'react-router-dom'
import Layout from '../components/Layout'
import NotFound from '../components/NotFound'
import FormProject from '../components/form'

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <NotFound />,
    },
    {
      path: '/new',
      element: <FormProject />,
      errorElement: <NotFound />,
    }
  ])
  return <RouterProvider router={router} />
}

export default Router
