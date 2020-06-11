import {createSlice} from '@reduxjs/toolkit';

export const modalValesSlice = createSlice({
    name: 'vales',
    initialState: {
        open: false
    },
    reducers: {
        openModalVales: state => {state.open = true},
        closeModalVales: state => {state.open = false},
    }
});
export const {openModalVales, closeModalVales} = modalValesSlice.actions;

export const selectIsOpen = state => state.vales.open;

export default modalValesSlice.reducer;
