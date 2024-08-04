import { Dessert } from "@/App";
// import { useLocalStorage } from "@uidotdev/usehooks";

export interface CartItem extends Dessert {
  quantity: number;
}

export const addToCart = (
  newDessert: Dessert,
  cartItems: CartItem[] | null,
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[] | null>>
): Promise<void> => {
  if (cartItems) {
    // Check if the dessert already exists in the cart
    if (cartItems.some((item) => item.id === newDessert.id)) {
      // If it does, increment the quantity
      const existingIndex = cartItems.findIndex(
        (item) => item.id === newDessert.id
      );
      cartItems[existingIndex].quantity++;
      setCartItems([...cartItems]);
    }
    // If it doesn't, add it to the cart
    cartItems.push({ ...newDessert, quantity: 1 });
    setCartItems([...cartItems]);
  } else {
    // If the cart items are not stored in local storage, create a new array
    setCartItems([{ ...newDessert, quantity: 1 }]);
  }

  return Promise.resolve();
};

// export const addToCart = (dessert: Dessert): CartItem[] | null => {
//   const [cartItems, setCartItems] = useLocalStorage<CartItem[] | null>(
//     "cartItems",
//     null
//   );

//   if (cartItems) {
//     // Check if the dessert already exists in the cart
//     if (cartItems.some((item) => item.id === dessert.id)) {
//       // If it does, increment the quantity
//       const existingIndex = cartItems.findIndex(
//         (item) => item.id === dessert.id
//       );
//       cartItems[existingIndex].quantity++;
//       setCartItems([...cartItems]);
//       return cartItems;
//     }
//     // If it doesn't, add it to the cart
//     cartItems.push({ ...dessert, quantity: 1 });
//     setCartItems([...cartItems]);
//     return cartItems;
//   } else {
//     // If the cart items are not stored in local storage, create a new array
//     setCartItems([{ ...dessert, quantity: 1 }]);
//     return [{ ...dessert, quantity: 1 }];
//   }
// };
