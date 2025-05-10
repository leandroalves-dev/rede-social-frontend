import './App.css';

//icons
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'

//pages
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import EditProfile from './pages/EditProfile/EditProfile';
import Profile from './pages/Profile/Profile';
import Photo from './pages/Photo/Photo';
import Search from './pages/Search/Search';

//Hook
import { useAuth } from './hooks/useAuth'; 

//components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loading from './components/Loading';

function AppWrapper() {
    const location = useLocation();
    const { auth, loading } = useAuth();

    const hideHeaderFooter = location.pathname === "/login" || location.pathname === "/register";

    if (loading) {
        return <Loading />;
    }

    return (
        <div className='min-h-screen flex flex-col'>
            {!hideHeaderFooter && <Navbar />}
                <main className="flex-1">
                    <Routes>
                        <Route path='/' element={auth ? <Home /> : <Navigate to="/login" />} />
                        <Route path='/profile' element={auth ? <EditProfile /> : <Navigate to="/login" />} />
                        <Route path='/users/:id' element={auth ? <Profile /> : <Navigate to="/login" />} />
                        <Route path='/login' element={!auth ? <Login /> : <Navigate to="/" />} />
                        <Route path='/register' element={!auth ? <Register /> : <Navigate to="/" />} />
                        <Route path='/search' element={auth ? <Search /> : <Navigate to="/login" />} />
                        <Route path='/photos/:id' element={auth ? <Photo /> : <Navigate to="/login" />} />
                    </Routes>
                </main>
            {!hideHeaderFooter && <Footer />}
        </div>
    );
}

function App() {
    return (
        <BrowserRouter basename="/projects/rede_social/">
        <AppWrapper />
        </BrowserRouter>
    );
}

export default App;
