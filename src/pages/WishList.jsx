import React,{useState,useEffect} from 'react'
import axiosInstance from '../utilities/axiosInstance';
import Header from '../ui/Header';
import Footer from '../ui/Footer';
import { IoHeartSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { BsFillCartXFill } from 'react-icons/bs';
import StarRatings from 'react-star-ratings';

function WishList() {

    const wishList = JSON.parse(localStorage.getItem('wishlist'));
    // const [wishListProducts, setWishListProducts] = useState([]);
    console.log("local  wishlist",wishList)

   const token = localStorage.getItem('token');

const [wishListId,setWishListId] = useState([]);


    // get wishlist product Id

    const getId = async() => {
        try{
           const response = await axiosInstance.get('user/getWishlist',
            {
                headers: {
                  Authorization: `Bearer ${token}`, // Pass the token as a Bearer token
                }
            }
           )
           console.log(response.data.message);
           setWishListId(response.data.message.filter(product => product !== null));

        }
        catch(err)
        {
            console.error("error",err)
        }
    }

    useEffect(()=>{
        getId()
    },[])

    // console.log('wishlist----->',wishListId)


    // const fetchProductsByIds = async () => {
    //     try {
    //         const productData = await Promise.all(
    //             wishList.map(async (productId) => {
    //                 const response = await axiosInstance.get(`product/getOne/${productId}`);
                   
    //                 return response.data.message
                  
    //             })
    //         );
    //         setWishListProducts(productData);
    //     } catch (error) {
    //         console.error("Error fetching products:", error);
    //     }
    // };

    // useEffect(()=>{
    //     fetchProductsByIds()
    // },[])


    // console.log('wishlist products',wishListProducts);

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
    <div className='w-full h-fit font-merriweather'>
    <Header/>
    <div className='w-full h-auto  p-10'>

      <div className='grid md:grid-cols-2 lg:grid-cols-4 w-full md:w-fit m-auto  gap-10'>
            
        <h1  className='md:col-span-2 lg:col-span-4 mt-16 text-center md:text-2xl text-xl font-bold'>Wishlist Products</h1>
          {/* <marquee behavior="" className="md:col-span-4" scrollamount="17" direction=""><p  className='flex items-center text-base gap-2'><GoAlertFill className='text-green1 text-xl text-blink'/> You can order through a <span className='font-bold'> subscription-based </span> method<GoAlertFill className='text-green1 text-blink text-xl'/> </p></marquee> */}
            {wishListId.length>0?wishListId.map((product,index)=>(
          product &&     
         (      <div key={index} className=' md:h-330 h-auto w-60 md:col-span-2 m-auto lg:col-span-1 rounded-md shadow-xl border   border-gray-200'>
                  
                   <div className='flex justify-end p-3  space-x-10 relative items-center'>

                       <p className='bg-green1 absolute left-0 top-0 p-1 font-roboto rounded-tl-md rounded-br-lg text-white  text-xs cursor-pointer'>{product.discount}% OFF</p>
                       <p className='text-xs  font-semibold text-gray-500'>{product.category}</p>
                       <IoHeartSharp
                          onClick={() => handleWishlistRemove(product.productId)}
                         className='text-green1 text-xl cursor-pointer'
                         aria-label="remove from wishlist"
                       />

                   </div>

                   <div className='md:h-36 h-36 w-9/12 m-auto bg-gray-100 rounded-xl mt-2'>
                       <img src={product.imageUrl} className='h-full w-fit object-contain m-auto' alt="" />
                   </div>

                   <div className='flex flex-col items-center justify-center mt-2'>
                    
                       <h1 className='md:text-lg text-sm font-bold'>{product.productName}</h1>
                     
                      <p className='text-sm font-roboto'>₹{product.price}</p>
                       <div className='flex justify-center items-center w-full text-xs gap-2 text-orange'>
              
                       <StarRatings
                              rating={product.overAllRating}
                              starRatedColor="orange"
                              numberOfStars={5}
                              name='rating'
                              starDimension="15px"  // Reduce star size
                              starSpacing="5px"      // Adjust spacing between stars
                          />
                       </div>

                       <Link to={`/viewcart/${product.productId}#viewcart`}>
                           <button
                             onClick={()=>{handleAddToCart(product.productId)}}
                             className='bg-green1 p-2 rounded-md flex text-sm items-center mt-3 gap-2 text-white cursor-pointer mb-2'>Add to Cart <FiShoppingCart/> 
                           </button> 
                       </Link>

                   </div>
       
           </div>)
        
           ))
           :
           <div className='w-full lg:col-span-4 md:col-span-2 h-full text-center'>
            <BsFillCartXFill className='text-9xl w-full '/>
            <p className='mt-5 md:text-base text-sm'>You have no products on your wishlist!</p>
            </div>
           }  

           

        </div>

    </div>

    <Footer/>
    </div>

  )
}

export default WishList