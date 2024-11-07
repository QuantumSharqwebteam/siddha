import React,{useState,useEffect} from 'react'
import Header from '../ui/Header'
import Footer from '../ui/Footer'
import Blogbanner from "../assets/blogbanner.jpeg"
import { Link } from 'react-router-dom'
import axiosInstance from '../utilities/axiosInstance'

function Blogs() {
  const [blogData,setBlogData] =useState([]);
  const [thumbnail,setThumbnail] = useState([]);
  
  
  
  const getBlogs = async () =>{
    try{
      const response = await axiosInstance.get('blog/getBlogs');
      setBlogData(response.data.message);
      setThumbnail(response.data.message.filter(blog => blog.category==="CORONO")[0])
    }
    catch(err)
    {
      console.log(err);
    }
  }
  
  useEffect(()=>{
    getBlogs()
  },[]);

  
  return (
    <div id="blog" className='w-full h-fit font-merriweather '>
        <Header/>
        <div className='relative w-full flex justify-center h-64 mb-8 '>
          <img src={Blogbanner} className='w-full h-full object-cover' alt="" />
          <div  className='absolute flex  justify-center h-full font-bold text-white items-center w-full text-xl md:text-3xl lg:text-5xl'>
            BLOG’S
          </div> 
        </div>

      {thumbnail && (
        <div className="w-full m-auto flex flex-col mb-8 px-5 md:px-8">

        <img  src={`${thumbnail.imageUrl}`} className='w-full m-auto md:h-600 h-44 rounded-xl  object-cover' alt="" />
        <div  className='flex flex-col justify-start mt-4 md:mt-8'>
          <p  className='md:text-base text-sm text-left'> {thumbnail.category} <span className='text-gray-500 ml-5'> JUNE 2020</span></p>

          <h1  className='md:text-xl text-lg text-left font-bold mt-4 md:mt-8 leading-realxed'>{thumbnail.title} <br /> <br className=   'md:hidden'/> -By Veerababu Siddha Doctor</h1>
          <p  className='text-base md:text-left text-justify text-gray-700 mt-8 leading-relaxed'>{thumbnail.description}</p>

          <div  className='w-full flex justify-start'>
          <Link to={thumbnail.link} className='text-base py-2 px-3 rounded-lg mt-8 hover:text-white hover:bg-green1 transition-all duration-200 border border-green1 text-green1'>Read More</Link>
          </div>

        </div>

      </div>
      )}


        {/* Trending topics starts here */}

        <h1 className='text-left md:px-8 px-4 mt-10 text-2xl font-bold'>Trending Topics:</h1>

        <div className='md:px-3 px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-2 mb-10 mt-4 md:mt-8'>
        {blogData.map((data, index) => (
          <div  key={index} className='flex flex-col m-auto md:w-11/12 mb-5 md:h-600'>
            {/* Set a fixed height for the image container and use object-cover */}
            <div className='w-full  lg:h-80 overflow-hidden md:rounded-xl'>
              <img 
                src={data.imageUrl} 
                className='w-full h-full object-cover rounded-md md:rounded-xl' 
                alt={data.title} 
              />
            </div>
            <div className='w-full flex flex-col h-60'>
              <p className='md:text-sm font-semibold text-left mt-5 md:mt-10'>{data.category}</p>
              <h1 className='md:text-2xl leading-relaxed text-left mt-3 md:mt-8 font-bold'>{data.title.slice(0,28)}...</h1>
              <p className='text-base text-justify md:text-left text-gray-700 mt-2 md:mt-5  leading-relaxed'>{data.description.slice(0,100)}</p>
              <Link to={data.link} className='text-greendark md:text-lg mt-2 md:mt-5 text-left'>Read More...</Link>
            </div>
          </div>
        ))}
      </div>



        <Footer/>

    </div>
  )
}

export default Blogs