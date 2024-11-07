import React,{useState,useEffect} from 'react'
import Header from '../ui/Header'
import { GoHeart } from "react-icons/go";
import { FiShoppingCart } from "react-icons/fi";
import Footer from '../ui/Footer';
import { Link } from 'react-router-dom';
import { GoAlertFill } from "react-icons/go";
import HospitalReviews from '../ui/HospitalReviews';
import axiosInstance from '../utilities/axiosInstance';
import { IoHeartSharp } from 'react-icons/io5';
import StarRatings from 'react-star-ratings';
import { BsChatLeftDots } from "react-icons/bs";
import { TbMessageChatbot } from "react-icons/tb";
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoArrowBackOutline } from "react-icons/io5";
function AdminReview() {

    const [show,setShow] = useState(false);
    const [products,setProducts] = useState([]);
    const [reviewData,setReviewData] = useState([]);
    const [reviewId,setReviewId] = useState([]);
    const [ error,setError] = useState(false);
    const [filteredReviews,setFilteredReviews] = useState([]);
    const token = localStorage.getItem('token')

    const getProducts = async () =>{
        try{
          const response = await axiosInstance.get('product/getProducts');
          // console.log("products data",response.data.message)
          setProducts(response.data.message);
          // setReviewId(response.data.message.review.filter(review =>( review.length > 0)));
          setReviewId(response.data.message.map(product => product.review).flat());
         
        
        }
        catch(err)
        {
          console.log(err);
        }
      }
      
      useEffect(()=>{
        getProducts()
      },[]);
  

      const getReviews = async()=> {
        try{
        const response = await axiosInstance.get('review/getreviews');
          console.log("reviews",response.data.message)
          setFilteredReviews(response.data.message.filter(review => reviewId.includes(review.reviewId)))
        }
        catch(err)
        {
          console.log("error",err)
        }
      }

      useEffect(()=>{
        getReviews()
      },[reviewId]);

      console.log("filtered review",filteredReviews)
      


      

    const handleReview = async(id,reviewid) => {
    console.log("test reviewid",reviewid)

        try{
            const response = await axiosInstance.get(`review/productReview/${id}`);
            // console.log("review response",response.data.message)
            console.log("status",response.status)
          
              setReviewData(response.data.message);
              setShow(true);
              setError(false);
      
        }
        catch(err)
        {
            console.error("error",err)
            setError(true);
            setShow(true);
        }

    }
    console.log("review ids []",reviewId);
   console.log(error)


    // remove the review from shortlisted 10
  const removeReview = async(productid,reviewid) => {
    const data = {
      productId:productid,
      reviewId:reviewid
    }
   try{
    const response = await axiosInstance.put('product/removeReview',data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include token in the header
         }
      }
    );
    console.log("reviw deletedresponse data",response.data);
    toast.success('review deleted successfully');
    handleReview(productid);
    getProducts();
    getReviews();
   }
   catch(err)
   {
    console.error("error",err);
    toast.error('unable to delete review ');
   }

  }

      // add  review to shortlisted 10
      const addReview = async(productid,reviewid) => {
        const data = {
          productId:productid,
          reviewId:reviewid
        }
    try{
      const response = await axiosInstance.put('product/addReview',data,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include token in the header
           }
        }
      );
      console.log("review added response data",response.data);
      toast.success('review added successfully');
      handleReview(productid,reviewId);
      getProducts();
      getReviews();
    }
    catch(err)
    {
      console.error("error",err)
      toast.error('unable to add review ');
    }
    
      }

  return (
    <div className='w-full min-h-screen font-merriweather '>
      <Header/>
      <ToastContainer/>
      <div className='md:grid flex flex-col grid-cols-6 mt-6 gap-2 m-auto w-full'>
         <div  className='w-full h-auto col-span-4  order-2 md:order-none  md:min-h-screen px-4 md:p-10 mb-5'>
            <p className='text-xl font-bold w-full text-center'> Review Panel</p>
              <div className={`${!show?'grid md:grid-cols-2 gap-2 lg:grid-cols-3 mt-7 md:mt-10  m-auto':'hidden'}`}>
              {products.map((product,index)=>(
                    
                    <div key={index} className=' md:h-330 mb-5 h-auto w-52 lg:w-60 md:col-span-1 m-auto lg:col-span-1 rounded-md shadow-xl border   border-gray-200'>
                          
                        <div className='flex justify-end p-3  space-x-10 relative items-center'>

                            <p className='bg-green1 absolute left-0 top-0 p-1 font-roboto rounded-tl-md rounded-br-lg text-white  text-xs cursor-pointer'>{product.discount}% OFF</p>
                            <p className='text-xs  font-semibold text-gray-500'>{product.category}</p>
                        </div>

                        <div className='md:h-36 h-36 w-9/12 m-auto bg-gray-100 rounded-xl mt-2'>
                            <img src={product.imageUrl} className='h-full w-fit object-contain m-auto' alt="" />
                        </div>
                        
                          <div className="flex flex-col items-center justify-center mt-2">
                            <h1 className="md:text-lg text-sm font-bold">{product.productName}</h1>
                            <div className="text-sm font-roboto">₹{product.price}</div>
                            <div className="flex justify-center items-center w-full text-xs gap-2 text-orange">
                              
                              <StarRatings
                              rating={product.overAllRating}
                              starRatedColor="orange"
                              numberOfStars={5}
                              name='rating'
                              starDimension="15px"  // Reduce star size
                              starSpacing="5px"      // Adjust spacing between stars
                          /> 
                            {product.overAllRating}/5
                            </div>

                            <button
                
                              onClick={() => handleReview(product.productId, product.reviewId)}
                              className="bg-green1 p-2 rounded-md flex text-sm items-center mt-3 gap-2 text-white cursor-pointer mb-2"
                            >
                              View Reviews <FiShoppingCart />
                            </button>
                          </div>
                      


                </div>
              
                ))} 
              </div>

              <div className={`${show?'w-full h-auto mt-10  m-auto':'hidden'}`}>
                <button 
                onClick={()=>{setShow(false)}}
                className='text-left w-11/12 pl-10 flex items-center gap-2'><IoArrowBackOutline/>Back to Products</button>
                {!error?
                <div className={`${reviewData.length>2?'grid  w-11/12 place-items-center  lg:grid-cols-3 md:grid-cols-2 m-auto':'w-fit md:flex items-center gap-10 m-auto'}`}>              
                {
                  reviewData.map((data,index) => (
                    <div key={index} className=' w-60 mt-5 bg-white rounded-lg shadow-xl p-5 flex text-left flex-col'>
                    <div className='block mt-5 '>
                        <h1 className='text-xl font-bold text-left'>User Name</h1>
                        <p className='text-sm mt-1'>{data.userName}</p>
                    </div>
                    <div className='block mt-5'>
                        <h1 className='text-xl font-bold text-left'>Rating</h1>
                        <div className='text-sm mt-1'>
                        <StarRatings
                                    rating={data.rating}
                                    starRatedColor="orange"
                                    numberOfStars={5}
                                    name='rating'
                                    starDimension="15px"  // Reduce star size
                                    starSpacing="5px"      // Adjust spacing between stars
                                />
                            {data.rating}/5
                            </div>
                    </div>
                    <div className='block mt-5'>
                        <h1 className='text-xl font-bold text-left'>Feedback</h1>
                        <p className='text-sm mt-1'>{data.feedback}</p>
                    </div>

                    {reviewId.includes(data.reviewId)?
                      <button
                      onClick={()=>{removeReview(data.productId,data.reviewId)}}
                      className='bg-red-400 px-3  mt-5 py-1 hover:bg-red-500 transition-all duration-200 rounded-lg text-white'>
                      Remove
                    </button>
                    :

                    <button 
                    onClick={()=>{addReview(data.productId,data.reviewId)}}
                    className='bg-green1 px-3  mt-5 py-1 hover:bg-greendark transition-all duration-200 rounded-lg text-white'>
                      Add
                    </button>
                    }

                </div> 
                  ))
                }                     
              </div>:
              <div className='w-full m-auto flex items-center md:h-400 justify-center'>

                <div className='w-fit h-fit  m-auto'>
                  <TbMessageChatbot className='m-auto mt-7 text-9xl'/>
                  <p className='text-center'>NO reviews available for this product !!</p>
                </div>

              </div>
              }
              </div>
              
              
         </div>

         <div className='col-span-2 flex h-auto   p-5 order-1 md:pb-10 md:order-none flex-col'>
          <p className='md:mb-10  text-xl font-bold w-full text-center'>Listed reviews</p>
          
          <div className='flex flex-col items-center scrollbar-hide space-y-5 p-5 md:h-screen overflow-y-auto'>  
            {
              filteredReviews.map((data,index)=>(

                <div key={index}  className='w-full p-5  rounded-md shadow-xl  flex-shrink-0'>
                <div className='block mt-2 '>
                    <h1 className='text-lg font-semibold text-left'>User Name</h1>
                    <p className='text-sm text-left mt-1'>{data.userName}</p>
                </div>
                <div className='block mt-2'>
                    <h1 className='text-lg font-semibold text-left'>Rating</h1>
                    <div className='text-sm mt-1 text-left'>
                    <StarRatings
                                rating={data.rating}
                                starRatedColor="orange"
                                numberOfStars={5}
                                name='rating'
                                starDimension="15px"  // Reduce star size
                                starSpacing="5px"      // Adjust spacing between stars
                            />
                        {data.rating}/5
                        </div>
                </div>
                <div className='block mt-2'>
                    <h1 className='text-lg font-semibold text-left'>Feedback</h1>
                    <p className='text-xs text-left mt-1'>{data.feedback}</p>
                </div>

        </div> 

              ))
            }          
  
              
          </div>

         </div>
      </div>
       
        <Footer/>
    </div>
  )
}

export default AdminReview