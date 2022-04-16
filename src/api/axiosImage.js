import axios from "axios";

const axiosImage = axios.create({
  baseURL: 'https://api.cloudinary.com/v1_1/drhjt2o51/image/upload'
});

export default axiosImage;