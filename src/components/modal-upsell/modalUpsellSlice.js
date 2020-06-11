import {createSlice} from '@reduxjs/toolkit';

export const modalUpsellSlice = createSlice({
    name: 'upsell',
    initialState: {
        open: false
    },
    reducers: {
        openModalUpsell: state => {state.open = true},
        closeModalUpsell: state => {state.open = false},
    }
});
export const {openModalUpsell, closeModalUpsell} = modalUpsellSlice.actions;

export const selectIsOpen = state => state.upsell.open;

export default modalUpsellSlice.reducer;
