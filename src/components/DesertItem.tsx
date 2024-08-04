import React, { useEffect } from "react";
import icon_cart from "../../assets/images/icon-add-to-cart.svg";
import icon_decrement from "../../assets/images/icon-decrement-quantity.svg";
import icon_increment from "../../assets/images/icon-increment-quantity.svg";
import { Button } from "./ui/button";

import { Dessert } from "@/App";
import { CartItem } from "@/lib/api";

interface DesertItemProps {
  dessert: Dessert;
  handleAddToCart: (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    dessert: Dessert
  ) => void;
  cartItems: CartItem[] | null;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[] | null>>;
  desserts: Dessert[];
}

export default function DesertItem({
  dessert,
  handleAddToCart,
  cartItems,
  setCartItems,
  desserts,
}: DesertItemProps) {
  const [countInCart, setCountInCart] = React.useState(0);

  useEffect(() => {
    if (cartItems) {
      const existingIndex = cartItems.findIndex(
        (item) => item.id === dessert.id
      );
      if (existingIndex !== -1) {
        setCountInCart(cartItems[existingIndex].quantity);
      } else {
        setCountInCart(0);
      }
    } else {
      setCountInCart(0);
    }
  }, [desserts, cartItems]);

  function handleRemoveOneFromCart(dessert: Dessert) {
    if (!cartItems) return;
    const updatedCartItems = [...cartItems];
    const existingIndex = updatedCartItems.findIndex(
      (item) => item.id === dessert.id
    );

    if (existingIndex !== -1) {
      updatedCartItems[existingIndex].quantity--;
      if (updatedCartItems[existingIndex].quantity === 0) {
        updatedCartItems.splice(existingIndex, 1);
      }
      setCartItems([...updatedCartItems]);
    }
  }

  return (
    <div key={dessert.id} className="max-w-sm rounded-md">
      <div className="relative mb-6">
        <img
          className="w-full h-64 object-cover rounded-lg"
          src={dessert.image.desktop}
          alt={dessert.name}
        />

        {countInCart > 0 ? (
          <div className="flex gap-1 rounded-full justify-between items-center bg-secondary-foreground absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2/3 h-10 text-white p-4">
            <Button
              variant="ghost"
              className="rounded-full border border-white p-1 h-5"
              onClick={() => handleRemoveOneFromCart(dessert)}
            >
              <img src={icon_decrement} alt="Decrement quantity" />
            </Button>
            {countInCart}
            <Button
              variant="ghost"
              className="rounded-full border border-white p-1 h-5"
              onClick={(ev) => handleAddToCart(ev, dessert)}
            >
              <img src={icon_increment} alt="Increment quantity" />
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            className="flex gap-1 rounded-full border border-secondary-foreground bg-white absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2/3"
            onClick={(ev) => handleAddToCart(ev, dessert)}
          >
            <img className="w-5 h-5" src={icon_cart} alt="Add to cart" />
            Add to cart
          </Button>
        )}
      </div>
      <div className=" py-4">
        <div className="text-xs text-gray-500 ">{dessert.category}</div>
        <div className="font-bold text-xl">{dessert.name}</div>
        <div className="text-secondary-foreground text-xl font-semibold">
          ${dessert.price.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
