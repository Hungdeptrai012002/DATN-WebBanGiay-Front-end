import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orderItems: [],
  orderItemsSlected: [],
  shippingAddress: {},
  paymentMethod: '',
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  user: '',
  isPaid: false,
  paidAt: '',
  isDelivered: false,
  deliveredAt: '',
  isSuccessOrder: false,
  isErrorOrder: false,
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      const { orderItem } = action.payload;
      const existingItem = state.orderItems.find(item => item.product === orderItem.product);
      
      if (existingItem) {
        if (existingItem.amount < existingItem.countInStock) {
          existingItem.amount += orderItem.amount;
          state.isSuccessOrder = true;
          state.isErrorOrder = false;
        } else {
          state.isErrorOrder = true;
          state.isSuccessOrder = false;
        }
      } else {
        state.orderItems.push(orderItem);
        state.isSuccessOrder = true;
        state.isErrorOrder = false;
      }
    },
    resetOrder: (state) => {
      state.isSuccessOrder = false;
    },
    increaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state.orderItems.find(item => item.product === idProduct);
      const itemOrderSelected = state.orderItemsSlected.find(item => item.product === idProduct);

      if (itemOrder && itemOrder.amount < itemOrder.countInStock) {
        itemOrder.amount++;
        if (itemOrderSelected) {
          itemOrderSelected.amount++;
        }
      }
    },
    decreaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state.orderItems.find(item => item.product === idProduct);
      const itemOrderSelected = state.orderItemsSlected.find(item => item.product === idProduct);

      if (itemOrder && itemOrder.amount > 1) {
        itemOrder.amount--;
        if (itemOrderSelected) {
          itemOrderSelected.amount--;
        }
      }
    },
    removeOrderProduct: (state, action) => {
      const { idProduct } = action.payload;
      state.orderItems = state.orderItems.filter(item => item.product !== idProduct);
      state.orderItemsSlected = state.orderItemsSlected.filter(item => item.product !== idProduct);
    },
    removeAllOrderProduct: (state, action) => {
      const { listChecked } = action.payload;
      state.orderItems = state.orderItems.filter(item => !listChecked.includes(item.product));
      state.orderItemsSlected = state.orderItemsSlected.filter(item => !listChecked.includes(item.product));
    },
    selectedOrder: (state, action) => {
      const { listChecked } = action.payload;
      state.orderItemsSlected = state.orderItems.filter(order => listChecked.includes(order.product));
    },
  },
});

export const { addOrderProduct, increaseAmount, decreaseAmount, removeOrderProduct, removeAllOrderProduct, selectedOrder, resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
