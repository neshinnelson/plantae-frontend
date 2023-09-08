import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';


export default function DropDown({name}) {
  return (
    <div>
         <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {name}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">logout</Dropdown.Item>
                <Dropdown.Item href="#/action-2">my cart</Dropdown.Item>
                <Dropdown.Item href="#/action-3">my wishlist</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </div>
  )
}
