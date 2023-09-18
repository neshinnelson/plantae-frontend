import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../styles/category-page.css'
import axios from 'axios'
import { Mycontext } from '../App'

export default function CategoryPage() {

    const {name} = useParams()
    const GetContext = useContext(Mycontext)
    const nav = useNavigate()

    const baseUrl = process.env.REACT_APP_URL;
    console.log(baseUrl);
    const[description,setDescription]=useState('')
    const[category,setCategory]=useState('')
    const [plants, setPlants] = useState([])
    const urlEndPoint = name.split('-').join('%20')
    console.log(urlEndPoint);
    let url =  baseUrl+'category?category='+urlEndPoint
    let url2 = baseUrl+'plants/filter?category='+urlEndPoint

    useEffect(()=>{
      let categoryDetails = async ()=>{
        try{
          const response = await axios.get(url);
        const data = response.data
        console.log(data);
        setDescription(data)
        }
        catch(err){
          console.error(err);
        }
      }
      let fetchPlants = async ()=>{
        try{
          const response = await axios.get(url2);
        const data = response.data
        console.log(data);
        setPlants(data)
        }
        catch(err){
          console.error(err);
        }
      }
      categoryDetails()
      fetchPlants()
      
    },[name])

    const addToCart = (img,name,rating,price,category,potColor)=>{
      const action = {type:'add',
                      // userName:GetContext.currentUser,
                      img:img,
                      name:name,
                      rating:rating,
                      price:price,
                      category:category,
                      potColor:potColor}
      GetContext.dispatchCart(action)
      GetContext.setTrigger(Math.random())
      nav('/cart')
    }
  
    const addToWishList = (img,name,rating,price,category)=>{
      const action = {type:'add',
                      // userName:GetContext.currentUser,
                      img:img,
                      name:name,
                      rating:rating,
                      price:price,
                      category:category,
                     }
      GetContext.dispatchWishList(action)
    }


  return (
    <div className='category-page'>
        <div className="category-img">
          {/* <img src={flowerImg} alt="flower image" /> */}
          <h2>{description[0]?.description}</h2>
        </div>
        <div className="category-details">
          <h2>{description[0]?.name}</h2>
          <p>{description[0]?.description}</p>
        </div>
        <div className="display-container">
          {plants?.map((item)=>(
            <div key={item.name}>
             <DisplayItemContainerComp 
                                     img={item?.imgLinks[0]}
                                     name={item?.name}
                                     rating={item?.rating}
                                     price={item?.price}
                                     category={item?.category}
                                     btnFunc={()=>addToCart(item.imgLinks[0],item.name,item.rating,item.price,item.category,item.potColor[0])}/>

            </div>
          ))}
        </div>

    </div>
  )
}

export  const DisplayItemContainerComp = ({img,name,rating,price,btnFunc})=>{
          return(
            <div className="item-container">
            <div className='img'>
              <img src={img} alt="" />
              <h4>{name}</h4>
            </div>
            <ul>
              <li>{rating} ⭐</li>
              <li>{price}₹</li>
              <button className='btn-sty-1' onClick={btnFunc}>cart</button>
              <button className='btn-sty-2'onClick={()=>alert('not yet assigned')}>view item</button>
            </ul>
          </div>
          )
        }