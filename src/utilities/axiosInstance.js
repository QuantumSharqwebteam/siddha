import axios from "axios";
import { getCookie } from './cookie/Cookies';
const axiosInstance = axios.create({
  baseURL: "https://bz1vj3cflj.execute-api.us-east-1.amazonaws.com/",
  headers: {
    "Content-Type": "application/json",
  },
});
export const updateAuthHeader = (token) => {
  // console.log(token)
  axiosInstance.defaults.headers.common['Authorization'] =`Bearer ${token}`;
};
const token=getCookie("token")
if(token){
  updateAuthHeader(token)
}


export default axiosInstance;