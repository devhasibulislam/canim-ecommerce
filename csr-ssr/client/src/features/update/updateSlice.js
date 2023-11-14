import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  photo: {},
  gallery: [],
};

const updateSlice = createSlice({
  name: "update",
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

export const { setPhoto, setGallery } = updateSlice.actions;
export default updateSlice.reducer;
