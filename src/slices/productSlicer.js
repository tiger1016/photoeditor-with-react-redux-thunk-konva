import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import {ProductAPI} from '../services/db/models/productAPI';

const productAPI = new ProductAPI();


export const loadActiveProducts = createAsyncThunk(
    'product/loadActiveProducts',
    async ( thunkAPI) => {        
        let product_list = await productAPI.listActive();        
        let products = await product_list.toArray();
        return JSON.parse(JSON.stringify(products));
    }
)

export const loadMenuProduct = createAsyncThunk(
    'product/loadMenuProduct',
    async (thunkAPI,{getState}) => {     
        
        
        let product_menu_list = await productAPI.listMenuProduct(getState().product.product.external_product_id);        
        product_menu_list = await product_menu_list.toArray();

        console.log("product_menu_list",product_menu_list);

        return JSON.parse(JSON.stringify(product_menu_list));
    }
)



export const productSlicer = createSlice({
    name: 'product',
    initialState: {
        product: {},
        products: [],
        menuProduct:[],
    },
    reducers: {
        setProduct: (state, action) => {
            state.product = action.payload;                        
        }
    },
    extraReducers: {     
      [loadActiveProducts.fulfilled]: (state, action) => {
        // Add user to the state array
        state.products = action.payload;
      },
      [loadMenuProduct.fulfilled]: (state, action) => {
        // Add user to the state array
        state.menuProduct = action.payload;
      }
    }
});

export const {
    setProduct
} = productSlicer.actions;

export const getMenuProduct = state => state.product.menuProduct;
export const getProduct = state => state.product.product;
export const getProducts = state => state.product.products;

export default productSlicer.reducer;

