
import axios from "axios";
import { checkoutProducts } from "../CheckOutPage/checkoutProduct";
import { apiKey,baseUrl } from "../../static";


console.log('function is running');


//adding items to cart along user id
export const addToCart = async(item)=>{
if(item===undefined)return 500
    const post = {
            userId:sessionStorage.getItem('userId'),
            category:item.category,
            name:item.name,
            imgLinks:item.imgLinks[0],
            price:item.price,
            rating:item.rating,
            quantity:1,
            potColor:item.potColor[0],
            plantId:item.plantId
    }

    if(sessionStorage.getItem("isLogedIn")==="true"){
      try{
        const res = await axios.post(`${baseUrl}/cart?apikey=${apiKey}`,
        post,
        {
            headers:{
            "Authorization" : `Bearer ${sessionStorage.getItem('token')}`,
            "Content-Type" : "Application/json" }
        })
        const data = res.data
        console.log(data)
        return data
        // GetContext.setTrigger(Math.random())
        //this trigger should be givven in the handle function 
        // nav('/cart')
      }
      catch(err){
        console.error('unable to post item to cart now', err);
        return err.request.status
      }
    }
    else{
        
        post.userId = ''
        console.log(post);
      try{
        const res = await axios.post(baseUrl+`/temp-cart?apikey=${apiKey}`,{
        category:item.category,
        name:item.name,
        imgLinks:item.imgLinks[0],
        price:item.price,
        rating:item.rating,
        quantity:1,
        potColor:item.potColor[0],
        plantId:item.plantId
        })
        const data = res.data
        console.log(data)
        console.log('item posted to temperary cart');
        return data
        // nav('/cart')
      }
      catch(err){
        console.error('unable to post item to temperary cart now',err)
        return err.request.status
      }
    }
    
  }

// adding product id to checkout route in db
export const BuyNowFunc = async(item)=>{
    
    try{
        const res = await axios.post(`${baseUrl}/checkout?apikey=${apiKey}`,{
            userId: sessionStorage.getItem('userId'),
            productId:[item.plantId]
        },{
            headers:{
                "Authorization" : `Bearer ${sessionStorage.getItem('token')}`,
                "Content-Type" : "Application/json"
            }
        })
        const data = res.data
        console.log(data);
        return data
    }catch(err){
        console.log('server not available to fetch checkout');
        console.error(err);
        console.log(err.request,':err');
        return err.request.status
    }
}

export const loadCheckoutProducts = ()=>{
    return checkoutProducts
}

//fetching checkout products
export const fetchCheckoutProductIds = async()=>{
    try{
        const res = await axios
        .get(`${baseUrl}/checkout/${sessionStorage.getItem('userId')}?apikey=${apiKey}`,{
            headers:{
                "Authorization" : `Bearer ${sessionStorage.getItem('token')}`,
                "Content-Type" : "Application/json"
            }
        })
        const data = res.data.data
        if(!data) console.log('no product id');
        else{console.log(data,': product id fetched');}
        return data[0].productId 
        
    }catch(err){
        console.log('unable to fetch now ! ');
        console.error(err);
        // window.location.pathname = '/quick-login'
        console.log(err.request.status);
    }
}

//finding plants with id in checkout collection
export const fetchPlantsForCheckout = async(userId)=>{


    const idArray = await fetchCheckoutProductIds(userId)
    if(!idArray)return 0
    console.log(idArray);
    if(idArray.length > 0){
        try{
            const fetchPlants = await axios.get(`${baseUrl}/plants?apikey=${apiKey}`)
            const plant = fetchPlants.data.data
            console.log(plant);
        
            if(plant.length > 0 ){
                const products = plant.filter((elem) => {
                    return idArray.some((ele) => {
                    return ele === elem.plantId
                      })
                    })
                    console.log(products);
                    if(products.length > 0)return products            
            }else{
                return [' parameter array missiing']
            }
        
           }catch(err){
            console.log('server error! in fetching checkout products ');
            console.error(err);
            return err.request.status
           }
    }

   
    }

// function to calculate total in an array    
export const findTotalFunc = (array)=>{
    console.log("findTotalFunc is running");
    return(
        array?.reduce((acc,item)=> acc + item.price,0)
    )
}

//fetching user Address if available
export const autoFillAddress = async(userId)=>{

    try{
        const res = await axios
         .get(`${baseUrl}/user-data/${sessionStorage.getItem('userId')}?apikey=${apiKey}&find=address`,
         {
            headers:{
                "Authorization" : `Bearer ${sessionStorage.getItem('token')}`,
                "Content-Type" : "Application/json"
            }
         })
        const data = res.data.data[0]
        console.log(data);
        // console.log(data.data,'----',data.address);
        if(!data.address||'') return 'no adrress found'
        return data.address 
    }catch(err){
        console.log('error in fetching address !');
        console.log(err.request.status);
        console.error(err);
        return err.request.status
    }
}

//saving address to db by updating user-data
export const updateAddress = async(address)=>{
    try{
        const res = await axios
        .put(`${baseUrl}/user-data/${sessionStorage.getItem('userId')}?apikey=${apiKey}`,address,
        {
            headers:{
                "Authorization" : `Bearer ${sessionStorage.getItem('token')}`,
                "Content-Type" : "Application/json"
            }
         })
        const data = res.data
        if(!data) return 'no user found.'
        return data
    }catch(err){
        console.log('error in adding address to user-data');
        console.error(err);
        // window.location.pathname = '/quick-login'
    }
}

//delete item from checkout
export const removeFromCheckOut = async(userId,plantId)=>{
            try{
                const res = await axios
                .delete(`${baseUrl}/checkout/${sessionStorage.getItem('userId')}?apikey=${apiKey}&itemId=${plantId}`,{
                    headers:{
                        "Authorization" : `Bearer ${sessionStorage.getItem('token')}`,
                        "Content-Type" : "Application/json"
                    }
                })
                const data = res.data
                console.log(data);
            }catch(err){
                console.log('error deleting! wrong id!');
                console.error(err);
                return err.request.status
            }
}

export const searchPlants = async(item)=>{
    console.log(item);
    try{
        const name = await axios
        .get(`${baseUrl}/plants?apikey=${apiKey}&name=${item}`)
        console.log(name);
        const resultName = name.data.data[0].name
        console.log(resultName);
        if(name.data.data)return `/plant-window/${resultName}`

        const category = await axios
        .get(`${baseUrl}/plants?apikey=${apiKey}&category=${item}`)
        console.log(category);
        const resultCategory = category.data.data[0].category
        console.log(resultCategory);
        if(resultCategory) return `/category/${resultCategory}`

    }catch(err){
        console.log('error in search');
        console.error(err);
        return err.request.status
    }
}
