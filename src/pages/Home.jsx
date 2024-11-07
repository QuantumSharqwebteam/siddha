import React from 'react';

import Logo from "../assets/logo.jpeg";
import HealthCare from "../assets/healthcare.jpeg"
import HealthCare2 from "../assets/healthcare2.jpeg"
import LungInfection from "../assets/lung-infection.jpg"
import Foot from "../assets/diabetic.jpg"
import Siddhacare2 from "../assets/siddhacare2.jpeg"
import Siddhacare3 from "../assets/siddhacare3.jpeg"
import Doctor from "../assets/doctor.jpeg"
import Siddhabanner from "../assets/siddhabanner.jpeg"
import { FaCircleCheck } from "react-icons/fa6";
import { FiPhoneCall } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import { GoMail } from "react-icons/go";
import { LuClock } from "react-icons/lu";

import { Link } from 'react-router-dom';

import Header from '../ui/Header'
import Footer from '../ui/Footer';
import BannerCarousel from '../ui/BannerCarousel';
import CategoryCarousel from '../ui/CategoryCarousel';
import QuickBuys from '../ui/QuickBuys';
import HospitalReviews from '../ui/HospitalReviews';


function Home() {
  const contactDetails = [
    {
      icon: <FiPhoneCall />,
      title: 'Emergency',
      description: '+91 72000 92381',
    },
    {
      icon: <SlLocationPin />,
      title: 'Location',
      description: 'Plot. No. 64, CRR Puram, 1st Main Rd, L&T Colony, Manapakkam, Chennai, Tamil Nadu 600125',
    },
    {
      icon: <GoMail />,
      title: 'Email',
      description: 'veerababu@gmail.com , 123466@gmail.com',
    },
    {
      icon: <LuClock />,
      title: 'Working Hours',
      description: 'Mon-Sat 09:00-20:00 , Sunday Emergency only',
    },
  ]

  // siddha care
  const siddhaCareCard = [
    {
      icon: LungInfection,
      subHaeding: 'Herbal Remedy For',
      heading: 'Lung Infection',
    },
    {
      icon: Siddhacare2,
      subHaeding: 'Herbal Remedy For',
      heading: 'Chronic Fever',
    },
    {
      icon: Foot,
      subHaeding: 'Herbal Remedy For',
      heading: 'Diabetic Foot Cancer',
    },
    {
      icon: Siddhacare3,
      subHaeding: 'Herbal Remedy For',
      heading: 'Hari and Skin Care',
    },
  ]

  return (
    <div id="home" className='w-full  m-0 p-0 font-merriweather'>
      <Header />

      {/* Banner carousel on top of home page */}
      <BannerCarousel/>  

      <div className='w-11/12 mt-14 grid m-auto  lg:grid-cols-5 md:grid-cols-3'>
        <div  className='lg:col-span-3 md:order-none mt-5 md:mt-0 order-2 md:col-span-2 md:self-center text-center md:text-left'>
          <p className='text-green1  text-sm'>Welcome to Siddha Healthcare</p>
          <h1 className='lg:text-6xl md:text-5xl text-3xl md:w-11/12 text-wrap mt-5 font-bold leading-loose'>Your Journey to Better
            Health Starts Here
          </h1>
          <button className='bg-green1 hover:bg-green2 hover:text-greendark transition-all duration-200  mt-8 text-white text-sm py-2 px-8 rounded-xl'><Link to="/appointment#appointment">Book Your Slot</Link></button>
        </div>
        <div className='lg:col-span-2 order-1 md:order-none md:col-span-1 md:w-full lg:place-self-end bg-green2 lg:w-8/12 ml-0 h-48 md:h-80 rounded-xl md:rounded-4xl flex justify-center items-center'>
          <img src={Logo} className='w-11/12' alt="" />
        </div>
      </div>

      {/* Categores of health issues */}
      <CategoryCarousel/>

      <div className='w-11/12  m-auto grid md:grid-cols-2 lg:grid-cols-3 lg:mt-20 mt-12'>
        <div data-aos="fade-right" className='md:col-span-1 md:order-none lg:col-span-2 mt-6 order-1 md:self-center text-center md:text-left'>
          <h1 className='md:w-9/12  text-wrap md:text-xl lg:text-4xl font-bold'>Trusted by Over 10,000+ Patients for Holistic Siddha Care</h1>
          <p className='text-sm leading-relaxed md:w-9/12 text-wrap text-gray-500 md:mt-5 mt-3 lg:text-base text-justify lg:mt-10'>With a proven track record of treating over 10,000 patients, our Siddha practitioners specialize in offering natural, holistic care that addresses both the root cause and symptoms.
            Whether you are seeking treatment for chronic conditions or preventive wellness,
            rest assured that your health is in expert hands.
          </p>

        </div>
        <div data-aos="fade-left" className='lg:rounded-4xl md:rounded-4xl md:col-span-1  lg:col-span-1 order-2 md:order-none m-auto  w-full'>
          <img src={HealthCare} className='md:w-full mt-5 md:mt-0  md:rounded-4xl md:m-auto' alt="" />
        </div>

      </div>

      <div className='w-11/12 m-auto   grid md:grid-cols-2    lg:grid-cols-3 mt-4 lg:mt-20 md:mt-12'>

        <div data-aos="fade-right" className=' lg:rounded-4xl md:rounded-4xl md:col-span-1 col-span-2  lg:col-span-1 order-2  md:order-none m-auto  w-ful'>
          <img src={HealthCare2} className='w-full mt-5 md:mt-0  md:rounded-4xl ' alt="" />
        </div>

        <div data-aos="fade-left" className='col-span-2 w-full m-auto order-1 md:order-none md:ml-10  lg:ml-36 md:col-span-1 col-span-1 md:self-center'>
          <h1 className='md:w-full text-wrap md:text-xl mt-5 md:mt-0  lg:text-3xl font-bold text-center md:text-left'>
            Make a schedule in advance
            with the available date
          </h1>
          <div className='lg:w-9/12  md:w-full text-left lg:text-base text-sm lg:mt-8 mt-2 md:mt-4'>
            <p className='flex items-center gap-3 text-gray-500 justify-cenetr'><FaCircleCheck className='text-greendark' />Make a schedule online is easy</p>
            <p className='flex items-center gap-3 text-gray-500 justify-cenetr'><FaCircleCheck className='text-greendark' />Easy to connect with available slots</p>
          </div>

        </div>

      </div>

      {/* Siddha care starts here */}
      <div  className='block md:w-9/12 text-center m-auto mt-5 px-4 md:px-0 lg:mt-20 md:mt-14'>
        <h1 className='text-center  lg:text-3xl md:text-xl  w-11/12 text-wrap font-bold lg:w-8/12 md:w-9/12 m-auto'>Dedicated to Providing the Best Siddha Care</h1>
        <p className=' md:text-center md:text-sm text-gray-500 text-sm text-justify lg:text-base  mt-3 text-wrap md:mt-5 leading-relaxed'> At our Siddha hospital, we are committed to offering the best treatments rooted in ancient healing traditions. Our approach harmonizes your body, mind, and spirit, bringing you back to a state of wellness naturally.</p>
      </div>

      <div  className='lg:w-full md:w-full lg:mt-16 m-auto mt-10 grid md:grid-cols-2  lg:grid-cols-4 gap-4  '>
        {siddhaCareCard.map((data, index) => (

          <div key={index}  className='relative lg:h-80 md:h-60 mb-12 h-48 justify-self-center '>
            <img src={data.icon} className='h-36 lg:h-40 rounded-xl w-60  object-cover' />
            <div className='gradient md:h-28 lg:h-36 h-28 w-full flex flex-col justify-center   items-center lg:w-60 md:w-52 rounded-lg absolute top-24 left-4 md:left-5 lg:left-8'>
              <div className=' text-white w-full  md:pl-3 pl-3 lg:pl-4'>
                <p className='text-left text-xs  md:text-xs'>{data.subHaeding}</p>
                <h3 className='lg:text-lg text-xs font-semibold text-md mt-2 text-left '>{data.heading}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* slider for quick buys */}
      <QuickBuys/>

      {/* Doctor Details starts here */}
      <div className='lg:flex block md:flex w-11/12 m-auto justify-center space-x-4 items-center md:h-80 lg:h-96 md:p-4'>
        <div data-aos="fade-right" className='md:basis-1/3 w-full md:order-2 lg:order-none md:h-full md:w-400 lg:h-11/12 '  >
          <img src={Doctor} className='w-full   rounded-4xl md:h-80 h-48 object-contain md:object-contain ' alt="" />
        </div>
        <div data-aos="fade-left" className='basis-2/3 md:h-full  md:order-1 lg:order-none mt-3  text-center md:text-left md:pl-4'>
          <h1 className='text-green1 lg:text-3xl font-semibold md:text-xl text-base '>Dr. Veera Babu, B.S.M.S.</h1>
          <p className='md:text-xl md:mt-5  md:w-8/12  mt-3 font-semibold text-base'><i className='md:text-xl text-base'> “Senior Siddha Physician & Head of Department Siddha Healing Center” </i></p>
          <p className='lg:leading-loose leading-relaxed text-gray-500 md:w-11/12 text-justify lg:text-base md:text-sm md:text-left mt-3  md:mt-5 text-sm '>Dr. Veera Babu, B.S.M.S., M.D., is the Senior Siddha Physician and Head of
            Department at Siddha Healing Center, in the field of Siddha medicine. He holds a degree from Government
            Siddha Medical College Chennai, Arumbakkam, Register Number 16101/A, under Dr. MGR University...
          </p>

          <Link to="/about#about"><button className='bg-green1 hover:bg-green2 hover:text-greendark transition-all duration-200 mt-5 md:mt-8 text-white text-xs md:text-sm md:py-2 py-1 px-4 md:px-8 rounded-lg md:rounded-xl '>Read more</button></Link>
        </div>
      </div>


      {/* Appointment  starts here------------- STATIC DATA--------- */}
      <div className='w-full lg:h-80 md:h-60 md:mt-20 mt-8 relative flex justify-center items-center '>
        <img src={Siddhabanner} className='w-full h-full object-cover ' alt="" />
        <div className='absolute inset-0 bg-palegreen opacity-80'></div>
        <div className='absolute md:flex md:flex-row flex-col md:justify-center md:items-center w-11/12 '>
          <div  className='basis-3/5 mb-5 md:mb-0 text-center'>
            <h1 className='lg:text-2xl md:text-xl font-bold'>Book an Appointment for Exceptional Siddha Care</h1>
            <p className='w-11/12 md:mt-7 mt-3 m-auto font-medium lg:text-xl  text-center text-xs text-wrap'>
              Seeking expert treatment with fast, hassle-free <br className='lg:block hidden' /> appointments? We've got you covered!</p>
          </div>
          <div  className='basis-2/5'>
            <Link to="/appointment#appointment" className='bg-green1 hover:bg-green2 hover:text-greendark transition-all duration-200 mt-5 md:mt-0 text-white text-xs md:text-sm md:py-2 py-1 px-4 md:px-10 rounded-lg  '>Book Now !</Link >
          </div>
        </div>
      </div>

      {/* Review system starts here --- SATATIC CONTENT*/}
      <HospitalReviews/>

      {/* Contact section starts heer */}
      <h2  className='text-gray-500 text-lg md:mt-10'>GET IN TOUCH</h2>
      <h2  className='text-green1 text-3xl mt-2'>Contact</h2>
      <div className='md:w-11/12 lg:w-9/12 m-auto grid px-5 md:px-0  md:grid-cols-4 gap-4 mb-10 mt-8'>
        {contactDetails.map((data, index) => (

          <div  key={index} className='h-56 border-2 text-left text-green1 flex bg-palegreen cursor-pointer hovergradient hover:text-white  transition-all duration-200  flex-col justify-center items-center  '>
            {/* <FiPhoneCall className='text-2xl ' />  */}
            <p className='text-2xl'>{data.icon}</p>
            {/* <img src={data.icon} className='w-10' alt="" /> */}
            <p className='lg:text-base w-11/12 text-center font-semibold mt-5'>{data.title} <br /> <span className='font-medium lg:text-sm text-left text-xs'>{data.description}
            </span></p>
          </div>

        ))}
      </div>

      <Footer />
    </div>
  )
}
export default Home

