import { useEffect } from 'react';
import { Link } from 'react-router-dom';

//icons
import { BsChat } from 'react-icons/bs';

//components
import LikeContainer from '../../components/LikeContainer'
import Loading from '../../components/Loading'
import PhotoItem from '../../components/PhotoItem';

//hooks
import { useSelector, useDispatch } from 'react-redux';
import { useReserComponentMessage } from '../../hooks/useReserComponentMessage';

//redux
import { getAllPhotos, like } from '../../slices/photoSlice';
import { profile } from '../../slices/userSlice';

const Home = () => {

    const dispatch = useDispatch();
    const resetMessage = useReserComponentMessage(dispatch);

    const { user } = useSelector((state) => state.user);
    const { user: authUser } = useSelector((state) => state.auth);
    const { photos, loading } = useSelector(state => state.photo);
    
    useEffect( () => {
        dispatch(getAllPhotos())
        if (authUser?.token) {
            dispatch(profile());
        }
    },[dispatch, authUser])

    
    const handleLike = (photo) => {
        dispatch(like(photo._id))
        resetMessage();
    }

    return (
        <div className="bg-gray-100 pt-6">
            <div className='max-w-7xl mx-auto flex justify-between'>
                {loading ? (
                    <Loading />
                ) : photos && photos.length === 0 ? (
                    <h2 className='no-photos'>Ainda não há fotos publicadas, <Link to={`/users/${user._id}`}>clique aqui</Link></h2>
                ) : (
                    <div className='max-w-3xl mx-auto px-6'>
                        {photos && photos.map(photo => (
                            <div key={photo._id} className='mb-10 bg-white p-3'>
                                <PhotoItem photo={photo} />
                                <div className='flex items-center text-neutral-700 gap-3 text-sm'>
                                    <LikeContainer photo={photo} user={user} handleLike={handleLike} />
                                    <Link to={`/photos/${photo._id}`} className='flex items-center gap-2'><BsChat size={18} /> comentar</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home
