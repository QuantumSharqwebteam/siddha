import React,{useState,useEffect} from 'react'
// banner carousel images

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import bannerbg1 from "../assets/bannerbg1.jpg"
import bannerbg2 from "../assets/bannerbg2.jpg"
import bannerbg3 from "../assets/bannerbg3.jpg"
import bannerbg4 from "../assets/bannerbg4.png"
import bannerbg5 from "../assets/bannerbg5.jpg"
import axiosInstance from '../utilities/axiosInstance';
import { Link } from 'react-router-dom'
function BannerCarousel() {

    // carousel slides for banner starts here
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Sample data for carousel (5 cards)
  const bannerSlides = [
    {
      image: bannerbg1,
    },
    {
      image: bannerbg2,
    },
    {
      image: bannerbg3,
    },
    {
      image: bannerbg1,
    },
    {
      image:bannerbg3,
    },
  ];

  const handlePrevBanner = () => {
    const isFirstSlide = currentBannerIndex === 0;
    const newIndex = isFirstSlide ? bannerSlides.length - 1 : currentBannerIndex - 1;
    setCurrentBannerIndex(newIndex);
  };

  const handleNextBanner = () => {
    const isLastSlide = currentBannerIndex === bannerSlides.length - 1;
    const newIndex = isLastSlide ? 0 : currentBannerIndex + 1;
    setCurrentBannerIndex(newIndex);
  };


  // get product details 
  const [products,setProducts] = useState([])


    
  const getProducts = async () =>{
      try{
        const response = await axiosInstance.get('product/getProducts');
        setProducts(response.data.message);
      
      }
      catch(err)
      {
        console.log(err);
      }
    }
    
    useEffect(()=>{
      getProducts()
    },[]);




  // Automatically change slide every 1 second
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextBanner();
    }, 3000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentBannerIndex]); // Re-run effect when currentBannerIndex changes

  return (    
    <div className="relative w-full overflow-hidden">
    <div
      className={`flex transition-transform duration-700`}
      style={{ transform: `translateX(-${currentBannerIndex * 100}%)` }}
    >
      {products.map((slide, index) => (
        <div key={index} className="w-full    flex-shrink-0 lg:h-96 h-80 relative">
          <img src={bannerSlides[index].image} className='w-full hidden md:block object-cover  contrast-150  h-full' alt="" />
          <img src={bannerbg2} className='w-full block md:hidden object-cover contrast-150  h-full' alt="" />
         
          <div className="absolute bottom-0 left-0 right-0   h-full gap-2 md:flex items-center m-auto w-full  md:w-4/5 bg-opacity-50 p-4">
            <div className='md:basis-1/3 basis-1/2 lg:h-52 md:h-40  h-28   flex items-center justify-start'>
            <img
                src={slide.imageUrl}
                
                className="w-fit h-full m-auto  object-cover"
              />
            </div>
                <div className={`${index!==2 && index!==4?'md:basis-2/3 basis-1/2 lg:h-72 text-white  flex flex-col  items-center justify-center':'md:basis-2/3 basis-1/2 lg:h-72 md:text-black text-white flex flex-col  items-center justify-center'}`}>
                <h1 className='md:text-3xl font-bold '>{slide.productName}</h1>
                <p className=" text-center mt-3 lg:text-base md:text-sm text-xs lg:w-9/12  md:text-lg font-bold">{slide.description}</p>
                <div className='flex items-center gap-4 mt-5 '>
                <Link to={`/viewcart/${slide.productId}`}><button className='bg-green1 px-2 py-1 w-24 hover:text-greendark text-white  text-xs hover:bg-green2 rounded-md'>Products</button></Link>
                <Link to="/store"> <button className='bg-green1 px-2 py-1 w-24 hover:text-greendark text-white text-xs hover:bg-green2 rounded-md'>Buy Products</button></Link>
                </div>
                </div>
          </div>
        </div>
      ))}
    </div>
    
    {/* Buttons */}
    <button
      aria-label="Previous"
      className="absolute left-0 top-1/2 transform -translate-y-1/2 h-full hover:shadow-xl p-2 "
      onClick={handlePrevBanner}
    >
     <IoIosArrowBack className='md:text-3xl text-white md:font-semibold'/>
    </button>
    <button
      aria-label="Next"
      className="absolute right-0 top-1/2  hover:shadow-xl h-full transform -translate-y-1/2  p-2 "
      onClick={handleNextBanner}
    >
      <IoIosArrowForward className='md:text-3xl text-white md:font-semibold' />
    </button>
    </div>
  )
}

export default BannerCarousel