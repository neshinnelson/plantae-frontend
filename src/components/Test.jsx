import React, { useContext } from 'react'
import { Mycontext } from '../App'
import { useNavigate } from 'react-router-dom'

export default function Test() {
    const GetContext = useContext(Mycontext)
    const nav = useNavigate()

    const addToCart = (img,name,rating,price,category,potColor)=>{
      const action = {type:'add',
                      // userName:GetContext.currentUser,
                      img:'dsd',
                      name:'dsd',
                      rating:565,
                      price:455,
                      category:'dsd',
                      potColor:'dsd'}
      GetContext.dispatchCart(action)
      nav('/cart')
    }
  return (
    <div>
        <h1>test</h1>
        {GetContext?.newCart.map(item=>{
            <div key={item.name}>
                <li>{item.name}</li>
                <li>{item.price}</li>
            </div>
        })}
        <button onClick={addToCart}>click</button>
        
    </div>
  )
}
