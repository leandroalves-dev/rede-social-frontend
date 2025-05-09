import { api, requestConfig } from '../utils/config'

//Registrar um usuário
const register = async(data) => {
    const config = requestConfig('POST', data);

    try {
        const response = await fetch(api + '/users/register', config)
        const data = await response.json();

        if(data){
            localStorage.setItem('user', JSON.stringify(data));
        }

        return data

    } catch (error) {
        console.log(error)
    }
}

// Deslogar usuário
const logout = () => {
    localStorage.removeItem('user');
}

// Logar usuário
const login = async(data) => {
    
    const { email, password } = data;
   
    if (!email || !password) {
        console.log("Email e senha são obrigatórios.");
        return;
    }
    
    const config = requestConfig('POST', data); 
    try {
        
        const response = await fetch(api + '/users/login', config)
        const data = await response.json()

        if(data._id){
            localStorage.setItem('user', JSON.stringify(data));
        }

        return data

    } catch (error) {
        console.log(error);
    }
}

const authService = {
    register,
    logout,
    login
}

export default authService

