import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Adding new cart item
    // Increase cart quantity
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      /*check if cart item already exists */
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(`increased ${action.payload.name} quantity`, {
          position: "bottom-left",
          theme: "colored",
        });
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(` ${action.payload.name} added to cart`, {
          position: "bottom-left",
          theme: "colored",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    /*Remove Item from cart*/
    removeFromCart(state, action) {
      const newCartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      state.cartItems = newCartItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      toast.error(` ${action.payload.name} removed from cart`, {
        position: "bottom-left",
        theme: "colored",
      });
    },
    // Decrease cart quantity
    decreaseQuantity(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

        toast.info(`Decreased ${action.payload.name} cart quantity`, {
          position: "bottom-left",
          theme: "colored",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const newCartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        state.cartItems = newCartItems;

        toast.error(` ${action.payload.name} removed from cart`, {
          position: "bottom-left",
          theme: "colored",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    // Clear cart
    clearCart(state, action) {
      state.cartItems = [];
      toast.error("Cart has been cleared", {
        position: "bottom-left",
        theme: "colored",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    //Calculating subtotal
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity, clearCart, getTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
