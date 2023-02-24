import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        //user: null
    },
    reducers:{

        signup: (state, {payload}) =>{
            state.user = payload
        },

        login: (state, {payload}) =>{
            state.user = payload
        },

        logout: (state, {payload}) =>{
            state.user = payload
        },

        oneUser: (state, {payload}) =>{
            state.user = payload
        },

        allUsers: (state, {payload}) =>{
            state.users = payload
        },

        modifyUser: (state, {payload}) =>{
            state.user = payload
        },

        deleteUser: (state, {payload}) =>{
            state.user = payload
        },
    }
})

export const { signup, login, logout, oneUser, allUsers, modifyUser, deleteUser } = userSlice.actions

export default userSlice.reducer