import React from 'react'
import MenuAniHomePage from './smallComps/MenuAniHomePage'
import '../styles/home-page.css'
import HomeDisplayBox1 from './smallComps/HomeDisplayBox1'
import CategoryBar from './CategoryBar'
export default function Home() {
  return (
    <div className='home-page'>
        <div className="about-site">
            <p>Welcome to our gardening paradise! Explore our lush collection of plants, where nature's beauty meets your green thumb. From vibrant flowering plants to low-maintenance succulents, we've got your botanical desires covered. Elevate your garden, elevate your life with our carefully curated selection. Grow happiness today!
</p>
        </div>
        <MenuAniHomePage/>
        <HomeDisplayBox1/>
    </div>
  )
}
