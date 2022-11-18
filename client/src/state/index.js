import { createSlice } from "@reduxjs/toolkit";

// Slices are functions that accepts an initial state and automatically
// generates action creators and action types that correspond to the reducers and state.

// InitialState will store the global states
const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
};

// Reducers are setter functions that changes global states
// Actions are function args/payload
//
// However, under the hood it is not doing that
// E.X. setMode(state) => {
//  state.mode -> previous state
//  state.mode === "light" ? "dark" : "light" -> new state
// }
export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("User friends are non-existent :<");
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },
    }
})

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
    authSlice.actions;
export default authSlice.reducer;