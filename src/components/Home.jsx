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
  // const randomNum = Math.floor(Math.random()*44)
  
  // console.log(randomNum);

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
      }
      catch(err){
        console.error('unable to fetch data now',err);
      }
    }
    fetchAllPlants()
    // const [randomNum, setRandomNum] = useState(Math.floor(Math.random()*allPlants.length))
  },[])

  const addToCart = (img,name,rating,price,category)=>{
    const action = {type:'add',
                    // userName:GetContext.currentUser,
                    img:img,
                    name:name,
                    rating:rating,
                    price:price,
                    category:category,}
    GetContext.dispatchCart(action)
    nav('/cart')
  }
  const arr = [allPlants[randomNum],allPlants[randomNum-6],
               allPlants[randomNum2],allPlants[randomNum3],
               allPlants[randomNum4],allPlants[randomNum-10],
              allPlants[randomNum2-12],allPlants[randomNum2-8]]
  // console.log(allPlants);
  // console.log(arr);
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
             ()=>addToCart(item?.imgLinks[0],item?.name,
               item?.rating,item?.price,item?.category
               )}
           />
           </div>
        ))

        }
        </div>
         

        

    </div>
  )
}
