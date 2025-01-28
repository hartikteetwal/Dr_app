import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointments = () => {

  const { backendUrl, token, getDoctorsData } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


  
  const slotDateFormate = (date) => {
    const [day, month, year] = date.split("_"); // Split the input by "_"
    return `${day} ${months[parseInt(month, 10) - 1]} ${year}`; // Format the date
  };

  const getUserAppointments = async () => {
    console.log(backendUrl)
    try {
      const { data } = await axios.get(backendUrl + "/api/user/list-appointment", { headers: { token } })
      if (data.success) {
        setAppointments(data.appointments.reverse())
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/user/cancel-appointment", { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const appointmentStripe = async (appointmentId) => {
    try {
      // Ensure the appointmentId is provided
      if (!appointmentId) {
        toast.error("Appointment ID is required");
        return;
      }

      // Make the request to the backend for Stripe payment order creation
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-stripe",
        { appointmentId },
        { headers: { token } }
      );

      // Check if the request was successful
      if (data.success) {
        console.log(data.order);

      } else {
        // Handle the case where payment order creation failed
        toast.error(data.message || "Something went wrong with Stripe");
      }

    } catch (error) {
      // Log and handle errors more specifically
      console.error("Error in appointmentStripe:", error);

      // Check if the error has a response (i.e., backend responded with an error)
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "An error occurred with the backend");
      } else {
        // Handle network or other errors
        toast.error("Network error or server issue, please try again.");
      }
    }
  };


  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  console.log(appointments)

  return (
    <div>
      <p className='pb-3 mt-12 text-lg font-medium text-gray-600 border-b'>My appointments</p>
      <div>
        {
          appointments.map((item,index) => (
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b' key={index}>
              <div>
                <img className='w-36 bg-[#EAEFFF]' src={item.docData.image} alt="" />
              </div>
              <div className='flex-1 text-sm text-[#5E5E5E]'>
                <p className='text-[#262626] text-base font-semibold'>{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className='text-[#464646] font-medium mt-1'>Address:</p>
                <p className='text-xs'>{item.docData.address.line1}</p>
                <p className='text-xs'>{item.docData.address.line2}</p>
                <p className='text-xs mt-1'><span className='text-sm text-[#3C3C3C] font-medium'>Date & Time:</span> {slotDateFormate(item.slotDate)} | {item.slotTime}</p>
              </div>
              <div></div>
              <div className='flex flex-col gap-2 justify-end text-sm text-center'>
                {!item.cancelled && <button className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300' onClick={()=>appointmentStripe(item._id)}>Pay Online</button>}
                {!item.cancelled && <button className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300' onClick={() => cancelAppointment(item._id)}>Cancel appointment</button>}
                {item.cancelled && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500' >Appointment Cancelled</button>}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyAppointments
