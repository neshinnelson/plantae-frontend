import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../styles/category-page.css'
import axios from 'axios'
import { Mycontext } from '../App'
import { apiKey,baseUrl } from '../static'
import { addToCart } from './functions/functions'

export default function CategoryPage() {

    const {name} = useParams()
    const GetContext = useContext(Mycontext)
    const nav = useNavigate()

    const[description,setDescription]=useState('')
    const[category,setCategory]=useState('')
    const [plants, setPlants] = useState([])
    const urlEndPoint = name.split('-').join('%20')

    let url =  baseUrl+`/category?apikey=${apiKey}&name=`+urlEndPoint
    let url2 = baseUrl+`/plants?apikey=${apiKey}&category=`+urlEndPoint

    useEffect(()=>{
      let categoryDetails = async ()=>{
        try{
          const response = await axios.get(url);
        const data = response.data.resData
        setDescription(data)
        }
        catch(err){
          console.error(err);
        }
      }
      let fetchPlants = async ()=>{
        try{
          const response = await axios.get(url2);
        const data = response.data.data
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

  // redirecting to /single-plant-window
  const handleClickToPalntWindow = (plantName)=>{
    nav(`/plant-window/${plantName}`)
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
                                     btnFunc={()=>addToCart(item)}
                                     redirectFunc ={()=>handleClickToPalntWindow(item.name)}/>

            </div>
          ))}
        </div>

    </div>
  )
}
// {img,name,rating,price,btnFunc,redirectFunc}

export  const DisplayItemContainerComp = (props)=>{
  // console.log(props.img,'image ;;');
  // if(props.img===undefined){
  //   props.img = 'https://img.freepik.com/premium-vector/spring-flower-botanical-floral-icon-design-garden-plant-white-background-colorful-flat-vector-illustration-good-decoration-wedding-invitation-scrapbook_93083-2098.jpg'
  // }
          return(
            <div className="item-container">
            <div className='img' onClick={props.redirectFunc}>
              <img src={props.img} alt=""/>
              <h4>{props.name}</h4>
            </div>
            <ul>
              <li>{props.rating} ⭐</li>
              <li>₹{props.price}</li>
              <button className='btn-sty-1' onClick={props.btnFunc}>cart</button>
              <button className='btn-sty-2'onClick={()=>alert('not yet assigned')}>view item</button>
            </ul>
          </div>
          )
        }