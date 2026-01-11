import React from 'react'
import './Update.css'
import { Link , Navigate, useNavigate,useParams} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useEffect } from 'react'

const Update = () => {
    const navigate=useNavigate();
    const {id}=useParams()

    const user={
        name:"",email:"",address:""}
    const [newUser,setNewUser]=useState(user);

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/user/${id}`)
        .then((res)=>{
            setNewUser(res.data);
        })
        .catch((error)=>{
            console.log("Error fetching user:", error);
        })  
    },[id]);

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setNewUser({...newUser,[name]:value});
        console.log(newUser);

    }

    const SubmitForm=async(e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:8000/api/user/${id}`,newUser)
        .then((res)=>{
            toast.success(res.data.message,{position:"top-right",duration:3000});
            navigate("/");
        })
        .catch((error)=>{
            console.log("Error adding user:", error);
        })
    }
  return (
    <div className='addUser'>
        <Link to="/" type="button" class="btn btn-secondary"><i class="fa-solid fa-backward"></i> Back</Link>
        <h3>Update User</h3>
        <form className='form' onSubmit={(e)=>{SubmitForm(e)}}>
            <div className='inputGroup'>
                <label htmlFor='name'>Name</label>
                <input onChange={(e)=>handleChange(e)} value={newUser.name} name="name" type="text" placeholder='Enter name' autoComplete="off" id="name" />
            </div>
            <div className='inputGroup'>
                <label htmlFor='email'>E-Mail</label>
                <input onChange={(e)=>handleChange(e)} value={newUser.email} name="email" type="email" placeholder='Enter email' autoComplete="off" id="email" />
            </div>
            <div className='inputGroup'>
                <label htmlFor='address'>Address</label>
                <input  onChange={(e)=>handleChange(e)} value={newUser.address} name="address" type="text" placeholder='Enter address' autoComplete="off" id="address" />
            </div>
            <div className='inputGroup'>
                <button type="submit" class="btn btn-primary">Submit </button>
            </div>

        </form>
      
    </div>
  )
}

export default Update
