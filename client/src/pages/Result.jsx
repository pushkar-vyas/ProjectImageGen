import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Result = () => {

  const[image, setimage] = useState(assets.sample_img_1)
  const[isImaeLoaded, setIsImageLoaded] = useState(false)
  const[loading, setLoading] =useState(false)
  const[input,setInput]=useState('')

  const{generateImage}= useContext(AppContext)

  const onSubmitandler= async(e)=>{
   e.preventDefault()
   setLoading(true)

   if(input){
    const image = await generateImage(input)
    if(image){
      setIsImageLoaded(true)
      setimage(image)
    }
   }
    setLoading(false)
  }
  
  
  
  return (
    <form onSubmit={onSubmitandler} className='flex flex-col min-h-[90vh] justify-center items-center'>
    <div>
      <div className='relative'>
        <img src={image} alt='' 
        className='max-w-sm rounded'/>

        <span className={`absolute bottom-0 left-0
         h-1 bg-blue-500 $ {loading ? 'w-full transition-all 
         duration-[10s]':'w-0'} `}></span>

      </div>
      <p className={!loading ? 'hidden' : ""}>Loading.....</p>
    </div>

    {!isImaeLoaded &&
    <div className='flex w-full max-w-xl bg-neutral-500
     text-white text-sm p-0.5 rounded-full'>
      <input 
      type='text'
      onChange={e=>setInput(e.target.value)}
      value={input}
      placeholder='Describe wat you want to enerate'
      className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 
      placeholder-color'/>

      <button type='submit' className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full'>Generate</button>
    </div>
    }
    {isImaeLoaded &&
    <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10
    rounded-full'>
      <p onClick={()=>{setIsImageLoaded(false)}} className='bg-transparent border border-zinc-900
      text-black px-8 py-3 rounded-full cursor-pointer'>Generate</p>
      <a href={image} download className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'>Download</a>
    </div>
    }

    </form>
  )
}

export default Result