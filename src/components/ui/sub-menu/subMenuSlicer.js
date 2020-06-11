import {createSlice} from '@reduxjs/toolkit';

export const subMenuSlice = createSlice({
    name: 'subMenu',
    initialState: {
        open: false,
        current: null
    },
    reducers: {
        setOpen: state => {
            state.open = true;
        },
        setClose: state => {
            state.open = false;
        },
        setCurrent: (state, action) => {
            state.current = action.payload;
        }
    }
});
export const {setOpen, setClose,setCurrent} = subMenuSlice.actions;

export const getIsOpen = state => state.subMenu.open;
export const getCurrent = state => state.subMenu.current;

export default subMenuSlice.reducer;
