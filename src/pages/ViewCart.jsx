import React,{useEffect,useState} from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../ui/Header';
import { IoAdd, IoHeartSharp } from "react-icons/io5";
import { GrFormSubtract } from "react-icons/gr";
import { GoHeart } from "react-icons/go";
import StarRatings from 'react-star-ratings';
import Footer from '../ui/Footer';
import { FaArrowLeftLong, FaRocketchat } from "react-icons/fa6";
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../utilities/axiosInstance';

function ViewCart() {
    const { productId } = useParams(); // Destructure productId from useParams
    const[product,setProduct] = useState([]);
    const[quantity,setQuantity] = useState(1);
    
    const [wishlistId,setWishlistId] = useState([]);
    const token = localStorage.getItem('token')
    // Now you can use productId in your component logic
    console.log("Product ID:", productId);


    // Get seleclted product details
    const getSingleProduct = async (productId) => {
        try
        {
            const response = await axios.get(`https://bz1vj3cflj.execute-api.us-east-1.amazonaws.com/product/getOne/${productId}`);
            setProduct(response.data.message);

        }
        catch(err)
        {
            console.error("error",err);
            
        }
    }

   // Use useEffect to call getSingleProduct when the component mounts
   useEffect(() => {
    if (productId) { // Check if productId is not undefined
        getSingleProduct(productId); // Call with the actual productId
    }
}, [productId]); // Dependency array includes productId

const handleAddToCart = (productId, quantity) => {
    // Retrieve the current cart from local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Use `map` to update quantity if the product exists, otherwise append the new product
    const updatedCart = cart.some(item => item.productId === productId)
      ? cart.map(item => item.productId === productId 
          ? { ...item, quantity: item.quantity + quantity } 
          : item
        )
      : [...cart, { productId, quantity }];
    
    // Update local storage with the updated cart
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    console.log("Product added to cart:", updatedCart);
  };
  
  // Retrieve all cart data (product IDs) from localStorage
  const cartData = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Log all product IDs stored in the cart
  console.log("All product IDs in cart:", cartData);


  const getId = async() => {
    try{
       const response = await axiosInstance.get('user/getWishlist',
        {
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token as a Bearer token
            }
        }
       )
       console.log("is id",response.data.message);
       setWishlistId(response.data.message.filter(product => product !== null && product.productId).map(product => product.productId));

    }
    catch(err)
    {
        console.error("error",err)
    }
}

useEffect(()=>{
    getId()
},[])




//  add to wishlist
const handleWishlist = async (productId) => {
  try {

      // Make the PUT request to add the product to the wishlist
      const response = await axiosInstance.put(
          'user/addToWishlist',
          { productId }, // Body of the request
          {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}` // Include token in the header
              }
          }
      );
  
      getId();
 

  } catch (error) {
      console.error('Error adding to wishlist:', error.response ? error.response.data : error.message);
  }
};



// remove from wishlist
const handleWishlistRemove = async (productId) => {
  try {

      // Make the PUT request to add the product to the wishlist
      const response = await axiosInstance.put(
          'user/removeToWishlist',
          { productId }, // Body of the request
          {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}` // Include token in the header
              }
          }
      );
      console.log(response.data)

     
      getId();

  } catch (error) {
      console.error('Error adding to wishlist:', error.response ? error.response.data : error.message);
  }
};
   

  return (
    <div id="viewcart" className='w-full h-fit font-merriweather'>
        <Header />
        <ToastContainer/>

        <div  className='w-full h-fit md:my-10 md:p-10 p-5'>
        <Link  to="/store" className='flex items-center  gap-2 text-green1 font-semibold text-sm md:text-base'>
            <FaArrowLeftLong/> Back to Products
        </Link> 
           {product && ( <div className='grid md:grid-cols-4 w-11/12 mt-10 m-auto'>
                <div  className='col-span-2 order-2 md:order-none mt-5 md:mt-0  m-auto lg:py-10'>
                    <h1 className='lg:text-2xl md:text-xl text-center md:text-left w-full font-bold'>{product.productName}</h1>
                    <h3 className={`${product.productName==='Oral Rehydration'?'text-xs lg:text-sm lg:w-8/12 md:w-9/12 text-wrap mt-5 text-justify md:text-left  leading-relaxed':'hidden'}`}><span className='font-bold text-blink lg:text-lg md:text-sm text-xs'> Delivery time for this product is <span className='font-roboto'>12</span> hours from the order.  </span> <br /> If ordered before <span className='font-roboto'>9:30 PM</span> , the product will be delivered the next day before <span className='fonto-roboto'>10:00 AM</span> .</h3>
                    <div className='flex md:w-8/12 mt-5 justify-between items-center'>
                        <p className='w-fit text-sm lg:text-lg font-roboto'>₹{product.price}</p>
                        <div className=' w-fit text-sm lg:text-lg text-yellow-500 flex items-center'>
                         <StarRatings
                              rating={product.overAllRating}
                              starRatedColor="orange"
                              numberOfStars={5}
                              name='rating'
                              starDimension="15px"  // Reduce star size
                              starSpacing="5px"      // Adjust spacing between stars
                          />
                           <p className='ml-1 text-black'> {product.overAllRating}/5</p>
                        </div>
                    </div>
                    <p className='text-xs lg:text-sm lg:w-8/12 md:w-9/12 text-wrap mt-5 text-justify md:text-left  leading-relaxed'>
                           {product.description}
                    </p>


                    <div className='flex md:w-8/12 mt-5 justify-between itesm-center'>
                        <button className='lg:px-4 lg:py-2 font-roboto px-2 py-1  rounded-md cursor-pointer md:text-sm lg:text-lg  gap-4 border lg:w-32 flex items-center justify-between' >
                        <GrFormSubtract
                        aria-label='subtract'
                        onClick={()=>{
                            setQuantity(quantity-1<1?1:quantity-1);
                        }}
                         className='text-red-500'/>

                        <p>{quantity}</p> 
                            
                        <IoAdd 
                        aria-label='add'
                        onClick={()=>{setQuantity(quantity+1)}}
                        className='text-green1'/>
                        </button>
                        <Link to="/cart#cart">
                        <button 
                       onClick={()=>{handleAddToCart(product.productId,quantity)}}
                        className='bg-green1 lg:px-4 lg:py-2 px-2 py-1 hover:bg-lightgreen transition-all duration-200 rounded-md text-white  lg:w-32  cursor-pointer text-sm'>
                            Add to Cart
                        </button>
                        </Link>
                    </div> 

                    
                    {  !wishlistId.includes(product.productId) ? (
                                <p
                                onClick={() => handleWishlist(product.productId)}
                                className='flex cursor-pointer items-center text-xs md:text-sm gap-3 text-green1  mt-5'>
                                    <GoHeart/> Add to Wishlist
                                </p>
                                ) : (
                                <p
                                className='flex cursor-pointer items-center text-xs md:text-sm gap-3 text-green1  mt-5'>
                                    <IoHeartSharp
                                    onClick={() => handleWishlistRemove(product.productId)}
                                     className='text-green1   cursor-pointer'/>Wishlist Poduct
                                </p>
                              )
                            } 
                

               

                </div>

                <div  className='col-span-2 h-fit order-1 md:order-none'>
                  
                    <img src={product.imageUrl} className='lg:h-96 md:h-60 h-40 w-9/12 p-4  border-2 rounded-md m-auto object-contain' alt="" />

                </div>

            </div>)}



        </div>
        <Footer/>

    </div>
  )
}

export default ViewCart