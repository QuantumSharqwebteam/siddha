import React from 'react'
import Header from '../ui/Header'
import Footer from '../ui/Footer'
import Doctor from "../assets/doctor.jpeg"


function About() {
  return (
    <div id="about" className='w-full font-merriweather '>
        <Header/>
        <div  className='w-full h-full px-4 md:p-10 mb-5'>

            <div className='w-full m-auto block lg:grid lg:grid-cols-5 mt-5 md:mt-0   md:gap-5'>
                <div data-aos="fade-right" className='lg:col-span-2  lg:w-full lg:h-full md:rounded-4xl  lg:p-10'>

                    <img className='w-full lg:h-500 h-60  md:rounded-4xl lg:object-fit object-contain' src={Doctor}/>

                </div>

                <div data-aos="fade-left" className='col-span-3 md:flex md:flex-col mt-3 md:mt-5 lg:mt-0 md:justify-center lg:text-left lg:p-10 md:pl-0  '>
                    <h1 className='text-green1 lg:text-3xl  font-semibold md:text-xl text-base '>Dr. Veera Babu, B.S.M.S.</h1>
                    <p className='font-semibold mt-3 md:mt-5'><i className='lg:text-xl text-sm md:text-base'> “Senior Siddha Physician & Head of Department <br className='hidden md:block'/> Siddha Healing Center” </i></p>
                    <p className='lg:text-base md:text-sm text-gray-700 text-xs mt-3 text-justify lg:text-left  lg:leading-loose  lg:w-11/12 md:mt-5 leading-relaxed'>Dr. Veera Babu, B.S.M.S., is the Senior Siddha Physician and Head of Department at Siddha Healing Center,in the field of Siddha medicine. He holds a degree from Government Siddha Medical College Chennai, Arumbakkam, Register Number 16101/A, under Dr. MGR University.</p>
                    <p className='lg:text-base md:text-sm text-gray-700 text-justify text-xs mt-3 lg:text-left  lg:leading-loose  lg:w-11/12 md:mt-5 leading-relaxed'>Dr. Veera Babu began his career as a Siddha physician at Saravana Siddha Hospital in Madurai in 2005, where he quickly gained recognition for his expertise in holistic treatments. In 2008, he established his own practice, the Siddha Healing Center, which has since grown into a renowned healthcare facility, offering traditional healing to thousands of patients.</p>
                </div>
            </div>

            <div className='lg:mx-10 md:mt-8 mt-5'>
                <h1  className='lg:text-2xl md:xl  font-bold text-left text-green1'>Roles & Contributions</h1>
                <ul  className='w-full lg:mt-5 md:mt-3 text-justify lg:text-left list-disc pl-4 mt-3 '>
                    <li className='lg:text-base lg:leading-loose leading-relaxed md:text-sm text-gray-700 mt-1 md:mt-1 lg:mt-0 text-xs '>Member of Scientific Advisory Committee, National Institute of Siddha, Chennai.</li>
                    <li className='lg:text-base lg:leading-loose leading-relaxed md:text-sm text-gray-700 mt-1 md:mt-1 lg:mt-0 text-xs '>Consultant on Traditional Medicine to the AYUSH Ministry, Government of India.</li>
                    <li className='lg:text-base lg:leading-loose leading-relaxed md:text-sm text-gray-700 mt-1 md:mt-1 lg:mt-0 text-xs '>Adviser to the Siddha Research Council, working on the development and validation of Siddha medicines for liver disorders and chronic diseases</li>
                </ul>
            </div>

            <div className='lg:mx-10 md:mt-8 mt-5'>
                <h1  className='lg:text-2xl md:xl  font-bold text-left text-green1'>Achievements:</h1>
                <ul  className='w-full lg:mt-3 md:mt-3 text-justify lg:text-left list-disc pl-4 mt-3 '>
                    <li className='lg:text-base lg:leading-loose leading-relaxed md:text-sm text-gray-700 mt-1 md:mt-1 lg:mt-0 text-xs '>Successfully treated over 6,000+ patients using advanced Siddha therapeutic approaches.</li>
                    <li className='lg:text-base lg:leading-loose leading-relaxed md:text-sm text-gray-700 mt-1 md:mt-1 lg:mt-0 text-xs '>Pioneered research into herbal treatments for liver diseases, publishing several papers in national and international journals.</li>
                    <li className='lg:text-base lg:leading-loose leading-relaxed md:text-sm text-gray-700 mt-1 md:mt-1 lg:mt-0 text-xs '>Featured speaker at national and international conferences on Siddha medicine and traditional healing methods.</li>
                    <li className='lg:text-base lg:leading-loose leading-relaxed md:text-sm text-gray-700 mt-1 md:mt-1 lg:mt-0 text-xs '>Developed holistic wellness programs focusing on detoxification and rejuvenation, which have been adopted by several hospitals across Tamil Nadu.</li>  
                </ul>
            </div>

            <div className='lg:mx-10 md:mt-8 mt-5'>
                <h1  className='lg:text-2xl md:xl  font-bold text-left text-green1'>Expertise</h1>
                <ul  className='w-full lg:mt-5 md:mt-3 text-justify lg:text-left list-disc pl-4 mt-3 '>
                    <li className='lg:text-base lg:leading-loose leading-relaxed md:text-sm text-gray-700 mt-1 md:mt-1 lg:mt-0 text-xs '>Liver Disorders and Detoxification: Specializes in natural treatments for liver diseases such as hepatitis, jaundice, and cirrhosis using traditional Siddha herbal formulations.</li>
                    <li className='lg:text-base lg:leading-loose leading-relaxed md:text-sm text-gray-700 mt-1 md:mt-1 lg:mt-0 text-xs '>Chronic Disease Management: Expertise in treating conditions like arthritis, diabetes, skin disorders, and respiratory issues through a combination of herbal medicine and lifestyle changes</li>
                    <li className='lg:text-base lg:leading-loose leading-relaxed md:text-sm text-gray-700 mt-1 md:mt-1 lg:mt-0 text-xs '>Preventive Healthcare: Advocates preventive Siddha care for long-term health, incorporating dietary practices and detox therapies to balance the body’s natural elements.</li>

                </ul>
            </div>

            <div className='lg:mx-10 md:mt-8 mt-5'>
                <h1  className='lg:text-2xl md:xl font-bold text-left text-green1'>Research and Innovation:</h1>
                <ul  className='w-full lg:mt-5 md:mt-3 text-justify lg:text-left list-disc pl-4 mt-3 '>
                    <li className='lg:text-base lg:leading-loose leading-relaxed md:text-sm text-gray-700 mt-1 md:mt-1 lg:mt-0 text-xs '>Led clinical trials on the effectiveness of Kayakalpam therapies and Varmam healing for rejuvenation and longevity.</li>
                    <li className='lg:text-base lg:leading-loose leading-relaxed md:text-sm text-gray-700 mt-1 md:mt-1 lg:mt-0 text-xs '>Member of the Siddha Pharmacopoeia Committee, working on the documentation and standardization of traditional remedies.</li>

                </ul>
            </div>


        </div>

        <Footer/>

    </div>
  )
}

export default About