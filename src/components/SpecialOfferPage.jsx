import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function SpecialOfferPage() {

    const [offer,setOffer]= useState([])
    let[token,setToken]=useState(sessionStorage.getItem('token'))

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
  return (

    <div>SpecialOfferPage</div>
  )
}
