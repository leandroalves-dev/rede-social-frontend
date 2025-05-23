/* eslint-disable react/prop-types */
//icons
import { BsHeart, BsHeartFill } from 'react-icons/bs'

const LikeContainer = ({ photo, user, handleLike }) => {
  return (
    <div className='flex items-center gap-2'>
        {photo.likes && user && (
            <>
               {photo.likes.includes(user._id) ? (
                    <BsHeartFill />
               ): (
                    <BsHeart onClick={() => handleLike(photo)} /> 
               )} 
               <p>{photo.likes.length} like(s)</p>
            </>
        )}
    </div>
  )
}

export default LikeContainer
