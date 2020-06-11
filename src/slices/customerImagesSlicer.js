import { createSlice } from '@reduxjs/toolkit';

export const customerImagesSlice = createSlice({

    name: 'customerImages',
    initialState: {
        value: null
    },
    reducers: {

    }

});
export const getImages = state => state.customerImages.value;

export default customerImagesSlice.reducer;
