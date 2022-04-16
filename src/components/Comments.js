import LoadingButton from "@mui/lab/LoadingButton";
import { Avatar, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useQuery from "../hooks/useQuery";
import { convertTime } from "../utils/base";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
const Comments = () => {
  const [display, setDisplay] = useState(false);
  const [text, setText] = useState("");
  const [load, setLoad] = useState(false);
  const { id } = useParams();
  const { data, loading, error } = useQuery(`/comment/${id}`);
  const [comments, setComments] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [loadDelete, setLoadDelte] = useState(false)

  useEffect(() => {
    setComments(data?.comments);
  }, [data]);

  const handleDelete = async (id) => {
    setLoadDelte(true)
    try {
      await axios.delete(`/comment/${id}`);
      setComments(comments.filter(item => item._id !== id))
    } catch (err) {
      toast.error("Xóa thất bại!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      try {
        setLoad(true);
        const res = await axios.post(`/comment/${id}`, { text });
        setComments([...res.data.comment, ...comments]);
        setText("");
      } catch (err) {
        toast.error("Bình luận thất bại!");
      } finally {
        setLoad(false);
      }
    }
  };

  return (
    <div className="mt-5 pb-5">
      <p className="text-lg">0 bình luận</p>
      <div className="flex items-center mt-3">
        <div className="">
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </div>
        <div className="ml-3 w-full">
          {user && (
            <form>
              <TextField
                fullWidth
                id="standard-basic"
                label="Viết bình luận"
                variant="standard"
                value={text}
                onClick={() => setDisplay(true)}
                onChange={(e) => setText(e.target.value)}
              />
              {display && (
                <div className="flex items-center justify-end mt-1">
                  <Button variant="text" onClick={() => setDisplay(false)}>
                    HỦY
                  </Button>
                  <LoadingButton
                    loading={load}
                    variant="contained"
                    color={`${text !== "" ? "primary" : "inherit"}`}
                    onClick={handleSubmit}
                    type={"submit"}
                  >
                    BÌNH LUẬN
                  </LoadingButton>
                </div>
              )}
            </form>
          )}
          {!user && (
            <p className="">
              Bạn phải{" "}
              <Link to={`/login?videoId=${id}`}>
                <span className="text-red-500 underline cursor-pointer">
                  đăng nhập
                </span>
              </Link>{" "}
              để bình luận
            </p>
          )}
        </div>
      </div>
      <div className="mt-5">
        {comments?.length > 0 &&
          comments?.map((item) => (
            <div className="flex mt-3 items-center justify-between" key={item._id}>
              <div key={item._id} className="flex items-center">
                <Avatar
                  alt="Remy Sharp"
                  src={`${
                    item?.userId?.avatar || '/static/images/avatar/1.jpg"'
                  }`}
                />
                <div className="ml-3">
                  <div className="flex items-center">
                    <h3 className="text-md font-medium capitalize">
                      {item?.userId?.name ||
                        item?.userId?.email?.slice(
                          0,
                          item?.userId?.email?.indexOf("@")
                        )}
                    </h3>
                    <p className="text-sm text-[#606060] ml-1">
                      {convertTime(item.createdAt)}
                    </p>
                  </div>
                  <p className="text-md">{item.text}</p>
                </div>
              </div>
              {user && item.userId._id === user._id && (
                <div className="cursor-pointer">
                  {" "}
                  <LoadingButton
                    color="secondary"
                    onClick={() => handleDelete(item._id)}
                    loading={false}
                    loadingPosition="center"
                    startIcon={<CloseIcon />}
                    variant="text"
                  />
                </div>
              )}
            </div>
          ))}
        {comments?.length === 0 && (
          <p className="mt-3 text-[#606060] text-lg">Chưa có bình luận</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
