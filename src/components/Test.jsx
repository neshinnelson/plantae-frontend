import React, { useContext, useEffect, useState } from 'react'
import { Mycontext } from '../App'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Test() {
    const GetContext = useContext(Mycontext)
    const nav = useNavigate()

    useEffect(()=>{
      const authFunc = async()=>{
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImV2ZWxvdG1hcnkiLCJ1c2VyUGFzcyI6IiQyYiQxMCRGSjNDT2ZRN1g1aDBNMW9DNlMuNlQuc1YuNHBjLzI4Z2lTWW1wWXZzVUkuMklXenRjQWFUTyIsImlhdCI6MTY5NTE3OTI1OH0.Vm8Y1feHvtEhcqH66qLu1jo19OQb8jZqdtJnR-Stq70'
        const config ={
          headers : {
            'Authorization': `Bearer ${token}`, // Include the token in the 'Authorization' header
            'Content-Type': 'application/json', // Specify the content type as needed
          }
        }
       
        const res = await axios.get('http://localhost:4000/user-data/auth', {config})
        const data = res.data
        console.log(data.response);
      }

     const setCookie = async()=>{
      try{
        const res = await axios.post('http://localhost:4000/cookie-create')
      const data = res.data
      console.log(data);
      }
      catch(err){
        console.error(err);
      }
     }
    //  setCookie()
    //   authFunc()
    },[])

    const func1 = async()=>{
      const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXJhdGh5IiwiaWF0IjoxNjk1MjM0NjIxfQ.twJRghnU3VKrHRgtoj-Fb5wixDaC1AjzJx_neOByfsQ'
      const headers = {
        Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
        'Content-Type': 'application/json', // Specify the content type as needed
      }
      try{
        const res = await axios.get('http://localhost:5000/post', {
          headers: headers, // Include the headers in the request
        })
        const data = res.data
        console.log(data);
      }
      catch(err){
        console.error(err);
      }
    }
    

    //generating a token from an api
    const generateToken = async()=>{
      try{
        const res = await axios.post('http://localhost:3001/login',{
        userName: 'arathy'
      })
      const data = res.data
      console.log(data);
      sessionStorage.setItem('token',data.token)
      sessionStorage.setItem('refresh-token',data.refreshToken)
      }
      catch(err){
        console.error('unable to fetch token now',err);
      }
    }

    const [resData,setResData]=useState({
      name:'',
      age:''
    })
    //using token to access api
    const useToken = async()=>{
      try{
        const res = await axios.get('http://localhost:5000/post',{
          headers:{
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        })
        const data = res.data
        console.log(data);
        setResData({...resData, name:data[0].name, age:data[0].age})
      }
      catch(err){
        console.error('token may be expired',err);
      }
    }

    // accessing a refresh token incase token expires
    const refreshToken = async()=>{
      try{
        const res = await axios.post('http://localhost:3001/token',{
          refreshToken : sessionStorage.getItem('refresh-token')
        })
        const data = res.data
        console.log(data);
        sessionStorage.setItem('token',data.newToken)
      }
      catch(err){
        console.error('unable to refresh token now',err);
      }
    }

  return (
    <div>
        <h1>test</h1>
      
        <button onClick={func1}>click</button>
        <button onClick={generateToken}>Generate token</button>
        <button onClick={useToken}>Use Token token</button>
        <button onClick={refreshToken}>Refresh Token</button>
        <h4>{sessionStorage.getItem('token')}</h4>
        <h2>{resData.name}</h2>
        <h3>{resData.age}</h3>
        
    </div>
  )
}
