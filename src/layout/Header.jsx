import {Link, useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import React, { useState, useEffect } from 'react';
import axios from 'axios';    


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

export default function Header() {
  const [product_type, setProductTypes] = useState([]);
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
  const handleCategoryClick = (productId) => {
    navigate(`/category/${productId}`)
  }
  useEffect(() =>{
    const getProList = async ()=>{
      const token = localStorage.getItem('token')
      const rs1 = await axios.get('http://localhost:8000/admin/getProList', {
          headers : { Authorization : `Bearer ${token}`}
        })
        setProductTypes(rs1.data.product_type)
    }
    getProList();
  
  },[])
 
  
  return (
    <nav className="flex justify-center items-center pt-2 bg-gray-100 ">
 
 {/* <div className="dropdown dropdown-hover px-20">
  <div role="button" className="btn">
    หมวดหมู่หนังสือ
  </div>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 bg-base-100 rounded-box w-52">
    {product_type.map((type) => (
      <li key={type.id} value={type.id} onClick={() => handleCategoryClick(type.id)}>
        <a >{type.name}</a>
      </li>
    ))}
  </ul>
</div> */}

      
  </nav>
  );
}
