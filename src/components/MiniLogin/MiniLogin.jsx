import React, { useContext, useEffect, useState } from 'react'
import './mini-login.css'
import axios from 'axios';
import { apiKey, baseUrl } from '../../static';
import { Mycontext } from '../../App';

export default function MiniLogin() {
  const GetContext = useContext(Mycontext)
  const[user,setUser]=useState({})

  const handleLogin = async()=>{
    try{
      const response = await axios.post(`${baseUrl}/user-data/authorise?apikey=${apiKey}`,{
          userName:user.userName,
          password:user.password
      })
      const data = response.data
      console.log(data);
     if(data.response==='success'){
          alert('user loged in')
          GetContext.setIsLogedIn(true)
          GetContext.setCurrentUser(data.userFullName)
          sessionStorage.setItem('currentUser',data.userDetails.fullName)
          sessionStorage.setItem('isLogedIn',true)
          sessionStorage.setItem('userId',data.userDetails.userId)
          sessionStorage.setItem('token',data.tokens.token)
          sessionStorage.setItem('refresh-token',data.tokens.refreshToken)
          // nav('/')
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
    <div>
        <h3>Quik login</h3>
        <input type="text" placeholder='username' name='userName' 
        defaultValue={sessionStorage.getItem('currentUser')}
        onChange={(e)=>setUser({...user,[e.target.name]:e.target.value})}/>

        <input type="password" placeholder='password' name='password'
        onChange={(e)=>setUser({...user,[e.target.name]:e.target.value})}/>
        <button onClick={handleLogin} className='btn-sty-2'>login</button>
    </div>
  )
}
