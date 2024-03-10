import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart() {
  // const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  // const handlePaymentMethodChange = (event) => {
  //   setSelectedPaymentMethod(event.target.value);
  // };
  // const
  const [cartItems, setCartItems] = useState(null);
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8000/auth/getCartItems",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // console.log(response);
        // alert(555)
        setCartItems(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("http://localhost:8000/auth/me", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/auth/product", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
    fetchUserInfo();

    fetchCart();
  }, []);

  // useEffect(() => {
  //   const totalPrice = cartItems.reduce((acc, item) => {
  //     const productInfo = product.find(prod => prod.id === item.productId);
  //     return acc + productInfo.price;
  //   }, 0);
  //   setTotalPrice(totalPrice);
  // }, [cartItems,product]);

  const navigate = useNavigate();

  const hdlUpdate = () => {
    navigate("/update");
  };
  const hdlPayment = () => {
    navigate("/payment");
  };

  // console.log(product);
  // console.log(cartItems);

  // const handleCheckout = async () => {
  //   try {
  //     const token = localStorage.getItem('token');

  //     // สร้างออบเจ็กต์ใหม่สำหรับการสั่งซื้อ
  //     const newOrder = {
  //       datetime: new Date(), // กำหนดวันเวลาปัจจุบัน
  //       status: 'UNPAID',
  //       total:totalPrice

  //     };
  //     // console.log(newOrder)
  //     // ส่งคำสั่งซื้อไปยังเซิร์ฟเวอร์
  //     await axios.post('http://localhost:8000/auth/orderProduct', newOrder, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     });

  //     alert('Order Placed Successfully');
  //   } catch (error) {
  //     console.error('Error placing order:', error);
  //     alert('Failed to place order');
  //   }
  // };

  // console.log(cartItems)
  // const mapProduct = product?.flatMap(item => item)
  // const mapProduct = product.find(item => item.id)
  // const foundProducts = mapProduct.map(productId => product.find(product => product.id === productId));
  // const mapProduct = cartItems.flatMap(item => item.Detail?.map(detail => detail.productId));
  // const foundProducts = mapProduct.map(productId => product.find(product => product.id === productId));

  // console.log(cartItems);
  // console.log(mapProduct);
  // console.log(foundProducts);

  return (
    <>
      <div className="flex-1 pt-5 text-center">
        <strong>
          <a className="text-xl  ">รถเข็น</a>
        </strong>
        <hr className="border-t border-gray-500 my-3 w-4/5 justify-center flex m-36" />
        <table className="table flex table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>รูป</th>
              <th>ชื่อ</th>
              <th>ราคา</th>
              <th>ลบ</th>
            </tr>
          </thead>
          <tbody>
            {/* {foundProducts && foundProducts.map((item) => (
                <ProductItem key={item.id} item={item}/>
              ))} */}
            {product &&
              cartItems &&
              cartItems.map((item) => (
                <ProductItem key={item.id} item={item} product={product} />
              ))}
          </tbody>
        </table>
        <hr className="border-t border-gray-500 my-3 w-4/5 justify-center flex m-36" />
        <strong>
          {" "}
          <p className="text-right text-red-500 flex ml-36">
            ราคารวม: {totalPrice} บาท
          </p>
        </strong>
        <hr className="border-t border-gray-500 my-3 w-4/5 justify-center flex m-36" />
        <strong>
          <a className="text-xl">ที่อยู่สำหรับการจัดส่ง</a>
        </strong>
        <hr className="border-t my-3 w-4/5 justify-center flex m-36" />
        <form className="flex flex-col gap-2">
          <label className="form-control w-full max-w-xs flex text-left ml-52">
            <p>{user && `${user.firstname} ${user.lastname}`}</p>
            <p>{user && user.phone}</p>
            <p>{user && user.address}</p>
          </label>
          <label className="form-control w-full max-w-xs flex text-right mt-10">
            <a
              className="link link-hover mb-12 text-red-500"
              onClick={hdlUpdate}
            >
              แก้ไขที่อยู่จัดส่ง
            </a>
          </label>
          <hr className="border-t my-3 w-4/5 justify-center flex m-36" />
        </form>
        <button className="btn btn-wide bg-red-500 pt-2" onClick={hdlPayment}>
          ชำระเงิน
        </button>
      </div>
    </>
  );
}

function ProductItem({ item, product }) {
  // console.log(item.url);

  const { price, name, url } = product.find((el) => el.id === item.productId);
  // console.log(findProduct);

  const handleDeleteItem = async () => {
    // alert(productId)
    try {
      const token = localStorage.getItem("token");
      // console.log(productId);
      const productId = item.id;
      await axios.delete(`http://localhost:8000/auth/deleteCart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Delete Successful");
      location.reload();
      // หลังจากลบสำเร็จ ให้ดึงข้อมูลรถเข็นใหม่
      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  // const fetchCart = async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     const response = await axios.get('http://localhost:8000/auth/getCartItems', {
  //       headers: { Authorization: `Bearer ${token}` }
  //     });
  //     setCartItems(response.data);
  //     // console.log(response.data);
  //   } catch (error) {
  //     console.error('Error fetching cart:', error);
  //   }
  // };
  // fetchCart()

  return (
    <tr>
      <th>
        <figure>
          <img src={url} alt="book" className="px-10 pt-10 max-w-xs h-56" />
        </figure>
      </th>
      <th>{name}</th>

      <th>{price}</th>
      <th>
        {/* {" "} */}
        <button className="cart-button">
          <img
            src="\bin-svgrepo-com.png"
            alt="bin"
            className="cart-icon w-10 h-10"
            onClick={() => handleDeleteItem(item.id)}
          />
        </button>
      </th>
    </tr>
  );
}
