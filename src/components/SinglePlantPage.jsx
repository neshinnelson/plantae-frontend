import React, { useContext, useEffect, useState } from 'react'
import '../styles/single-plant-page.css'
import { useNavigate, useParams} from 'react-router-dom'
import axios from 'axios';
import { DisplayItemContainerComp } from './CategoryPage';
import { Mycontext } from '../App';
import { BuyNowFunc } from './functions/functions';
import { apiKey,baseUrl } from '../static';
import { addToCart } from './functions/functions';

export default function SinglePlantPage() {
    const {name} = useParams()
    const GetContext = useContext(Mycontext)
    const nav = useNavigate()

    const userId = sessionStorage.getItem('userId')

    const[plantDetails,setPlantDetails]=useState([])
    let [mainImg,setMainImg]=useState('') 
    

    useEffect(()=>{
        const fetchPlant = async()=>{
            try{
                const res = await axios.get(`${baseUrl}/plants?apikey=${apiKey}&name=${name}`)
                const data = res.data.data
                setPlantDetails(data)
                setMainImg(data[0]?.imgLinks[0])
               }
               catch(err){
                console.error('unable to load plants',err);
               }
        }
      fetchPlant()
    },[])

    //handle buynow
    const handleBuyNow = async(plant)=>{
        const res = await BuyNowFunc(plant)
        if(res === 401) {
            return nav('/quick-login')
          }if(res === 500||res === 0){
            return nav('/server-error')
          }
          if(res.response==='success') {
            nav('/checkout/'+sessionStorage.getItem('userId'))
            GetContext.setTrigger(Math.random())
          }
    }

    // changing the main plant image on click
    const handleMainImg = (img)=>{
       setMainImg(img)
    }

      // redirecting to /single-plant-window
  const handleClickToPalntWindow = async(plantName)=>{
    window.location.pathname = `/plant-window/${plantName}`
  }

  return (
    <div className='single-plant-window'>
        <h2 className="plant-category">{plantDetails[0]?.category}</h2>
        <div className='plant-details-container'>
            <div className="left-img-box">

                {/* mapping plant image links */}
                {plantDetails[0]?.imgLinks.map((img,index)=>(
                    <div className="multi-img" key={index}>
                        <img src={img} alt="plant image" onClick={()=>handleMainImg(img)}/>   
                    </div>
                ))}
            </div>
            <div className="main-img-box">
                <img src={mainImg} alt="plant-image" />
            </div>
            <div className="about-plant-box">
                <h6 className="plant-category">{plantDetails[0]?.category}</h6>
                <h3 className="plant-name">{plantDetails[0]?.name}</h3>
                <h4 className='plant-price'>₹ {plantDetails[0]?.price}</h4>
                <h5 className='plant-description'>{plantDetails[0]?.description}</h5>
                <h5 className='plant-rating'>{plantDetails[0]?.rating} ⭐</h5>
                <h5 className='plant-height'>{plantDetails[0]?.height} cm</h5>
                
                {/* mapping potcolors */}
                {plantDetails[0]?.potColor.map((color,index)=>(
                    <div className="pot-color" key={index}>
                        <h5 className="plant-pot-color">pot color:{color}</h5>
                    </div>
                ))}                
                <h4 className="plant-stock">stock: {plantDetails[0]?.stock}</h4>
                <h5 className='delivery-time'>delivery time: {plantDetails[0]?.shippingTime} days</h5>
                <button className="btn-sty-1 btn-width" onClick={()=>handleBuyNow(plantDetails[0])}>Buy Now</button>
                <button className="btn-sty-2 btn-width"
                   onClick={()=>addToCart(plantDetails[0])}>Add to cart</button>
            </div>
        </div>

        {/* Displaying other related products  */}
        <h2 className='sub-heading'>Customers Recent Bought</h2>
       <div className="display-container">
       {GetContext?.recentBought.map((item,index)=>(
          <div key={index}>
           <DisplayItemContainerComp
           img={item?.imgLinks[0]}
           name={item?.name}
           rating={item?.rating}
           price={item?.price}
           category={item?.category}
           btnFunc={
            ()=>addToCart(item)}
           redirectFunc ={()=>handleClickToPalntWindow(item.name)}
           />
           </div>
        ))

        }
       </div>
        

    </div>
  )
}
