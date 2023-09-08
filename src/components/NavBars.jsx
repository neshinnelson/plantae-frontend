import React, { useContext } from 'react'
import '../styles/nav-bars.css'
import { Link } from 'react-router-dom'
import { Mycontext } from '../App'
import DropDown from './bootstrapComps/DropDown'

export default function NavBars() {
  const GetContex = useContext(Mycontext)
  return (
    <div className='nav-bar'>
        <h2>Plantae</h2>
        <ul className='right-end'>
            <Link to={'/cart'}><li>cart</li></Link>
            <Link to={'/signup'}><li>signup</li></Link>
            <li>wishlist</li>
            <li>about</li>
            {/* {GetContex.isLogedIn?<DropDown name={GetContex.currentUser}/>:<Link to={'/login'}><li>login</li></Link>} */}
        </ul>
    </div>
  )
}
