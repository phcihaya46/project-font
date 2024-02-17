import HeaderLogin from "./HeaderLogin";
import axios from 'axios'
import {useEffect, useState} from 'react'

export default function UserHome() {
  const [todos, setTodos] = useState([])

  useEffect( ()=>{
    const run = async()=>{
      let token = localStorage.getItem('token')
      const rs = await axios.get('http://localhost:8889/cart', {
        headers : { Authorization : `Bearer ${token}`}
      })
      setTodos(rs.data.todos)
    }
    run()
  }, [] )

  return (
    <>
      <div className="flex-1 text-center pt-5">
    <a className="text-xl">CART</a>
    <hr className="border-t border-gray-500 my-3 w-4/5 justify-center flex m-36" />

    <hr className="border-t border-gray-500 my-3 w-4/5 justify-center flex m-36" />
    <a className="text-xl">ADDRESS</a>
    <hr className="border-t border-gray-500 my-3 w-4/5 justify-center flex m-36" />
    <button className="btn btn-wide bg-red-500 pt-2">ชำระเงิน</button>
  </div>
    </>
  )
}
