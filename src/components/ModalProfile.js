import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { setDisPlayProfile } from "../redux/modalProfileReducer";
import { Avatar, IconButton, Input, TextField } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import styled from "@emotion/styled";
import { convertBase64 } from "../utils/base";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { getUser } from "../redux/userReducer";
import axiosImage from "../api/axiosImage";
import setHeaderAxios from "../utils/setHeaderAxios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ModalProfile = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [image, setImage] = useState();
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const { display } = useSelector((state) => state.modalProfile);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setImage(user?.avatar);
      setName(user.name || user.email.slice(0, user.email.indexOf("@")));
    }
  }, [user]);

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

  const handleUpdate = async () => {
    setLoad(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "k7g9rfyh");
      delete axios.defaults.headers.common["Authorization"];
      const resCloud = await axiosImage.post("/", formData);
      setHeaderAxios(sessionStorage.getItem("token"));
      const res = await axios.put("/auth/user", { name, avatar: resCloud.data.url });
      if (res.data.success) {
        dispatch(setDisPlayProfile(false));
        dispatch(getUser());
      }
    } catch (err) {
    } finally {
      setLoad(false);
    }
  };
  return (
    <Modal
      open={display}
      onClose={() => dispatch(setDisPlayProfile(false))}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Quản lý profile
        </Typography>
        <div className="flex justify-center items-center mt-3 relative">
          <Avatar
            alt="Remy Sharp"
            src={image || "/static/images/avatar/2.jpg"}
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Tên"
            variant="outlined"
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

export default ModalProfile;
