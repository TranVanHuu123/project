import {
  PayloadAction,
  createAction,
  createReducer,
  current,
} from "@reduxjs/toolkit";
import shoesData from "../data/shoes.json";
const shoes = shoesData.shoes;

const initialState = {
  shoesList: shoes,
  cartItems: [],
};

export const addPost = createAction("shoes/addShoes");
export const removeProduct = createAction("shoes/removeProduct");
const shoesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addPost, (state, action) => {
      const productId = action.payload;
      const productToAdd = state.shoesList.find(
        (product) => product.id === productId
      );

      if (productToAdd) {
        state.cartItems.push(productToAdd);
      }
    })
    .addCase(removeProduct, (state, action) => {
      const productId = action.payload;
      const updatedCartItems = state.cartItems.filter(
        (item) => item.id !== productId
      );

      if (updatedCartItems.length !== state.cartItems.length) {
        state.cartItems = updatedCartItems;
      }
    });
});

export default shoesReducer;
