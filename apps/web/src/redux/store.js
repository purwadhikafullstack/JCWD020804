import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import propertySlice from "./propertySlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    property: propertySlice
  },
});
