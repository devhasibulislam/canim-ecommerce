import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  photo: {},
  gallery: [],
};

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    setPhoto: (state, action) => {
      state.photo = action.payload;
    },
    setGallery: (state, action) => {
      state.gallery = action.payload;
    },
  },
});

export const { setPhoto, setGallery } = uploadSlice.actions;
export default uploadSlice.reducer;
