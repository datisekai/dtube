import { configureStore } from "@reduxjs/toolkit";
import cacheReducer from "./cacheReducer";
import followReducer from "./followReducer";
import likeReducer from "./likeReducer";
import modalUploadReducer from "./modalUploadReducer";
import myVideoReducer from "./myVideoReducer";
import saveVideoReducer from "./saveVideoReducer";
import sidebarReducer from "./sidebarReducer";
import typeReducer from "./typeReducer";
import userReducer from "./userReducer";
import videoReducer from "./videoReducer";
import modalProfileReducer from './modalProfileReducer'
import modalUpdateVideo from "./modalUpdateVideo";
import userChannelReducer from './userChannel'
const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    user:userReducer,
    myVideo:myVideoReducer,
    type:typeReducer,
    video:videoReducer,
    modalUpload:modalUploadReducer,
    cache:cacheReducer,
    follow:followReducer,
    like:likeReducer,
    saveVideo:saveVideoReducer,
    modalProfile:modalProfileReducer,
    modalUpdateVideo:modalUpdateVideo,
    userChannel:userChannelReducer
  },
});

export default store;
