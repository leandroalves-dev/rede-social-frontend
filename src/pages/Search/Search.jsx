import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

//hooks
import { useSelector, useDispatch} from 'react-redux';
import { useReserComponentMessage } from '../../hooks/useReserComponentMessage'
import { useQuery } from '../../hooks/useQuery';

//components
import LikeContainer from '../../components/LikeContainer';
import PhotoItem from '../../components/PhotoItem';
import Loading from '../../components/Loading';

//redux
import { searchPhotos, like } from '../../slices/photoSlice';

const Search = () => {
    const query = useQuery();
    const search = query.get('q');
    const dispatch = useDispatch();
    const resetMessage = useReserComponentMessage(dispatch);
    const { user } = useSelector(state => state.auth);
    const { photos } = useSelector(state => state.photo);

    const [loading, setLoading] = useState(true);
   
    useEffect( () => {
        dispatch(searchPhotos(search))
        setTimeout(() => { setLoading(false) },1000)
    }, [dispatch, search])

    
    const handleLike = (photo) => {
        dispatch(like(photo._id))
        resetMessage();
    }

    return (
        <div className="bg-gray-100 pt-6 flex-grow">
            <div className='max-w-3xl mx-auto pb-10 px-6'>
                <h2 className='text-neutral-700 text-lg mb-2'>Você está buscando por: <strong>{search}</strong></h2>
                {loading && <Loading /> }
                <>
                    {photos && photos.map(photo => (
                        <div key={photo._id} className='bg-white p-3'>
                            <PhotoItem photo={photo} />
                            <div className='flex items-center text-neutral-700 gap-3 text-sm'>
                                <LikeContainer photo={photo} user={user} handleLike={handleLike} />
                                <Link className='btn' to={`/photos/${photo._id}`}>Comentar</Link>
                            </div>
                        </div>
                    ))}
                    {photos && photos.length === 0 && (
                        <h2 className='text-neutral-700 text-md'>Não foram encontrados resultados para sua busca.</h2>
                    )}
                </>
            </div>
        </div>
    )
}

export default Search