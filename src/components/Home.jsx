import React, { useContext, useEffect, useState } from 'react'
import MenuAniHomePage from './smallComps/MenuAniHomePage'
import '../styles/home-page.css'
import HomeDisplayBox1 from './smallComps/HomeDisplayBox1'
import CategoryBar from './CategoryBar'
import axios from 'axios'
import { DisplayItemContainerComp } from './CategoryPage'
import { Mycontext } from '../App'
import { useNavigate } from 'react-router-dom'

export default function Home() {

  const GetContext = useContext(Mycontext)
  const nav = useNavigate()

  const [allPlants,setAllPlants] = useState([])
  const[displayArray,setDisplayArray]=useState([])
  const [randomNum, setRandomNum] = useState()
  const [randomNum2, setRandomNum2] = useState()
  const [randomNum3, setRandomNum3] = useState()
  const [randomNum4, setRandomNum4] = useState()
  const [randomNum5, setRandomNum5] = useState()
  const [randomNum6, setRandomNum6] = useState()
  const [randomNum7, setRandomNum7] = useState()
  const [randomNum8, setRandomNum8] = useState()
  const baseUrl = process.env.REACT_APP_URL

  useEffect(()=>{
    const fetchAllPlants = async ()=>{
      try{
        const response = await axios.get(process.env.REACT_APP_URL+'plants/filter?category=')
        const data = response.data

        setAllPlants(data)
        // console.log(data);
        setRandomNum(Math.floor(Math.random()*data.length))
        setRandomNum2(Math.floor(Math.random()*data.length))
        setRandomNum3(Math.floor(Math.random()*data.length))
        setRandomNum4(Math.floor(Math.random()*data.length))
        setRandomNum5(Math.floor(Math.random()*data.length))
        setRandomNum6(Math.floor(Math.random()*data.length))
        setRandomNum7(Math.floor(Math.random()*data.length))
        setRandomNum8(Math.floor(Math.random()*data.length))
      }
      catch(err){
        console.error('unable to fetch data now',err);
      }
    }
    fetchAllPlants()
  },[])

  const addToCart = async(img,name,rating,price,category,potColor)=>{
    if(sessionStorage.getItem("isLogedIn")==="true"){
      try{
        const res = await axios.post(baseUrl+'cart',{
          userId:sessionStorage.getItem('userId'),
          category:category,
          name:name,
          imgLinks:img,
          price:price,
          rating:rating,
          quantity:1,
          potColor:potColor,
        })
        const data = res.data
        console.log(data)
        GetContext.setTrigger(Math.random())
        nav('/cart')
      }
      catch(err){
        console.error('unable to post item to cart now', err);
      }
    }
    else{
      try{
        const res = await axios.post(baseUrl+'temp-cart',{
          category:category,
          name:name,
          imgLinks:img,
          price:price,
          rating,rating,
          quantity:1,
          potColor:potColor
        })
        const data = res.data
        console.log(data)
        console.log('item posted to temperary cart');
        nav('/cart')
      }
      catch(err){
        console.error('unable to post item to temperary cart now',err)
      }
    }
    
  }
  const arr = [allPlants[randomNum],allPlants[randomNum5],
               allPlants[randomNum2],allPlants[randomNum3],
               allPlants[randomNum4],allPlants[randomNum7],
              allPlants[randomNum6],allPlants[randomNum8]]
  // console.log(allPlants);
  // console.log(arr);

  // redirecting to /single-plant-window
  const handleClickToPalntWindow = async(plantName)=>{
    alert(plantName)
    nav(`/plant-window/${plantName}`)
  }
  return (
    <div className='home-page'>
        <div className="about-site">
            <p>Welcome to our gardening paradise! Explore our lush collection of plants, where nature's beauty meets your green thumb. From vibrant flowering plants to low-maintenance succulents, we've got your botanical desires covered. Elevate your garden, elevate your life with our carefully curated selection. Grow happiness today!
</p>
        </div>
        <MenuAniHomePage/>
        {/* <HomeDisplayBox1/> */}

        <div className='display-container'>
        {arr?.map((item)=>(
          <div key={item?.name}>
           <DisplayItemContainerComp
           img={item?.imgLinks[0]}
           name={item?.name}
           rating={item?.rating}
           price={item?.price}
           category={item?.category}
           btnFunc={
            ()=>addToCart(item.imgLinks[0],item.name,item.rating,item.price,item.category,item.potColor[0])}
           redirectFunc ={()=>handleClickToPalntWindow(item.name)}
           />
           </div>
        ))

        }
        </div>
         

        

    </div>
  )
}
