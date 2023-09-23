import React, { useEffect, useState } from 'react'
import '../styles/single-plant-page.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';

export default function SinglePlantPage() {
    const {name} = useParams()

    const[plantDetails,setPlantDetails]=useState([])
    let [mainImg,setMainImg]=useState('') 

    useEffect(()=>{
        const fetchPlant = async()=>{
            try{
                const res = await axios.get(process.env.REACT_APP_URL+`plants/filter?plantName=${name}`)
                const data = res.data
                console.log(data);
                setPlantDetails(data)
                setMainImg(data[0]?.imgLinks[0])
               }
               catch(err){
                console.error('unable to load plants',err);
               }
        }
      fetchPlant()
    },[])

    // changing the main plant image on click
    const handleMainImg = (img)=>{
       setMainImg(img)
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
                <h4 className='plant-price'>{plantDetails[0]?.price} ₹</h4>
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
            </div>
        </div>

    </div>
  )
}
