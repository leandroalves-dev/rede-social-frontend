import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
//components
import Message from '../../components/Message'
import Loading from '../../components/Loading'

//Redux
import { useSelector, useDispatch } from 'react-redux'

//slice
import { register, reset } from '../../slices/authSlice';

const Register = () => {

    const dispatch = useDispatch();
	const {  error } = useSelector(state => state.auth);

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(true);

	const handleSubmit = (e) => {
		e.preventDefault();

		const user = {
			name,
			email,
			password,
			confirmPassword
		}

		console.log(user);
		dispatch(register(user))
	}
	
	useEffect( () => {
		dispatch(reset());
        setTimeout(() => { setLoading(false) },100)
	}, [dispatch]);

	return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-[#db2205] via-[#D55844]/40 to-[#D55844]/90'>
            
            {loading && <Loading />}
            
            <div className='w-[450px] max-sm:w-[400px] bg-white/15 backdrop-blur-md border-2 border-white/20 p-10 rounded-lg'>
                <header className='flex flex-col justify-center items-center mb-6'>
                    <img src="./logo.png" alt="" className='object-cover' />
                    <p className='text-md text-neutral-700 text-sm'>Conecte-se ao Insocial e descubra as novidades!</p>
                </header>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col mb-3'>
                        <label className='text-neutral-700 text-md'>Nome</label>
                        <input className='border border-neutral-400/80 p-2.5 focus:outline-none rounded bg-white/40 text-neutral-500 placeholder:text-neutral-500 text-sm' type="text" placeholder='Insira seu nome...' onChange={(e) => setName(e.target.value)} value={name || ''} />
                    </div>
                    <div className='flex flex-col mb-3'>
                        <label className='text-neutral-700 text-md'>E-mail</label>
                        <input className='border border-neutral-400/80 p-2.5 focus:outline-none rounded bg-white/40 text-neutral-500 placeholder:text-neutral-500 text-sm' type="email" placeholder='Insira seu e-mail...' onChange={(e) => setEmail(e.target.value)} value={email || ''} />
                    </div>
                    <div className='flex flex-col mb-3'>
                        <label className='text-neutral-700 text-md'>Senha</label>
                        <input className='border border-neutral-400/80 p-2.5 focus:outline-none rounded bg-white/40 text-neutral-500 placeholder:text-neutral-500 text-sm' type="password" placeholder='Insira sua senha...' onChange={(e) => setPassword(e.target.value)} value={password || ''} />
                    </div>
                    <div className='flex flex-col mb-3'>
                        <label className='text-neutral-700 text-md'>Confirmar senha</label>
                        <input className='border border-neutral-400/80 p-2.5 focus:outline-none rounded bg-white/40 text-neutral-500 placeholder:text-neutral-500 text-sm' type="password" placeholder='Confirme sua senha...' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword || ''} />
                    </div>
                    {!loading && <input type="submit" value="Cadastrar" className='w-28 bg-[#D55844] py-2 rounded mb-3 cursor-pointer hover:opacity-80 transition ease-in-out delay-100 text-white' />}
                    {error && <Message msg={error} type="error" />}
                </form>
                <p className='text-neutral-700 text-sm'>
                    Já tem conta? <Link to="/login" className='underline'>Clique aqui</Link>
                </p>
            </div>
        </div>
		
	)
}

export default Register
