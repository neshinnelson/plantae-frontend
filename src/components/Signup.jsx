import axios from 'axios'
import React, { useState } from 'react'
import '../styles/signup-page.css'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
    const nav = useNavigate()
    const[userData,setUserData]= useState({
        firstName:'',
        secondName:'',
        email:'',
        userName:'',
        password:'',
        phone:''
    })
    // console.log(userData.userName);

    const registerUser = async(e)=>{
        e.preventDefault()
        // console.log(userData);
        try{
            const response = await axios.post('http://localhost:4000/user-data',{
                firstName:userData.firstName,
                secondName:userData.secondName,
                email:userData.email,
                userName:userData.userName,
                password:userData.password,
                phone:parseFloat(Number(userData.phone))
            })
            const data = response.data
            // console.log(data);
            // data.response==='success'?alert('user registered'):alert('check the fields')
            if(data.response==='success') {
                alert('user registered')
                nav('/login')
            } else{alert('check the fields')}
            
        }
        catch(err){
            console.error(err);
            alert('unable to connect now')
        }
    }
  return (
    <div className='signup-page'>
        <h2>Signup</h2>
        <div>
            <form onSubmit={registerUser} className='signup-form'>
                <label htmlFor="first-name">First Name</label>
                <input type="text" onChange={(e)=>setUserData({...userData,firstName:e.target.value})}/>

                <label htmlFor="second-name">Second Name</label>
                <input type="text" onChange={(e)=>setUserData({...userData,secondName:e.target.value})}/>

                <label htmlFor="email">Email</label>
                <input type="text" onChange={(e)=>setUserData({...userData,email:e.target.value})}/>

                <label htmlFor="user-name">User Name</label>
                <input type="text" onChange={(e)=>setUserData({...userData,userName:e.target.value})}/>

                <label htmlFor="password">Password</label>
                <input type="password" onChange={(e)=>setUserData({...userData,password:e.target.value})}/>

                <label htmlFor="phone">Phone</label>
                <input type="number"  onChange={(e)=>setUserData({...userData,phone:e.target.value})}/>

                <input type="submit" value='submit' className='btn-sty-1'/>
            </form>

            <div className="bg-img-sigup-page"></div>
        </div>
    </div>
  )
}
