import React,{useState,useEffect} from 'react';
import Header from '../ui/Header';
import Footer from '../ui/Footer';
import axiosInstance from '../utilities/axiosInstance';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsFillCartXFill } from 'react-icons/bs';

function OrderAmin() {
    const token = localStorage.getItem('token');
    const[orderdata,setOrderData] = useState([]);
    const [orderId,setOrderId] = useState('');
    const[statusForm,setStatusForm] = useState(false)
    const[status,setStatus] = useState('');

    const getOrders = async() => {
        try{
          const response = await axiosInstance.get('order/getorders',
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
    
      const enableProductUpdate = (id) => {
        setStatusForm(!statusForm);
        setOrderId(id)
      
      }
      console.log("order admin---,,,",orderdata);

const handleSubmit = async(e) => {
    e.preventDefault();
   
    try{
       const response = await axiosInstance.put(`order/updateorder/${orderId}`,
        {
            status:status
          }
          ,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        }
       )
      
       console.log("response status order",response.data);
       
       toast.success('Order Status Updated successfully');
        getOrders()
        setStatusForm(false);
        setStatus('');
    }
    catch(err)
    {
        console.error("error",err);
        toast.error('Failed to update order status');
    }
}
      
// console.log("staus",status)
  return (
    <div id="order" className='w-full h-fit font-merriweather'>
    <Header/>
    <ToastContainer/>

    {/* desktop view */}
   <div className="w-full hidden md:block relative h-auto p-10">
   <h2 className="md:text-2xl text-lg font-bold mb-6"> Order Details</h2>

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
             <th className="px-6 py-4 text-center text-sm font-bold">Update Status</th>
           </tr>
         </thead>
         <tbody >
           {orderdata.map((order, index) => (
             <tr key={index} className="border-b hover:bg-gray-50">
               <td className="px-6 py-4 text-sm">Order {index + 1}</td>
               <td className="px-6 py-4 text-sm font-roboto">₹{order.totalPrice}</td>
               <td className="px-6 py-4 text-sm font-roboto">{order.deliveryFrom || order.deliveryTo}</td> {/* Start Date */}
               <td className="px-6 py-4 text-sm font-roboto"> {order.deliveryTo}   </td>
               <td className="px-6 py-4 text-sm">{order.status}</td>
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
                         </div>
                       </div>
                     </li>
                   ))}
                 </ul>
               </td>
               <td className="px-6 py-4 text-sm">
                {order.status==='PLACED'?  <button 
                onClick={()=>{enableProductUpdate(order.orderId)}}
                className='px-3 py-1 text-sm bg-yellow-500 text-white rounded-md hover:bg-green2 hover:text-greendark'>
                    Update Status
                </button>:
                  <button 
                //   onClick={()=>{enableProductUpdate(order.orderId)}}
                  className='px-3 py-1 text-sm bg-green1 text-white rounded-md hover:bg-green2 hover:text-greendark'>
                      Delivered
                  </button>}
              
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

 {/* upadte status form */}

 <div className={`${statusForm ? 'fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm z-40' : 'hidden'}`}>
    {/* Background dimming overlay */}
    {statusForm && (
        <div className='fixed inset-0 bg-gray-500 bg-opacity-50 z-30' />
    )}
    {/* Modal */}
    <div className='fixed bg-white p-5 w-72 md:w-fit left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg h-fit md:p-10 z-40'>
        <h2 className='md:text-lg font-bold mb-6'>Update Order Status</h2>
        <form 
            onSubmit={handleSubmit}
            className='space-y-4 w-full md:w-96 m-auto'
        >
            <div className='w-full text-left'>
                <label htmlFor='status' className='block text-sm font-medium'>Status</label>
                <select
                    id='status'
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                    className='mt-1 block w-full border focus:outline-none border-gray-300 rounded-md p-2'
                >
                    <option value='PLACED'>PLACED</option>
                    <option value='DELIVERIED'>DELIVERED</option>
                </select>
            </div>

            <div className='flex items-center w-full justify-between'>
                <button
                    onClick={() => {
                        setStatusForm(false);
                        setStatus(''); // Reset status if desired
                    }}
                    type='button'
                    className='bg-red-400 lg:py-2 px-2 py-1 hover:bg-red-500 transition-all duration-200 rounded-md text-white lg:w-32 cursor-pointer text-sm'
                >
                    Cancel
                </button>
                <button
                    type='submit'
                    className='bg-green1 lg:py-2 px-2 py-1 hover:text-greendark hover:bg-lightgreen transition-all duration-200 rounded-md text-white lg:w-32 cursor-pointer text-sm'
                >
                    Update Status
                </button>
            </div>                
        </form>
    </div>
</div>


    {/* mobile view */}
    <div className='w-full md:hidden relative h-auto  p-10'>
       <h2 className='md:text-2xl text-lg font-bold  mb-6'> Your order details </h2>

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
                     </div>
                 </div>
               </div>

             ))}

             <div className="px-6 py-4 text-sm">
                {order.status==='PLACED'?  <button 
                onClick={()=>{enableProductUpdate(order.orderId)}}
                className='px-3 py-1 text-sm bg-yellow-500 text-white rounded-md hover:bg-green2 hover:text-greendark'>
                    Update Status
                </button>:
                  <button 
                //   onClick={()=>{enableProductUpdate(order.orderId)}}
                  className='px-3 py-1 text-sm bg-green1 text-white rounded-md hover:bg-green2 hover:text-greendark'>
                      Delivered
                  </button>}
              
               </div>
           

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

export default OrderAmin