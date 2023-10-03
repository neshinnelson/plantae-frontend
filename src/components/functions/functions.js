import axios from "axios";
import { checkoutProducts } from "../CheckOutPage/checkoutProduct";

console.log('function is running');


// adding product id to checkout route in db
export const BuyNowFunc = async(plantId,userId)=>{
    try{
        const res = await axios.post(process.env.REACT_APP_URL+'checkout',{
            userId: userId,
            productId:[plantId]
        })
        const data = res.data
        console.log(data);
        window.location.pathname = '/checkout/'+userId
    }catch(err){
        console.log('server not available to fetch checkout');
        console.error(err);
    }
}

export const loadCheckoutProducts = ()=>{
    return checkoutProducts
}

//fetching checkout products
export const fetchCheckoutProductIds = async(userId)=>{
    try{
        const res = await axios.get(process.env.REACT_APP_URL+'checkout/'+userId)
        const data = res.data.data
        if(!data) console.log('no product id');
        else{console.log(data,': product id fetched');}
        return data[0].productId 
        
    }catch(err){
        console.log('unable to fetch now ! ');
        console.error(err);
    }
}

//finding plants with id in checkout collection
export const fetchPlantsForCheckout = async(userId)=>{


    const idArray = await fetchCheckoutProductIds(userId)
    if(idArray.length > 0){
        try{
            const fetchPlants = await axios.get(process.env.REACT_APP_URL+'plants/filter?category=')
            const plant = fetchPlants.data
        
            if(plant.length > 0 ){
                const products = plant.filter((elem) => {
                    return idArray.some((ele) => {
                    return ele === elem._id
                      })
                    })
                    if(products.length > 0)return products            
            }else{
                return [' parameter array missiing']
            }
        
           }catch(err){
            console.log('server error! in fetching checkout products ');
            console.error(err);
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

//fetching user Address if av

//saving address to db by updating user-data
export const updateAddress = async(address)=>{
    try{
        const res = await axios.put(process.env.REACT_APP_URL+'user-data',address)
        const data = res.data
        if(!data) return 'no user found.'
        return data
    }catch(err){
        console.log('error in adding address to user-data');
        console.error(err);
    }
}

