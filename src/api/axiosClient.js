import axios from "axios";

const axiosClient = axios.create({
  baseURL: 'https://api.cloudinary.com/v1_1/drhjt2o51/video/upload'
});

export default axiosClient;