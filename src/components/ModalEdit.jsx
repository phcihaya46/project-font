import axios from "axios";
import {useEffect, useState} from "react";

export default function ModalEdit(props) {
  const {el, closeModal, setTrigger} = props
    const [input, setInput] = useState({
        name : ''
      
      })
      
    useEffect ( ()=>{
        setInput({
            name: el?.name,
            
        })
    },[el?.id])
    

    const hdlChange = e => {
        setInput( prv => ( {...prv, [e.target.name] : e.target.value} ))
    }
    const hdlSubmitType = async e => {
        try{
          e.preventDefault()
          const output = { ...input }
          const token = localStorage.getItem('token')
          const rs = await axios.put(`http://localhost:8000/admin/updateType/${el.id}`, output,{
            headers : { Authorization : `Bearer ${token}`}
          })
          alert('Update OK')
          location.reload();
        }catch(err) {
          alert(err.message)
        }
      }
    
    return (
  

<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
  <form className="flex flex-col  border rounded w-5/6 mx-auto p-4 gap-6"
        onSubmit={hdlSubmitType}
    >
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">type</span>
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



      <button type="submit" className="btn btn-primary" onClick={closeModal}>Update</button>
      <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
    </form>
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>  
    )}