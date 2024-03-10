import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom'
import LoginForm from '../layout/loginForm'
import RegisterForm from '../layout/registerForm'
import useAuth from '../hooks/useAuth'
import Header from '../layout/Header'
import UserHome from '../layout/UserHome'
import Test from '../layout/proType'
import NewProduct from '../layout/NewProduct'
import HeaderLogin from '../layout/HeaderLogin'
import HeaderAdmin from '../layout/HeaderAdmin'
import Customer from '../layout/Customer'
import Cart from '../layout/Cart'
import Profile from '../layout/Profile'
import UpdateProfile from '../layout/UpdateProfile'
import EditProduct from '../components/EditProduct'
import ProductDetail from '../components/ProductDetail'
import New from '../layout/New'
import OrderAdmin from '../layout/OrderAdmin'
import OrderUser from '../layout/OrderUser'
import Payment from '../layout/Payment'


const guestRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      {/* <Header /> */}
      <Outlet />
    </>,
    children: [
      { index: true, element: <LoginForm /> }, 
      { path: '/register', element: <RegisterForm />},


    ]
  }
])

const userRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
    <HeaderLogin />
      <Header />
      <Outlet />
    </>,
    children : [
      { index: true, element: <UserHome /> },
      { path: '/cart', element: <Cart />},
      { path: '/profile', element: <Profile />},
      { path: '/update', element: <UpdateProfile />},
      { path: '/product/:id', element: <ProductDetail />},
      { path: '/category/:productId', element: <New />},
      { path: '/orderuser', element: <OrderUser />},
      { path: '/payment', element: <Payment />},
     
      // { path: '/cart/*', element: <Test1 />},
      
      // { path : '/new', element: <NewProduct />},
      
    ]
  }
])

const adminRouter = createBrowserRouter([
  {
    path:'/',
    element:(
    <>
    <HeaderAdmin />
      <Outlet/>
    </>
    ),
    children:[
      // {index: true, element:<UserHome/>},
      { path : '/newType', element: <Test /> },
      { path : '/new', element: <NewProduct /> },
      {path: '/customer', element:<Customer />},
      {path: '/editProduct', element:<EditProduct />},
      { path: '/orderAdmin', element: <OrderAdmin />},
      // {path: '/protype', element:<ProtypeList />}
    ]
  }
])

export default function AppRouter() {
  const {user} = useAuth()
  const finalRouter = user?.id ? user.role ==='ADMIN'? adminRouter: userRouter : guestRouter
  return (
    <RouterProvider router={finalRouter} />
  )
}