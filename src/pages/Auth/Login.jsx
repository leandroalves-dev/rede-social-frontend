import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Components
import Message from '../../components/Message';
import Loading from '../../components/Loading';

// redux
import { useSelector, useDispatch } from 'react-redux';

// slice
import { login, reset } from '../../slices/authSlice';

const Login = () => {
    
    const dispatch = useDispatch();
    const {error, loading} = useSelector(state => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            email,
            password
        }
        dispatch(login(user))
    }
    
    useEffect( () => {
        dispatch(reset())
    }, [dispatch])

    if (loading) return <Loading />;

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-[#db2205] via-[#D55844]/40 to-[#D55844]/90'>
            <div className='w-[450px] max-sm:w-[400px] bg-white/15 backdrop-blur-md border-2 border-white/20 p-10 rounded-lg'>
                <header className='flex flex-col justify-center items-center mb-6'>
                    <img src="./logo.png" alt="" className='object-cover' />
                    <p className='text-md text-neutral-700 text-sm'>Conecte-se ao Insocial e descubra as novidades!</p>
                </header>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col mb-3'>
                        <label className='text-neutral-700 text-md'>E-mail</label>
                        <input className='border border-neutral-400/80 p-2.5 focus:outline-none rounded bg-white/40 text-neutral-500 placeholder:text-neutral-500 text-sm' type="text" placeholder='Insira seu e-mail...' onChange={(e) => setEmail(e.target.value)} value={email || ''} />
                    </div>
                    <div className='flex flex-col mb-3'>
                        <label className='text-neutral-700 text-md'>Senha</label>
                        <input className='border border-neutral-400/80 p-2.5 focus:outline-none rounded bg-white/40 text-neutral-500 placeholder:text-neutral-500 text-sm' type="password" placeholder='Insira sua senha...' onChange={(e) => setPassword(e.target.value)} value={password || ''} />
                    </div>
                    {!loading && <input type="submit" value="Entrar" className='w-28 bg-[#D55844] py-2 rounded mb-3 cursor-pointer hover:opacity-80 transition ease-in-out delay-100 text-white' />}
                    {error && <Message msg={error} type="error" />}
                </form>
                <p className='text-neutral-700 text-sm'>Não tem uma conta? <Link to="/register" className='underline'>clique aqui</Link></p>
            </div>
        </div>
        
    )
}

export default Login
