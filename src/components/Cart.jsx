import React, { useContext, useEffect, useState } from 'react'
import '../styles/cart-page.css'
import { Mycontext } from '../App'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { apiKey, baseUrl } from '../static'

export default function Cart() {
    const GetContext = useContext(Mycontext)
    const nav = useNavigate()
    
    const[tempCart,setTempCart]=useState([])
    const[tempCartTotal,setTempCartTotal]=useState(0)

    const removeItemFromCartServer = async(item)=>{
        if(sessionStorage.getItem('isLogedIn')==="true"){
            try{
                const res = await axios.delete(`${baseUrl}/cart/${item.plantId}?apikey=${apiKey}`,{
                    headers:{
                        "Authorization" : `Bearer ${sessionStorage.getItem('token')}`,
                        "Content-Type" : "Application/json"
                    }
                })
                const data = res.data
                console.log(data);
                console.log('item deleted from cart');
                GetContext.setTrigger(Math.random())
              }
              catch(err){
                console.error('item was unable to remove',err);
              }
        }
        //removing from temperary cart
        else{
            try{
                const res = await axios.delete(`${baseUrl}/temp-cart/${item.plantId}?apikey=${apiKey}`)
                const data = res.data
                if(data.response==='failed') return console.log('server');
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
           try{
            const res = await axios.get(`${baseUrl}/temp-cart`)
            const data = res.data
            console.log(data)
            setTempCart(data.data)
            const totalPrice = data.data.reduce((acc,item)=>acc + item.price ,0)
            setTempCartTotal(totalPrice)
           }catch(err){
            console.log('error in fetching temp cart :');
            console.error(err);
            if(err.request.status===500||err.request.status===0){
                return nav('/server-error')
            }
           }
        }
        fetchTempCart()
    },[GetContext.trigger])

// function to increase item quantity
let [quantity,setQuantity]=useState(1)
const updateQuantity = async(action,item)=>{
    let q = item.quantity

    switch(action){
        case 'add':
            q++
            console.log(q);
            break
        case 'remove':
            q--
            console.log(q);
            break
    }
   try{
    if(q>0){
        if(sessionStorage.getItem('isLogedIn')==='true'){
            const res = await axios.put(`${baseUrl}/cart/${item.plantId}?apikey=${apiKey}`,{
                quantity:q
            },{
                headers:{
                    "Authorization" : `Bearer ${sessionStorage.getItem('token')}`,
                    "Content-Type" : "Application/json"
                }
            })
            const data = res.data
            console.log(data);
            GetContext.setTrigger(Math.random())
            console.log('quantity updated')
        }
        else{
            const res = await axios.put(`${baseUrl}/temp-cart/${item.plantId}?apikey=${apiKey}`,{
                quantity:q
            })
            const data = res.data
            console.log(data);
            GetContext.setTrigger(Math.random())
            console.log('quantity updated')
        }
    }
   
}
catch(err){
    console.error('unable to update quantity now',err);
}
   }

    //cart array that is used to map items added in cart 
    const mapCart = sessionStorage.getItem('isLogedIn')==="true"?GetContext?.cart:tempCart
    const cartTotal = sessionStorage.getItem('isLogedIn')==="true"?GetContext?.cartTotal:tempCartTotal
    const temperaryCartAlert = 'Temperary cart is refreshed every 5 minutes. Please login to save your cart!'

  return (
    <div className='cart-page'>
        <h1>cart</h1>
        <p className="warning">{sessionStorage.getItem('isLogedIn')!=='true' && temperaryCartAlert}</p>

        {/* div containig cart items, cart total price and checkout button  */}
        <div className="cart-and-checkout">
            <div className="cart-container">
                {mapCart.length>0?(
                mapCart?.map((item)=>(
                    <div key={item?.name} className='single-item'>
                        <CartDisplayBox 
                                    img={item?.imgLinks[0]}
                                    name={item?.name}
                                    price={item?.price}
                                    rating={item?.rating}
                                    quantity={item?.quantity}
                                    potColor={item?.potColor[0]}
                                    qntyincreFunc={()=>updateQuantity('add',item)}
                                    qntydecreFunc={()=>updateQuantity('remove',item)}
                                    btnFunc={()=>removeItemFromCartServer(item)}
                                    cartTotal={cartTotal}
                                    />
                    </div>
                    ))):<h3>Nothing in cart to display</h3>}
            </div>
            <div className="cart-total">
                        <h3>total:₹ {cartTotal}</h3>
                        <button className="checkout btn-sty-1"
                         onClick={()=>nav(`/checkout/${sessionStorage.getItem('userId')}`)}>Check Out</button>
            </div>
        </div>
    </div>
  )
}

const CartDisplayBox = ({img,name,description,price,btnFunc,rating,potColor,quantity,qntyincreFunc,qntydecreFunc})=>{
    return(
        <div className="cart">
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
        </div>
    )
}