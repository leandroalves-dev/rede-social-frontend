import {api, requestConfig} from '../utils/config'


// Retorna os dados do usuário
const profile = async(data, token) => {
    const config = requestConfig("GET", data, token)
    try {
        
        const response = await fetch(api + "/users/profile", config)
        const data = await response.json()
        return data

    } catch (error) {
        console.log(error)
    }
}

// Atualiza dados do usuário
const updateProfile = async(data, token) => {
    const config = requestConfig('PUT', data, token, true)
    try {   
        const res = await fetch(api + '/users/', config)
        const json = await res.json();
        return json;
        
    } catch (error) {
        console.log(error)
    }
}

// Retorna o detalhe do usuário
const getUserDetails = async (id) => {
    const config = requestConfig("GET");
    try {
        
        const response = await fetch(api + '/users/' + id, config)
        const data = await response.json();
        return data

    } catch (error) {
        console.log(error)
    }
}

const userService = {
    profile,
    updateProfile,
    getUserDetails
}

export default userService;