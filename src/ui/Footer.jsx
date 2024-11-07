import React,{useEffect} from 'react'
import Logo from "../assets/logo.jpeg";
import { Link } from 'react-router-dom';

import { SiFacebook } from "react-icons/si";
import { PiInstagramLogoFill } from "react-icons/pi";
import { FaTwitter } from "react-icons/fa";
import { CiLocationArrow1 } from "react-icons/ci";
import { MdWhatsapp } from "react-icons/md";

// import AOS from "aos";
// import "aos/dist/aos.css";

function Footer() {
  // useEffect(() => {
  //   AOS.init({
  //     // disable: "phone",
  //     duration: 1200,
  //     easing: "ease-out-cubic",
  //   });
  // }, []);
  return (
    <div className='w-full bg-green1'>
        <div className='w-11/12 m-auto h-fit p-3 md:space-x-5 pt-10 block md:grid md:grid-cols-8'>
            <div  className='col-span-3 h-full '>
                <img src={Logo} className='md:w-80   md:rounded-none md:object-contain  h-20 rounded-lg' alt="" />
                <p className='lg:text-sm text-xs md:leading-relaxed md:text-left text-left leading-loose mt-3 text-white'>At Veerababu Siddha Hospital, we are dedicated to offering holistic 
                    and natural healing through the ancient wisdom of Siddha medicine. With
                    over 15 years of experience, our team of skilled practitioners
                    specializes in treating chronic conditions, promoting
                    preventive care, and restoring balance to the body, mind, and spirit.
                </p>

            </div>

            <div  className='col-span-2 h-full mt-5  md:mt-0'>
                <div className='md:w-fit w-full m-auto'>
                <h1 className='lg:text-xl md:text-lg text-left text-xl text-white'>Useful Links</h1>

                  <div className='md:mt-6 mt-2'>
                    <Link to="/#home"> <p className='text-left mt-2 text-sm  text-white'>Home</p></Link> 
                    <Link to="/about#about"> <p className='text-left mt-2 text-sm text-white'>About</p></Link> 
                    <Link to="/store#store"> <p className='text-left mt-2 text-sm text-white'>Online Store</p></Link> 
                    <Link to="/blog#blog"> <p className='text-left mt-2 text-sm text-white'>Blogs</p></Link>
                  </div>
            
                </div>
                
            </div>

            <div  className='col-span-3 h-full '>
              <div className='w-fit '>
                <h1 className='text-xl mt-5 md:mt-0 text-left text-white'>Address</h1>
                <iframe 
                  className='lg:w-80 md:w-52 w-full h-36 mt-2 md:mt-3'
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1943.6572931630394!2d80.17193758935338!3d13.01562789883347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5261070dd52c83%3A0xd80595c80247cfae!2sDr.Veerababu%20Hospital!5e0!3m2!1sen!2sin!4v1727262532321!5m2!1sen!2sin" width="600" height="450"  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>

           </div>
         <div className='flex w-full flex-col md:flex-row  lg:col-span-5 md:col-span-7  mt-8 items-center gap-3 text-xl text-white'>
            <p className='flex text-lg basis-3/6 lg:basis-0  gap-3 md:text-xl text-white'>
            <SiFacebook/> <PiInstagramLogoFill/> <FaTwitter/>
            </p>
             
       
          <div className='flex w-full  items-center gap-2'>
          <Link to="/appointment" className='basis-1/2 w-full hover:bg-white hover:text-green1 transition-all duration-200  lg:basis-1/3  md:px-5 h-10 py-1  lg:py-2 flex px-2 text-sm items-center md:gap-3 gap-1 rounded-xl border border-white'><CiLocationArrow1 className='md:text-sm text-lg lg:text-lg '/><p className=' text-xs'> Take an Appointment</p></Link>
            <button className='basis-1/2 lg:basis-1/4  hover:bg-white hover:text-green1 transition-all duration-200 md:px-5 h-10  lg:py-2 flex px-1 text-sm px-2 items-center md:gap-3 lg:gap-2 gap-1 rounded-xl border border-white'><MdWhatsapp  className='md:text-sm text-lg lg:text-lg '/> <p className='text-xs'> +91 1111111111</p></button>
           

          </div>
         
         </div>

         <hr  className='col-span-8 h-px bg-white m-auto mt-4' />

         <p  className='col-span-8 text-center text-white mt-2 text-xs lg:text-sm '>  &copy; 2024 All Right Reserved</p>

        </div>

      

    </div>
  )
}

export default Footer