import React from 'react'
import HerbalTea from "../assets/herbal-tea.jpg"
import HerbalKashayam1 from "../assets/ors.jpg"
import HerbalKashayam from "../assets/herbal-kashayam.jpg"
import HerbalKashayam2 from "../assets/herbal-kashayam-body-cool.jpg"
import JointPainOil from "../assets/joint-pain-oil.jpg"


function QuickBuys() {
  return (
    <div className='w-full h-fit'>

      <div className='w-9/12 lg:text-xl text-sm font-bold text-blink m-auto mt-4'>
         {'<<< Quick Buys >>>'}
      </div>

      <marquee behavior="scroll" className="w-9/12 m-auto mt-5 p-4  mb-7" direction="" scrollamount="17">
        <div className='flex justify-evenly gap-3 md:gap-10 w-fit items-center'>
            <div className='md:w-48 w-36 bg-white  rounded-lg shadow-lg p-3 md:p-4  flex flex-col items-center'>
              <img src={HerbalKashayam} className='md:w-20 md:h-16 w-16 h-12 object-cover rounded-md md:rounded-lg mb-2' alt="" />
              <span className='text-green1 text-xs md:text-sm lg:text-base font-medium  '>Herbal Kashayam</span>
            </div>

            <div className='md:w-48 w-36 bg-white  rounded-lg shadow-lg p-3 md:p-4 flex flex-col items-center'>
              <img src={HerbalTea} className='md:w-20 md:h-16 w-16 h-12 object-cover rounded-md md:rounded-lg mb-2' alt="" />
              <span className='text-green1 text-xs md:text-sm lg:text-base font-medium '>Herbal Tea</span>
            </div>

            <div className='md:w-48 w-36 bg-white  rounded-lg shadow-lg p-3 md:p-4  flex flex-col items-center'>
              <img src={HerbalKashayam1} className='md:w-20 md:h-16 w-16 h-12 object-cover rounded-md md:rounded-lg mb-2' alt="" />
              <span className='text-green1 text-xs md:text-sm lg:text-base font-medium '>Oral Rehydration</span>
            </div>

            <div className='md:w-48 w-36 bg-white  rounded-lg shadow-lg p-3 md:p-4  flex flex-col items-center'>
              <img src={HerbalKashayam2} className='md:w-20 md:h-16 w-16 h-12 object-cover rounded-md md:rounded-lg mb-2' alt="" />
              <span className='text-green1 text-xs md:text-sm lg:text-base font-medium '>Cool Infusion</span>
            </div>

            <div className='md:w-48 w-36 bg-white  rounded-lg shadow-lg p-3 md:p-4  flex flex-col items-center'>
              <img src={JointPainOil} className='md:w-20 md:h-16 w-16 h-12 object-cover rounded-md md:rounded-lg mb-2' alt="" />
              <span className='text-green1 text-xs md:text-sm lg:text-base font-medium '>Joint Pain Oil</span>
            </div>
          </div>

      </marquee>
    </div>
  )
}

export default QuickBuys