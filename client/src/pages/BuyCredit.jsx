import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const BuyCredit = () => {
  const{user, backenUrl, loadCreditsData,backendUrl,
     token, setShowLogin}=useContext(AppContext)

  const navigate = useNavigate()

  const initPay = async(order)=>{
    console.log('5')
    const options ={
    key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
    amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: order.currency,
    name: "Credits payment", //your business name
    description: "Credits payment",
    order_id: order.id,
    receipt:order.receipt,
    handler: async(response)=>{
      try{
        const {data} = await axios.post(backendUrl + '/api/user/verify-razor', 
        response, {headers: {token}})

        if(data.success){
          loadCreditsData();
          navigate('/')
          toast.success('Credit Added')
        }

      }catch(error){
        toast.error(error.message)
      }
    }
    
   }
   const rzp = new window.Razorpay(options)
   rzp.open()
    
  }


  const paymentRazorpay = async(planId)=>{
    console.log('1')
    try{
      console.log('11')
      if(!user){
        setShowLogin(true)
      }
      console.log('111')
      const {data} = await axios.post(backendUrl + '/api/user/pay-razor', {planId},{headers: {token}})

      if(data.success){
        console.log('1111')
        initPay(data.order)
      }

    }catch(error){
      console.log('11111')
      toast.error(error.message)
      console.error(error)
    }

  }

  return (
    <div className='min-h-[80vh] text-center pt-14 mb-10'>
      <button className='border border-ray-400 px-10 py-2 rounded-full mb-6'>Our Plans</button>
      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Choose the plan</h1>
    
      <div className='flex flex-wrap justify-center gap-6 text-left '>
        {plans.map((item,index)=>(
          <div key={index} className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500'>

            <img width={40} src={assets.lock_icon} alt=''/>
            <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
            <p className='text-sm'>{item.desc}</p>
            <p className='mt-6'>
              <span>${item.price}</span>/ {item.credits} credits</p>
            <button onClick = {()=>paymentRazorpay(item.id)} className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52'>{user ? 'Purchase' : 'Get Started'}</button>
          </div>
        ))}
      </div>
    
    
    
    </div>
  )
}

export default BuyCredit