import axios from 'axios'
import {useEffect, useState} from 'react'
import ModalEdit from '../components/ModalEdit'
import TypeTable from '../components/TypeTable'

export default function ProductTypeList() {
  const [product_type, setProduct_type] = useState([])
  const [editIdx, setEditIdx] = useState(-1)
  const [trigger, setTrigger] = useState(false)

  useEffect( ()=>{
    const run = async()=>{
      let token = localStorage.getItem('token')
      const rs = await axios.get('http://localhost:8000/admin/getProList', {
        headers : { Authorization : `Bearer ${token}`}
      })
      setProduct_type(rs.data.product_type)
    }
    run()
  }, [trigger] )


  const openModal = (id) =>{
    // console.log(id)
    // console.logr(todos)
    let idx = product_type.findIndex(el => el.id === id)
    setEditIdx(idx)
    // console.log(idx)
    document.getElementById('my_modal_3').showModal()
    
  }

  const closeModal = () => {
    document.getElementById('my_modal_3').close()
  }

  return (
    <>
<ModalEdit el={product_type[editIdx]} closeModal={closeModal} setTrigger={setTrigger}/>
    {product_type.map((el) =>(
      <TypeTable key={el.id} el ={el} openModal={openModal} setTrigger={setTrigger} />
    ))
  }
    
   
    </>
  )
}