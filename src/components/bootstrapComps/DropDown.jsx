import React, { useContext } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import { Mycontext } from '../../App';


export default function DropDown({name}) {
  const GetContext = useContext(Mycontext)
  const nav = useNavigate()
  return (
    <div>
         <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {name}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={()=>{
                  GetContext.setIsLogedIn(false)
                  sessionStorage.clear()
                  window.location.reload()
                }}>logout</Dropdown.Item>
                <Dropdown.Item onClick={()=>nav('/cart')}>my cart</Dropdown.Item>
                <Dropdown.Item onClick={()=>nav('/wishlist')}>my wishlist</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </div>
  )
}
