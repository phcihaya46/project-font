import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderItem from "../components/Test";

export default function OrderAdmin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/auth/AddmingetOrder"
        );
        setOrders(response.data.orders); // แก้ไขนี้เพื่อให้ใช้ข้อมูล order ที่อยู่ใน response.data.order
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <table className="table flex">
        <thead>
          <tr>
            <th>ลำดับคำสั่งซื้อ</th>
            <th>ชื่อสินค้า</th>
            <th>ราคา</th>
            <th>สถานที่จัดส่ง</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

