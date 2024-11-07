import React,{useState,useEffect} from 'react'
import Header from '../ui/Header'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import axiosInstance from '../utilities/axiosInstance'
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import OrderSummary from '../ui/OrderSummary'
import Footer from '../ui/Footer'

function AddressPage() { 
 const [address,setAddress] = useState([]);
 const [singleAddressId,setSingleAddressId] = useState(null);
 const [showEditForm,setShowEditForm] = useState(false); 
const getAddress = async () =>{
        try{
          const response = await axiosInstance.get(`user/getInfo`);
          setAddress(response.data.message.address);
        }
        catch(err)
        {
          console.log(err);
        }
  }
    
      useEffect(()=>{
        getAddress()
      },[]);

 const [showForm, setShowForm] = useState(false);
 const [formData, setFormData] = useState({
   fullName: '',
   addressType: 'Home',
   phoneNumber: '',
   houseNo: '',
   streetName: '',
   city: '',
   pincode: ''
 });
 const [formData2, setFormData2] = useState({
  name: '',
  addressType: 'Home',
  phoneNo: '',
  houseNo: '',
  streetName: '',
  city: '',
  pincode: ''
});
 // Handle the form display
 const AddNewAddress = () => {
   setShowForm(true); // Show the form when the button is clicked
 };

 // Handle input changes
 const handleInputChange = (e) => {
   const { name, value } = e.target;
   setFormData({
     ...formData,
     [name]: value,
   });
 };

// Add new address
   const handleSubmit = async (e) => {
    e.preventDefault();
    // Create the request body by mapping the formData fields to the expected structure
    const requestBody = {
      newAddress: {
        name: formData.fullName,
        phoneNo: formData.phoneNumber,
        houseNo: formData.houseNo,
        streetName: formData.streetName,
        city: formData.city,
        pincode: formData.pincode,
        addressType: formData.addressType.toLowerCase(), // convert to lowercase if needed
      },
    };
  
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    try {
      // Send the PUT request using axios and pass the token in the headers
      const response = await axios.put(
        'https://bz1vj3cflj.execute-api.us-east-1.amazonaws.com/user/addAddress',
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token as a Bearer token
          },
        }
      );
      setShowForm(false); 
      toast.success("Address Added successfully");
      setFormData({
        fullName: '',
        addressType: 'Home',
        phoneNumber: '',
        houseNo: '',
        streetName: '',
        city: '',
        pincode: ''
      })
      getAddress() 
    } 
    catch (error) {
      console.error('Error occurred during address update:', error);
    } 
  };
  
// remove address
const removeAddress = async (id) => {  
    // Get the token from localStorage
    const token = localStorage.getItem('token'); 
    // Create the request body
    const requestBody = {
      addressId:id, 
    };
    console.log("id",id)
    console.log("requestBody",requestBody)
    try {
      // Send the PUT request using axios and pass the token in the headers
      const response = await axios.put(
        'https://bz1vj3cflj.execute-api.us-east-1.amazonaws.com/user/removeAddress',
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token as a Bearer token
          },
        }
      );
      console.log('Address updated successfully:', response.data);
      toast.success("Address removed successfully");
      getAddress()
    } 
    catch (error) {
      console.error('Error occurred during address update:', error);
    } 
  };
  //  To edit address
 const handleInputChange2 = (e) => {
  const { name, value } = e.target;
  setFormData2({
    ...formData2,
    [name]: value,
  });
};
useEffect(() => {
  const selectedAddress = address.find((data) => data.id === singleAddressId);
  selectedAddress && setFormData2(selectedAddress);
}, [singleAddressId, address]);

  const editFormFunction = async(id) =>{
    setSingleAddressId(id);
    setShowEditForm(true)
  }
  // Function to handle form submission for editing address
