import React, { useState, useEffect,useRef } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { GoHeart, GoMail } from "react-icons/go";
import { MdWhatsapp } from "react-icons/md";
import { MdPhone } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import Logo from "../assets/logo.jpeg";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { AiFillCloseSquare } from "react-icons/ai";
import { TiShoppingCart } from "react-icons/ti";
import { AiFillHome } from "react-icons/ai";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { IoStorefrontSharp } from "react-icons/io5";
import { FaBlog } from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";
import { MdContacts } from "react-icons/md";
import Doctor from "../assets/doctor.jpeg"
import { ImProfile } from "react-icons/im";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { FaRocketchat } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { LuLogOut } from 'react-icons/lu';
import { CgProfile } from "react-icons/cg";
import { IoKeySharp } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";

function Header() {

    const[show,setShow] = useState(false);
    const [contacts,setContacts] = useState(false);
    const dropdownRef = useRef(null);
    const [profile,setProfile] = useState(false);
    const navigate = useNavigate();

    // geting add cart product count from the localstorage
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    const token = localStorage.getItem('token') || null;
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');
    console.log("role",role)
    console.log("name",name)

    // Handle click outside the dropdown to close it
    useEffect(() => {
      const handleClickOutside = (event) => {
   
        !dropdownRef.current?.contains(event.target) && setContacts(false);
      };
  
      // Add event listener to detect outside click
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Remove event listener on cleanup
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const menuRef = useRef(null);

    useEffect(() => {
      // Function to handle click events
      const handleClickOutside2 = (event) => {
        // Check if the click is outside the menu
        !menuRef.current?.contains(event.target) && setShow(false);
      };
      // Add event listener for click events
      document.addEventListener('mousedown', handleClickOutside2);
  
      // Clean up event listener when component unmounts
      return () => {
        document.removeEventListener('mousedown', handleClickOutside2);
      };
    }, []);

    const menuRef2 = useRef(null);

    useEffect(() => {
      // Function to handle click events
      const handleClickOutside3 = (event) => {
        // Check if the click is outside the menu
        !menuRef2.current?.contains(event.target) && setProfile(false);
      };
      // Add event listener for click events
      document.addEventListener('mousedown', handleClickOutside3);
  
      // Clean up event listener when component unmounts
      return () => {
        document.removeEventListener('mousedown', handleClickOutside3);
      };
    }, []);

    useEffect(() => {
      AOS.init({
        // disable: "phone",
        duration: 1200,
        easing: "ease-out-cubic",
        once: false,
      });
    }, []);


    // Logout profile page
    const logoutProfile = ()=>{
      localStorage.removeItem('token');
      navigate('/login')
    }
    

    useEffect(() => {
      if (location.hash) {
        const element = document.getElementById(location.hash.substring(1)); // remove the '#' from hash
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo(0, 0); // Fallback: Scroll to the top if no hash is provided
      }
    }, [location]);
    
  return (
    <div className='w-full relative h-fit'>
         <section className='md:flex m-0 md:w-full md:h-8 h-6 text-xl text-white   lg:gap-5 md:gap-0 bg-green1 p-1 md:p-0 justify-center lg:px-0 lg:px-5 items-center'>
            <div className='lg:w-3/4 hidden w-full  pl-6 md:w-3/4 md:flex md:justify-start justify-between lg:gap-20 md:gap-10 items-center'>
                <p className='flex justify-center items-center gap-1 lg:text-sm text-xs'><FaLocationDot className='lg:text-base text-xs'/>90919 Madie run Apt. 790</p>
                <p className='flex justify-center hidden items-center gap-1 lg:text-sm text-xs'><GoMail className='lg:text-base text-xs'/>medico@health.care</p>
                <p className=' flex justify-center items-center gap-1 lg:text-sm text-xs'><MdWhatsapp className='lg:text-base text-xs'/> +91 1111111111</p>
            </div>
            <div className='w-full px-2 relative md:hidden justify-between flex  ' aria-label="phone">
                <FaPhoneSquareAlt 
                onClick={()=>setContacts(true)}
                className='md:hidden block  text-base' />
                <p className='text-xs flex w-fit items-center gap-1'>
                  <GoMail   
                className='md:hidden block  text-base' /> medico@health.care</p>
              <div 
              ref={dropdownRef} 
              className={`${contacts?' w-2/3 fixed top-8 left-3 bg-white shadow-xl text-greendark rounded-xl z-50 grid grid-cols-1 h-16':'fixed w-2/3 grid grid-cols-1 h-16 top-8 left-[-200px]'} transition-all duration-1000`}
              >
                <p className='flex justify-start pl-4 items-center gap-3 lg:text-sm text-xs'><FaLocationDot className='text-sm'/>90919 Madie run Apt. 790</p>
                <p className='md:flex hidden justify-start pl-4 items-center gap-3 lg:text-sm text-xs'><GoMail className='text-sm'/>medico@health.care</p>
                <p className=' flex justify-start pl-4 items-center gap-3 lg:text-sm text-xs'><MdWhatsapp className='text-sm'/> +91 1111111111</p>
              </div>
            </div>
            <div className='lg:w-1/4 w-1/2 md:w-1/4 flex pr-6 justify-end w-1/3 '>
             

            </div>
        </section>

        <nav className='md:grid flex justify-between items-center md:grid-cols-5 md:grid-cols-9 lg:grid-cols-8 gap-5 md:gap-1 p-2'>

            <div className='md:col-span-1 basis-1/2 col-span-2'>

             <Link to="/#home"><img src={Logo} className='w-full h-full object-contain' alt="logo"/></Link>

            </div>
            <div className='lg:col-span-5 md:col-span-5 md:block hidden h-12  ml-2 lg:ml-32 '>
                <div className='grid lg:grid-cols-8 md:grid-cols-6 gap-1 text-sm lg:text-sm h-12'>
                    <Link to="/" className='flex hover:text-green1  transition-all duration-200 gap-1 lg:gap-2  items-center justify-center h-full'><AiFillHome className='text-xs lg:text-sm'/> Home</Link>
                    <Link to="/about" className='flex items-center hover:text-green1 gap-1 lg:gap-2  transition-all duration-200 justify-center h-full'><BsFillInfoSquareFill className='text-xs lg:text-sm'/> About</Link>
                    <Link to="/store" className='flex items-center hover:text-green1 gap-1 lg:gap-2   transition-all duration-200  col-span-2  justify-center h-full'><IoStorefrontSharp className='text-xs lg:text-sm'/> Online Store</Link>
                    <Link to="/blog" className='flex hover:text-green1 gap-1 lg:gap-2   transition-all duration-200 items-center justify-center h-full'><FaBlog className='text-xs lg:text-sm'/> Blog</Link>
                    <Link className='flex items-center hover:text-green1  gap-2  md:hidden lg:flex   transition-all duration-200 justify-center h-full'><MdContacts className='text-xs lg:text-sm'/> Contact</Link>
                    {/* <Link to="/cart" className='flex items-center hover:text-green1  col-span-1 transition-all duration-200 justify-center h-full'><TiShoppingCart className='text-3xl'/> <sup className='text-red-500  font-semibold font-roboto'>{cartData.length>0?cartData.length:null}</sup></Link> */}
                    {/* <p className='lg:flex md:hidden hover:text-green1  transition-all duration-200 items-center col-span-2 gap-2 font-roboto justify-center h-full'><MdPhone/> 1005-346-272</p> */}
                </div>

            </div>
            <div className='lg:col-span-2 relative basis-1/2 flex justify-end md:justify-between pr-5 md:pr-0  gap-2 items-center  md:col-span-3 gap-0    m-auto h-auto min-h-12 w-full '>
            <Link to="/cart" className='md:flex hidden md:basis-1/4 items-center hover:text-green1  w-fit  transition-all duration-200 justify-center h-full'><TiShoppingCart className='text-3xl'/> <sup className='text-red-500  font-semibold font-roboto'>{cartData.length>0?cartData.length:null}</sup></Link>
               <Link to="/store" className='bg-green1 md:basis-1/3 hover:bg-green2 lg:col-span-1 hover:text-greendark transition-all duration-200  hidden md:block justify-self-center self-center lg:w-fit md:w-11/12 px-2 py-2 rounded-md text-sm text-white'>
                 Purchase
               </Link>
               {token!==null? <div className='  md:basis-2/3 flex justify-center   md:text-sm text-xs gap-1 items-center  px-2 md:py-2 py-1   '>
                {/* <img 
                onClick={()=>setProfile(true)}
                src={Doctor} 
                className='w-fit border-2 cursor-pointer border-black rounded-full h-8 md:h-10' alt="" /> */}
                <CgProfile
                 onClick={()=>setProfile(true)}
                 className='w-fit cursor-pointer  rounded-full h-8 ' alt="" aria-label="profile" />
                 Hi,{name}
               </div>
               :
                <Link to="/login" className='bg-green1 md:basis-1/3 hover:bg-green2 hover:text-greendark transition-all duration-200  md:w-fit w-fit col-span- md:px-2 px-2 md:py-2 py-1 rounded-md text-xs md:text-sm text-white justify-self-end self-center  lg:justify-self-center lg:self-center'>
                 Login
               </Link>
               }
              
               
               <AiOutlineMenu 
               onClick={()=>setShow(true)}
               className='md:hidden w-fit text-lg col-span-1 justify-self-end self-center block'/>

               <div
                ref={menuRef2}
                className={`${profile?'absolute right-0  grid grid-col-1 top-16 border-b-4 border-green1 h-auto w-60 bg-white rounded-md shadow-xl z-50':'hidden'}`}>
                    
               <Link to="/forgotpassword" className='h-16 text-greendark hover:text-green1 hover:bg-white gap-1 flex justify-start px-10  items-center'> <IoKeySharp className='md:text-lg text-sm mr-3'/> Reset Password</Link>
               {
                role==1?<>
                  <Link to="/product" className='h-16 text-greendark hover:text-green1 hover:bg-white gap-1 flex justify-start px-10  items-center'><HiMiniShoppingBag className='md:text-lg text-sm mr-3'/> Products</Link>
                  <Link to="/orderadmin" className='h-16 text-greendark hover:text-green1 hover:bg-white gap-1 flex justify-start px-10  items-center'><TbTruckDelivery className='md:text-lg text-sm mr-3'/> Order Details</Link>
                  <Link to="/review" className='h-16 text-greendark hover:text-green1 hover:bg-white gap-1 flex justify-start px-10  items-center'><FaRocketchat className='md:text-lg text-sm mr-3'/> Review Panel</Link>
                  </>
                  :
                  <> <Link to="/order" className='h-16 text-greendark hover:text-green1 hover:bg-white gap-1 flex justify-start px-10  items-center'><HiMiniShoppingBag className='md:text-lg text-sm mr-3'/>Orders</Link> 
                  <Link to="/wishlist" className='h-16 text-greendark hover:text-green1 hover:bg-white gap-1 flex justify-start px-10  items-center'><GoHeart className='md:text-lg text-sm mr-3'/> Wishlist</Link>
                  </>
               }
               
                {/* <Link to="/review" className='h-16 text-greendark hover:text-green1 hover:bg-white gap-1 flex justify-start px-10  items-center'><FaRocketchat className='md:text-lg text-sm mr-3'/>View Reviews</Link> */}
                <div 
                 onClick={logoutProfile}
                 className='h-16 cursor-pointer text-greendark hover:text-green1 hover:bg-white  gap-1 flex jjustify-start px-10  items-center'>
                  <LuLogOut className='md:text-lg text-sm mr-3'/>Logout
                </div>
                

               </div>

               

            </div>
           

        </nav>
        <div
        ref={menuRef}
         className={`${show?'fixed right-0 top-0 h-screen w-52 shadow-xl bg-white':'fixed h-0 top-0 right-[-300px] '} z-50 transition-all duration-1000`}>
            <div className="w-full grid grid-col-1   gap-0 mt-4">
                
                <Link to="/" className='h-16 text-greendark hover:text-green1 hover:bg-white gap-1 flex justify-start px-10  items-center'> <AiFillHome className='text-sm mr-3'/> Home</Link>
                <Link to="/about" className='h-16 text-greendark hover:text-green1 hover:bg-white gap-1 flex justify-start px-10  items-center'><BsFillInfoSquareFill className='text-sm mr-3'/>About</Link>
                <Link to="/store" className='h-16 text-greendark hover:text-green1 hover:bg-white gap-1 flex justify-start px-10  items-center'><IoStorefrontSharp className='text-sm mr-3'/> Online Store</Link>
                <Link to="/blog" className='h-16 text-greendark hover:text-green1 hover:bg-white gap-1 flex justify-start px-10  items-center'><FaBlog className='text-sm mr-3'/>Blog</Link>
                <Link to="/appointment" className='h-16 text-greendark hover:text-green1 hover:bg-white  gap-1 flex jjustify-start px-10  items-center'><TbBrandBooking className='text-sm mr-3'/>Appointment</Link>
                <Link to="/cart" className='h-16 text-greendark hover:text-green1 hover:bg-white gap-1 flex justify-start px-10  items-center'><TiShoppingCart className='text-3xl'/><sup className='text-red-500 font-semibold font-roboto'>{cartData.length>0?cartData.length:null}</sup></Link>
            </div>
        </div>



        {/* <div  className='w-3/5 flex focus:border-darkgreen items-center gap-2 border-2 bg-white rounded-3xl border-green1 p-1'>
    <FiSearch className='text-lg'/>
    <input type="text" placeholder='Search here'  className='text-sm focus:outline-none bg-transparent focus:ring-0 border-none '/>
        </div>   */}
    </div>
  )
}  

export default Header