import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export interface IUploadState {
  uploading: boolean;
}

const initialState: IUploadState = {
  uploading: false,
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.uploading = action.payload;
    },
  },
});

export const uploadActions = uploadSlice.actions;

export const selectUploading = (state: RootState) => state.upload.uploading;

const uploadReducer = uploadSlice.reducer;
export default uploadReducer;
