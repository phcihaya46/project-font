import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function ProductDetail() {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/auth/getproduct/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);
  const handleAddToCart = async (item) => {
    // const existingCartItem = cartItems.find(cartItem => cartItem.product.id === item.id);
    // if (existingCartItem) {
    //   // return;
    //   alert('สินค้านี้มีอยู่ในตะกร้าสินค้าแล้ว');
    // }
    const input = {
      productId: item.id,
      
    }

    try {
      
      const token = localStorage.getItem('token');
      await axios.post("http://localhost:8000/auth/cartproduct1", input, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // console.log(cartItems)
      alert('Added to cart successfully');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart');
    }
  };


  return (
    <div className="card card-side  mt-10 m-48">
    <figure><img src={product.url}  className='rounded-lg mt-10 ml-10 w-max-s h-96 ' alt="book" /></figure>
    <div className="card-body">
    <div className="text-3xl mb-5 ml-20 font-bold">{product.name}</div>

    <label className=" w-full max-w-xs ml-20 pt-10">
              <label className=" flex items-center gap-2 max-w-xs">
                <p>ผู้แต่ง: {product.author}</p>
              </label>
            </label>
             
    <label className=" w-full max-w-xs ml-20 pt-10">
              <label className=" flex items-center gap-2 max-w-xs">
                <p>รายละเอียด: {product.decription}</p>
              </label>
            </label>
             

            <label className=" w-full max-w-xs ml-20 pt-10">
              <label className=" flex items-center gap-2 max-w-xs">
                <p>ราคา: {product.price} ฿</p>
              </label>
            </label>
           <div className="card-actions justify-center">
            <button className="btn bg-yellow-500 rounded-full text-black" onClick={() => handleAddToCart(product)}>เพิ่มใส่ตะกร้า</button>
          </div>
         
    </div>
  </div>
  );
}
