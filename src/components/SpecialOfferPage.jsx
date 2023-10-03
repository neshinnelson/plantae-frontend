import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function SpecialOfferPage() {

    const [offer,setOffer]= useState([])
    let[token,setToken]=useState(sessionStorage.getItem('token'))
    let [mainImg,setMainImg]=useState('') 

   useEffect(()=>{
    const fetchOffer = async(token)=>{

        // let accessToken = token
       try{
        const res = await axios.get(process.env.REACT_APP_URL+`plants/special-offer?token=${token}`)
        const data = res.data
        console.log(data);
        if(data.message==='token expired'){
          generateNewToken()
        //   fetchOffer(accessToken)
        console.log('token expired generate new token');
        }
        else{
            setOffer(data.data)
            console.log('offer here');
        }
       
       }
       catch(err){
        console.error('unable to fetch now special offer now',err);
       }
    }
    fetchOffer(token)

    const generateNewToken = async()=>{
        try{
            const res = await axios.post(process.env.REACT_APP_URL+'new-token',{
                refreshToken:sessionStorage.getItem('refresh-token')
            })
            const data = res.data
            console.log(data);
            
            // fetchOffer(token)
            if(data.message==='refresh token expired') return console.log('refresh token expired');
            if(data.message==='unable to verify token. server error!') return console.log('unable to verify token. server error!');
            let newToken = data.newToken
            console.log('this is new token',newToken);
            fetchOffer(newToken)
        }
        catch(err){
            console.error('unable to generate new token',err);
        }
    }
   },[])

   
    // changing the main plant image on click
    const handleMainImg = (img)=>{
        setMainImg(img)
     }

  return (

    <div>
        <h1>SpecialOfferPage</h1>
        <div className='plant-details-container'>
            <div className="left-img-box">

                {/* mapping plant image links */}
                {offer[0]?.imgLinks.map((img,index)=>(
                    <div className="multi-img" key={index}>
                        <img src={img} alt="plant image" onClick={()=>handleMainImg(img)}/>   
                    </div>
                ))}
            </div>
            <div className="main-img-box">
                <img src={mainImg} alt="plant-image" />
            </div>
            <div className="about-plant-box">
                <h6 className="plant-category">{offer[0]?.category}</h6>
                <h3 className="plant-name">{offer[0]?.name}</h3>
                <h4 className='plant-price'>{offer[0]?.price} ₹</h4>
                <h5 className='plant-description'>{offer[0]?.description}</h5>
                <h5 className='plant-rating'>{offer[0]?.rating} ⭐</h5>
                <h5 className='plant-height'>{offer[0]?.height} cm</h5>
                
                {/* mapping potcolors */}
                {offer[0]?.potColor.map((color,index)=>(
                    <div className="pot-color" key={index}>
                        <h5 className="plant-pot-color">pot color:{color}</h5>
                    </div>
                ))}                
                <h4 className="plant-stock">stock: {offer[0]?.stock}</h4>
                <h5 className='delivery-time'>delivery time: {offer[0]?.shippingTime} days</h5>
            </div>
        </div>
    </div>
  )
}
