import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = { pop: false };
const popSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggle(state) {
      console.log(state.pop);
      state.pop = !state.pop;
    },
  },
});

const initialItemState = { items: [], totalQuantity: 0 };

const itemSlice = createSlice({
  name: "item",
  initialState: initialItemState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;

      const existingItem = state.items.find(
        (item) => item.itemId === newItem.itemId
      );
      if (!existingItem) {
        state.items.push({
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          itemId: newItem.itemId,
          title: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
      state.totalQuantity++;
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.itemId === id);

      if (existingItem.quantity === 1) {
        console.log("Am I here?");
        state.items = state.items.filter((item) => item.itemId !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
      state.totalQuantity--;
    },
  },
});
export const store = configureStore({
  reducer: { popReducer: popSlice.reducer, itemReducer: itemSlice.reducer },
});

export const popActions = popSlice.actions;
export const itemActions = itemSlice.actions;
