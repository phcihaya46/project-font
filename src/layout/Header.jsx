import {Link, useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth';

const guestNav = [
  { to : '/', text: 'Login' },
  { to : '/register', text: 'Register' },
]

const userNav = [
  { to : '/', text: 'Home' },
  // { to : '/newType', text: 'product Type' },
  // { to : '/new', text: 'product' },
]
const adminNav = [
  { to : '/newType', text: 'product Type' },
  { to : '/new', text: 'product' },
]

export default function HeaderAdmin() {
  const {user, logout} = useAuth()
  const finalNav = user?.id 
    ? user.role === "ADMIN"
      ? adminNav
      : userNav
    : guestNav

  const navigate = useNavigate()

  const hdlLogout = () => {
    logout()
    navigate('/')
  }
  return (
    <nav className="flex justify-center items-center pt-2 bg-gray-100 ">
 
     <div className="dropdown dropdown-hover px-20">
      <div  role="button" className="btn ">หมวดหมู่หนังสือ</div>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2  bg-base-100 rounded-box w-52">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div>
      <a href="#" className="navbar-link px-20">หนังสือขายดี</a>
      <a href="#" className="navbar-link px-20">ใหม่</a>
      
  </nav>
  );
}
