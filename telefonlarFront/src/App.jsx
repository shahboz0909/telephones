import { useState, useEffect  } from 'react'
import './App.css'

function App() {
   const [phones, setPhones]= useState([])
   const [name, setName]= useState("")
   const [title, setTitle]= useState("")
   const [img, setImg]= useState("")
   const [reload, setReload]= useState(false)
  useEffect(()=>{
    fetch("http://localhost:3000/users").then(res => res.json()).then(data => setPhones(data))
    
  },[reload])
  const postdata = (e) => {
    e.preventDefault(e)

    fetch("http://localhost:3000/users",{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body:JSON.stringify({
        name: name,
        title: title,
        img: img
      })
    })
    .then((res) => {
      console.log(res)
      setReload(!reload)
    })
    
  }



  return ( 
  <>
  {/* Modal btn */}
  <button type="button" class="modal-btn btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Qo'shish
</button>

{/* Modal  */}
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Telefon qo'shish</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>


      <div class="modal-body">
        <form onSubmit={(e) => postdata(e)} >
          <input className='form-control mb-3' onChange={(e) => setName(e.target.value)} type="text"  placeholder='name' />
          <input className='form-control mb-3' onChange={(e) => setTitle(e.target.value)} type="text" placeholder='title' />
          <input className='form-control mb-3' onChange={(e) => setImg(e.target.value)} type="text" placeholder='img_url'/>
          <button className='btn btn-primary'>Add</button>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>


  <div className="container   justify-content-between">
    {
     
      phones?.map(el => {
       return <div key={el.userId}  className="phones_cars card"  >
       <img src={el.img}  className="card-img-top " alt="..."/>
       <div  className="card-body">
         <h5  className="card-title text-center">{el.name}</h5>
         <p  className="card-text text-center">{el.title}</p>
         <div className='wrapper-btns d-flex align-items-center'>
          <button className='btn btn-warning'>Edit</button>
          <button className='btn btn-danger'>Delete</button>
          </div>
       </div>
     </div>
      })
    }
  </div>
  
  </>
  )
    
}

export default App
