import { createSlice } from "@reduxjs/toolkit";

/**State which will be stored in Global state, so that data is accessible throughout entire application and we can grab it anywhere we want, 
 * consequently we don't need to pass in  State and Properties down to different components*/
const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: []
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        // Mode function: Modifying the theme i.e. dark/light modes
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },

        /**Login function: takes user credentials and token */
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },

        /**Log out function: when you click logout button it sets user and token to null */
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },

        /** Friends funtion: If user exists we are setting the friends, otherwise non-existing friends */
        setFriends: (state, action) => {
            if(state.user){
                state.user.friends = action.payload.friends;
            }else{
                console.error("User friend non-existent");
            }
        },

        /** Posts function: setting the posts*/
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        
        /**Post function: taking all posts and mapping through them and updating post after update ???? */
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post)=>{
                if(post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        }
    }
})

export const {setMode, setLogin, setLogout, setFriends, setPost, setPosts} = authSlice.actions;
export default authSlice.reducer;