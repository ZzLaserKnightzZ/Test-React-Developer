import { configureStore } from "@reduxjs/toolkit";
import PersonSlice from "../personSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    person: PersonSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = ()=>  useDispatch<AppDispatch>()

export default store;
