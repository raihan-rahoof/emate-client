import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    accessToken:localStorage.getItem('accessToken') || null,
    refreshToken:localStorage.getItem('refreshToken') || null,
    status:'idle',
    error:null,
};

export const login = createAsyncThunk('auth/login',
async (credientials)=>{
  try{
    const response = await axios.post('http://127.0.0.1:8000/api/auth/login/',credientials);
    const {access,refresh} = response.data

     localStorage.setItem("accessToken", access);
     localStorage.setItem("refreshToken", refresh);

     return { access, refresh };
  }catch(error){
    const message = error.response.data.non_field_errors;
    return rejectWithValue(message);
  }
}
)


const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload.accessToken);
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || 'Failed to Login ';
      });
  },
});



export default LoginSlice.reducer;