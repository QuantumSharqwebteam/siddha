import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../ui/Header';
import Footer from '../ui/Footer';
import { GrFormSubtract } from 'react-icons/gr';
import { IoAdd } from 'react-icons/io5';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { Link,useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StarRatings from 'react-star-ratings';
import { BsFillCartXFill } from "react-icons/bs";
import axiosInstance from '../utilities/axiosInstance';

function AddToCart() {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    const [cartProducts, setCartProducts] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token') || null;
    console.log("token",token);
    console.log("product data",cartData);

    // To get default date for single order
    // Get the current date and time
        const currentDate = new Date();

        // Calculate the date based on the current time
        const targetDate = new Date(currentDate);
        targetDate.setDate(currentDate.getDate() + (currentDate.getHours() >= 11 ? 1 : 0));

        // Format the date to YYYY-MM-DD
        const formattedDate = targetDate.toISOString().split('T')[0];

        console.log("default date",formattedDate);

    const fetchProductsByIds = async () => {
        try {
            const productData = await Promise.all(
                cartData.map(async (product) => {
                    const response = await axiosInstance.get(`https://bz1vj3cflj.execute-api.us-east-1.amazonaws.com/product/getOne/${product.productId}`);
                    return { ...response.data.message, qty: product.quantity };
                })
            );
            setCartProducts(productData);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const removeFromCart = (productId) => {
        const updatedCartData = cartData.filter((item) => item.productId !== productId);
        localStorage.setItem('cart', JSON.stringify(updatedCartData));
        setCartProducts((prevProducts) => prevProducts.filter((product) => product.productId !== productId));
        toast.success('Product removed from cart successfully!');
    };
    // remove all localstorage items
    // localStorage.removeItem('cart')

    const updateQuantity = (productId, newQuantity) => {
        const updatedProducts = cartProducts.map((product) => {
            if (product.productId === productId) {
                return { ...product, qty: newQuantity };
            }
            return product;
        });

        setCartProducts(updatedProducts);
        const updatedCartData = updatedProducts.map((product) => ({
            productId: product.productId,
            quantity: product.qty,
        }));

        localStorage.setItem('cart', JSON.stringify(updatedCartData));
    };

    useEffect(() => {
        fetchProductsByIds();
    }, []);

    // Calculate total amount
 // Calculate total discount
const calculateTotalDiscount = () => {
  return cartProducts.reduce((total, product) => {
      const discountAmount = (product.discount / 100) * (product.price * product.qty);
      return total + discountAmount;
  }, 0);
};

// Inside your component return statement
const totalDiscount = calculateTotalDiscount();
const totalPrice = cartProducts.reduce((total, product) => total + (product.price * product.qty), 0);
const finalTotal = totalPrice - totalDiscount;
 console.log(cartProducts)


// from and to date for subscription method

  const [orderMethod, setOrderMethod] = useState('');
  const [subscriptionDates, setSubscriptionDates] = useState({
    fromDate: '',
    toDate: ''
  });

  const handleOrderMethodChange = (event) => {
    setOrderMethod(event.target.value);
  };

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setSubscriptionDates((prevDates) => ({
      ...prevDates,
      [name]: value
    }));
  };



    // Local storage for Order data
    const handleProceedToOrder = () => {
        // Clear existing data
        localStorage.removeItem('orderData');

        // Set new order data
        localStorage.setItem('orderData', JSON.stringify({
            totalPrice,
            totalDiscount: totalDiscount.toFixed(2),
            orderMethod:orderMethod,
            finalTotal: finalTotal.toFixed(2) * differenceInDays,
            fromDate: subscriptionDates.fromDate ,
            toDate: subscriptionDates.toDate || formattedDate,
            subDays:differenceInDays,
            products:cartData
        }));

        // Navigate to AddressPage
        navigate('/address#address');
    };

    const start = new Date(subscriptionDates.fromDate);
    const end = new Date(subscriptionDates.toDate);

    // Calculate the time difference in milliseconds
    const timeDifference = end - start;

    // Convert the time difference from milliseconds to days
    const differenceInDays = timeDifference / (1000 * 60 * 60 * 24) || 1;

  console.log("orderMethod",orderMethod);
  console.log("subscriptionDates",subscriptionDates);
    return (
        <div id="cart" className='w-full font-merriweather'>
            <ToastContainer />
            <Header />

            <div className='w-full h-fit md:my-10 p-5'>
                <Link to="/store" className='flex items-center gap-2 text-green1 mb-5 font-semibold text-sm md:text-base'>
                    <FaArrowLeftLong /> Back to Products
                </Link>

                <div className='grid grid-cols-1 gap-6 mt-10 lg:grid-cols-3 md:grid-cols-4'>
                    <div className={`${cartProducts.length>0?`${cartProducts.length<3?'lg:flex items-center justify-center lg:w-full m-auto':'lg:grid-cols-3 grid lg:w-full'}  md:col-span-2 md:h-500 pb-0 md:pb-10 md:overflow-y-auto scrollbar-hide   w-full  m-auto gap-6`:'lg:col-span-3 md:col-span-4'}`}>
                        {cartProducts.length>0?cartProducts.map((product, index) => (
                            <div key={index} className='flex flex-col  items-center h-fit mb-5 md:mx-auto pb-3 w-9/12 m-auto md:w-72 shadow-xl rounded-xl gap-2'>
                                <div className='basis-1/3 pt-10'>
                                    <img src={product.imageUrl} className='object-contain h-16 md:h-28 m-auto' alt="" />
                                </div>

                                <div className='md:basis-1/3'>
                                    <p className='md:text-xl text-base text-center font-semibold md:font-bold'>{product.productName}</p>
                                    <p className='text-xs md:mt-2 text-left md:text-center mt-2 md:block hidden'>{product.category}</p>

                                    <div className='flex justify-center items-center w-full text-xs mt-3 gap-2 text-orange'>
                        
                                    <StarRatings
                                            rating={product.overAllRating}
                                            starRatedColor="orange"
                                            numberOfStars={5}
                                            name='rating'
                                            starDimension="15px"  // Reduce star size
                                            starSpacing="5px"      // Adjust spacing between stars
                                        />
                                    </div>
                                    <p
                                    data-testid={`product-price-${product.productId}`}
                                     className='basis-1/3 font-roboto font-bold text-sm mt-2 md:text-base '>
                                    ₹ {product.price}
                                </p>

                                    <div className='md:flex md:flex-col block md:w-full w-full m-auto mt-3  md:justify-between md:items-center'>
                                        <button className='lg:px-3 lg:py-1 m-auto font-roboto px-2 py-1 md:w-36 rounded-md cursor-pointer text-xs md:text-sm lg:text-lg gap-4 border  flex items-center justify-between'>
                                            <GrFormSubtract
                                                onClick={() => {
                                                    const newQuantity = Math.max(1, product.qty - 1);
                                                    updateQuantity(product.productId, newQuantity);
                                                }}
                                                className='text-red-500'
                                            />

                                            <p>{product.qty}</p>

                                            <IoAdd
                                                onClick={() => {
                                                    const newQuantity = product.qty + 1;
                                                    updateQuantity(product.productId, newQuantity);
                                                }}
                                                className='text-green1'
                                            />
                                        </button>
                                        <button
                                            onClick={() => removeFromCart(product.productId)}
                                            className='font-semibold text-red-500 mt-3 md:text-sm text-xs'>
                                            Remove
                                        </button>
                                    </div>
                                </div>

                               
                            </div>
                        ))
                        :
                        <div className=' w-full md:h-80  m-auto'>
                        <BsFillCartXFill className='md:text-9xl text-6xl w-full m-auto  text-center'/>
                        <p className='text-center md:text-base text-sm mt-3'>Add Products to Your Cart to Purchase</p>
                        
                        </div>}
                    </div>

                    {/* Order summary page starts here */}
                    <div  className={`${cartProducts.length>0?'lg:col-span-1 md:col-span-2 md:w-9/12 w-full mt-7 md:mt-0 h-auto lg:w-11/12 m-auto border border-gray-300 shadow-xl rounded-xl p-7':' hidden'}`}>
                        <h1 className='text-left font-bold text-base'>Order Summary</h1>

                        <div className='w-full h-fit'>
                            <div className='flex justify-between items-center mt-5 text-sm'>
                                <p className='text-gray-500'>Price</p>
                                <p className='font-roboto'> ₹ {totalPrice}</p>
                            </div>
                            <div className='flex justify-between items-center mt-5 text-sm'>
                                <p className='text-gray-500'>Discount</p>
                                <p className='font-roboto'>₹ {totalDiscount.toFixed(2)}</p>
                            </div>
                            <div className='flex justify-between items-center mt-5 text-sm'>
                                <p className='text-gray-500'>Shipping</p>
                                <p className='text-green1'>Rapido</p>
                            </div>
                        </div>

                        <hr className='my-5' />

                        <div className='flex justify-between items-center mt-5 text-sm'>
                            <p className='text-gray-500'>Total</p>
                            <p className='font-roboto'>  ₹ {finalTotal.toFixed(2) * differenceInDays}</p>
                        </div>


                        <div className="flex items-center mt-5 text-gray-500 flex flex-col justify-start space-x-4">
                           <p className="text-sm w-full text-left">Choose Order Method</p>
                            <label className="text-sm w-full text-left mt-1 ">
                            <input 
                            type="radio"
                             name="orderMethod" 
                             value="Single Time"
                             className="mr-2"
                             
                             onChange={handleOrderMethodChange} 
                             />
                             Single Time
                            </label>
                            <label className="text-sm w-full text-left mt-1 ">
                            <input
                             type="radio" 
                             name="orderMethod"
                              value="Subscription" 
                              className="mr-2" 
                              onChange={handleOrderMethodChange}
                              />
                            Subscription
                            </label>

                             {/* Show date pickers if Subscription is selected */}
                            {orderMethod === 'Subscription' && (
                                <div className="flex flex-col mt-5 w-full space-y-3">
                                <label className="text-sm w-full text-left">
                                    From Date:
                                    <input
                                    type="date"
                                    min = {new Date().toISOString().split("T")[0]}
                                    name="fromDate"
                                    value={subscriptionDates.fromDate}
                                    onChange={handleDateChange}
                                    className="block mt-1 p-2 border rounded-md w-full"
                                    />
                                </label>
                                <label className="text-sm w-full text-left">
                                    To Date:
                                    <input
                                    type="date"
                                    min={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0]}
                                    name="toDate"
                                    value={subscriptionDates.toDate}
                                    onChange={handleDateChange}
                                    className="block mt-1 p-2 border rounded-md w-full"
                                    />
                                </label>

                                <div className='flex justify-between items-center mt-5 text-sm'>
                                    <p className='text-gray-500'>Total Subscription Days</p>
                                    <p className='font-roboto text-black'>  {differenceInDays}</p>
                                </div>
                                
                                </div>        
                            )}
                        </div>

                  {token!==null? <button
                        onClick={handleProceedToOrder}
                        className='bg-green1 hover:bg-green2 transition-all text-sm hover:text-greendark md:text-base duration-200 px-4 py-2 text-white rounded-md w-full mt-5'>
                            Proceed to Order
                        </button>: <Link to='/signup'> <button
                        
                        className='bg-gray-500  transition-all text-sm md:text-base duration-200 px-4 py-2 text-white rounded-md w-full mt-5'>
                            Login To Proceed
                        </button> </Link>}
                       
                    
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default AddToCart;
