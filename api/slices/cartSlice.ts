import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    cartQuantity: 0,
};
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartList: (state, action) => {
            state.cartItems = action.payload;
            state.cartQuantity = action.payload.length;
        },
        addToCart(state: any, action: any) {
            const item = action.payload;
            const existingItem = state.cartItems.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({ ...item, quantity: 1 });
            }
            // state.cartItems.push(action.payload);
            state.cartQuantity += 1;

        },
        removeItemFromCart: (state: any, action: any) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((item: any) => item.id !== itemId);
            state.cartQuantity -= 1;
        },
    }
});
export const { addToCart, removeItemFromCart, setCartList } = cartSlice.actions;
export const selectedCart = (state: any) => state.cart.cartItems;
export const selectedCartQty = (state: any) => state.cart.cartQuantity;
export default cartSlice.reducer;