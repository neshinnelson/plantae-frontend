import React, { useContext, useEffect, useState } from 'react'
import '../CheckOutPage/checkout.css'
import { fetchCheckoutProductIds, fetchCheckoutProducts, fetchPlantsForCheckout, findTotalFunc, loadCheckoutProducts, updateAddress } from '../functions/functions'
import { Mycontext } from '../../App'
import { useLocation, useNavigate, useParams } from 'react-router-dom'


export default function Checkout() {
    const GetContext = useContext(Mycontext)
    const nav = useNavigate()
    const {userId} = useParams()

    const [plants, setPlants] = useState([])
    const[userAddress,setUserAddress]= useState({})
    const[checkoutProductsId,setCheckoutProductsId]=useState([])
    const[checkoutProducts,setCheckoutProducts]=useState([])
    const[subTotal,setSubtotal]=useState(0)
    const [waiting, setwaiting] = useState()
    // const [refreshKey, setRefreshKey] = useState(window.location.reload)
const allPlants = GetContext.allPlants 
    console.log(GetContext.allPlants);
    //load checkout Products
    useEffect(()=>{
        const main = async()=>{
            //fetching products for checkout
            const products = await fetchPlantsForCheckout(userId)
            // console.log('plants:', products);
            setCheckoutProducts(products)
            // calculating total amount
            const total = await findTotalFunc(products)
            // console.log(total);
            setSubtotal(total)
        }
        main()

        
    },[])


    // function add customer address
    const handleAddress = (event)=>{
        event.preventDefault()
        setUserAddress({
            ...userAddress,
            [event.target.name]:event.target.value
        })
     }
      // saving address to data base
      const addAddress = async(event)=>{
        event.preventDefault()
        console.log(userAddress);
        if(!userAddress) return alert('Address field is empty')
        userAddress.userId = sessionStorage.getItem('userId')
       console.log( await updateAddress(userAddress))
       alert('working')

    }

    //transfering to payment window
const addToPayment = async()=>{
    nav(`/payment/${userId}-*-${subTotal}`)
    
}
    console.log(userAddress);
    console.log(checkoutProductsId);
    console.log(checkoutProducts);    
  return (
    <div className='checkout-page'>
        <div className="checkout-container">

            <div className="customer-details">

                <form onChange={handleAddress} onSubmit={(event)=>addAddress(event)} className='customer-form'>
                    {/* customer email & phone number */}
                    <div className="customer-ph-email">
                    <h6>Contact</h6>
                    <input type="text" placeholder='email'name='email' required/>
                    {/* checkbox div */}
                    <div className="check-box">
                        <input type="checkbox" name="email" checked/>
                        <label htmlFor="email" >
                            Email me with news and offers
                        </label>
                    </div>
                    <input type="text" placeholder='phone' name='phone' required/>
                    {/* checkbox div */}
                    <div className="check-box">
                        <input type="checkbox" name="phone-no" checked/>
                        <label htmlFor="phone-no">
                            Receive updates on whatsapp
                        </label>
                    </div>

                    </div>

                    {/* customer shipping address */}
                    <div className='customer-address'>
                        <h6>Shipping Address</h6>
                        <select placeholder='Country' name='country'>
                            <option value="india">Country</option>
                            <option value="india" selected>India</option>
                        </select>
                        {/* first name and second name div */}
                        <div className="first-second-name">
                            <input type="text" placeholder='First Name' name='firstName' required/>
                            <input type="text" placeholder='Last Name' name='secondName' required/>
                        </div>
                        <textarea cols="60" rows="2" placeholder='Address'name='address' required></textarea>
                        <input type="text" placeholder='Appartment,suits,etc' name='appartment'/>

                        {/* city state and pincode div */}
                       <div className="city-state-pincode">
                            <input type="text" placeholder='city' className='' name='city'/>
                                <select className='select-state' placeholder='state' name='state' required>
                                    <option value="state">State</option>
                                    <option value="kerala">Kerala</option>
                                    <option value="karnataka">karnataka</option>
                                    <option value="tamilnadu">Tamilnadu</option>
                                    <option value="delhi">Delhi</option>
                                </select>
                                <input type="text" placeholder='Pin Code' name='pincode' defaultValue={690521} required/>
                       </div>

                        {/* checkbox div */}
                       <div className="check-box">
                            <input type="checkbox" name="save-info" checked/>
                            <label htmlFor="save-info">
                                    save this information for next time
                                </label>
                       </div>
                        <div className="return-and-payment-btn">
                            <label>return to cart</label>
                            <button className='btn-sty-1' onClick={addToPayment}>Continue to Payment</button>
                        </div>
                        
                    </div>

                </form>
            </div>

            {/* show order items and total price */}
            <div className="checkout-order-details">
                {checkoutProducts?.length>0?(
                    checkoutProducts?.map((item)=>(
                        <div className="product" key={item.name}>
                            <div className="plant-name">
                                <img src={item.imgLinks[0]} alt="flower" />
                                <h6>{item.name}</h6>
                                <p>{item.rating} ⭐</p>
                                <p>quantity:1</p>
                            </div>
                            <h4>₹ {item.price}</h4>
                        </div>
                    ))):<h6>Loading product...{waiting}</h6>
                }
                {/* offers div */}
                <div className="offers">
                    <div className="offers-sub-div-input">
                        <input type="text" placeholder='Discount code or gift card'/>
                        <button className='btn-sty-1'>Apply</button>
                    </div>
                    <div className="offers-sub-div">
                        <h6>10% of on orders above ₹ 2999</h6>
                        <button className="btn-sty-2">Apply offer</button>
                    </div>
                    <div className="offers-sub-div">
                        <h6>1% of on orders above ₹ 4999</h6>
                        <button className="btn-sty-2">Apply offer</button>
                    </div>
                </div>
                {/* subtotal and shipping time div */}
                <div className="order-price-and-shipping">
                <div className="order-sub-div">
                    <h5>Total price:</h5>
                    <h3>₹ {subTotal}</h3>
                </div>
                <div className="order-sub-div">
                    <h6>Shipping time:</h6>
                    <h6>will be updated</h6>
                </div>
                </div>
            </div>
        </div>

    </div>
  )
}
