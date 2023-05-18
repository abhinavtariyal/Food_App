import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = { pop: false, notification: null };
const popSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggle(state) {
      state.pop = !state.pop;
    },
    showNotifications(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

const initialItemState = { items: [], totalQuantity: 0, changed: false };

const itemSlice = createSlice({
  name: "item",
  initialState: initialItemState,
  reducers: {
    replaceCart(state,action){
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;  
    },

    addItem(state, action) {
      const newItem = action.payload;

      const existingItem = state.items.find(
        (item) => item.itemId === newItem.itemId
      );
      state.changed = true;
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
      state.changed = true;
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
