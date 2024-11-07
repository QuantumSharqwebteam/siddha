import React ,{useState,useEffect} from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import default styles for the calendar
import { FaArrowRightLong } from "react-icons/fa6";

import Category1 from "../assets/category1.jpeg"
import Category2 from "../assets/category2.jpeg"
import Category3 from "../assets/category3.jpeg"
import Category4 from "../assets/category4.jpeg"
import Category6 from "../assets/category6.jpeg"
import Category7 from "../assets/category7.jpeg"
import Category8 from "../assets/category8.jpeg"
import Category9 from "../assets/category9.jpeg"
import Header from '../ui/Header'
import Footer from '../ui/Footer'


function AppointmentBooking() {
const categoryData = [
  {
    icon:Category1,
    title:"Preventive Care"
  },
  {
    icon:Category2,
    title:"Detoxification Therapies"
  },
  {
    icon:Category3,
    title:"Herbal Medicine"
  },
  {
    icon:Category4,
    title:"Stress Management"
  },
  {
    icon:Category6,
    title:"Hepatitis (All Types)"
  },
  {
    icon:Category6,
    title:"Fatty Liver Disease"
  },
  {
    icon:Category6,
    title:"Cirrhosis of the Liver"
  },
  {
    icon:Category6,
    title:"Liver Detoxification Programs"
  },
  {
    icon:Category7,
    title:"Acute and Chronic Jaundice"
  },
  {
    icon:Category8,
    title:"Obstructive Jaundice"
  },
  {
    icon:Category8,
    title:"Hemolytic Jaundice"
  },
  {
    icon:Category9,
    title:"Diagnose"
  },
];

const [category,setCategory] = useState('');
const [selectedDate, setSelectedDate] = useState(new Date());
const [selectedTime, setSelectedTime] = useState('');
const [availableTimes, setAvailableTimes] = useState([]);



  // Generate time slots for the day, starting from 9:00 AM to 5:00 PM (changeable)
  const generateTimeSlots = (start = 9, end = 17) => {
    return Array.from({ length: (end - start) * 2 }, (_, index) => {
      const hourIndex = Math.floor(index / 2) + start;
      const hourDisplay = hourIndex > 12 ? hourIndex - 12 : hourIndex === 0 ? 12 : hourIndex;
      const minute = index % 2 === 0 ? '00' : '30';
      return `${hourDisplay}:${minute}`;
    });
  };


  const handleSubmit = () => {
    const data = ['test data']
  }


  // Update available times whenever the selected date changes
  useEffect(() => {
    const today = new Date();
    const isToday =
      selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear();
    const currentHour = today.getHours();
    const currentMinutes = today.getMinutes();
    const startHour = isToday ? (currentMinutes >= 30 ? currentHour + 1 : currentHour) : 9; // Use 9 AM if not today
    const endHour = 17; // Fixed end hour at 5 PM
    
    setAvailableTimes(generateTimeSlots(startHour, endHour));
  }, [selectedDate]);

// Function to format date (optional, you can style the selected date differently)
const formatDate = (date) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};


  return (
    
   <div id="appointment" className='w-full font-merriweather'>
    <Header/>
     <div className='w-full md:p-10 p-5 '>

        <div  className='text-left'>
        <h1 className='text-left text-xl font-bold'>Appointment Booking</h1>
        <p className='text-sm text-gray-500 mt-1 '>Fill out the detials</p>
        </div>

        {/* Appoinyment form section starts here */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3  w-full m-auto md:mx-0  gap-5 mt-10  itmes-center'>
            <div className=" relative border border-black rounded-lg lg:p-4 md:p-3 p-2 mb-4">
                  <label className="absolute -top-2 bg-white left-4  px-1 lg:text-sm text-xs ">
                  Full Name
                  </label>
                  <input
                  type="name"
                  id="name"
                    placeholder="username@gmail.com"
                  className="w-full focus:outline-none bg-transparent focus:ring-0 border-none lg:text-sm md:text-sm text-xs text-gray-700"
                  />
              </div>
              <div className=" relative border border-black rounded-lg lg:p-4 md:p-3 p-2 mb-4">
                  <label className="absolute -top-2 bg-white left-4  px-1 lg:text-sm text-xs ">
                  Email
                  </label>
                  <input
                  type="email"
                  id="email"
                    placeholder="username@gmail.com"
                  className="w-full focus:outline-none bg-transparent focus:ring-0 border-none lg:text-sm md:text-sm text-xs text-gray-700"
                  />
              </div>
              <div className=" relative border border-black rounded-lg lg:p-4 md:p-3 p-2 mb-4">
                  <label className="absolute -top-2 bg-white left-4  px-1 lg:text-sm text-xs ">
                  Phone Number
                  </label>
                  <input
                  type="tel" placeholder="+91 1234567890"
                  id="number"
                
                  className="w-full focus:outline-none bg-transparent focus:ring-0 border-none lg:text-sm md:text-sm text-xs text-gray-700"
                  />
              </div>
              <div className=" relative border border-black rounded-lg lg:p-4 md:p-3 p-2 mb-4">
                  <label className="absolute -top-2 bg-white left-4  px-1 lg:text-sm text-xs ">
                  Date of Birth
                  </label>
                  <input
                  type="date"
                  id="date"
                  className="w-full focus:outline-none bg-transparent focus:ring-0 border-none lg:text-sm md:text-sm text-xs text-gray-700"
                  />
              </div>

              <div className=" relative border border-black rounded-lg lg:p-4 md:p-3 p-2 mb-4">
                  <label  className="absolute -top-2 bg-white left-4  px-1 lg:text-sm text-xs ">
                  Gender
                  </label>
                  <select 
                      name="gender"
                      id="gender"
                      className="w-full focus:outline-none bg-transparent focus:ring-0 border-none lg:text-sm md:text-sm text-xs text-gray-70">
                        <option>Select here</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
              </div>
              <div className=" relative border border-black rounded-lg lg:p-4 md:p-3 p-2 mb-4">
                  <label className="absolute -top-2 bg-white left-4  px-1 lg:text-sm text-xs ">
                  Concern / Reason
                  </label>
                  <input
                  type="text"
                  id="concern"
                  name="concern"
                    placeholder="Enter here"
                  className="w-full focus:outline-none bg-transparent focus:ring-0 border-none lg:text-sm md:text-sm text-xs text-gray-700"
                  />
              </div>
              <div className=" relative border border-black rounded-lg lg:p-4 md:p-3 p-2 mb-4">
                  <label className="absolute -top-2 bg-white left-4  px-1 lg:text-sm text-xs ">Preferred Mode of Consultation</label>
                  <select 
                      name="mode"
                      id="mode"
                      className="w-full focus:outline-none bg-transparent focus:ring-0 border-none lg:text-sm md:text-sm text-xs text-gray-70">
                        <option>Select here</option>
                        <option>Online</option>
                        <option>Offline</option>
                    </select>
              </div>
              <div className="lg:col-span-2 relative border border-black rounded-lg lg:p-4 md:p-3 p-2 mb-4">
                  <label className="absolute -top-2 bg-white left-4  px-1 lg:text-sm text-xs ">
                  Address for communication 
                  </label>
                  <input
                  type="text"
                  id="address"
                  name="address"
                    placeholder="Enter here"
                  className="w-full focus:outline-none bg-transparent focus:ring-0 border-none lg:text-sm md:text-sm text-xs text-gray-700"
                  />
              </div>
        </div>


        {/* Category section starts here */}

        <p className='text-md text-left text-gray-700 font-semibold mt-10'>Choose Category</p>

        <div  className='grid lg:grid-cols-4 md:grid-cols-3 gap-5 w-full m-auto md:mx-0  mt-8'>
        {categoryData.map((menu, index) => (
          <div key={index} 
          onClick={()=>setCategory(menu.title)}
          className='bg-gray-100 hover:bg-lightgreen hover:text-greendark cursor-pointer px-4 py-3 w-full lg:text-sm rounded-3xl flex items-center text-xs justify-start '><img src={menu.icon} className='lg:w-5 bg-transparant w-4  mr-3' /> {menu.title}</div>
        ))}
          
        </div>

        {/* Date and Time Selection using react-calendar */}
        <p  className="text-md text-gray-700 font-semibold text-left  mt-10">Choose a Date and Time</p>
        <div className="grid md:grid-cols-2 m-auto mt-6  md:mt-10   gap-4">
          {/* Calendar component */}
        
            <div  className=" w-11/2 pb-10 h-80 flex  justify-center custom-shadow rounded-lg p-4">
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                minDate={new Date()} // Disable past dates
                tileClassName={({ date, view }) =>
                  view === 'month' && date.getDate() === selectedDate.getDate()
                    ? ''
                    : ''
                }
              className="w-full  font-merriweather "
              />
            </div>

          {/* Time selection */}
            <div   className="w-11/2 h-80 overflow-y-auto custom-shadow rounded-lg p-4">
              <div className={`${availableTimes.length>0?'grid grid-cols-3 gap-4':'w-full h-full flex  justify-center items-center'}`}>
                {availableTimes.length>0?availableTimes.map((time, index) => (
                  <button
                    key={index}
                    className={`px-0  w-2/3 py-2 m-auto  rounded-lg md:text-sm  text-xs ${
                      selectedTime === time ? 'bg-red-400 text-white' : 'bg-gray-200 '
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                  
                  { time}
                  </button>
                ))  :
                <div className='md:text-sm lg:text-base text-xs'>
                 No Slots Available today !
               </div>
               }
              </div>
            </div>

        </div>

        <div className='md:flex block w-full justify-between  mt-8 items-center'>
        {/* Selected Date and Time */}
        <div  className="md:basis-3/4 px-6 py-2 text-sm md:text-md rounded-md  text-greendark bg-lightgreen lg:text-lg font-medium">
          {selectedDate && selectedTime
            ? `${formatDate(selectedDate)} | ${selectedTime}`
            : 'Please select a date and time'}
        </div>

        {/* Submit Button */}
        <div className="md:basis-1/4 flex justify-end  text-right">
          <button
          onClick={handleSubmit}
          className="bg-green1 hover:bg-green2 hover:text-greendark transition-all duration-200 m-auto mt-5 md:mt-0 text-xs md:text-sm flex items-center gap-4 text-white py-2 px-6 rounded-2xl">
          
            Book Now
            <FaArrowRightLong/>
          </button>
        </div>
        </div>
       </div>
       <Footer/>
   </div>
  )
}

export default AppointmentBooking