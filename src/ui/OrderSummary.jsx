import React,{useState,useEffect} from 'react';
import axiosInstance from '../utilities/axiosInstance';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function OrderSummary({addressData,address}) {  

    const orderData = JSON.parse(localStorage.getItem('orderData')) || {};
    console.log("afd",address);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

   const addOrder = async(orderData,address) => {
    const postData = {
        products: orderData.products,
        address: Array(address),
        totalPrice: orderData.finalTotal,
        deliveryFrom: orderData.fromDate,
        deliveryTo: orderData.toDate
      };

      

      console.log("post data", postData)

    try{
      
        const response = await axiosInstance.post('order/addorder',postData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include token in the header
                }
            }
        );
        toast.success('order placed successfully');
        console.log("response",response.data);
        localStorage.removeItem('cart');
        localStorage.removeItem('orderData')
        navigate('/order#order')
    }
    catch(err)
    {
        toast.error('unable to place the order');
        console.error("error",err);
    }
   }
    
  return (
    <div className='lg:col-span-2 md:w-9/12 w-full mt-3 md:mt-6 h-auto lg:w-96 m-auto border border-gray-300 shadow-xl rounded-xl p-7'>
        <ToastContainer/>
        <h1 className='text-left font-bold text-base'>Order Summary</h1>

        <div className='w-full h-fit'>
            <div className='flex justify-between items-center mt-5 text-sm'>
                <p className='text-gray-500'>Price</p>
                <p className='font-roboto'> ₹ {orderData.totalPrice}</p>
            </div>
            <div className='flex justify-between items-center mt-5 text-sm'>
                <p className='text-gray-500'>Discount</p>
                <p className='font-roboto'>₹ {orderData.totalDiscount}</p>
            </div>
            <div className='flex justify-between items-center mt-5 text-sm'>
                <p className='text-gray-500'>Shipping</p>
                <p className='text-green1'>Rapido</p>
            </div>
        </div>

        <hr className='my-5' />

        <div className='flex justify-between items-center mt-5 text-sm'>
            <p className='text-gray-500'>Total</p>
            <p className='font-roboto'>  ₹ {orderData.finalTotal}</p>
        </div>

        <div className='flex justify-between items-center mt-5 text-sm'>
            <p className='text-gray-500'>Order Method</p>
            <p className='text-gray-500'> {orderData.orderMethod}</p>
        </div>

        <div className={`${orderData.orderMethod==='Subscription'?'flex justify-between items-center mt-5 text-sm':'hidden'}`}>
            <p className='text-gray-500'>From Date</p>
            <p className='font-roboto'> {orderData.fromDate}</p>
        </div>

        <div className={`${orderData.orderMethod==='Subscription'?'flex justify-between items-center mt-5 text-sm':'hidden'}`}>
            <p className='text-gray-500'>To Date</p>
            <p className='font-roboto'> {orderData.toDate}</p>
        </div>
        <div className={`${orderData.orderMethod==='Subscription'?'flex justify-between items-center mt-5 text-sm':'hidden'}`}>
            <p className='text-gray-500'>Total Days</p>
            <p className='font-roboto'> {orderData.subDays}</p>
        </div>
        {addressData.length>0 && address!==null?<button 
        onClick={()=>{addOrder(orderData,address)}}
        className='bg-green1 hover:bg-green2 hover:text-greendark transition-all text-sm md:text-base duration-200 px-4 py-2 text-white rounded-md w-full mt-5'>
            Proceed to Payment
        </button>
        :
        <button className='bg-gray-500  transition-all text-sm md:text-base duration-200 px-4 py-2 text-white rounded-md w-full mt-5'>
            Add / Select Address to Pay 
        </button>}
        

    </div>
  )
}

export default OrderSummary