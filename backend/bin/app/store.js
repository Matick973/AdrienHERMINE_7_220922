import { configureStore } from "@reduxjs/toolkit"
import postSlice from "../feature/post.slice";
import userSlice from "../feature/user.slice";

export default configureStore({
    reducer: {
        user: userSlice,
        post: postSlice,
    },
});