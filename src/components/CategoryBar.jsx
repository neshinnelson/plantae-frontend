import React from 'react'
import '../styles/category-bar.css'
import { Link, useNavigate } from 'react-router-dom'

export default function CategoryBar() {
  const nav = useNavigate()
  return (
    <div className='category-bar'>
        <ul>
          <li onClick={()=>nav('/category/flowering-plants')}>Flowering Plants</li>
          <li onClick={()=>nav('/category/indoor-plants')}>Indoor Plants</li>
          <li onClick={()=>nav('/category/bonsai-plants')}>Bonsai Plants</li>
          <li onClick={()=>nav('/category/cactus-and-succulents')}>Cactus and Succulents</li>
          <li onClick={()=>nav('/category/fruits-plants')}>Fruit Plants</li>
          <li onClick={()=>nav('/category/palm-plants')}>Palm Plants</li>
          <li onClick={()=>nav('/category/kokedama-plants')}>Kokedama Plants</li>
        </ul>
    </div>
  )
}
