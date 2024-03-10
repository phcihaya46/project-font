import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function OrderUser() {
  // const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  // const handlePaymentMethodChange = (event) => {
  //   setSelectedPaymentMethod(event.target.value);
  // };
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const order = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/auth/getOrder', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrder(response.data.order);
        // console.log(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    order();
  }, []);    
 



  return (
    <>
      <div className="flex-1 pt-5 text-center">
      {/* {order.map((item) => (
        <div key={item.id} className="card card-compact w-60 bg-base-100 shadow-xl cursor-pointer active:shadow-lg active:translate-x-2 active:translate-y-2">
          <figure><img src={item.url} alt="book" className='px-10 pt-10' /></figure>
          <div className="card-body font-bold">
            <h2 className="card-title">{item.name}</h2>
            <p className="cart-price text-red-500">{item.price} บาท</p>
            <div className="card-actions justify-center">
              <button className="btn bg-yellow-500 rounded-full text-black" onClick={() => handleAddToCart(item)}>เพิ่มใส่ตะกร้า</button>
            </div>
          </div>
        </div>
      ))} */}
      </div>
    </>
  );
}


