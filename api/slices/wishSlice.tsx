import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure of the wishlist state
interface WishlistState {
    items: any[]; // Replace `any` with a specific type if you have one
    count: number;
}

const initialState: WishlistState = {
    items: [],
    count: 0,
}

const wishListSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        setWishList: (state, action: PayloadAction<any[]>) => { // Replace `any` with a specific type
            state.items = action.payload;
            state.count = action.payload.length;
        },
        addToWishlist: (state, action: PayloadAction<any>) => { // Replace `any` with a specific type
            state.items.push(action.payload);
            state.count += 1;
        },
        removeFromWishList: (state, action: PayloadAction<number>) => { // Assuming the payload is an id of type number
            state.items = state.items.filter((item) => item.id !== action.payload);
            state.count -= 1;
        },
    }
});

export const { setWishList, addToWishlist, removeFromWishList } = wishListSlice.actions;

// Define a type for the root state if you have one
interface RootState {
    wishlist: WishlistState;
}

export const selectedWishList = (state: RootState) => state.wishlist.items;
export const selectWishlistCount = (state: RootState) => state.wishlist.count;
export default wishListSlice.reducer;
