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
    // console.log(url);
    const[description,setDescription]=useState('')
    const[category,setCategory]=useState('')
    const [plants, setPlants] = useState([])
    let url
    let url2

    switch(name){
        case 'flowering-plants':
            console.log('hai');
            url = baseUrl+'category?category=flowering%20plants'
            url2 = baseUrl+'plants/filter?category=flowering%20plants'
            // setCategory('Flowering Plants')
            break;
        case 'indoor-plants':
          console.log('hai');
          url = baseUrl+'category?category=indoor%20plants'
          url2 = baseUrl+'plants/filter?category=indoor%20plants'
          // setCategory('Indoor Plants')
          break;    
        case 'bonsai-plants':
          console.log('hai');
          url = baseUrl+'category?category=bonsai%20plants'
          url2 = baseUrl+'plants/filter?category=bonsai%20plants'
          // setCategory('Bonsai Plants')
          break;
        case 'cactus-and-succulents':
          console.log('hai');
          url = baseUrl+'category?category=cactus%20and%20succulents'
          url2 = baseUrl+'plants/filter?category=cactus%20and%20succulents'
          // setCategory('Cactus and succulents')
          break;
        case 'fruits-plants':
          console.log('hai');
          url = baseUrl+'category?category=fruits%20plants'
          url2 = baseUrl+'plants/filter?category=fruits%20plants'
          // setCategory('Fruits Plants')
          break;
        case 'palm-plants':
          console.log('hai');
          url = baseUrl+'category?category=palm%20plants'
          url2 = baseUrl+'plants/filter?category=palm%20plants'
          // setCategory('Palm Plants')
          break;
        case 'kokedama-plants':
          console.log('hai');
          url = baseUrl+'category?category=kokedama%20plants'
          url2 = baseUrl+'plants/filter?category=kokedama%20plants'
          // setCategory('Kokedama Plants')
          break;

    }
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