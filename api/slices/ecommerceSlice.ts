
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    quantityAvailable: number;
}

interface CartItem extends Product {
    quantity: number;
}
interface User {
    id: number;
    name: string;
    email: string;
}
interface EcommerceState {
    products: Product[];
    selectedProduct: Product | null;
    cart: CartItem[];
    user: User | null;
    loading: boolean;
    error: string | null;
}
const initialState: EcommerceState = {
    products: [],
    selectedProduct: null,
    cart: [],
    user: null,
    loading: false,
    error: null,
};

const ecommerceSlice = createSlice({
    name: 'ecommerce',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<any>) => {
            const product = action.payload;
            const existingCartItem = state.cart.find((item)=> item.id === product.id)

            if (existingCartItem) {
                existingCartItem.quantity += 1;
              } else {
                state.cart.push({ ...product, quantity: 1 });
              }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload);
          },

          updateQuantity: (
            state,
            action: PayloadAction<{ productId: number; quantity: number }>
          ) => {
            const { productId, quantity } = action.payload;
            const cartItem = state.cart.find((item) => item.id === productId);
      
            if (cartItem) {
              cartItem.quantity = quantity;
            }
          },
          selectProduct: (state, action: PayloadAction<number>) => {
            state.selectedProduct = state.products.find((product) => product.id === action.payload) || null;
          },

          logoutUser: (state) => {
            state.user = null;
          },
    }
});

export const {addItem, removeFromCart, updateQuantity, selectProduct, logoutUser} = ecommerceSlice.actions;
export default ecommerceSlice.reducer;
