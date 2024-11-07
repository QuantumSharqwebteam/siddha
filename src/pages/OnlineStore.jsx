import React,{useState,useEffect} from 'react'
import Header from '../ui/Header'
// import { FiSearch } from "react-icons/fi";
// import { HiArrowsRightLeft } from "react-icons/hi2";

import { GoHeart } from "react-icons/go";
import { FiShoppingCart } from "react-icons/fi";
import Footer from '../ui/Footer';
import { Link } from 'react-router-dom';
import { GoAlertFill } from "react-icons/go";
import HospitalReviews from '../ui/HospitalReviews';
import axiosInstance from '../utilities/axiosInstance';
import { IoHeartSharp } from 'react-icons/io5';
import StarRatings from 'react-star-ratings';


function OnlineStore() {


    const [products,setProducts] = useState([])

const [wishlistId,setWishlistId] = useState([])
    
    const getProducts = async () =>{
        try{
          const response = await axiosInstance.get('product/getProducts');
          setProducts(response.data.message);
        
        }
        catch(err)
        {
          console.log(err);
        }
      }
      
      useEffect(()=>{
        getProducts()
      },[]);

      console.log(products)


        // Handle Add to Cart Functionality
     const handleAddToCart = (productId) => {
            // Retrieve the current cart from local storage
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
          
            // Add product ID to the cart if it's not already there
            !cart.includes(productId) && cart.push(productId);
          
            // Update local storage
            localStorage.setItem('cart', JSON.stringify(cart));
          
            console.log("Product added to cart:", cart);
          };


          // get wish list ids
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


          
          // Retrieve all cart data (product IDs) from localStorage
          const cartData = JSON.parse(localStorage.getItem('cart')) || [];
          
          // Log all product IDs stored in the cart
          console.log("All product IDs in cart:", cartData);

 const token = localStorage.getItem('token');
 
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
          getProducts();
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

          getProducts()
          getId();

      } catch (error) {
          console.error('Error adding to wishlist:', error.response ? error.response.data : error.message);
      }
    };
        
        // const wishList = JSON.parse(localStorage.getItem('wishlist'));
        console.log('wis id', wishlistId)  ;

        console.log("product details",products)
    
  return (
    <div id="store" className='w-full h-fit font-merriweather'>
        <Header/>
        <div className='w-full h-full p-10'>

           {/* Search and sort by products */}

            {/* <div className='grid md:grid-cols-10 gap-2 w-full'>

                <div  className='col-span-4 h-fit flex focus:border-darkgreen items-center gap-2 border bg-white rounded-lg  border-gray-500 md:p-2'>
                   <FiSearch className='text-xl'/>
                   <input type="text" placeholder='Search here'  className='md:text-base w-full text-sm focus:outline-none bg-transparent focus:ring-0 border-none '/>
                </div> 

                <div className='col-span-2 grid grid-cols-1 relative h-auto'>
                    <button 
                    className='w-full  col-span-1 rounded-lg flex gap-3 items-center justify-center border border-gray-500 md:p-2'>
                     Sort <HiArrowsRightLeft/>
                    </button>

                     <div className='col-span-1 h-auto border z-50 border-balck shadow-lg rounded-lg'>
                      <div className="p-4 text-left w-full text-sm">
                        <span className="">Price</span>
                        <div className="mt-2 w-full">
                            <label className="block">
                            <input
                                type="radio"
                                name="price"
                                value="High to Low"
                                // checked={selectedPrice === 'High to Low'}
                                // onChange={handlePriceChange}
                            />
                            High to Low
                            </label>
                            <label className="block">
                            <input
                                type="radio"
                                name="price"
                                value="Low to High"
                                // checked={selectedPrice === 'Low to High'}
                                // onChange={handlePriceChange}
                            />
                            Low to High
                            </label>
                        </div>

                        <span className="block mt-4 text-gray-700 font-semibold">Type</span>
                        <div className="mt-2">
                            <label className="block">
                            <input
                                type="radio"
                                name="type"
                                value="Adults"
                                // checked={selectedType === 'Adults'}
                                // onChange={handleTypeChange}
                            />
                            Adults
                            </label>
                            <label className="block">
                            <input
                                type="radio"
                                name="type"
                                value="Children"
                                // checked={selectedType === 'Children'}
                                // onChange={handleTypeChange}
                            />
                            Children
                            </label>
                        </div>
                        </div>

                    </div>

               </div> 

            </div> */}

            <div className='grid md:grid-cols-2 lg:grid-cols-4 w-full md:w-fit m-auto  gap-10'>
                
            <h1  className='md:text-left disable-aos-mobile md:col-span-2 lg:col-span-4 mt-16 text-center md:text-2xl text-xl font-bold'>Herbal Products</h1>
              <marquee behavior="" className="md:col-span-4" scrollamount="17" direction=""><p  className='flex items-center text-base gap-2'><GoAlertFill className='text-green1 text-xl text-blink'/> You can order through a <span className='font-bold'> subscription-based </span> method<GoAlertFill className='text-green1 text-blink text-xl'/> </p></marquee>
                {products.map((product,index)=>(
                   
                    <div key={index} className=' md:h-330 h-auto w-60 md:col-span-2 m-auto lg:col-span-1 rounded-md shadow-xl border   border-gray-200'>
                         
                        <div className='flex justify-end p-3  space-x-10 relative items-center'>

                            <p className='bg-green1 absolute left-0 top-0 p-1 font-roboto rounded-tl-md rounded-br-lg text-white  text-xs cursor-pointer'>{product.discount}% OFF</p>
                            <p className='text-xs  font-semibold text-gray-500'>{product.category}</p>
                            {/* <GoHeart
                                  onClick={() => handleWishlist(product.productId)}
                                  className='text-green1 text-xl cursor-pointer'
                                /> */}

                            {
                              !wishlistId.includes(product.productId) ? (
                                <GoHeart
                                data-testid={`wishlist-outlined-${product.productId}`}
                                  onClick={() => handleWishlist(product.productId)}
                                  className='text-green1 text-xl cursor-pointer'
                                />
                              ) : (
                                <IoHeartSharp
                                data-testid={`wishlist-filled-${product.productId}`}
                                  onClick={() => handleWishlistRemove(product.productId)}
                                  className='text-green1 text-xl cursor-pointer'
                                />
                              )
                            }                                                  

                        </div>

                        <div className='md:h-36 h-36 w-9/12 m-auto bg-gray-100 rounded-xl mt-2'>
                            <img src={product.imageUrl} className='h-full w-fit object-contain m-auto' alt="" />
                        </div>
                        <Link to={`/viewcart/${product.productId}#viewcart`}>
                          <div className="flex flex-col items-center justify-center mt-2">
                            <h1 className="md:text-lg text-sm font-bold">{product.productName}</h1>
                            <p className="text-sm font-roboto">₹{product.price}</p>

                            <div className="flex justify-center items-center w-full text-xs gap-2 text-orange">
                              {/* Check if overAllRating is a valid number and within range */}
                              <StarRatings
                              rating={product.overAllRating}
                              starRatedColor="orange"
                              numberOfStars={5}
                              name='rating'
                              starDimension="15px"  // Reduce star size
                              starSpacing="5px"      // Adjust spacing between stars
                          />
                            </div>

                            <button
                            data-testid={`add-to-cart-${product.productId}`} // Unique id
                              onClick={() => handleAddToCart(product.productId)}
                              className="bg-green1 p-2 rounded-md flex text-sm items-center mt-3 gap-2 text-white cursor-pointer mb-2"
                            >
                              Add to Cart <FiShoppingCart />
                            </button>
                          </div>
                        </Link>


                </div>
             
                ))}  

            </div>

           {/* Review system starts here --------- STATIC DATA---------*/}
           <HospitalReviews/>

        </div>

        <Footer/>
    </div>
  )
}

export default OnlineStore