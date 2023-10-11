import React, { useContext, useState } from 'react'
import '../styles/nav-bars.css'
import { Link, useNavigate } from 'react-router-dom'
import { Mycontext } from '../App'
import DropDown from './bootstrapComps/DropDown'
import { searchPlants } from './functions/functions'

export default function NavBars() {
  const GetContext = useContext(Mycontext)
  const nav = useNavigate()
  const [searchQuery,setSearchQuery]=useState('')
  console.log(searchQuery);

  //handle search
  const handleSearch = async()=>{
    const res = await searchPlants(searchQuery)
    nav(res)
    console.log(res);
  }
  return (
    <div className='nav-bar'>
        <h2 onClick={()=>nav('/')}>Plantae</h2>
        <div className="search-container">
          <input type="text" className='search-box' placeholder='search plants...' 
          onChange={(e)=>setSearchQuery(e.target.value)}/>
          <button className="clr-alm" onClick={handleSearch}>search</button>
        </div>
        <ul className='right-end'>
           <li onClick={()=>nav('/cart')}>cart</li>
           <li onClick={()=>nav('/signup')}>signup</li>
           <li onClick={()=>nav('/wishlist')}>wishlist</li>
           <li onClick={()=>nav('/about')}>about</li>
           {sessionStorage.getItem('isLogedIn')?<DropDown name={sessionStorage.getItem('currentUser')}/>:<li onClick={()=>nav('/login')}>login</li>}
           
        </ul>
    </div>
  )
}
