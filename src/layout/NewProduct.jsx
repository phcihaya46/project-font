// import axios from "axios";
// import {useState} from "react";
// import ProtypeList from '../layout/ProtypeList'

// export default function NewProduct() {
//   const [input, setInput] = useState({
//     name : '',
//     price : '',
//     unit: '',
//     decription: '',
//     stock: '',
//     url:'',
//     productType:'',
//     user:''
   

//   })

//   const hdlChange = e => {
//     setInput( prv => ( {...prv, [e.target.name] : e.target.value} ))
//   }

//   const hdlSubmit = async e => {
//     try{
//       e.preventDefault()
//       // setInput(prv => ({...prv, dueDate: new Date(prv.dueDate) }))
//       const output = { ...input }
//       const token = localStorage.getItem('token')
//       const rs = await axios.post('http://localhost:8000/product/create', output, {
//         headers : { Authorization : `Bearer ${token}`}
//       })
     
//       alert('Create new OK')
//     }catch(err) {
//       alert(err.message)
//     }
//   }

//   return (
//     <form className="flex flex-col min-w-[600px] border rounded w-5/6 mx-auto p-4 gap-6"
//         onSubmit={hdlSubmit}
//     >
//       <label className="form-control w-full ">
//         <div className="label">
//           <span className="label-text">name</span>
//         </div>
//         <input
//           type="text"
//           placeholder="Type here"
//           className="input input-bordered w-full "
//           name="name"
//           value={input.name}
//           onChange={hdlChange}
//         />
//       </label>


//      <label className="form-control w-full ">
//         <div className="label">
//           <span className="label-text">price</span>
//         </div>
//         <input
//           type="text"
//           placeholder="Type here"
//           className="input input-bordered w-full "
//           name="price"
//           value={input.price}
//           onChange={hdlChange}
//         />
//       </label>

      
//       <label className="form-control w-full ">
//         <div className="label">
//           <span className="label-text">unit</span>
//         </div>
//         <input
//           type="text"
//           placeholder="Type here"
//           className="input input-bordered w-full "
//           name="unit"
//           value={input.unit}
//           onChange={hdlChange}
//         />
//       </label>

//       <label className="form-control w-full ">
//         <div className="label">
//           <span className="label-text">decription</span>
//         </div>
//         <input
//           type="text"
//           placeholder="Type here"
//           className="input input-bordered w-full "
//           name="decription"
//           value={input.decription}
//           onChange={hdlChange}
//         />
//       </label>

//       <label className="form-control w-full ">
//         <div className="label">
//           <span className="label-text">stock</span>
//         </div>
//         <input
//           type="text"
//           placeholder="Type here"
//           className="input input-bordered w-full "
//           name="stock"
//           value={input.stock}
//           onChange={hdlChange}
//         />
//       </label>

//       <label className="form-control w-full ">
//         <div className="label">
//           <span className="label-text">image</span>
//         </div>
//         <input
//           type="text"
//           placeholder="Type here"
//           className="input input-bordered w-full "
//           name="url"
//           value={input.url}
//           onChange={hdlChange}
//         />
//       </label>
//       <label className="form-control w-full ">
//         <div className="label">
//           <span className="label-text">image</span>
//         </div>
//         <input
//           type="text"
//           placeholder="Type here"
//           className="input input-bordered w-full "
//           name="productType"
//           value={input.productType}
//           onChange={hdlChange}
//         />
//       </label>
    

//       {/* <div>
//        <ProductList />
//     </div> */}

   
//       <button className="btn btn-primary">Add new</button>
//     </form>
//   );
// }

import axios from "axios";
import { useState } from "react";
import productType from "./ProtypeList";

export default function ProductForm() {
  const [input, setInput] = useState({
    name : '',
    price : '',
    unit: '',
    decription: '',
    stock: '',
    productType:'',
    user:'',
   url: null

   
  });

  const hdlChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    setInput((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("price", input.price);
      formData.append("unit", input.unit);
      formData.append("decription", input.decription); 
      formData.append("stock", input.stock); 
      formData.append("productType", input.productType); 

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/product", 
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
      console.log(error.response.data);

    }
  };



  return (
      <form className="flex flex-col min-w-[600px] border rounded w-5/6 mx-auto p-4 gap-6"
        onSubmit={hdlSubmit}
    >
      <div className="text-3xl mb-5 ml-20 font-bold">Create Product</div>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">name</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
          name="name"
          value={input.name}
          onChange={hdlChange}
        />
      </label>


     <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">price</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
          name="price"
          value={input.price}
          onChange={hdlChange}
        />
      </label>

      
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">unit</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
          name="unit"
          value={input.unit}
          onChange={hdlChange}
        />
      </label>

      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">decription</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
          name="decription"
          value={input.decription}
          onChange={hdlChange}
        />
      </label>

      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">stock</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
          name="stock"
          value={input.stock}
          onChange={hdlChange}
        />
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text text-white">Image</span>
        </div>
        <input type="file" className="file-input file-input-bordered file-input-secondary w-full " accept="url/*"  onChange={handleImageChange}/>
  
      </label>
      
      <label className="form-control w-full pt-5">
      <select className="select select-bordered w-full ">
  <option disabled selected>Who shot first?</option>
  <option>Han Solo</option>
  <option>Greedo</option>
</select>

        {/* <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
          name="ProductType"
          value={input.productType}
          onChange={hdlChange}
        /> */}
      </label>
    


   
      <button className="btn btn-primary">Add new</button>
    </form>
  );
}




