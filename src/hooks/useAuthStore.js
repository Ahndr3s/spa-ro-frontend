import { useDispatch, useSelector } from "react-redux";
import roApi from "../api/roApi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/authSlice";
// import { AuthProvider } from "../context/AuthProvider";


export const useAuthStore = () => {
    
    const { status, user, errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    // const { login } = AuthProvider();

    const startLogin = async({email, password}) => {
        dispatch(onChecking())
        try {
            const {data} = await roApi.post('/api/auth', {email, password})
            // localStorage.setItem('user', data.email)
            localStorage.setItem('user', JSON.stringify({ uuid: data.uuid, email: data.email, name: data.name }))
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            // login(data)
            dispatch(onLogin({name: data.name, uuid: data.uuid}))
            return true
        } catch (error) {
            dispatch(onLogout('INCORRECT CREDENTIALS'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10);
            return false
        }
    }

    const startSignIn = async({name, email, password}) => {
        dispatch(onChecking())
        try {
            const {data} = await roApi.post('/api/auth/new', {name, email, password})
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({name: data.name, uuid: data.uuid}))
        } catch (error) {            
            dispatch(onLogout(error.response.data?.msg || '--'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10);
        }
    }

    // const checkAuthToken = async({name, uuid}) => {
    const checkAuthToken = async() => {
        const token = localStorage.getItem('token')
        if(!token) return dispatch(onLogout())
        
        try {
            // const {data} = await roApi.get('api/auth/renew', {name, uuid})
            const {data} = await roApi.get('api/auth/renew')
            // const user = { id: "ABC", email: data.email, name: data.name };
            // console.log('guardando user')
            // localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            const usr = localStorage.getItem('user')

            // console.log('renovando al user: '+data.name+' uuid: '+data.uuid)
            dispatch(onLogin(JSON.parse(usr)))
        } catch (error) {
            localStorage.clear()
            dispatch(onLogout())
        }
    }

    const startLogout = () => {
        localStorage.clear()
        dispatch(onLogout())
    }

    return {
        // PROPERTIES
        errorMessage,
        status, 
        user,

        // METHODS
        startLogin,
        startSignIn,
        checkAuthToken,
        startLogout
    }
} 