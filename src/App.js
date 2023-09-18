import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBars from './components/NavBars';
import MenuAniHomePage from './components/smallComps/MenuAniHomePage';
import Home from './components/Home';
import CategoryPage from './components/CategoryPage';
import CategoryBar from './components/CategoryBar';
import { createContext, useEffect, useReducer, useState } from 'react';
import Cart from './components/Cart';
import Signup from './components/Signup.jsx';
import Login from './components/Login';
import NotFoundPage from './components/NotFoundPage';
import axios from 'axios';
import Test from './components/Test';

export const Mycontext = createContext()

const reducerCart = async (state,action)=>{
  // console.log(action);
  const url = process.env.REACT_APP_URL
  switch (action.type){
    case 'add':
      let quantity = 1
      try{
        const res = await axios.post(url+'cart',{
          userId:sessionStorage.getItem('userId'),
          category:action.category,
          name:action.name,
          imgLinks:action.img,
          price:action.price,
          quantity:quantity,
          potColor:action.potColor,
        });
        const data =res.data 
        console.log(data);
        console.log('item added to cart');
      }
      catch(err){
        console.error('unable to fetch data now',err);
      }
      break
    case 'remove':
      const itemName = action.name.split(' ').join('%20')
      try{
        const res = await axios.delete(url+'cart/'+itemName)
        const data = res.data
        console.log('item deleted from db',data);
      }
      catch(err){
        console.error('unable to remove data from cart now',err);
      }
  }
}
const reducerWishList = (state,action)=>{
  // console.log(action);
  switch (action.type){
    case 'add':
      return [...state,{
        // userName:action.userName,
        img:action.img,
        name:action.name,
        rating:action.rating,
        price:action.price,
        category:action.category}]
    case 'remove':
      const updatedState = state.filter((item)=>item.name !== action.name)
      return updatedState
  }
}

function App() {

  const[newCart,dispatchCart]= useReducer(reducerCart,[])
  const[wishList,dispatchWishList]= useReducer(reducerWishList,[])
  const [isLogedIn, setIsLogedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState('')
  const[cart,setCart]=useState([])
  const [trigger,setTrigger]=useState(0)
  const url = process.env.REACT_APP_URL
  // console.log(newCart);

  useEffect(()=>{
    const fetchingCartFromDb = async()=>{
      try{
        const res = await axios.get(url+'cart/'+sessionStorage.getItem('userId'))
        const data = res.data
        console.log(data);
        setCart(data.data)
      }
      catch(err){
        console.error('unable to fetch cart data now',err);
        alert('user is not logedin')
      }
    }
    fetchingCartFromDb()
  },[newCart,trigger])

  console.log(newCart);
  console.log(cart);
  return (
    <div className="App">
      <BrowserRouter>
        <Mycontext.Provider value={{newCart,dispatchCart,wishList,dispatchWishList,
          setCurrentUser,setIsLogedIn,isLogedIn,currentUser,cart,setTrigger}}>
          <NavBars/>
          <CategoryBar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/category/:name' element={<CategoryPage/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='*' element={<NotFoundPage/>}/>
            <Route path='/test' element={<Test/>}/>
          </Routes>
        </Mycontext.Provider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
