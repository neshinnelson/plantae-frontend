import React from 'react'
import { useParams } from 'react-router-dom'

export default function Payment({productTotal,tax,subtotal}) {
  const {userId} = useParams()
  return (
    <div className='payment-page'>
        <h2>Payment</h2>
        <div className="payment-container">
          <h5>How would you like to pay?</h5>
          <div className="checkbox">
            <input type="checkbox" />
            <label htmlFor="">UPI ID</label>
          </div>
          <div className="checkbox">
            <input type="checkbox" />
            <label htmlFor="">Debit Card</label>
          </div>
          <div className="checkbox">
            <input type="checkbox" />
            <label htmlFor="">Credit Card</label>
          </div>
          <div className="checkbox">
            <input type="checkbox" />
            <label htmlFor="">Net Banking</label>
          </div>
          <div className="amount-display">
            <h6>price : {productTotal}</h6>
            <h6>tax : {tax}</h6>
            <h6>Total price : {subtotal}</h6>
          </div>
        </div>
    </div>
  )
}
