import { PhotoCamera } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import { Avatar, IconButton, Input, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosImage from "../api/axiosImage";
import { setDisPlayProfile } from "../redux/modalProfileReducer";
import { getUser } from "../redux/userReducer";
import setHeaderAxios from "../utils/setHeaderAxios";
import { toast } from "react-toastify";
import { setUser } from "../redux/userChannel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
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
  const userChannel = useSelector((state) => state.userChannel.user);

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
    if (name) {
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
        const res = await axios.put("/auth/user", {
          name,
          avatar: resCloud ? resCloud.data.url : undefined,
        });
        if (res.data.success) {
          dispatch(setDisPlayProfile(false));
          dispatch(
            setUser({
              ...userChannel,
              name,
              avatar: resCloud ? resCloud.data.url : userChannel.avatar || "",
            })
          );
        }
      } catch (err) {
      } finally {
        setLoad(false);
      }
    } else {
      toast.error("Vui l??ng nh???p t??n");
    }
  };
  return (
    <Modal
      open={display}
      onClose={() => dispatch(setDisPlayProfile(false))}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="w-[90%] md:w-[500px] mx-auto"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Qu???n l?? profile
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
            label="T??n"
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
            C???p Nh???t
          </LoadingButton>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalProfile;
