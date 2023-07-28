import { configureStore } from "@reduxjs/toolkit";
import shoesReducer from "./showReducer";
export const store = configureStore({
  reducer: { shoes: shoesReducer },
});
