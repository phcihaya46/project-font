import React from 'react';

const OrderItem = ({ order }) => {
  // สร้างฟังก์ชันสำหรับตรวจสอบว่า cart.id เป็นเหมือนกันหรือไม่
  const isSameCart = (cartId) => {
    // เปรียบเทียบ cart.id กับ cart.id ของรายการปัจจุบัน
    return cartId === order.cartId;
  };

  return (
    <tr style={{ backgroundColor: isSameCart(order.cart.id) ? '#FF6666' : 'white' }}>
      {/* <td>{order.product.name}</td>  */}
      {/* <td>{order.detail.id}</td> */}
      <td>{order.cart.id}</td>
      {/* <td>{order}</td> */}
      <td>{order.total}</td>
      <td>{order.cart.user.firstname}  {order.cart.user.lastname} {order.cart.user.address}</td>
      <td></td>
    </tr>
  );
};

export default OrderItem;
