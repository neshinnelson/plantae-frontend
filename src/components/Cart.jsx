import React, { useContext, useEffect, useState } from 'react'
import '../styles/cart-page.css'
import { Mycontext } from '../App'
import axios from 'axios'

export default function Cart() {
    const GetContext = useContext(Mycontext)
    const url = process.env.REACT_APP_URL
    const[tempCart,setTempCart]=useState([])

    const removeItemFromCartServer = async(itemId)=>{
        if(sessionStorage.getItem('isLogedIn')==="true"){
            try{
                const res = await axios.delete(url+`cart/${itemId}`)
                const data = res.data
             //    console.log(data);
                console.log('item deleted from cart');
                GetContext.setTrigger(Math.random())
              }
              catch(err){
                console.error('item was unable to remove',err);
              }
        }
        else{
            try{
                const res = await axios.delete(url+"temp-cart/"+itemId)
                const data = res.data
                // console.log(data);
                GetContext.setTrigger(Math.random())
                console.log('item was deleted from temperary cart');
            }
            catch(err){
                console.error('item was unable to delete from temperary cart',err);
            }
        }
     
    }

    // fetching & saving temperary cart to state tempCart
    useEffect(()=>{
        const fetchTempCart = async()=>{
            const res = await axios.get(url+'temp-cart')
            const data = res.data
            console.log(data)
            setTempCart(data.data)
        }
        fetchTempCart()
    },[GetContext.trigger])

// function to increase item quantity
let [quantity,setQuantity]=useState(1)
const updateQuantity = async(action,id,quantity)=>{
    switch(action){
        case 'add':
            quantity++
            console.log(quantity);
            break
        case 'remove':
            quantity--
            console.log(quantity);
            break
    }
   try{
    if(quantity>0){
        const res = await axios.put(url+'cart/'+id,{quantity:quantity})
        const data = res.data
        // console.log(data);
        GetContext.setTrigger(Math.random())
        console.log('quantity updated')
    }
   
}
catch(err){
    console.error('unable to update quantity now',err);
}
   }

    //cart array that is used to map items added in cart 
    const mapCart = sessionStorage.getItem('isLogedIn')==="true"?GetContext?.cart:tempCart
    const temperaryCartAlert = 'Temperary cart is refreshed every 5 minutes. Please login to save your cart!'
  return (
    <div className='cart-page'>
        <h1>cart</h1>
        <p className="warning">{sessionStorage.getItem('isLogedIn')!=='true' && temperaryCartAlert}</p>
        <div className="cart-container">
            {mapCart?.map((item)=>(
               <div key={item?.name} className='single-item'>
                 <CartDisplayBox 
                            img={item?.imgLinks[0]}
                            name={item?.name}
                            price={item?.price}
                            rating={item?.rating}
                            quantity={item?.quantity}
                            potColor={item?.potColor[0]}
                            qntyincreFunc={()=>updateQuantity('add',item._id,item.quantity)}
                            qntydecreFunc={()=>updateQuantity('remove',item._id,item.quantity)}
                            btnFunc={()=>removeItemFromCartServer(item._id)}
                            />
               </div>
            ))}
            
        </div>
    </div>
  )
}

const CartDisplayBox = ({img,name,description,price,btnFunc,rating,potColor,quantity,qntyincreFunc,qntydecreFunc})=>{
    return(
        <div className='cart-display-card'>
            <img src={img}
                alt="portrait image of movie" 
                />
            <div className="title-and-description">
                <h3 className='item-name'>{name}</h3>
            </div>
            <div className="price-and-button">
                <h3 className="item-price">₹{price}</h3>
                <h4 className='item-rating'>{rating}⭐</h4>
                <h5>Pot color:</h5>
                <h6 className="item-potcolor"
                    style={{backgroundColor:potColor}}></h6>
                <button className='btn-sty-1' onClick={qntydecreFunc}>-</button>
                <h5 className="item-quatity">{quantity}</h5>
                <button className='btn-sty-1' onClick={qntyincreFunc}>+</button>
                <button className="remove-cart-item btn-sty-2" onClick={btnFunc}>remove</button>
            </div>
      </div>
    )
}