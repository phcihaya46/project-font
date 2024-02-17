import {Link, useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const guestNav = [
    { to : '/' },
  ]
  
  const userNav = [
    { to : '/', text: 'Home' },
  
  ]
  
export default function Header() {
    const {user, logout} = useAuth()
    const finalNav = user?.id ? userNav : guestNav
  
    const navigate = useNavigate()
  
    const hdlLogout = () => {
      logout()
      navigate('/')
    }
  
  
    return (
        <div className="flex-1 text-center pt-10">
          <a className="text-xl s">บัญชีของ {user?.id ? user.username : 'Guest'}</a>
        <hr className="border-t border-gray-500 my-3 w-4/5 justify-center flex m-36" />
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
          <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"  />
          </ul>
        </div>
      </div>
    );
  }