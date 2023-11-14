import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLoading: true,
  isError: false,
  error: "",
};

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (token, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}api/user/me`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userData = await response.json();

      if (userData.acknowledgement) {
        return userData.data;
      } else {
        return userData.description;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = {};
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
  },
});

export const { setUser, stopLoading, logout } = authSlice.actions;
export default authSlice.reducer;
