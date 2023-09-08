import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBars from './components/NavBars';
import MenuAniHomePage from './components/smallComps/MenuAniHomePage';
import Home from './components/Home';
import CategoryPage from './components/CategoryPage';
import CategoryBar from './components/CategoryBar';
import { createContext, useReducer, useState } from 'react';
import Cart from './components/Cart';
import Signup from './components/Signup.jsx';
import Login from './components/Login';

export const Mycontext = createContext()

const reducerCart = (state,action)=>{
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
  // console.log(newCart);

  return (
    <div className="App">
      <BrowserRouter>
        <Mycontext.Provider value={{newCart,dispatchCart,wishList,dispatchWishList,setCurrentUser,setIsLogedIn,isLogedIn,currentUser}}>
          <NavBars/>
          <CategoryBar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/category/:name' element={<CategoryPage/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
          </Routes>
        </Mycontext.Provider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
