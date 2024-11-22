import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  text: string;
};

const initialState: InitialState = {
  text: "what",
};

export const tempSlice = createSlice({
  name: "temp",
  initialState,
  reducers: {
    setText: (state, action) => {
      state.text = action.payload.text;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setText } = tempSlice.actions;

export default tempSlice.reducer;
