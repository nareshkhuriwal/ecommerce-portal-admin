import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slices/products';

const reducer = {
  products: productReducer,
  //auth: authReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;