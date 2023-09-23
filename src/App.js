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
import SinglePlantPage from './components/SinglePlantPage';
import SpecialOfferPage from './components/SpecialOfferPage';

export const Mycontext = createContext()


function App() {


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
        // alert('user is not logedin')
        console.log('user is not logedin');
      }
    }
    fetchingCartFromDb()
  },[trigger])

  console.log(cart);
  return (
    <div className="App">
      <BrowserRouter>
        <Mycontext.Provider value={{
          setCurrentUser,setIsLogedIn,isLogedIn,currentUser,cart,setTrigger,trigger}}>
          <NavBars/>
          <CategoryBar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/category/:name' element={<CategoryPage/>}/>
            <Route path='/plant-window/:name' element={<SinglePlantPage/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/todays-offer' element={<SpecialOfferPage/>}/>
            <Route path='*' element={<NotFoundPage/>}/>
            <Route path='/test' element={<Test/>}/>
          </Routes>
        </Mycontext.Provider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
