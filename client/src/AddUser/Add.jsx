import React from 'react'
import './Add.css'
import { Link , Navigate, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const Add = () => {
    const navigate=useNavigate();

    const user={
        name:"",email:"",address:""}
    const [newUser,setNewUser]=useState(user);

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setNewUser({...newUser,[name]:value});
        console.log(newUser);

    }

    const SubmitForm=async(e)=>{
        e.preventDefault();
        await axios.post("http://localhost:8000/api/user",newUser)
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
        <h3>Add New User</h3>
        <form className='form' onSubmit={(e)=>{SubmitForm(e)}}>
            <div className='inputGroup'>
                <label htmlFor='name'>Name</label>
                <input onChange={(e)=>handleChange(e)} name="name" type="text" placeholder='Enter name' autoComplete="off" id="name" />
            </div>
            <div className='inputGroup'>
                <label htmlFor='email'>E-Mail</label>
                <input onChange={(e)=>handleChange(e)} name="email" type="email" placeholder='Enter email' autoComplete="off" id="email" />
            </div>
            <div className='inputGroup'>
                <label htmlFor='address'>Address</label>
                <input  onChange={(e)=>handleChange(e)} name="address" type="text" placeholder='Enter address' autoComplete="off" id="address" />
            </div>
            <div className='inputGroup'>
                <button type="submit" class="btn btn-primary">Submit </button>
            </div>

        </form>
      
    </div>
  )
}

export default Add
