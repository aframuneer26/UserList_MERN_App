import React from 'react';
import './User.css'; 
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
const User = () => {
     const [users,setUsers]=useState([]);
     useEffect(()=>{
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
     },[])

        const deleteUser=async (userId)=>{
            await axios
            .delete(`http://localhost:8000/api/user/${userId}`)
            .then((res)=>{
                setUsers((prevUser)=>prevUser.filter((user)=>user._id!==userId)); 
                toast.success(response.data.message,{position:"top-right"})
            })
            .catch((error)=>{
                console.log(error);
            });
        };


      
    

  return (
    
    <div className='userTable'>
        <Link to="/add" type="button" class="btn btn-primary">Add User <i class="fa-solid fa-user-plus"></i></Link>
        
        {users.length===0?(
            <div className='noData'>
                <h3>No Users Found</h3>
                <p>Please add new User</p>
            </div>
        ):(<table className='table table-bordered'>
            <thead>
                <tr>
                    <th scope='col'>ID</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Address</th>
                    <th scope='col'>Actions</th>

                </tr>
            </thead>
      
            <tbody>
                {users.map((user,index) => {
                      return(
                         <tr>
                            <td>{index+1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td className='actionButtons'>
                            <Link to={`/update/`+user._id} type="button" class="btn btn-danger"><i class="fa-solid fa-pen-to-square"></i></Link>
                            <button onClick={()=>deleteUser(user._id)} type="button" class="btn btn-info"><i class="fa-solid fa-trash"></i> </button>
                            </td>
                         </tr>
                      )}
                )}
                

            </tbody>
        </table>)
    }

        
        
      
    </div>
  )
}

export default User
