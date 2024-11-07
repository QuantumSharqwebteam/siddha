import React,{useState} from 'react'
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from 'react-icons/io5';
import { RiStarFill } from 'react-icons/ri';
import Doctor from "../assets/doctor.jpeg"

function HospitalReviews() {

    const [show, setShow] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const slides = [
        { descritpion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis est facere magni inventore non maxime tempore ex mollitia repellendus rem atque natus Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti porro perferendis suscipit perspiciatis laudantium aspernatur aliquam tempora omnis obcaecati facere." },
        { descritpion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis est facere magni inventore non maxime tempore ex mollitia repellendus rem atque natus Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti porro perferendis suscipit perspiciatis laudantium aspernatur aliquam tempora omnis obcaecati facere." },
        { descritpion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis est facere magni inventore non maxime tempore ex mollitia repellendus rem atque natus Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti porro perferendis suscipit perspiciatis laudantium aspernatur aliquam tempora omnis obcaecati facere." },
    
      ];
    
      // Handle Next Slide
      const handleNext = () => {
        setCurrentIndex((currentIndex + 1) % slides.length);
      };
    
      // Handle Previous Slide
      const handlePrev = () => {
        setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
      };
    

  return (
    <div className='w-full h-fit'>

        <h1  className='text-2xl text-center font-bold mt-10'>What Our Clients Say</h1>

        <div  className='grid aos-mobile grid-cols-5 w-11/12 mt-5 m-auto md:min-h-72 mb-6 md:mb-0 lg:min-h-80 h-auto '>
        {/* Left Arrow */}
        <div className='col-span-1 flex justify-center items-center'>
            <IoArrowBackCircleOutline className='md:text-4xl smooth-blink text-green1 hover:text-greendark transition-all duration-600 text-xl text-green-500 cursor-pointer' onClick={handlePrev} />
        </div>

        {/* Content Area */}
        <div className='col-span-3 w-full h-full  flex justify-center items-center overflow-hidden'>
            <div
            className='w-full h-full  flex transition-transform duration-500 ease-in-out'
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
            {slides.map((slide, index) => (
                <div
                key={index}
                className='w-full h-full flex-shrink-0 flex  justify-center items-center'
                >
                <div className='md:grid flex flex-col md:w-11/12 lg:w-full  md:gap-5 lg:gap-3 md:grid-cols-5 lg:grid-cols-3'>
                    <div className='lg:col-span-1 basis-full md:flex md:justify-center md:items-center md:col-span-2'>
                    <img src={Doctor} className='md:rounded-4xl rounded-full md:w-full w-16 m-auto  md:m-0  lg:w-11/12' alt="" />
                    </div>
                    <div className='lg:ml-10 basis-full  md:col-span-3 lg:col-span-2 lg:w-11/12 flex md:justify-center  w-full flex-col items-start'>
                    <div className='lg:text-base text-center w-full md:text-left md:text-sm '>
                        Mr. Williams
                    </div>
                    <p className='lg:text-sm text-center w-full md:text-left text-xs text-gray-500'>Diabetic Patient</p>

                    <div className='flex justify-center items-center w-full  md:justify-start gap-2 lg:mt-3 mt-1 md:text-xl lg:text-3xl md:text-xl text-orange'>
                    {Array(5).fill().map((_, index) => (
                        <RiStarFill key={index} />
                        ))}
                    </div>

                    <div className={`${show ? 'lg:tSext-xs' : 'lg:text-base'} md:text-xs w-full lg:w-11/12 text-justify text-xs overflow-y-auto max-h-40  text-left leading-relaxed mt-1 lg:mt-3`}>
                        {show ? slide.descritpion : slide.descritpion.slice(0, 100)}
                    </div>
                    <p
                        onClick={() => setShow(!show)}
                        className='text-blue text-left mt-2 ms:text-sm font-semibold text-xs cursor-pointer'>{show ? 'Read Less' : 'Read More'}</p>
                    </div>

                </div>

                </div>
              ))}
           </div>
        </div>

        {/* Right Arrow */}
        <div className='col-span-1 flex justify-center items-center'>
            <IoArrowForwardCircleOutline className='md:text-4xl smooth-blink text-green1 hover:text-greendark transition-all duration-200 text-xl text-green-500 cursor-pointer' onClick={handleNext} />
        </div>
       </div>

    </div>
  )
}

export default HospitalReviews