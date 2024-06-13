import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const productExit = state.products.find((product) => {
        return product._id === action.payload._id;
      });

      !productExit && (state.quantity += 1);

      productExit
        ? state.products.map((product) => {
            product._id === action.payload._id &&
              (product.quantity += action.payload.quantity);
          })
        : state.products.push(action.payload);

      state.total += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      state.quantity -= 1;
      const products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
      state.products = products;
      state.total -= action.payload.price * action.payload.quantity;
    },

    clearCart: (state, action) => {
      state.quantity = 0;
      state.products = [];
      state.total = 0;
    },

    increaseProduct: (state, action) => {
      state.products.map((product) => {
        product._id === action.payload._id && (product.quantity += 1);
      });
      state.total += parseInt(action.payload.price);
    },

    decreaseProduct: (state, action) => {
      state.products.map((product) => {
        product._id === action.payload._id &&
          product.quantity > 0 &&
          (product.quantity -= 1);
      });

      state.total > 0 && (state.total -= parseInt(action.payload.price));
    },
  },
});

export const {
  addProduct,
  removeProduct,
  clearCart,
  increaseProduct,
  decreaseProduct,
} = cartSlice.actions;
export default cartSlice.reducer;
