import {
  Button,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/userReducer";
import { Navigate, useNavigate } from "react-router-dom";
import { useQueryURL } from "../hooks/useQueryURL";
import Sidebar from "../components/Sidebar";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const queryParams = useQueryURL();
  const query = queryParams.get("videoId");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirm: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Không được bỏ trống")
        .email("Sai định dạng email, Ex: dat@gmail.com"),
      password: Yup.string().required("Không được bỏ trống"),
      confirm: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Password must match"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await axios.post(`/auth/register`, {
          email: values.email,
          password: values.password,
        });
        sessionStorage.setItem("token", res.data.token);
        dispatch(getUser());
        query ? navigate(`/watch/${query}`) : navigate("/");
        toast.success("Register successfull");
      } catch (err) {
        err && toast.error(err.response.data.message);
      } finally {
        setLoading(false);
      }
    },
  });

  if (user) {
    return <Navigate to={"/"} />;
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <div className='min-h-[90vh] flex justify-center items-center bg-[#F9F9F9]'>
      <Sidebar />
      <div className='hidden lg:block w-[17%] lg:w-[30%] xl:w-[17%]'></div>
      <div className='flex flex-col items-center md:flex-row w-[90%] bg-white md:w-[500px] border rounded-md'>
        <div className='w-full h-full p-5'>
          <h1 className='text-2xl md:text-3xl font-medium'>Đăng ký</h1>
          <p className='text-lg text-[#8989A8] py-3'>
            Đăng ký để bắt đầu sử dụng Dtube
          </p>
          <div>
            <form action='' onSubmit={formik.handleSubmit}>
              <div className='mt-3'>
                <TextField
                  fullWidth
                  id='outlined-basic'
                  name='email'
                  label='Email'
                  variant='outlined'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlurCapture={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email && (
                  <p className='text-red-500 py-1 bg-red-200 mt-1 rounded-md px-5'>
                    {formik.errors.email}
                  </p>
                )}
              </div>
              <div className='mt-3'>
                <FormControl variant='outlined' fullWidth>
                  <InputLabel htmlFor='outlined-adornment-password'>
                    Password
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    name='password'
                    id='outlined-adornment-password'
                    type={showPassword ? "text" : "password"}
                    label='Password'
                    variant='outlined'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge='end'
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {formik.errors.password && formik.touched.password && (
                  <p className='text-red-500 py-1 bg-red-200 mt-1 rounded-md px-5'>
                    {formik.errors.password}
                  </p>
                )}
              </div>

              <div className='mt-3'>
                <FormControl variant='outlined' fullWidth>
                  <InputLabel htmlFor='outlined-adornment-password'>
                    Confirm
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    name='confirm'
                    id='outlined-adornment-password'
                    type={showPassword ? "text" : "password"}
                    label='Confirm'
                    variant='outlined'
                    value={formik.values.confirm}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge='end'
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {formik.errors.confirm && formik.touched.confirm && (
                  <p className='text-red-500 py-1 bg-red-200 mt-1 rounded-md px-5'>
                    {formik.errors.confirm}
                  </p>
                )}
              </div>
              <div className='mt-3'>
                <LoadingButton
                  size='medium'
                  type='submit'
                  fullWidth
                  endIcon={<SendIcon />}
                  loading={loading}
                  loadingPosition='end'
                  variant='contained'
                >
                  Đăng ký
                </LoadingButton>
              </div>

              <div className='mt-3 flex justify-end items-center  border-t py-2'>
                <p>
                  Bạn đã có tài khoản?{" "}
                  <Button
                    variant='text'
                    color='error'
                    onClick={() => navigate("/login")}
                  >
                    Đăng nhập
                  </Button>{" "}
                </p>
              </div>
            </form>
          </div>
        </div>
        {/* <div className='w-full md:w-[60%] hidden md:block'>
            <img
              src='https://source.unsplash.com/random'
              className='rounded-md aspect-video'
              alt=''
            />
          </div> */}
      </div>
    </div>
  );
};

export default Register;
