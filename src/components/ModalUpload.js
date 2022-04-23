import { PhotoCamera } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Backdrop,
  Button,
  CircularProgress,
  Fade,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { setDisplayModal } from "../redux/modalUploadReducer";

const ModalUpload = ({
  onFile,
  onFileAvatar,
  formik,
  preview,
  type,
  percent,
  loadingUpload,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    bgcolor: "white",
    boxShadow: 24,
    borderRadius: "8px",
    p: 4,
  };

  const { display } = useSelector((state) => state.modalUpload);
  const dispatch = useDispatch();
  const Input = styled("input")({
    display: "none",
  });
  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={display}
      onClose={() => dispatch(setDisplayModal(false))}
      closeAfterTransition
      BackdropComponent={Backdrop}
      className='w-[90%] md:w-[60%] lg:w-[50%] mx-auto'
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={display}>
        <Box sx={style}>
          <div className='border-b'>
            <Typography id='transition-modal-title' variant='h6' component='h2'>
              Upload video
            </Typography>
          </div>
          <div className='flex justify-between items-center p-5 flex-col md:flex-row'>
            <div className='w-full text-center md:w-[30%]'>
              <label htmlFor='contained-button-file'>
                <Input
                  accept='video/mp4'
                  id='contained-button-file'
                  multiple
                  type='file'
                  onChange={(e) => onFile(e.target.files[0])}
                />
                <Button variant='contained' component='span'>
                  Upload
                </Button>
              </label>
              <label htmlFor='icon-button-file'>
                <Input
                  accept='image/*'
                  id='icon-button-file'
                  type='file'
                  onChange={(e) => onFileAvatar(e.target.files[0])}
                />
                <IconButton
                  color='primary'
                  aria-label='upload picture'
                  component='span'
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </div>
            <div className='ml-2 w-full mt-3 md:mt-0 md:w-[70%] text-center'>
              <video
                controls
                className='rounded-md aspect-video mx-auto max-h-[250px]'
                src={`${preview && preview}`}
              ></video>
            </div>
          </div>

          <div className='mt-3'>
            {" "}
            <TextField
              fullWidth
              id='outlined-basic'
              label='Tiêu đề'
              variant='outlined'
              value={formik.values.title}
              onBlur={formik.handleBlur}
              name='title'
              onChange={formik.handleChange}
            />
            {formik.errors.title && formik.touched.title && (
              <p className='text-red-500 bg-red-300 px-5 py-1 rounded-md mt-1'>
                {formik.errors.title}
              </p>
            )}
          </div>
          <div className='mt-3'>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Thể loại</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label='Thể loại'
                name='type'
                onChange={formik.handleChange}
              >
                {type?.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className='mt-3'>
            <TextareaAutosize
              aria-label='Description'
              placeholder='Mô tả...'
              minRows={3}
              className='py-2 px-4 border outline-none rounded-md placeholder:text-[#666]'
              style={{ width: "100%" }}
              value={formik.values.desc}
              name='desc'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.desc && formik.touched.desc && (
              <p className='text-red-500 bg-red-300 px-5 py-1 rounded-md mt-1'>
                {formik.errors.desc}
              </p>
            )}
          </div>

          <div className='flex items-center justify-between'>
            <div className='mt-2'>
              {percent && (
                <Box sx={{ position: "relative", display: "inline-flex" }}>
                  <CircularProgress size={40} />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant='caption'
                      component='div'
                      color='text.secondary'
                    >
                      {`${Math.round(percent)}%`}
                    </Typography>
                  </Box>
                </Box>
              )}
            </div>
            <div className='mt-3 text-right'>
              <LoadingButton
                size='medium'
                type='submit'
                endIcon={<SendIcon />}
                loading={loadingUpload}
                loadingPosition='end'
                variant='contained'
                onClick={formik.handleSubmit}
              >
                Upload Video
              </LoadingButton>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalUpload;
