import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Product() {
  const [userId, setUserId] = useState("");
  const [product, setProduct] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      setUserId(userId);
    }

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
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8000/auth/getCartItems",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const navigate = useNavigate();

  const hdlDetail = () => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = async (item) => {
    const isItemInCart = cartItems.find(cartItem => cartItem.productId === item.id);

    if (isItemInCart) {
      // แสดงข้อความแจ้งเตือน
      alert("สินค้านี้มีอยู่ในตะกร้าแล้ว");
    } else {
  
    const input = {
      productId: item.id,
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8000/auth/cartproduct", input, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(cartItems)
      
      alert("Added to cart successfully");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart");
    }
  }
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 gap-4 pt-12 ">
      {product.map((item) => (
        <div
          key={item.id}
          className="card card-compact w-60 bg-base-100 shadow-xl cursor-pointer active:shadow-lg active:translate-x-2 active:translate-y-2"
        >
          <Link to={`/product/${item.id}`}>
            <figure>
              <img src={item.url} alt="book" className="px-10 pt-10" />
            </figure>
            <div className="card-body font-bold">
              <h2 className="card-title">{item.name}</h2>
              <p className="cart-price text-red-500">{item.price} บาท</p>
            </div>
          </Link>
          <div className="card-actions justify-center pb-10">
            <button
              className="btn bg-yellow-500 rounded-full text-black"
              onClick={() => handleAddToCart(item)}
            >
              เพิ่มใส่ตะกร้า
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
