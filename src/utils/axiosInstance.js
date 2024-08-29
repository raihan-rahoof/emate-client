import axios from "axios";
import {jwtDecode} from 'jwt-decode';
import dayjs from "dayjs";


let token = localStorage.getItem("accessToken") || "";
let refresh_token = localStorage.getItem("refreshToken") || "";




const axiosInstance = axios.create({
    baseURL:'http://127.0.0.1:8000/api/',
    headers:{
        "Content-Type":"application/json",
        "Authorization":token ?`Bearer ${token}`:null
    }
    
})

axiosInstance.interceptors.request.use(async req =>{
  if(token){
    
    const user = jwtDecode(token)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
    if (!isExpired) {
      req.headers.Authorization = `Bearer ${token}`;
      return req;
    }else{
      try{

        const response = await axios.post('http://127.0.0.1:8000/api/auth/api/token/refresh/',{'refresh':refresh_token})

        if (response.status == 200){
          token = response.data.access,
          localStorage.setItem('accessToken',JSON.stringify(token))
          req.headers.Authorization = `Bearer ${token}`;
          return req;
        }else{
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          navigate('/login')
        }
      }catch{
        
        console.error("Token refresh failed", error);
        localStorage.clear();
        navigate('/login')
      }
      }

  }
  return req
})

export default axiosInstance;