const handleEditSubmit = async (e) => {
  e.preventDefault();

  // Get the token from localStorage
  const token = localStorage.getItem('token');

  // Create the request body with the updated address
  const requestBody = {
    addressId: singleAddressId, // The ID of the address being updated
    updatedAddress: {
      name: formData2.name,
      phoneNo: formData2.phoneNo,
      houseNo: formData2.houseNo,
      streetName: formData2.streetName,
      city: formData2.city,
      pincode: formData2.pincode,
      addressType: formData2.addressType.toLowerCase(), // Convert to lowercase
    },
  };

  try {
    // Send the PUT request using axios and pass the token in the headers
    const response = await axios.put(
      'https://bz1vj3cflj.execute-api.us-east-1.amazonaws.com/user/editAddress',
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token as a Bearer token
        },
      }
    );

    console.log('Address updated successfully:', response.data);
    toast.success("Address updated successfully");
    getAddress();
    // Close the edit form after successful submission
    setShowEditForm(false);
  } catch (error) {
    console.error('Error occurred during address update:', error);
    toast.error("Failed to update address");
  }
};
  console.log("single address",singleAddressId);
  const orderData = JSON.parse(localStorage.getItem('orderData')) || {};

  console.log("order summary",orderData);

  const [selectedAddress, setSelectedAddress] = useState(null);

  // Function to handle the selection of an address
  const handleAddressChange = (data) => {
    setSelectedAddress(data);
    console.log('Selected Address:', data);
    // You can also save this to local storage or send it to the backend here
  };
  console.log("selected address",selectedAddress)

  return (
  <div id="address" className='w-full font-merriweather'>
        
     <Header/>
    <ToastContainer/>
    <div className='w-full h-fit md:my-10 p-5'>
     <Link to="/cart" className='flex items-center gap-2 text-green1 mb-5 font-semibold text-sm md:text-base'>
        <FaArrowLeftLong /> Back to Cart
     </Link>

        <div className='grid grid-cols-1 mt-10 lg:grid-cols-5'>

            <div className='md:col-span-3 w-full lg:w-11/12 m-auto gap-2'>
            
               <div className='lg:min-h-96  h-auto  w-full '>      
                {/* map address data here */}
               
                  {address.length>0?address.map((data,index)=>(
                   <div key={index} className='md:flex justify-between  h-auto  border-b items-start p-5 w-ful'>
                    <label className="basis-3/5 text-sm w-full text-left">
                   <div className=' flex justify-start items-start gap-2'>
                     <input
                        type="radio"
                        name="address"
                        value={data.id} // Set the value to the unique id or address identifier
                        checked={selectedAddress?.id === data.id} // Check if this address is selected
                        onChange={() => handleAddressChange(data)} // Handle address change
                        className="mr-2 mt-1"
                      />
                        <div className='flex flex-col mt-0'>
                            <h1 className='font-bold md:text-xl'>{data.name}</h1>
                            <div className='md:mt-3 mt-2'>{data.houseNo}, {data.streetName}, {data.city},{data.pincode}.</div>
                            <p className='font-bold md:mt-3 mt-2'>Contact: <span className='font-roboto font-medium'>{data.phoneNo}</span></p>
                        </div>
                   </div>              
                  </label>
                   {/* Edit and Delete address */}
                    <div className='flex mt-4 md:mt-0 w-fit items-center gap-3'>
                        <p 
                        onClick={()=>{editFormFunction(data.id)}}
                        className='md:text-base text-xs cursor-pointer'>Edit</p>
                        <p
                        onClick={() => {removeAddress(data.id) }}
                        className='md:text-base text-xs text-red-500 cursor-pointer'>Remove</p>
         
                    </div>
                    </div>
                  )):'Add Address to Confirm Order'}
                  <p 
                  onClick={AddNewAddress}
                  className='text-left text-green1 cursor-pointer p-5'>+ Add address</p>
                   
                   {showForm && (
                 
                    <form onSubmit={handleSubmit} className='md:grid w-full p-5  md:grid-cols-1 lg:grid-cols-3 w-full m-auto w-full gap-5 mt-5 md:mt-10 items-center'>
                        <div className="relative border   border-black rounded-lg lg:p-4 md:p-3 p-2 mb-4">
                        <label className="absolute -top-2 bg-white left-4 px-1 lg:text-sm text-xs">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full focus:outline-none bg-transparent focus:ring-0 border-none lg:text-sm md:text-sm text-xs text-gray-700"
                            placeholder="Enter your full name"
                        />
                        </div>

                        <div className="relative border border-black rounded-lg lg:p-4 md:p-3 p-2 mb-4">
                        <label className="absolute -top-2 bg-white left-4 px-1 lg:text-sm text-xs">
                            Address Type
                        </label>
                        <input
                            type="text"
                            name="addressType"
                            value={formData.addressType}
                            onChange={handleInputChange}
                            className="w-full focus:outline-none bg-transparent focus:ring-0 border-none lg:text-sm md:text-sm text-xs text-gray-700"
                            placeholder="Home/Office"
                        />
                        </div>

                        <div className="relative border border-black rounded-lg lg:p-4 md:p-3 p-2 mb-4">
                        <label className="absolute -top-2 bg-white left-4 px-1 lg:text-sm text-xs">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className="w-full focus:outline-none font-roboto bg-transparent focus:ring-0 border-none lg:text-sm md:text-sm text-xs text-gray-700"
                            placeholder="+91 1234567890"
                        />
                        </div>

                        <div className="relative border border-black rounded-lg lg:p-4 md:p-3 p-2 mb-4">
                        <label className="absolute -top-2 bg-white left-4 px-1 lg:text-sm text-xs">
                            House No
                        </label>
                        <input
                            type="text"
                            name="houseNo"
                            value={formData.houseNo}
                            onChange={handleInputChange}
                            className="w-full focus:outline-none bg-transparent font-roboto focus:ring-0 border-none lg:text-sm md:text-sm text-xs text-gray-700"
                            placeholder="Enter house number"
                        />
                        </div>

                        <div className="relative border border-black rounded-lg lg:p-4 md:p-3 p-2 mb-4">
                        <label className="absolute -top-2 bg-white left-4 px-1 lg:text-sm text-xs">
                            Street Name
                        </label>
                        <input
                            type="text"
                            name="streetName"
                            value={formData.streetName}
                            onChange={handleInputChange}
                            className="w-full focus:outline-none bg-transparent focus:ring-0 border-none lg:text-sm md:text-sm text-xs text-gray-700"
                            placeholder="Enter street name"
                        />
                        </div>

                        <div className="relative border border-black rounded-lg lg:p-4 md:p-3 p-2 mb-4">
                        <label className="absolute -top-2 bg-white left-4 px-1 lg:text-sm text-xs">
                            City
                        </label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full focus:outline-none bg-transparent focus:ring-0 border-none lg:text-sm md:text-sm text-xs text-gray-700"
                            placeholder="Enter city"
                        />
                        </div>

                        <div className="relative border border-black rounded-lg lg:p-4 md:p-3 p-2 mb-4">
                        <label className="absolute -top-2 bg-white left-4 px-1 lg:text-sm text-xs">
                            Pincode
                        </label>
                        <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleInputChange}
                            className="w-full focus:outline-none font-roboto bg-transparent focus:ring-0 border-none lg:text-sm md:text-sm text-xs text-gray-700"
                            placeholder="Enter pincode"
                        />
                        </div>
                        <div className='col-span-3 flex items-center'>
                        <button type="submit" className="md:px-4 md:py-2 md:text-base text-sm p-2 w-fit bg-green1 text-white rounded-md">
                        Add Address
                        </button>
                        <button type="button" onClick={() => setShowForm(false)} className="md:px-4 md:py-2 md:text-base text-sm p-2 w-fit py-2 bg-red-400 text-white rounded-md ml-4">
                        Cancel
                        </button>
                            
                        </div>
                    
                    </form>
                   
                    )} 

               {showEditForm  &&(
                 
                 <form 
                 onSubmit={handleEditSubmit}
                  className='md:grid w-full p-5  md:grid-cols-1 lg:grid-cols-3 w-full m-auto w-full gap-5 mt-5 md:mt-10 items-center'>
                     <div className="relative border   border-black rounded-lg lg:p-4 md:p-3 p-2 mb-4">
                     <label className="absolute -top-2 bg-white left-4 px-1 lg:text-sm text-xs">
                         Full Name
                     </label>
                     <input
                         type="text"
                         name="name"
                         value={formData2.name}
                         onChange={handleInputChange2}
                         className="w-full focus:outline-none bg-transparent focus:ring-0 border-none lg:text-sm md:text-sm text-xs text-gray-700"
                         placeholder="Enter your full name"
                     />
                     </div>

                     <div className="relative border border-black rounded-lg lg:p-4 md:p-3 p-2 mb-4">
                     <label className="absolute -top-2 bg-white left-4 px-1 lg:text-sm text-xs">
                         Address Type
                     </label>
                     <input
                         type="text"
                         name="addressType"
                         value={formData2.addressType}
                         onChange={handleInputChange2}
                         className="w-full focus:outline-none bg-transparent focus:ring-0 border-none lg:text-sm md:text-sm text-xs text-gray-700"
                         placeholder="Home/Office"
                     />
                     </div>

                     <div className="relative border border-black rounded-lg lg:p-4 md:p-3 p-2 mb-4">
                     <label className="absolute -top-2 bg-white left-4 px-1 lg:text-sm text-xs">
                         Phone Number
                     </label>
                     <input
                         type="tel"
                         name="phoneNo"
                         value={formData2.phoneNo}
                         onChange={handleInputChange2}
                         className="w-full focus:outline-none bg-transparent focus:ring-0 border-none lg:text-sm md:text-sm text-xs text-gray-700"
                         placeholder="+91 1234567890"
                     />
                     </div>

                     <div className="relative border border-black rounded-lg lg:p-4 md:p-3 p-2 mb-4">
                     <label className="absolute -top-2 bg-white left-4 px-1 lg:text-sm text-xs">
                         House No
                     </label>
                     <input
                         type="text"
                         name="houseNo"
                         value={formData2.houseNo}
                         onChange={handleInputChange2}
                         className="w-full focus:outline-none bg-transparent focus:ring-0 border-none lg:text-sm md:text-sm text-xs text-gray-700"
                         placeholder="Enter house number"
                     />
                     </div>

                     <div className="relative border border-black rounded-lg lg:p-4 md:p-3 p-2 mb-4">
                     <label className="absolute -top-2 bg-white left-4 px-1 lg:text-sm text-xs">
                         Street Name
                     </label>
                     <input
                         type="text"
                         name="streetName"
                         value={formData2.streetName}
                         onChange={handleInputChange2}
                         className="w-full focus:outline-none bg-transparent focus:ring-0 border-none lg:text-sm md:text-sm text-xs text-gray-700"
                         placeholder="Enter street name"
                     />
                     </div>

                     <div className="relative border border-black rounded-lg lg:p-4 md:p-3 p-2 mb-4">
                     <label className="absolute -top-2 bg-white left-4 px-1 lg:text-sm text-xs">
                         City
                     </label>
                     <input
                         type="text"
                         name="city"
                         value={formData2.city}
                         onChange={handleInputChange2}
                         className="w-full focus:outline-none bg-transparent focus:ring-0 border-none lg:text-sm md:text-sm text-xs text-gray-700"
                         placeholder="Enter city"
                     />
                     </div>

                     <div className="relative border border-black rounded-lg lg:p-4 md:p-3 p-2 mb-4">
                     <label className="absolute -top-2 bg-white left-4 px-1 lg:text-sm text-xs">
                         Pincode
                     </label>
                     <input
                         type="text"
                         name="pincode"
                         value={formData2.pincode}
                         onChange={handleInputChange2}
                         className="w-full focus:outline-none bg-transparent focus:ring-0 border-none lg:text-sm md:text-sm text-xs text-gray-700"
                         placeholder="Enter pincode"
                     />
                     </div>
                     <div className='col-span-3 flex items-center'>
                     <button type="submit" className="md:px-4 md:py-2 md:text-base text-sm p-2 w-fit bg-green1 text-white rounded-md">
                     Edit
                     </button>
                     <button type="button" onClick={() => setShowEditForm(false)} className="md:px-4 md:py-2 md:text-base text-sm p-2 w-fit py-2 bg-red-400 text-white rounded-md ml-4">
                       Cancel
                     </button>
                         
                     </div>          
                 </form>                
                 )}                
                </div>   
               </div>
               <OrderSummary addressData={address} address = {selectedAddress} />
         </div>    
        </div>
        <Footer/>
    

     </div>

  )
}

export default AddressPage