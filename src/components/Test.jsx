import React, { useContext, useEffect, useState } from 'react'
import { Mycontext } from '../App'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { x } from './CheckOutPage/Checkout'
import { fetchCheckoutProducts } from './functions/functions'

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


  //   const plantsArray = [
  //     { _id: 1, name: 'Plant 1' },
  //     { _id: 2, name: 'Plant 2' },
  //     { _id: 3, name: 'Plant 3' }
  // ];
  // const plantsArray = GetContext?.allPlants
//   let productIdArray
// useEffect(()=>{
//   const main = async()=>{
//      productIdArray  = await  fetchCheckoutProducts()
//     console.log(productIdArray);

//   }
//   main()
// })
// console.log(productIdArray);
  
  // const productIdArray = [2, 3]; // Array of product IDs to filter by
  
  // fetchPlantsForCheckout(plantsArray, productIdArray);
const plantsArray =[
   
{_id: '64f8ad7687ed72ac838e9278', category: 'flowering plants', name: 'pink anthurium', price: 499},
{_id: '64f8ae5b87ed72ac838e927c', category: 'flowering plants', name: 'red anthurium', price: 499},
{_id: '64f8aece87ed72ac838e927e', category: 'flowering plants', name: 'Ixora (Rugmini) Plant - Orange', price: 299}
]

const productIdArray = [
  {_id:'64f8aece87ed72ac838e',
  userId:'122',
  productId: ["64f8aece87ed72ac838e927e","64f8ad7687ed72ac838e9278","64f8ae5b87ed72ac838e927c"]}
  
]

   const fetchPlantsForCheckout = ()=>{

    console.log(plantsArray);
    console.log(productIdArray);
    // const b = "64f8b3afa3069f956ba7e9dc"
    // const c = "64f8ad7687ed72ac838e9278"
    // b===c && console.log(true);
        const products = plantsArray?.filter(item=> {
          return(
            // productIdArray[0].productId?.includes(item._id)
            // console.log(productIdArray[0].productId.includes(b)),
            // console.log(item._id === c
            // )
            productIdArray.some(id=>(id._id === item._id))
            )
          })
        console.log(products);
    }

    const firstArray = [
      { month: 1, monName: 'January' },
      { month: 2, monName: 'February' },
      { month: 3, monName: 'March' }
     ];
     const secondArray = [
      { month: 1, monName: 'January' },
      { month: 2, monName: 'February' },
      { month: 4, monName: 'April' }
     ];
     const thirdArray = GetContext?.allPlants.filter((elem) => {
     return productIdArray[0].productId.some((ele) => {
     return ele === elem._id
       });
     });
     console.log(thirdArray);

    console.log(plantsArray.filter(elem=>"64f8aece87ed72ac838e927e")) 

  return (
    <div>
        <h1>test</h1>
      
        <button onClick={func1}>click</button>
        <button onClick={generateToken}>Generate token</button>
        <button onClick={useToken}>Use Token token</button>
        <button onClick={fetchPlantsForCheckout}>Refresh Token</button>
        <h4>{sessionStorage.getItem('token')}</h4>
        <h2>{resData.name}</h2>
        <h3>{resData.age}</h3>
        
    </div>
  )
}
