import styled from "@emotion/styled";
import { PhotoCamera } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Modal,
  TextField,
  Typography,
  IconButton,
  TextareaAutosize,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDisplayUpdate } from "../redux/modalUpdateVideo";
import { Box } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import axiosImage from "../api/axiosImage";
import setHeaderAxios from "../utils/setHeaderAxios";
import { toast } from "react-toastify";
import { setVideo as setMyVideo } from "../redux/myVideoReducer";

const ModalUpdateVideo = () => {
  const { display, id } = useSelector((state) => state.modalUpdateVideo);
  const [file, setFile] = useState("");
  const dispatch = useDispatch();
  const { videos } = useSelector((state) => state.myVideo);
  const [load, setLoad] = useState(false);
  const [video, setVideo] = useState();
  const [image, setImage] = useState("");

  const [desc, setDesc] = useState();
  const [title, setTitle] = useState();

  useEffect(() => {
    if (videos && id) {
      const video = videos.find((item) => item._id === id);
      setVideo(video);
      setDesc(video.desc);
      setTitle(video.title);
    }
  }, [id]);

  useEffect(() => {
    if (file) {
      convertImage();
    }
  }, [file]);

  const convertImage = () => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

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

  const handleUpdate = async () => {
    if (title && desc) {
      setLoad(true);
      try {
        let resCloud;
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "k7g9rfyh");
          delete axios.defaults.headers.common["Authorization"];
          resCloud = await axiosImage.post("/", formData);
          setHeaderAxios(sessionStorage.getItem("token"));
        }
        const res = await axios.put(`/video/${id}`, {
          title,
          desc,
          image: resCloud ? resCloud.data.url : undefined,
        });
        if (res.data.success) {
          dispatch(setDisplayUpdate(false));
          dispatch(
            setMyVideo(
              videos?.map((item) => {
                if (item._id === id) {
                  return {
                    ...item,
                    title,
                    desc,
                    image: resCloud ? resCloud.data.url : video.image,
                  };
                }
                return item;
              })
            )
          );
        }
      } catch (err) {
      } finally {
        setLoad(false);
      }
    } else {
      toast.error("Vui lòng không bỏ trống");
    }
  };

  const Input = styled("input")({
    display: "none",
  });

  return (
    <Modal
      open={display}
      onClose={() => dispatch(setDisplayUpdate(false))}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="w-[90%] md:w-[500px] mx-auto"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Quản lý video
        </Typography>
        <div className="flex justify-center items-center mt-3 relative">
          <Avatar
            alt="Remy Sharp"
            src={image || video?.image || video?.video?.replace("mp4", "jpg")}
            sx={{ width: "100px", height: "100px" }}
          />
          <label htmlFor="icon-button-file" className="absolute">
            <div className="hidden">
              <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera onChange={(e) => setFile(e.target.files[0])} />
            </IconButton>
          </label>
        </div>
        <div className="mt-5">
          <TextField
            fullWidth
            id="outlined-basic"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Tiêu đề"
            variant="outlined"
          />
        </div>
        <div className="mt-5">
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Minimum 3 rows"
            style={{
              width: "100%",
              border: "1px solid #ccc",
              padding: "4px 8px",
            }}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <LoadingButton
            size="medium"
            endIcon={<SendIcon />}
            loading={load}
            onClick={handleUpdate}
            loadingPosition="end"
            variant="contained"
            fullWidth
          >
            Cập Nhật
          </LoadingButton>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalUpdateVideo;
