import { useState, useEffect } from 'react'
//config
import { uploads } from '../../utils/config';

// Hooks
import { useSelector, useDispatch } from 'react-redux'
import { useReserComponentMessage } from '../../hooks/useReserComponentMessage';

// Redux
import { profile, updateProfile } from '../../slices/userSlice';

// Components
import Message from '../../components/Message'
import Loading from '../../components/Loading';

const EditProfile = () => {

    const dispatch = useDispatch();
    const resetMessage = useReserComponentMessage(dispatch);
    const { user, message, error } = useSelector(state => state.user);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState("");
    const [bio, setBio] = useState('');
    const [previewImage, setPreviewImage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        dispatch(profile())
    }, [dispatch])

    useEffect( () => {
        if(user){
            setName(user.name);
            setEmail(user.email);
            setBio(user.bio)
        }
        setTimeout(() => { setLoading(false) },1000)
    }, [user])

    const handleSubmit =  async(e) => {
        e.preventDefault();
       
        const userData = {
            name
        }

        if(profileImage){
            userData.profileImage = profileImage;
        }

        if(bio){
            userData.bio = bio;
        }
        
        if (password.trim().length > 0) {
            userData.password = password;
        }
        
        const formData = new FormData();
        Object.keys(userData).forEach(key => formData.append(key, userData[key]));

        await dispatch(updateProfile(formData));

        resetMessage()
    }

    const handleFile = (e) => {
        const image = e.target.files[0];
        setPreviewImage(image);
        setProfileImage(image);
    }

    if (loading) return <Loading />;

    return (
        <div className="bg-gray-100 pt-6">
            <div className='max-w-3xl mx-auto px-6'>
                <div className='flex flex-col justify-center items-center'>
                    <h2 className='text-neutral-700 text-lg'>Edite seu dados</h2>
                    <p className='text-neutral-500 text-sm mb-3'>Adicione ima imagem de perfil e conte mais sobre você.</p>
                    {(user && (user.profileImage || previewImage)) && (
                        <img className='w-32 rounded-full shadow' src={previewImage ? URL.createObjectURL(previewImage) : `${uploads}/users/${user.profileImage}`} alt={user.name} />
                    )}
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col justify-center'>
                    <div className='flex flex-col mb-2'>
                        <label className='text-neutral-700 text-sm'>Nome</label>
                        <input className='border border-neutral-400/30 p-2.5 focus:outline-none rounded bg-white/40 text-neutral-500 placeholder:text-neutral-500 text-sm' type="text" placeholder='Insira o nome' onChange={(e) => setName(e.target.value)} value={name || ''} />
                    </div>
                    <div className='flex flex-col mb-2'>
                        <label className='text-neutral-700 text-sm'>E-mail</label>
                        <input className='border border-neutral-400/30 p-2.5 focus:outline-none rounded bg-white/40 text-neutral-500 placeholder:text-neutral-500 text-sm' type="email" placeholder='Insira o e-mail' disabled value={email || ''} />
                    </div>
                    <div className='flex flex-col mb-2'>
                        <label className='text-neutral-700 text-sm'>Imagem do Perfil</label>
                        <div className='relative'>
                            <span className='absolute w-full bg-white h-10 border border-neutral-400/30 p-2.5 focus:outline-none rounded text-neutral-500 placeholder:text-neutral-500 text-sm'>Selecione uma imagem</span>
                            <input className='h-10 relative opacity-0 cursor-pointer w-full z-10 border' type="file" onChange={handleFile} />
                        </div>
                    </div>
                    <div className='flex flex-col mb-2'>
                        <label className='text-neutral-700 text-sm'>Bio:</label>
                        <input className='border border-neutral-400/30 p-2.5 focus:outline-none rounded bg-white/40 text-neutral-500 placeholder:text-neutral-500 text-sm' type="text" placeholder='Insira uma descrição do perfil...' onChange={(e) => setBio(e.target.value)} value={bio || ''} />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-neutral-700 text-sm'>Quer alterar sua senha?</label>
                        <input className='border border-neutral-400/30 p-2.5 focus:outline-none rounded bg-white/40 text-neutral-500 placeholder:text-neutral-500 text-sm' type="password" placeholder='Insira sua nova senha...' onChange={(e) => setPassword(e.target.value)} value={password || ''} />
                    </div>
                    {!loading && <input type="submit" value="Atualizar" className='w-28 bg-[#D55844] py-2 rounded my-3 cursor-pointer hover:opacity-80 transition ease-in-out delay-100 text-white' />}
                    {error && <Message msg={error} type="error" />}
                    {message && <Message msg={message} type="success" />}
                </form>
            </div>
        </div>
    ) 
}

export default EditProfile
