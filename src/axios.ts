import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_ADDRESS,
})

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
    if (!config.headers) {
        return config
    }
    config.headers.Authorization = localStorage.getItem('Authorization') || 'no'
    return config
})

export default axiosInstance
