import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

//icons
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";

//config
import { uploads } from "../../utils/config";

// components
import Message from "../../components/Message";
import Loading from "../../components/Loading";

// hooks
import { useSelector, useDispatch } from "react-redux";
import { useReserComponentMessage } from '../../hooks/useReserComponentMessage';

// Redux
import { getUserDetails } from "../../slices/userSlice";
import { publishPhoto, getUserPhotos, deletePhoto, updatePhoto } from "../../slices/photoSlice";

const Profile = () => {

    const { id } = useParams();
    const newPhotoForm = useRef();
    const editPhotoForm = useRef();
    const dispatch = useDispatch();
    const resetMessage = useReserComponentMessage(dispatch);
    const resetMessagePhoto = useReserComponentMessage(dispatch);
    const { user } = useSelector((state) => state.user);
    const { user: userAuth } = useSelector((state) => state.auth);
    const {photos, message: messagePhoto, error: errorPhoto, loading} = useSelector(state => state.photo);

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [editId, setEditId] = useState('');
    const [editImage, setEditImage] = useState('');
    const [editTitle, setEditTitle] = useState('');
   
    useEffect(() => {
        dispatch(getUserDetails(id));
        dispatch(getUserPhotos(id));
       
    }, [dispatch, id]);


    const handleFile = (e) => {
        const image = e.target.files[0];
        setImage(image);
    }

    const submitHandle = (e) => {
        e.preventDefault();

        const photoData = {
            title,
            image
        }

        const formData = new FormData()
        const photoFormData = Object.keys(photoData).forEach(key => {
            formData.append(key, photoData[key])
        })

        formData.append('photo', photoFormData)

        dispatch(publishPhoto(formData))
        setTitle('')

        resetMessage();
        resetMessagePhoto()
    }
    
    const handleDelete = (id) => {
        dispatch(deletePhoto(id))
        resetMessage();
    }

    const hideOrShowForms = () => {
        newPhotoForm.current.classList.toggle('hide');
        editPhotoForm.current.classList.toggle('hide');
    }

    const handleUpdate = (e) => {
        e.preventDefault();

        const photoData = {
            title: editTitle,
            id: editId
        }

        dispatch(updatePhoto(photoData))
        resetMessage();
    }

    const handleEdit = (photo) => {
        if(editPhotoForm.current.classList.contains('hide')){
            hideOrShowForms();
        }

        setEditId(photo._id);
        setEditTitle(photo.title);
        setEditImage(photo.image);
    }

    const handleCancelEdit = () => {
        hideOrShowForms();
    }

    if (loading) return <Loading />;
        
    return (
        <div className="bg-gray-100 pt-6">
            <div className='max-w-3xl mx-auto px-6'>
                <>
                    <div className="flex items-center">
                        <div className="w-32 mr-6">
                            {user && user.profileImage && (
                                <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} className="rounded-full" />
                            )}
                        </div>
                        <div>
                            <h2 className="text-neutral-700 text-lg">{user.name}</h2>
                            <p className="text-neutral-500 text-sm">{user.bio}</p>
                        </div>
                    </div>
                    {id === userAuth._id && (
                        <>
                            <div className="mt-6" ref={newPhotoForm}>
                                <h3 className="text-[#D55844] text-lg mb-2">Compartilhe algum momento seu</h3>
                                <form onSubmit={submitHandle}>
                                    <div className="flex flex-col mb-2">
                                        <label className='text-neutral-700 text-sm'>Descrição para a foto</label>
                                        <textarea className='text-neutral-700 bg-white focus:outline-none p-3 text-sm border border-neutral-400/30 mt-1' rows="7" placeholder="Insira um título..." name="title" onChange={(e) => setTitle(e.target.value)} value={title || ''}></textarea>
                                    </div>
                                    <div className='flex flex-col mb-2'>
                                        <label className='text-neutral-700 text-sm'>Imagem</label>
                                        <div className='relative'>
                                            <span className='absolute w-full bg-white h-10 border border-neutral-400/30 p-2.5 focus:outline-none rounded text-neutral-500 placeholder:text-neutral-500 text-sm'>Selecione uma imagem</span>
                                            <input className='h-10 relative opacity-0 cursor-pointer w-full z-10 border' type="file" onChange={handleFile} />
                                        </div>
                                    </div>
                                    {!loading && <input type="submit" value="Postar" className='w-28 bg-[#D55844] py-2 rounded my-3 cursor-pointer hover:opacity-80 transition ease-in-out delay-100 text-white' />}
                                </form>
                            </div>
                            <div className="hide" ref={editPhotoForm}>
                                <div className="mt-8">
                                    {editImage && (
                                        <img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
                                    )}
                                </div>
                                <form onSubmit={handleUpdate} className="flex flex-col">
                                    <textarea className='text-neutral-700 bg-white focus:outline-none p-3 text-sm border border-neutral-200 mt-1' rows="7" name="editTitle" onChange={(e) => setEditTitle(e.target.value)} value={editTitle || ''}></textarea>
                                    <div className="flex gap-3">
                                        <input type="submit" value="Atualizar" className='w-28 bg-[#D55844] py-2 rounded my-3 cursor-pointer hover:opacity-80 transition ease-in-out delay-100 text-white' />
                                        <button className='w-44 bg-[#2c2626] py-2 rounded my-3 cursor-pointer hover:opacity-80 transition ease-in-out delay-100 text-white' onClick={handleCancelEdit}>Cancelar edição</button>
                                    </div>
                                </form>
                            </div>
                            {errorPhoto && <Message msg={errorPhoto} type='error' />}
                            {messagePhoto && <Message msg={messagePhoto} type='success' />} 
                        </>
                    )}
                    <div className="mt-10">
                        <h2 className="text-[#D55844] text-lg mb-2">Fotos publicadas</h2>
                    
                            <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-2">
                                {photos && photos.map(photo => (
                                    <div key={photo._id}>
                                        <div className="bg-white p-2">
                                            {photo.image && (
                                                <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} className="w-60 h-52 object-cover" /> 
                                            )}
                                        </div>
                                        {id === userAuth._id ? (
                                            <div className="flex items-center gap-2 py-3">
                                                <Link to={`/photos/${photo._id}`} className="bg-[#D55844] p-1"><BsFillEyeFill size={10} color="#FFF" /></Link>
                                                <button onClick={() => handleEdit(photo)} className="cursor-pointer bg-[#D55844] p-1"><BsPencilFill size={10} color="#FFF" /></button>
                                                <button onClick={() => handleDelete(photo._id)} className="cursor-pointer bg-[#D55844] p-1"><BsXLg size={10} color="#FFF" /></button>                                            
                                            </div>
                                        ) : (
                                            <Link className="text-red-600" to={`/photos/${photo._id}`}>Ver</Link>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {photos.length === 0 && <p className='text-neutral-500 text-sm mb-3'>Ainda não há fotos publicadas!</p>}
                    </div>
                </>
            </div>
        </div>
    )
}

export default Profile
