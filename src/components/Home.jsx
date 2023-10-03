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

  const [allPlants,setAllPlants] = useState(GetContext?.allPlants)
  const[displayArray,setDisplayArray]=useState([])
  const [randomNum, setRandomNum] = useState({
    ind1:Math.floor(Math.random()*44),
    ind2:Math.floor(Math.random()*44),
    ind3:Math.floor(Math.random()*44),
    ind4:Math.floor(Math.random()*44),
    ind5:Math.floor(Math.random()*44),
    ind6:Math.floor(Math.random()*44),
    ind7:Math.floor(Math.random()*44),
    ind8:Math.floor(Math.random()*44),
  })
  const baseUrl = process.env.REACT_APP_URL


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
        // console.log(data)
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
        // console.log(data)
        console.log('item posted to temperary cart');
        nav('/cart')
      }
      catch(err){
        console.error('unable to post item to temperary cart now',err)
      }
    }
    
  }

  //destructuring object randomNum
  const {
    ind1,ind2,
    ind3,ind4,
    ind5,ind6,
    ind7,ind8
  } = randomNum;
  const arr = [GetContext?.allPlants[ind1],GetContext?.allPlants[ind2],
               GetContext?.allPlants[ind3],GetContext?.allPlants[ind4],
               GetContext?.allPlants[ind5],GetContext?.allPlants[ind6],
              GetContext?.allPlants[ind7],GetContext?.allPlants[ind8]]
  // console.log(allPlants);
  // console.log(arr);
  // console.log('home');
  // console.log(randomNum.ind1);
  // console.log(randomNum.ind5);

  // redirecting to /single-plant-window
  const handleClickToPalntWindow = async(plantName)=>{
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
