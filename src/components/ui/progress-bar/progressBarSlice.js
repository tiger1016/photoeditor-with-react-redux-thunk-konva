import {createSlice} from '@reduxjs/toolkit';

export const progressBarSlice = createSlice({
    name: "progressBar",
    initialState: {
        isUploading: false,
        totalPercent: 0
    },
    reducers: {
        setIsUploading: state => {
            state.isUploading = true
        },
        setPercent: (state, action) => {
            state.totalPercent = action.payload.total;
            if (state.totalPercent >= 100) {
                state.isUploading = false;
                state.totalPercent = 0;
            }
        }
    }
});
export const {setIsUploading, setPercent} = progressBarSlice.actions;
export const getPercent = state => state.progressBar.totalPercent;
export const getIsloading = state => state.progressBar.isUploading;
export default progressBarSlice.reducer;
