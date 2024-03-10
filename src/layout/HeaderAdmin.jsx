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
  const hdlorder = () => {
    navigate('/orderAdmin')
  }
  

  return (
    <ul>
    <div className="navbar bg-base-100">
<div className="navbar-start">
<a className="btn btn-ghost text-xl">ADMIN</a>

</div>


<div className="navbar-center hidden lg:flex ">
<ul className="menu menu-horizontal px-1 ">
<li><a onClick={hdlproduct}>Add Book</a></li>
<li><a onClick={hdlNewtype}>Add Type</a></li>
<li><a onClick={hdlCustomer}>User</a></li>
<li><a onClick={hdlorder}>Order</a></li>



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