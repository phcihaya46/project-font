import axios from 'axios';    
import { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'


export default function product() {
  const [product, setProduct] = useState([])
  const [item, setItem] = useState([])

  useEffect(() => {
    const fetchMenutems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/auth/product', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching menutems:', error);
      }
    };

    fetchMenutems();
  }, []);
  const hdlDelete = async (e, id) =>{
    try {
        e.stopPropagation()
        const token = localStorage.getItem('token')
          const rs = await axios.delete(`http://localhost:8000/admin/deleteProduct/${id}`, {
            headers : { Authorization : `Bearer ${token}`}
          })
          alert('Delete Successful')
          location.reload()
          setTrigger(prv=>!prv)
    } catch (err) {
      console.log(err)
    }
  
  }

  const navigate = useNavigate()

  const hdlEdit = () => {
    navigate('/editProduct')
  }

  return (
    
<div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>No.</th>
                <th>image</th>
                <th>name</th>
                <th>price</th>
                <th>แก้ไข</th>
                <th>ลบ</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {product.map((item) => (
                <tr key={item.id} item ={item}>
                  <th>{item.id}</th>
                  <th><figure><img src={item.url} alt="book" className='px-10 pt-10 max-w-xs max-h-xs' /></figure></th>
                  <th>{item.name}</th>
                  <th>{item.price}</th>
                  {/* <Link to={`/editProduct/${item.id}`}> */}
                  <th><button className="btn btn-warning" onClick={() => document.getElementById(`my_modal_2${item.id}`).showModal()}>แก้ไข</button></th>
                  {/* </Link> */}
                  <th><button className="btn btn-error" type="button"onClick={(e) => hdlDelete(e, item.id)}>ลบสินค้า</button></th>
             
                </tr>
              ))}
            </tbody>
          </table>
          {product.map((item, index) =>(
        <Modal key={index} item={item}/>
      ))}
        </div>
  );
              }  const Modal =({item}) =>{
                const modalId = `my_modal_2${item.id}`;
                const [editData, setEditData] = useState({
                  name: '',
                  price:'',
                  unit: '',
                  decription: '',
                  url: '',
                  protypeId:'',
                  author:''
                })
                const [isEditing, setEditing] = useState(false);
            
                const handleEditCilck = () => {
                  setEditData({ ...item });
                  setEditing(true);
                };
              
                const handleSaveClick = async (e) => {
                  setEditing(false);
                  try{
                    e.stopPropagation()
                    const id = item.id;
                    const apiUrl =`http://localhost:8000/admin/updateproduct/${id}`;
                   
                    await axios.patch(apiUrl, editData);
            
                    location.reload();
                    setEditing(false);
                    document.getElementById(modalId).close();
                  } catch (error) {
                    console.error("เกิดข้อผิดพลาดในการแก้ไข", error);
                  }
                };
              
              
                const handleChange = (e) => {
                  setEditData((prevData) => ({
                    ...prevData,
                    [e.target.name]: e.target.value,
                  }));
                };
            
                return<dialog id={modalId} className="modal">
                {console.log(modalId)}
                <div className="modal-box">
                  <h3 className="font-bold text-lg mb-5 ">
                    แก้ไขข้อมูลประเภทโต๊ะ
                  </h3>
                 <h3 className="text-lg mb-5">ภาพ : {isEditing ? <input type="text" name="url" value={editData.url} onChange={handleChange}></input>: item.url}</h3>
                 <h3 className="text-lg mb-5">ชื่อ : {isEditing ? <input type="text" name="name" value={editData.name} onChange={handleChange}></input>: item.name}</h3>
                 <h3 className="text-lg mb-5">ราคา : {isEditing ? <input type="" name="price" value={editData.price} onChange={handleChange}></input>: item.price}</h3>
                 <h3 className="text-lg mb-5">ประเภท : {isEditing ? <input type="" name="protypeId" value={editData.protypeId} onChange={handleChange}></input>: item.protypeId}</h3>
                 <h3 className="text-lg mb-5">คำอธิบาย : {isEditing ? <input type="text" name="decription" value={editData.decription} onChange={handleChange}></input>: item.decription}</h3>
                 <h3 className="text-lg mb-5">ผู้แต่ง : {isEditing ? <input type="text" name="author" value={editData.author} onChange={handleChange}></input>: item.author}</h3>
                 <div className="flex justify-end">
            {isEditing ? (
            <button className=" btn btn-success" onClick={handleSaveClick}>บันทึก</button>
            ): (
            <button className=" btn btn-warning" onClick={handleEditCilck}>แก้ไข</button>
            )}
                 </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button onClick={() => document.getElementById(modalId).close()}>
                    Close
                  </button>
                </form>
              </dialog>
            };
