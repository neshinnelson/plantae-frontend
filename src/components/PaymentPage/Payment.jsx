import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../PaymentPage/payment.css'

export default function Payment() {
  const {id} = useParams()
  const [userId,setUserId] = useState('')
  const [productTotal,setProductTotal] = useState(0)
  const[tax,setTax]=useState(0)
  const [subTotal,setSubTotal]=useState(0)
  const [userPaid,setUserPaid]=useState(0)

  useEffect(()=>{
    setUserId(prev=> prev = id.split|('-*-')[0])
    setProductTotal(prev=> prev = parseInt(id.split('-*-')[1]))
    setTax(prev=> prev = 10)
    setSubTotal(prev=> prev = productTotal +tax)
  },[])

  //handle payment
  const handlePayment = async()=>{
    if(productTotal + tax == userPaid){
      alert('payment success')
    }else{
      alert('enter the correct amount')
    }
  }
  return (
    <div className='payment-page'>
        <h2>Payment</h2>
        <div className="payment-container">
          <h5>How would you like to pay?</h5>
          <div className="checkbox">
            <input type="checkbox" className='checkbox-w-h'/>
            <label htmlFor="">UPI ID</label>
          </div>
          <div className="checkbox">
            <input type="checkbox" className='checkbox-w-h'/>
            <label htmlFor="">Debit Card</label>
          </div>
          <div className="checkbox">
            <input type="checkbox" className='checkbox-w-h'/>
            <label htmlFor="">Credit Card</label>
          </div>
          <div className="checkbox">
            <input type="checkbox" className='checkbox-w-h'/>
            <label htmlFor="">Net Banking</label>
          </div>
          <div className="amount-display">
            <h6>price : ₹ {productTotal}</h6>
            <h6>tax : ₹ {tax}</h6>
            <h6>Total price : ₹ {productTotal + tax}</h6>
          </div>
          <div className="enter-amount">
            <input type="number" placeholder='enter amount'
            onChange={(e)=>setUserPaid(e.target.value)}/>
            <button className="btn-sty-1" onClick={handlePayment}>Pay Now</button>
          </div>
        </div>
    </div>
  )
}
