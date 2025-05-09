export const api = import.meta.env.VITE_API_URL + '/api';
export const uploads = import.meta.env.VITE_API_URL + '/uploads';

export const requestConfig = (method, data, token = null, image = null) => {
    
    let config;

    if(image){
        config = {
            method,
            body: data,
            headers: {},
            credentials: 'include'
        }
    }else if(method === 'DELETE' || data === null){
        config = {
            method,
            headers: {},
            credentials: 'include'
        }
    }else{
        config = {
            method,
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            },
            credentials: 'include'
        }
    }

    if(token){
        config.headers.Authorization = `Bearer ${token}` 
    }

    return config;
}