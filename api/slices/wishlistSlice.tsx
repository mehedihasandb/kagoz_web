import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    items: [],
    count: 0,
}

const wishListSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        setWishList: (state, action) => {
            state.items = action.payload;
            state.count = action.payload.length;
        },
        addToWishlist: (state: any, action: any) => {
            state.items.push(action.payload);
            state.count += 1;
        },
        removeFromWishList: (state: any, action: any) => {
            state.items = state.items.filter((item: any) => item.id !== action.payload);
            state.count -= 1;
        },
    }
});

export const { setWishList, addToWishlist, removeFromWishList } = wishListSlice.actions;
export const selectedWishList = (state: any) => state.wishlist.items;
export const selectWishlistCount = (state: any) => state.wishlist.count;
export default wishListSlice.reducer;