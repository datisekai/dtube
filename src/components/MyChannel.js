import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { BarWave } from "react-cssfx-loading";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import swal from "sweetalert";
import * as Yup from "yup";
import axiosClient from "../api/axiosClient";
import useQuery from "../hooks/useQuery";
import { deleteCache } from "../redux/cacheReducer";
import { setDisplayModal } from "../redux/modalUploadReducer";
import { setVideo } from "../redux/myVideoReducer";
import Loading from "../utils/Loading";
import ChannelController from "./ChannelController";
import ModalProfile from "./ModalProfile";
import ModalUpdateVideo from "./ModalUpdateVideo";
import ModalUpload from "./ModalUpload";
import VideoChannel from "./VideoChannel";

export const MyChannel = () => {
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState();
  const [image, setImage] = useState("");
  const [fileAvatar, setFileAvatar] = useState("");
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const url = `/video/${id}?page=${page}`;
  const { data, error, loading } = useQuery(url);
  const [percent, setPercent] = useState();
  const { type } = useSelector((state) => state.type);
  const { videos } = useSelector((state) => state.myVideo);
  const limit = 8;

  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      type: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Không được bỏ trống"),
      desc: Yup.string().required("Không được bỏ trống"),
      type: Yup.string().required("Không được bỏ trống"),
    }),
    onSubmit: async (values) => {
      setLoadingUpload(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "k7g9rfyh");
        const res = await axiosClient.post("/", formData, {
          onUploadProgress: (item) => {
            const { loaded, total } = item;
            let percent = Math.floor((loaded * 100) / total);
            setPercent(percent);
          },
        });
        const resAdd = await axios.post("/video", {
          image,
          video: res.data.url,
          userId: user._id,
          title: values.title,
          desc: values.desc,
          type: values.type,
        });
        dispatch(setVideo([...videos, resAdd.data.newVideo]));
        dispatch(setLoadingUpload(false));
        toast.success("Thêm video thành công");
      } catch (err) {
      } finally {
        setLoadingUpload(false);
        dispatch(setDisplayModal(false));
        setPercent(undefined);
        formik.values.title = "";
        formik.values.desc = "";
        formik.values.type = "";
        setPreview("");
        setImage("");
      }
    },
  });

  useEffect(() => {
    if (data) {
      dispatch(setVideo([...data.videos]));
    }
  }, [data]);

  useEffect(() => {
    file && previewVideo();
  }, [file]);

  useEffect(() => {
    fileAvatar && convertImage();
  }, [fileAvatar]);

  useEffect(() => {
    dispatch(deleteCache(url));
  }, [id]);

  const previewVideo = () => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  };

  const convertImage = () => {
    const reader = new FileReader();
    reader.readAsDataURL(fileAvatar);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  if (error) {
    return <Navigate to={"/"} />;
  }

  const handleFile = (value) => {
    setFile(value);
  };

  const handleFileAvatar = (value) => {
    setFileAvatar(value);
  };

  const handleDelete = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          dispatch(setVideo(videos.filter((item) => item._id !== id)));
          const res = await axios.delete(`/video/${id}`);
        } catch (err) {}
      }
    });
  };

  return (
    <div className='w-[100%] lg:w-[75%] xl:w-[83%] bg-[#F9F9F9]'>
      <ChannelController />
      <div className=' min-h-screen bg-[#F1F1F1] px-5 sm:px-24 py-4 sm:py-8'>
        <h2 className='text-lg font-medium'>Video tải lên</h2>
        <InfiniteScroll
          dataLength={videos?.length}
          next={() => videos?.length === limit && setPage(page + 1)}
          hasMore={true}
          loader={
            <div className='dots-loading'>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className='mt-6'>
            {videos?.map((item) => (
              <VideoChannel
                // title={item.title}
                // desc={item.desc}
                // key={item._id}
                // view={item.view}
                // createdAt={item.createdAt}
                // image={
                //   item.image !== ""
                //     ? item.image
                //     : item.video.replace("mp4", "jpg")
                // }
                onDelete={handleDelete}
                id={item._id}
                video={item}
                // userId ={item.userId._id}
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>
      <ModalUpload
        onFile={handleFile}
        onFileAvatar={handleFileAvatar}
        formik={formik}
        preview={preview}
        type={type}
        percent={percent}
        loadingUpload={loadingUpload}
      />
      <ModalProfile />
      <ModalUpdateVideo />

      {loading && <Loading />}
    </div>
  );
};
