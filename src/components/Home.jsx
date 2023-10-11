import React, { useContext, useEffect, useState } from 'react'
import MenuAniHomePage from './smallComps/MenuAniHomePage'
import '../styles/home-page.css'
import HomeDisplayBox1 from './smallComps/HomeDisplayBox1'
import CategoryBar from './CategoryBar'
import axios from 'axios'
import { DisplayItemContainerComp } from './CategoryPage'
import { Mycontext } from '../App'
import { useNavigate } from 'react-router-dom'
import { addToCart } from './functions/functions'

export default function Home() {

  const GetContext = useContext(Mycontext)
  const nav = useNavigate()

  const [allPlants,setAllPlants] = useState(GetContext?.allPlants)
  const[displayArray,setDisplayArray]=useState([])
  const [randomNum, setRandomNum] = useState({
    ind1:Math.floor(Math.random()*42),
    ind2:Math.floor(Math.random()*42),
    ind3:Math.floor(Math.random()*42),
    ind4:Math.floor(Math.random()*42),
    ind5:Math.floor(Math.random()*42),
    ind6:Math.floor(Math.random()*42),
    ind7:Math.floor(Math.random()*42),
    ind8:Math.floor(Math.random()*42),
  })

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

  // adding to cart
  const handleAddtoCart = async(item)=>{
    const res = await addToCart(item)
    // console.log(res);
    if(res === 401) {
      return nav('/quick-login')
    }if(res === 500||res === 0){
      return nav('/server-error')
    }
    if(res.response==='success') {
      nav('/cart')
      GetContext.setTrigger(Math.random())
    }
  }            

  // redirecting to /single-plant-window
  const handleClickToPalntWindow = async(plantName)=>{
    if(plantName==='/server-error'){
      return nav(plantName)
    }
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
          <div key={item?.platId}>
           <DisplayItemContainerComp
           img={item?.imgLinks[0] || 'https://img.freepik.com/premium-vector/spring-flower-botanical-floral-icon-design-garden-plant-white-background-colorful-flat-vector-illustration-good-decoration-wedding-invitation-scrapbook_93083-2098.jpg'}
           name={item?.name ||'Loading...'}
           rating={item?.rating || 'Loading...'}
           price={item?.price || 'Loading...'}
           category={item?.category ||'Loading...'}
           btnFunc={
            ()=>handleAddtoCart(item)}
           redirectFunc ={()=>handleClickToPalntWindow(item.name)}
           />
           </div>
        ))

        }
        </div>
    </div>
  )
}
