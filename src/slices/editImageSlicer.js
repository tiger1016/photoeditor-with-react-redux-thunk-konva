import {createSlice} from "@reduxjs/toolkit";

export const editImageSlice = createSlice({
    name: 'editImage',
    initialState: {
        value: null
    },
    reducers: {
        editImage: (state, action) => {
            state.value = action.payload;            
        }
    }
});
export const {editImage} = editImageSlice.actions;
export const getImage = state => state.editImage.value;

export default editImageSlice.reducer;
