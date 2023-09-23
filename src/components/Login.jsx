import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Mycontext } from '../App'
import '../styles/login-page.css'
import { useNavigate } from 'react-router-dom'

export default function Login() {

    const GetContext = useContext(Mycontext)
    const nav = useNavigate()


    const[userData,setUserData]= useState({
        userName:'',
        password:''
    })

    const login =  async(e)=>{
        e.preventDefault()
        try{
            const response = await axios.post('http://localhost:4000/user-data/authorise',{
                userName:userData.userName,
                password:userData.password
            })
            const data = response.data
           if(data.response==='success'){
                alert('user loged in')
                GetContext.setIsLogedIn(true)
                GetContext.setCurrentUser(data.userFullName)
                sessionStorage.setItem('currentUser',data.userFullName)
                sessionStorage.setItem('isLogedIn',true)
                sessionStorage.setItem('userId',data.userId)
                sessionStorage.setItem('token',data.jwtToken)
                sessionStorage.setItem('refresh-token',data.refreshJwtToken)
                // console.log(data.jwtTocken);
                nav('/')
           }else{
            alert('username or password is not correct')
           }
        }
        catch(err){
            console.error(err);
            alert('unable to login now')
        }
    }
  return (
    <div className='login-page'>
        <h2>Login</h2>
        <div>
            <form onSubmit={login} className='login-form'>
            <label >User Name</label>
            <input type="text" onChange={(e)=>setUserData({...userData,userName:e.target.value})}/>

            <label >password</label>
            <input type="text" onChange={(e)=>setUserData({...userData,password:e.target.value})}/>

            <input type="submit" value='submit' className='btn-sty-1'/>
            </form>

            <div className='bg-img'></div>
        </div>
        
    </div>
  )
}
