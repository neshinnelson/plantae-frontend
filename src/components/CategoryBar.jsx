import React from 'react'
import '../styles/category-bar.css'
import { Link } from 'react-router-dom'

export default function CategoryBar() {
  return (
    <div className='category-bar'>
        <ul>
            <Link to={'/category/flowering-plants'}><li>Flowering Plants</li></Link>
            <Link to={'/category/indoor-plants'}><li>Indoor Plants</li></Link>
            <Link to={'/category/bonsai-plants'}><li>Bonsai Plants</li></Link>
            <Link to={'/category/cactus-and-succulents'}><li>Cactus and Succulents</li></Link>
            <Link to={'/category/fruits-plants'}><li>Fruit Plants</li></Link>
            <Link to={'/category/palm-plants'}><li>Palm Plants</li></Link>
            <Link to={'/category/kokedama-plants'}><li>Kokedama Plants</li></Link>
        </ul>
    </div>
  )
}
