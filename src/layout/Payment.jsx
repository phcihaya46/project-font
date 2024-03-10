import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Payment() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };
  const [cartItems, setCartItems] = useState([]);
  const [product, setProduct] = useState([]);
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
    fetchCart();

    fetchProducts();

    fetchUserInfo();

    
  }, []);

  // useEffect(() => {
  //   // คำนวณราคารวมเมื่อ cartItems มีการเปลี่ยนแปลง
  //   const totalPrice = cartItems.reduce((acc, item) => {
  //   const productInfo = product.find(prod => prod.id === item.productId);
  //   return acc + productInfo.price;
  // }, 0);
  //   setTotalPrice(totalPrice);

  // }, [cartItems,product]);

  // const navigate = useNavigate();

  // const hdlPayment = () => {
  //   navigate('/payment');
  // };


  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");

      // สร้างออบเจ็กต์ใหม่สำหรับการสั่งซื้อ
      const newOrder = {
        datetime: new Date(), // กำหนดวันเวลาปัจจุบัน
        status: "UNPAID",
        total: totalPrice,
        productId: productId

      };
      // console.log(newOrder)
      // ส่งคำสั่งซื้อไปยังเซิร์ฟเวอร์
      await axios.post("http://localhost:8000/auth/orderProduct", newOrder, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("สั่งซื้อสินค้าสำเร็จ");
      window.location.href = "/";
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order");
    }
  };


  return (
    <>
      <div className="flex-1 pt-5 text-center">
        <strong>
          <a className="text-xl  ">รายละเอียดคำสั่งซื้อ</a>
        </strong>
        <hr className="border-t border-gray-500 my-3 w-4/5 justify-center flex m-36" />
        <table className="table flex table-zebra">
          <tbody>
            {product &&
              cartItems &&
              cartItems.map((item) => (
                <ProductItem key={item.id} item={item} product={product} />
              ))}
          </tbody>
        </table>
        <hr className="border-t border-gray-500 my-3 w-4/5 justify-center flex m-36" />
        <strong>
          {/* {" "} */}
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

          <hr className="border-t my-3 w-4/5 justify-center flex m-36" />
        </form>
        <label>
          <input
            type="radio"
            name="payment-method"
            className="radio radio-secondary text-center"
            value="cash-on-delivery"
            checked={selectedPaymentMethod === "cash-on-delivery"}
            onChange={handlePaymentMethodChange}
          />
          ชำระเงินปลายทาง
        </label>
        <hr className="border-t my-3 w-4/5 justify-center flex m-36" />
        <button
          className="btn btn-wide bg-red-500 pt-2"
          onClick={ handleCheckout}
        >
          ชำระเงิน
        </button>
      </div>
    </>
  );
}

function ProductItem({ item, product }) {
  const {  name, url } = product.find((el) => el.id === item.productId);
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
  fetchCart();
  return (
    <tr>
      <th>
        <figure>
          <img src={url} alt="book" className="px-10 pt-10 max-w-xs h-48" />
        </figure>
      </th>
      <th>{name}</th>

      {/* <th>{price}</th> */}
    </tr>
  );
}
