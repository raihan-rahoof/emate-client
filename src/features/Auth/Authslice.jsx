import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ first_name, last_name, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/register/",
        {
          first_name,
          last_name,
          email,
          password,
        }
      );
      return response.data
    } catch (err) {
       if (err.response && err.response.data) {
       
        const errorDetail = err.response.data.non_field_errors
          ? err.response.data.non_field_errors[0]
          : 'An error occurred during login.';
        return rejectWithValue(errorDetail);
      }
      
      return rejectWithValue('Failed to login.');
    
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
