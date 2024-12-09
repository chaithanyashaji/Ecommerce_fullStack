import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Newsletter from '../components/Newsletter'

const about = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>

      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img}/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, soluta quod? Autem sapiente placeat sit esse. Voluptate voluptas voluptates eum consequatur ratione vitae et. Perspiciatis ratione distinctio voluptatem ex sequi?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore eligendi voluptatibus neque voluptates omnis, saepe sed blanditiis ullam quasi cumque accusamus odio alias harum aperiam molestiae sapiente reprehenderit debitis ex.</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, dolorum commodi! Sunt magnam molestias quia quo autem aperiam, quos, vitae voluptatibus placeat enim repudiandae? Quae, minus.</p>
     
        </div>

      </div>
      <div className='text-4xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>

      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic assumenda rerum odio quibusdam, labore cum quam provident animi nesciunt corporis. Doloremque consequatur modi animi voluptate adipisci amet necessitatibus quos officia?</p>

        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic assumenda rerum odio quibusdam, labore cum quam provident animi nesciunt corporis. Doloremque consequatur modi animi voluptate adipisci amet necessitatibus quos officia?</p>

        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic assumenda rerum odio quibusdam, labore cum quam provident animi nesciunt corporis. Doloremque consequatur modi animi voluptate adipisci amet necessitatibus quos officia?</p>

        </div>


      </div>
      <Newsletter/>
      
    </div>
  )
}

export default about
