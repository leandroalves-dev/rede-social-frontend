import { useEffect, useState } from 'react'
import { Link, useParams} from 'react-router-dom'
//uploads
import { uploads } from '../../utils/config'

//components
import Message from '../../components/Message'
import PhotoItem from '../../components/PhotoItem'
import LikeContainer from '../../components/LikeContainer'
import Loading from '../../components/Loading'

//hooks
import { useSelector, useDispatch } from 'react-redux'
import { useReserComponentMessage } from '../../hooks/useReserComponentMessage';

//redux
import { getPhoto, like, comment } from '../../slices/photoSlice'

const Photo = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const resetMessage = useReserComponentMessage(dispatch);
    const { user } = useSelector((state) => state.auth);    
    const { photo, error, message } = useSelector((state) => state.photo);

    const [commentText, setCommentText] = useState();
    const [loading, setLoading] = useState(true);
    
    useEffect( () => {
        dispatch(getPhoto(id));
        setTimeout(() => { setLoading(false) },1000)
    },[dispatch, id])

     
    const handleLike = () => {
        dispatch(like(photo._id));
        resetMessage();
    }
   
    const handleComment = (e) => {
        e.preventDefault();

        const commentData = {
            comment: commentText,
            id: photo._id
        }

        dispatch(comment(commentData))
        setCommentText('');

        resetMessage();
    }

    return (
        <div className="bg-gray-100 pt-6">
            <div className='max-w-3xl mx-auto px-6'>

                {loading && <Loading />}

                <div className='text-neutral-700 gap-3 text-sm bg-white p-3'>
                    <PhotoItem photo={photo} />
                    <LikeContainer photo={photo} user={user} handleLike={handleLike} /> 
                </div>
                <div>
                    {error && <Message msg={error} type='error' />}
                    {message && <Message msg={message} type='success' />}
                </div>
                <div className='mt-6 pb-20'>
                    {photo.comments && (
                        <>
                            <h3 className='text-neutral-700 text-sm'>Comentários: ({photo.comments.length})</h3>
                            <form onSubmit={handleComment}>
                                <div className='flex flex-col'>
                                    <textarea className='text-neutral-700 bg-white focus:outline-none p-3 text-sm border border-neutral-200 mt-1' rows="7" name={commentText} onChange={(e) => setCommentText(e.target.value)} value={commentText || ''}></textarea>
                                    <input type="submit" value="Enviar" className='w-28 mt-6 text-white bg-[#D55844] py-2 rounded mb-3 cursor-pointer hover:opacity-80 transition ease-in-out delay-100' />
                                </div>
                            </form>
                            {photo.comments.length === 0 && <p className='text-neutral-700'>Não há comentários.</p>}
                            
                            {photo.comments.map(comment => (
                                <div className="flex bg-gray-200/10 nth-[2n]:bg-gray-300/20 p-5 mt-3" key={comment.comment}>
                                    <div className="flex flex-col justify-center items-center mr-8">
                                        {comment.userImage && (
                                            <img src={`${uploads}/users/${comment.userImage}`} alt={comment.userName} className='w-20 rounded-full' />
                                        )}
                                        <Link to={`/users/${comment.userId}`}>
                                            <p className='text-neutral-700 text-[12px]'>{comment.userName}</p>
                                        </Link>
                                    </div>
                                    <p className='text-neutral-700 text-sm'>{comment.comment}</p>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
       
    ) 
}

export default Photo
