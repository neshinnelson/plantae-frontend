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
            {GetContext?.cart.map((item)=>(
               <div key={item?.name}>
                 <CartDisplayBox 
                            img={item?.imgLinks[0]}
                            name={item?.name}
                            price={item?.price}
                            rating={item?.rating}
                            quantity={item?.quantity}
                            potColor={item?.potColor[0]}
                            btnFunc={()=>removeItemFromCartServer(item.name)}
                            />
               </div>
            ))}
            
        </div>
    </div>
  )
}

const CartDisplayBox = ({img,name,description,price,btnFunc,rating,potColor,quantity})=>{
    return(
        <div className='cart-display-card'>
            <img src={img}
                alt="portrait image of movie" 
                />
            <div className="title-and-description">
                <h3 className='item-name'>{name}</h3>
                {/* <p className='iyem-details'>Pot color:{potColor}</p> */}
            </div>
            <div className="price-and-button">
                <h3 className="item-price">₹{price}</h3>
                <h4 className='item-rating'>{rating}</h4>
                <h4 className="item-potcolor">{potColor}</h4>
                <button className='btn-sty-1'>-</button><h5 className="item-quatity">{quantity}</h5><button className='btn-sty-1'>+</button>
                <button className="remove-cart-item btn-sty-2" onClick={btnFunc}>remove</button>
            </div>
      </div>
    )
}