import {createSlice} from '@reduxjs/toolkit';

export const modalReviewPhotosSlice = createSlice({
    name: 'review',
    initialState: {
        openReview: false,
        openReUpload: false
    },
    reducers: {
        openModalReview: state => {
            state.openReview = true
        },
        closeModalReview: state => {
            state.openReview = false
        },
        openModalReUpload: state => {
            state.openReUpload = true
        },
        closeModalReUpload: state => {
            state.openReUpload = false
        },


    }
});
export const {openModalReview, closeModalReview, openModalReUpload, closeModalReUpload} = modalReviewPhotosSlice.actions;

export const selectIsOpen = state => state.review.openReview;
export const selectIsOpenReUpload = state => state.review.openReUpload;

export default modalReviewPhotosSlice.reducer;
