import {Link, useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth';

const guestNav = [
  { to : '/' },
]

const userNav = [
  { to : '/', text: 'Home' },

]




export default function HeaderAdmin() {
  const {user, logout} = useAuth()
  const finalNav = user?.id ? userNav :guestNav


  const navigate = useNavigate()

  const hdlLogout = () => {
    logout()
    navigate('/')
  }
  const hdlproduct = () =>{
    navigate('/new')
  }
  const hdlNewtype = () => {
    navigate('/newType')
  }
  const hdlCustomer = () => {
    navigate('/customer')
  }
  

  return (
    <ul>
    <div className="navbar bg-base-100">
<div className="navbar-start">
<div className="dropdown">
<div tabIndex={0}  className="btn btn-ghost lg:hidden" >
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
</div>
<ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
  <li><a>Item 1</a></li>
  <li>
    <a>Parent</a>
    <ul className="p-2">
      <li><a>Submenu 1</a></li>
      <li><a>Submenu 2</a></li>
    </ul>
  </li>
  <li><a>Item 3</a></li>
</ul>
</div>
<a className="btn btn-ghost text-xl">ADMIN</a>

</div>
<div className="navbar-center hidden lg:flex ">
<ul className="menu menu-horizontal px-1 ">
<li><a onClick={hdlproduct}>Add Product</a></li>
<li><a onClick={hdlNewtype}>Add Type</a></li>
<li><a onClick={hdlCustomer}>User</a></li>



</ul>
</div>
<div className="navbar-end">
{ user?.id && (
      <li>
        <Link to='#' onClick={hdlLogout}>logout</Link>
      </li>
    ) }
</div>
</div>
    

    {/* {finalNav.map( el => (
      <li key={el.to} ><Link to={el.to}>{el.text}</Link>
      </li>
    ))} */}
  </ul>
    )
  }