import axios from 'axios'
import {useEffect, useState} from 'react'
import HeaderLogin from './HeaderLogin'

export default function UserHome() {
  const [product, setProduct] = useState([])


  useEffect( ()=>{
    const run = async()=>{
      let token = localStorage.getItem('token')
      const rs = await axios.get('http://localhost:8000/product', {
        headers : { Authorization : `Bearer ${token}`}
      })
      setProduct(rs.data.product)
    }
    run()
  }, [] )

  return (
    <>
    <hr className="border-t border-gray-300 my-3" />
    <div className="carousel w-full h-2/4  ">
  <div id="slide1" className="carousel-item relative w-full flex justify-center ">
    <img src="https://t1.blockdit.com/photos/2021/05/609d4c152982ff17a450b1a4_800x0xcover_punjlXHL.jpg" className="object-none object-center" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide4" className="btn btn-circle">❮</a> 
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide2" className="carousel-item relative w-full flex justify-center">
    <img src="https://www.bagindesign.com/wp-content/uploads/2023/10/Book-review-The-Road-Less-Traveled-2023-840x440.jpg" className="object-none object-center" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" className="btn btn-circle">❮</a> 
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide3" className="carousel-item relative w-full">
    <img src="https://daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg" className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" className="btn btn-circle">❮</a> 
      <a href="#slide4" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide4" className="carousel-item relative w-full">
    <img src="https://daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg" className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide3" className="btn btn-circle">❮</a> 
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
  </div>
  
</div>
<div className="card card-compact w-60 bg-base-100 shadow-xl pb-12  ">
  <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="book" /></figure>
  <div className="card-body">
    <h2 className="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions justify-center">
      <button className="btn bg-yellow-500 rounded-full text-black ">เพิ่มใส่ตะกร้า</button>
    </div>
  </div>
</div>
<hr className="border-t border-gray-200 my-3" />
    {/* <HeaderLogin/> */}
    {/* { JSON.stringify(product)} */}
    </>
  )
}