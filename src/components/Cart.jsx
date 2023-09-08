import React, { useContext } from 'react'
import '../styles/cart-page.css'
import { Mycontext } from '../App'

export default function Cart() {
    const GetContext = useContext(Mycontext)

    const removeItemFromCartServer = (name)=>{
        const action = {
            type: 'remove',
            name:name
        }
        GetContext.dispatchCart(action)
    }
  return (
    <div className='cart-page'>
        <h1>cart</h1>
        <div className="cart-container">
            {GetContext?.newCart.map((item)=>(
               <div key={item.name}>
                 <CartDisplayBox 
                            img={item?.img}
                            name={item?.name}
                            description={item?.description}
                            price={item?.price}
                            rating={item?.rating}
                            quatity={item?.quatity}
                            btnFunc={()=>removeItemFromCartServer(item.name)}
                            />
               </div>
            ))}
            
        </div>
    </div>
  )
}

const CartDisplayBox = ({img,name,description,price,btnFunc})=>{
    return(
        <div className='cart-display-card'>
            <img src={img}
                alt="portrait image of movie" 
                />
            <div className="title-and-description">
                <h3 className='item-name'>{name}</h3>
                <p className='iyem-details'>{description}</p>
            </div>
            <div className="price-and-button">
                <h3 className="item-price">₹{price}</h3>
                <button className="remove-cart-item btn-sty-2" onClick={btnFunc}>remove</button>
            </div>
      </div>
    )
}