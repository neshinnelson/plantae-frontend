import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Mycontext } from '../App'

export default function Login() {

    const GetContext = useContext(Mycontext)



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
                console.log(data);
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
        <div>
            <form onSubmit={login}>
            <label >User Name</label>
            <input type="text" onChange={(e)=>setUserData({...userData,userName:e.target.value})}/>

            <label >password</label>
            <input type="text" onChange={(e)=>setUserData({...userData,password:e.target.value})}/>

            <input type="submit" value='submit'/>
            </form>
        </div>
    </div>
  )
}
