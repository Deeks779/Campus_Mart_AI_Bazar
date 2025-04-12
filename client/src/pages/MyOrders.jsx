import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const MyOrders = () => {
  const [myBids, setMyBids] = useState([])
  const { currency, axios, user } = useAppContext()
  const navigate = useNavigate()

  const fetchMyBids = async () => {
    try {
      const { data } = await axios.get('/api/bid/user')
      if (data.success) {
        setMyBids(data.bids)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user) {
      fetchMyBids()
    }
  }, [user])

  const handleProceedToPay = (bid) => {
    // Navigate to payment page with bid ID or pass it via state
    navigate(`/payment/${bid._id}`, { state: { bid } })
  }

  return (
    <div className='mt-16 pb-16'>
      <div className='flex flex-col items-end w-max mb-8'>
        <p className='text-2xl font-medium uppercase'>My Bids</p>
        <div className='w-16 h-0.5 bg-[#071F3B] rounded-full'></div>
      </div>

      {myBids.map((bid, index) => (
        <div
          key={index}
          className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl'
        >
          <p className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col'>
            <span>Bid ID : {bid._id}</span>
            <span>Status : {bid.status}</span>
            <span>Placed On : {new Date(bid.createdAt).toLocaleDateString()}</span>
          </p>

          <div className='relative bg-white text-gray-500/70 border-t border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl'>

            <div className='flex items-center mb-4 md:mb-0'>
              <div className='bg-[#071F3B]/10 p-4 rounded-lg'>
                <img
                  src={bid.productId?.thumbnail}
                  alt=""
                  className='w-16 h-16 object-cover'
                />
              </div>
              <div className='ml-4'>
                <h2 className='text-xl font-medium text-gray-800'>
                  {bid.productId?.title}
                </h2>
                <p>Offer Price: {currency}{bid.productId?.offerPrice}</p>
              </div>
            </div>

            <div className='flex flex-col md:ml-8'>
              <p>Bid Amount: {currency}{bid.amount}</p>
              <p>Status: <span className='capitalize'>{bid.status}</span></p>
            </div>

            {bid.status === 'accepted' && (
              <button
                onClick={() => handleProceedToPay(bid)}
                className='mt-4 md:mt-0 bg-[#071F3B] hover:bg-[#093465] text-white px-4 py-2 rounded-lg transition'
              >
                Proceed to Pay
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyOrders
