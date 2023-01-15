import { createSlice } from "@reduxjs/toolkit"

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        //post: null
    },
    reducers:{

        createPost: (state, {payload}) =>{
            state.post = payload
        },

        allPost: (state, {payload}) =>{
            state.post = payload
        },

        modifyPost: (state, {payload}) =>{
            state.post = payload
        },

        deletePost: (state, {payload}) =>{
            state.post = payload
        },

        likePost: (state, {payload}) =>{
            state.post = payload
        },
    }
})

export const { createPost, allPost, modifyPost, deletePost, likePost } = postSlice.actions

export default postSlice.reducer