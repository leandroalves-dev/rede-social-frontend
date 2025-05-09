import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
//icons
import { BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill } from 'react-icons/bs';

//Hooks
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../hooks/useAuth';
//redux
import { logout, reset } from '../slices/authSlice';

const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
	const { auth } = useAuth();
	const { user } = useSelector(state => state.auth);
	const [query, setQuery] = useState('')

	const handleLogout = () => {
		dispatch(logout())
		dispatch(reset());

		navigate('/login')
	}

	const handleSearch = (e) => {
		e.preventDefault()

		if(query){
			return navigate(`/search?q=${query}`)
		}
	}

	return (
		<nav className='bg-[#D55844] py-4'>
            <div className='max-w-3xl text-white mx-auto flex items-center justify-between max-sm:flex-col px-6'>

                <div className='flex-1 max-sm:mb-5'>
                    <Link to="/"><img src="./logo.png" className='object-cover w-28' /></Link> 
                </div>

                <div className='flex flex-2 gap-20'>
                    <form onSubmit={handleSearch} className='relative'>
                        <div className='absolute right-3 top-3 cursor-pointer'><BsSearch /></div>
                        <input className='bg-[#df6350] p-2.5 rounded text-sm w-2xs pr-9 max-sm:w-40 focus:outline-none' type="text" placeholder='pesquisar...' onChange={(e) => setQuery(e.target.value)} />
                    </form>  

                    <ul className='grid grid-cols-4 gap-1 items-center'>
                        {auth ? (
                            <>
                                <li>
                                    <NavLink to="/">
                                        <BsHouseDoorFill />
                                    </NavLink>
                                </li>
                                {user && (
                                    <li>
                                        <NavLink to={`/users/${user._id}`}>
                                            <BsFillCameraFill />
                                        </NavLink>
                                    </li>
                                )}
                                <li>
                                    <NavLink to="/profile">
                                        <BsFillPersonFill />
                                    </NavLink>
                                </li>
                                <li>
                                    <button className='cursor-pointer text-sm' onClick={handleLogout}>Sair</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink to="/login">
                                        Entrar
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/register">
                                        Cadastrar
                                    </NavLink>
                                </li>
                            </>
                        )}
                        
                    </ul>              
                </div>              

                
            </div>
		</nav>
	)
}

export default Navbar
