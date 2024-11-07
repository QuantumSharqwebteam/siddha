import React,{useRef} from 'react'
import container1 from "../assets/container1.jpeg"
import container2 from "../assets/container2.jpeg"
import container3 from "../assets/container3.jpeg"
import container4 from "../assets/container4.jpeg"
import container5 from "../assets/container5.jpeg"
import container6 from "../assets/container6.jpeg"
import container7 from "../assets/container7.jpeg"
import container8 from "../assets/container8.jpeg"
import container9 from "../assets/container9.jpeg"
import container10 from "../assets/container10.jpeg"
import container11 from "../assets/container11.jpeg"
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

function CategoryCarousel() {


    const scrollRef = useRef(null);

    // Function to scroll left
    const scrollLeft = () => {
      scrollRef.current.scrollBy({
        top: 0,
        left: -300, // Adjust based on item width
        behavior: 'smooth',
      });
    };
  
    // Function to scroll right
    const scrollRight = () => {
      scrollRef.current.scrollBy({
        top: 0,
        left: 300, // Adjust based on item width
        behavior: 'smooth',
      });
    };
  
    const specialCategory = [
        {
          icon: container1,
          title: "Liver Problems"
        },
        {
          icon: container2,
          title: "Jaundice"
        },
        {
          icon: container3,
          title: "Diabetic"
        },
        {
          icon: container4,
          title: "Food Ulcers"
        },
        {
          icon: container5,
          title: "Asthma"
        },
        {
          icon: container6,
          title: "Joint Pains"
        },
        {
          icon: container7,
          title: "Migraine"
        },
        {
          icon: container8,
          title: "Skin Diseases"
        },
        {
          icon: container9,
          title: "PCOD, Menstrual Disorders"
        },
        {
          icon: container10,
          title: "Cancer"
        },
        {
          icon: container11,
          title: "Infertility"
        },
    
      ]

  return (

    <div className='lg:w-9/12  md:w-11/12 m-auto md:h-60  lg:mt-20 mt-12'>
    <h1  className='text-center lg:text-3xl md:text-xl w-11/12 text-wrap  font-bold lg:w-11/12 md:w-9/12 m-auto'>We offer a comprehensive coverage of more than 80+ medical record with reliable results</h1>
    <div  className='flex items-center'>
      <button onClick={scrollLeft} className='p-1 md:block hidden mr-3 smooth-blink bg-green1 rounded-full'>
        <IoIosArrowBack className='md:text-xl text-white md:font-semibold' />
      </button>

      <div
        ref={scrollRef}
        className='md:flex block m-auto  overflow-x-auto md:flex-nowrap px-8 md:px-0 lg:flex-nowrap gap-4 mt-8 scrollbar-hide'
      >
        {specialCategory.map((data, index) => (
          <div
            key={index}
            className='h-32 border-2 mt-5 md:mt-0  flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/5 min-w-52 md:rounded-tr-2xl  md:rounded-bl-2xl hover:text-greendark cursor-pointer transition-all duration-200 flex flex-col justify-center items-center shadow-lg  border-t-greendark'
          >
            <img src={data.icon} className='w-10' alt={data.title} />
            <p className='text-sm text-center mt-5'>{data.title}</p>
          </div>
        ))}
      </div>

      <button aria-label="Scroll right" onClick={scrollRight} className='md:block hidden p-1 ml-3 smooth-blink bg-green1 rounded-full'>
        <IoIosArrowForward className='md:text-xl text-white md:font-semibold' />
      </button>
    </div>
  </div>
  )
}

export default CategoryCarousel