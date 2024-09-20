import { createSlice } from "@reduxjs/toolkit";
import { DiaryItemData } from "../hooks/useCollection";

interface ErrorProps {
  isError: boolean;
  error: null | string;
}

interface Props extends ErrorProps {
  isLoading: boolean;
  data: DiaryItemData[];
}

const initialState: Props = {
  data: [],
  isLoading: false,
  isError: false,
  error: null,
};

const fireStoreSlice = createSlice({
  name: "fireStore",
  initialState,
  reducers: {
    setStoreData(state, action) {
      state.data.push(action.payload);
    },
    setIsStoreLoading(state, action) {
      state.isLoading = action.payload;
    },
    setStoreError(state, action) {
      state.isError = action.payload.isError;
      state.error = action.payload.error;
    },
    deleteStoreData(state, action) {
      state.data.filter((el) => el.id !== action.payload);
    },
  },
});

export const {
  setIsStoreLoading,
  setStoreError,
  setStoreData,
  deleteStoreData,
} = fireStoreSlice.actions;
export default fireStoreSlice.reducer;
