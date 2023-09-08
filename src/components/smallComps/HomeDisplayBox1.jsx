import React from 'react'
import '../../styles/home-disp-box.css'
import frockImg from '../../images/frock 4.jpg'

export default function HomeDisplayBox1() {
  return (
    <div className='home-display-box1'>
        <h1>Buy Exotic Plants</h1>
        <div className='display-box'>
            <div className="item-box">
                <img src={frockImg} alt="" />
                <h4>name</h4>
                <ul>
                    <li>category</li>
                    <li>rating</li>
                    <li>height</li>
                    <li>price</li>
                    <li>stock</li>
                </ul>
            </div>
        </div>
    </div>
  )
}
