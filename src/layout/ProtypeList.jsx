import React, { useState, useEffect } from 'react';
import axios from 'axios';


const hdldelete = async e => {
  try{
    e.preventDefault()
    const token = localStorage.getItem('token')
    const rs = await axios.delete('http://localhost:8000/product/deleteProductType'())
   
  }catch(err) {
    alert(err.message)
  }
}

export default function ProductTypeList() {
  const [product_type, setProductTypes] = useState([]);


  useEffect(() => {
  const getProList  = async(req, res, next) => {
      const rs = await axios.get('http://localhost:8000/product/getprolist')
      setProductTypes(rs.data.product_type)
  }
  getProList()
    }, [] )

    
  return (
 <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>No.</th>
                <th>name</th>
                <th>แก้ไข</th>
                <th>ลบ</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {product_type.map((product_type) => (
                <tr>
                  <th>{product_type.id}</th>
                  <th>{product_type.name}</th>
                  <th>  
      <button className="btn bg-orange-500"  >Click me</button>
    </th>
                  <th><button className="btn bg-red-500" onClick={hdldelete}>Click me</button></th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

  );
              }
