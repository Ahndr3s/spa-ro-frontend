import axios  from "axios";
import getEnvVariables from '../helpers/getEnvVariables'

const {VITE_API_URL, LOCAL_HOST} = getEnvVariables()
const roApi = axios.create({
    baseURL: VITE_API_URL,
})

// CONFIGURE REQUEST INTERCEPTORS
// roApi.interceptors.request.use(config => {

//     config.headers = {
//         ...config.headers,
//         'x-token': localStorage.getItem('token')
//     }
//     return config
// })
roApi.interceptors.request.use(config => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers['x-token'] = token;
    }

    return config;
});

export default roApi