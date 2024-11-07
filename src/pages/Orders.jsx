import React,{useState,useEffect} from 'react'
import Header from '../ui/Header'
import Footer from '../ui/Footer'
import axiosInstance from '../utilities/axiosInstance';
import axios from 'axios';
import { FaRocketchat } from 'react-icons/fa6';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsFillCartXFill } from 'react-icons/bs';

function Orders() {

  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');
  const[orderdata,setOrderData] = useState([]);
  const [productId,setProductId] = useState('')

  console.log('email',email);

  const getOrders = async() => {
    try{
      const response = await axiosInstance.get(`order/getUserOrder/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token as a Bearer token
          }
      }
      );
      setOrderData(response.data.message)
    }
    catch(err)
    {
      console.log("error",err)
    }
  }


  useEffect(()=> {
    getOrders()
  },[]);

  console.log("order details---,,,",orderdata);


  // Reviews functionality
  const [showReview,setShowReview] = useState(false)
const [rating, setRating] = useState(5);
const [feedback, setFeedback] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();
  const reviewData = {
    rating,
    productId,
    feedback,
  };

  try {
    const response = await axios.post('https://bz1vj3cflj.execute-api.us-east-1.amazonaws.com/review/addReview', reviewData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success('review added successfully')
    console.log('Review submitted successfully:', response.data);
    // Reset the form or provide feedback to the user
    setRating(5);
    setFeedback('');
    setShowReview(false)
  }
   catch (error) {
    console.error('Error submitting review:', error);
  }
  
};

const enabelReview = (id) => {
  setShowReview(!showReview);
  setProductId(id)

}

  return (
    <div id="order" className='w-full h-fit font-merriweather'>
       <Header/>
       <ToastContainer/>

       {/* desktop view */}
      <div className="w-full hidden md:block relative h-auto p-10">
      <h2 className="md:text-2xl text-lg font-bold mb-6">Your Order Details</h2>
  
      {/* Add Review Modal */}
      <div>
  {/* Background dimming effect */}
  <div
    className={`${
      showReview ? "fixed inset-0 bg-black bg-opacity-50 z-30" : "hidden"
    }`}
    onClick={() => setShowReview(false)} // Close modal if background is clicked
  ></div>

  {/* Modal content */}
  <div
    className={`${
      showReview
        ? "fixed bg-white p-5 md:w-2/3 lg:w-1/3 w-10/12 left-1/2 top-1/2 inset-0  backdrop-blur-sm z-40 transform -translate-x-1/2 -translate-y-1/2 rounded-lg h-fit md:p-10 shadow-2xl"
        : "hidden"
    }`}
  >
    <h2 className="md:text-2xl font-bold mb-6 text-center text-gray-800">
      Add a Review
    </h2>
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Rating Input */}
      <div className="w-full text-left">
        <label
          htmlFor="rating"
          className="block text-sm md:text-base  font-bold  text-gray-700"
        >
          Rating
        </label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          min="1"
          max="5"
          required
          className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green1 focus:outline-none transition-shadow shadow-sm"
        />
      </div>

      {/* Feedback Input */}
      <div className="w-full text-left">
        <label
          htmlFor="feedback"
          className="block text-sm md:text-base  font-bold text-gray-700"
        >
          Feedback
        </label>
        <textarea
          id="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
          rows="4"
          className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green1 focus:outline-none transition-shadow shadow-sm"
        />
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between mt-6">
        <button
          type="button"
          onClick={() => setShowReview(false)}
          className="bg-red-500 py-2 px-5 hover:bg-red-600 transition-all duration-200 rounded-md text-white shadow-md focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-green1 py-2 px-5 hover:bg-lightgreen transition-all duration-200 rounded-md text-white shadow-md focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Submit Review
        </button>
      </div>
    </form>
  </div>
</div>


  
      {/* Orders Table */}
      {orderdata.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse bg-white  shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-6 py-4 text-center text-sm font-bold">Order #</th>
                <th className="px-6 py-4 text-center text-sm font-bold">Total Price</th>
                <th className="px-6 py-4 text-center text-sm font-bold">Start Date</th>
                <th className="px-6 py-4 text-center text-sm font-bold">Delivery Date</th>
                <th className="px-6 py-4 text-center text-sm font-bold">Order Status</th>
                <th className="px-6 py-4 text-center text-sm font-bold">Product Details</th>
              </tr>
            </thead>
            <tbody >
              {orderdata.map((order, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">Order {index + 1}</td>
                  <td className="px-6 py-4 text-sm font-roboto">₹{order.totalPrice}</td>
                  <td className="px-6 py-4 text-sm font-roboto">{order.deliveryFrom || order.deliveryTo || '10/10/2024'}</td> {/* Start Date */}
                  <td className="px-6 py-4 text-sm font-roboto"> {order.deliveryTo ||  '12/10/2024'}   </td>
                  <td className="px-6 py-4 text-sm">{order.status==='DELIVERIED'?'DELIVERED':order.status}</td>
                  <td className="px-6 flex justify-center items-center py-4">
                    <ul className="space-y-3">
                      {order.products.map((product, idx) => (
                        <li key={idx} className="flex flex-col space-y-3">
                          <div className="flex items-center space-x-3">
                            <img
                              src={product.imageUrl}
                              alt={product.productName}
                              className="w-16 h-16 object-contain rounded"
                            />
                            <div className="text-left">
                              <p className="text-xs lg:text-sm font-bold">{product.productName}</p>
                              <p className="text-xs lg:text-sm">₹{product.price}</p>
                              <p className="text-xs lg:text-sm">Qty: {product.quantity}</p>
                              <button
                              onClick={() => enabelReview(product.productId)} 
                              className="text-green1 hover:text-green1 text-xs transition-colors"
                            >
                              Add Review
                            </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="w-full h-fit text-center mt-10">
          <BsFillCartXFill className="text-9xl w-full text-gray-500" />
          <p className="mt-5 md:text-base text-sm">Your Order is empty!</p>
        </div>
      )}
    </div>

       {/* mobile view */}
       <div className='w-full md:hidden relative h-auto  p-10'>
          <h2 className='md:text-2xl text-lg font-bold  mb-6'> Your order details </h2>

          <div className={`${showReview?'fixed bg-gray-100 p-5 w-72 md:w-fit  left-1/2  top-1/2 inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm z-40  transform -translate-x-1/2 -translate-y-1/2  rounded-lg  h-fit md:p-10':'hidden'}`}>
              <h2 className='md:text-2xl font-bold mb-6'>Add a Review</h2>
              <form onSubmit={handleSubmit} className='space-y-4 w-full md:w-96 m-auto'>
                <div className='w-full text-left'>
                    <label htmlFor='rating' className='block text-sm font-medium'>Rating</label>
                    <input
                    type='number'
                    id='rating'
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                    min='1'
                    max='5'
                    required
                    className='mt-1 block w-full border focus:outline-none border-gray-300 rounded-md p-2'
                    />
                </div>
                <div className='w-full text-left'>
                      <label htmlFor='feedback' className='block text-sm font-medium'>Feedback</label>
                      <textarea
                      id='feedback'
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      required
                      rows='4'
                      className='mt-1 block w-full border focus:outline-none border-gray-300 rounded-md p-2'
                      />
                  </div>

                  <div className='flex items-center w-full  justify-between'>
                  <button
                  onClick={()=>{setShowReview(false)}}
                   className='bg-red-400  lg:py-2 px-2 py-1 hover:bg-red-500 transition-all duration-200 rounded-md text-white  lg:w-32  cursor-pointer text-sm'>
                   Cancel
                  </button>
                  <button
                      type='submit'
                      className='bg-green1 lg:py-2 px-2 py-1 hover:text-greendark hover:bg-lightgreen transition-all duration-200 rounded-md text-white  lg:w-32 cursor-pointer text-sm'
                  >
                      Submit Review
                  </button>                 
                  </div>                
              </form>
          </div>        
          {orderdata.length>0? orderdata.map((order,index)=>(
            <div key={index}  className='mb-6 md:w-11/12 lg:w-8/12 p-5 flex-wrap rounded-lg border border-black m-auto items-center gap-3 '>
            <p className='md:text-xl font-bold text-base text-center'>Order {index+1}</p>
                <div className='w-full md:flex items-center mt-5 justify-between'>
                  {/* <p className='md:text-lg font-bold '>Order 1</p> */}
                  <p className='lg:text-sm text-xs flex items-center mt-1 font-roboto  md:mt-0 gap-3'><span className='font-bold  font-merriweather '>Total Price:</span>₹{order.totalPrice}</p> 
                  {order.deliveryFrom==='' && order.deliveryTo!==''? <p className='lg:text-sm text-xs flex items-center mt-1 font-roboto md:mt-0 gap-3'><span className='font-bold   font-merriweather'> Delivery Date:</span> {order.deliveryTo}</p>: <p className='lg:text-sm text-xs flex items-center mt-1 font-roboto md:mt-0 gap-3'><span className='font-bold   font-merriweather'> Start Date:</span> {order.deliveryFrom}</p>}     
                  {order.deliveryTo!=='' && order.deliveryFrom!==''?<p className='lg:text-sm text-xs flex items-center mt-1 font-roboto md:mt-0 gap-3'><span className='font-bold   font-merriweather'> End Date:</span> {order.deliveryTo}</p>:''}
                  <p className='lg:text-sm text-xs flex items-center mt-1 md:mt-0 gap-3'><span className='font-bold  '> Order Status:</span>{order.status}</p>
                </div>

                <h1 className='text-left mt-5 font-bold text-base md:text-xl'>Product Details</h1>
                {order.products.map((product,idx)=>(

                  <div key={idx} className='md:flex lg:w-fit w-fit  mt-2 md:mt-2 items-center   gap-3'>
                    <div className='w-fit p-4 bg-gray-100 rounded-lg  px-10 h-40'>
                      
                      <img src={product.imageUrl} className='w-full h-full  object-contain' alt="" />
                     
                      </div>

                    <div className='w-fit text-left  md:p-10 mt-4 md:mt-0  flex justify-center items-center'>
                      
                        <div className='flex w-full h-fit flex-col'>
                          <p className=' text-xs lg:text-sm flex  items-center gap-3'><span className='font-bold  font-merriweather'>Product Name:</span>{product.productName}</p>
                          <p className=' text-xs lg:text-sm flex font-roboto items-center gap-3 mt-3'><span className='font-bold  font-merriweather'>Price:</span>₹160</p>
                          <p className=' text-xs lg:text-sm flex font-roboto items-center gap-3 mt-3'><span className='font-bold  font-merriweather'>Quantity:</span>2</p>  
                          <p 
                          onClick={()=>{enabelReview(product.productId)}}
                          className='flex cursor-pointer items-center text-xs md:text-sm gap-3 mt-3  text-green1'>
                          <FaRocketchat/>  Add Reviews
                          </p>
                        </div>
                    

                    </div>
                  </div>

                ))}
             


              

              </div>
          )):
          <div className='w-full  h-fit text-center'>
            <BsFillCartXFill className='text-9xl w-full '/>
            <p className='mt-5 md:text-base text-sm'>Your Order is empty !</p>
            </div>
          }

          

        </div>

        
        <Footer/>

    </div>
  )
}

export default Orders