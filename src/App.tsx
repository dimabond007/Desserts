import { useQuery } from "@tanstack/react-query";
import icon_carbon_neutral from "../assets/images/icon-carbon-neutral.svg";
import icon_order_confirmed from "../assets/images/icon-order-confirmed.svg";
import icon_remove from "../assets/images/icon-remove-item.svg";
import empty_cart from "../assets/images/illustration-empty-cart.svg";
import { Button } from "./components/ui/button";
// import { useAddToCart } from "./hooks/use-add-to-cart";
import { useLocalStorage } from "@uidotdev/usehooks";
import { CartItem } from "./lib/api";
import { Separator } from "./components/ui/separator";
import DesertItem from "./components/DesertItem";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export interface Dessert {
  id: number;
  name: string;
  category: string;
  price: number;
  image: { thumbnail: string; mobile: string; tablet: string; desktop: string };
}
function App() {
  const { data: desserts } = useQuery<Dessert[]>({
    queryKey: ["desserts"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/desserts");
      return await response.json();
    },
  });
  // const addToCartMutation = useAddToCart();

  const [cartItems, setCartItems] = useLocalStorage<CartItem[] | null>(
    "cartItems"
  );

  // const {data:cart} = useQuery<Dessert[]>({});

  // const addProductMutation = useMutation({
  //   mutationFn: createProduct,
  //   // onSuccess: () => {
  //   //   queryClient.invalidateQueries(["products"] as any),

  //   //   closeRef.current?.click();
  //   // },
  // });

  function handleAddToCart(
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newDessert: Dessert
  ) {
    console.log("Adding to cart:", newDessert);

    if (cartItems) {
      const existingIndex = cartItems.findIndex(
        (item) => item.id === newDessert.id
      );

      if (existingIndex !== -1) {
        // If the dessert exists in the cart, increment the quantity
        cartItems[existingIndex].quantity++;
      } else {
        // If it doesn't exist, add it to the cart
        cartItems.push({ ...newDessert, quantity: 1 });
      }

      setCartItems([...cartItems]);
    } else {
      // If there are no cart items, create a new array with the new dessert
      setCartItems([{ ...newDessert, quantity: 1 }]);
    }

    // addToCartMutation.mutate(dessert,cartItems,setCartItems);
  }

  function handleRemoveFromCart(
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    cartItem: CartItem
  ) {
    console.log("Removing from cart:", cartItem);

    if (cartItems) {
      const updatedCartItems = cartItems.filter(
        (item) => item.id !== cartItem.id
      );
      if (updatedCartItems.length === 0) {
        setCartItems(null);
      } else {
        setCartItems([...updatedCartItems]);
      }
    }

    // addToCartMutation.mutate(dessert, updatedCartItems, setCartItems);
  }

  function clearCart() {
    setCartItems(null);
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row py-20 px-12 bg-background gap-8">
        <div className=" lg:basis-8/12 ">
          <h1 className="text-3xl font-bold text-chart-1 pb-6">Desserts</h1>
          <div className="flex flex-wrap gap-6 justify-between">
            {desserts?.map((dessert) => (
              <DesertItem
                key={dessert.id}
                dessert={dessert}
                handleAddToCart={handleAddToCart}
                cartItems={cartItems}
                setCartItems={setCartItems}
                desserts={desserts}
              />
            ))}
          </div>
        </div>
        <div className=" lg:basis-4/12 flex-grow-0 ">
          <div className=" bg-white py-8 px-6 rounded-lg">
            <div className="text-secondary-foreground font-bold text-2xl mb-4 ">
              Your Cart ({cartItems?.length ?? 0})
            </div>
            {!cartItems ? (
              <div
                className="flex flex-col justify-center items-center
              "
              >
                <img className="w-1/3 " src={empty_cart} alt="Empty cart" />
                <div className="mt-6 text-sm text-muted-foreground">
                  {" "}
                  Your added items will appear here.
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  {cartItems?.map((cartItem) => {
                    return (
                      <div key={cartItem.id} className="">
                        {/* <img
                        className="w-10 h-10 rounded-md"
                        src={cartItem.image.thumbnail}
                        alt={cartItem.name}
                      /> */}
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col text-sm gap-2 py-2">
                            <div className="font-bold">{cartItem.name}</div>
                            <div className="flex gap-2 ">
                              <div className="text-secondary-foreground font-bold">
                                {cartItem.quantity}x
                              </div>
                              <div className="text-gray-400 flex gap-0.5">
                                <div>@</div>{" "}
                                <div>${cartItem.price.toFixed(2)}</div>
                              </div>
                              <div>
                                $
                                {(cartItem.price * cartItem.quantity).toFixed(
                                  2
                                )}
                              </div>
                            </div>
                          </div>
                          <div>
                            <Button
                              variant="ghost"
                              className="border p-0 h-4 w-4 rounded-full "
                              onClick={(ev) =>
                                handleRemoveFromCart(ev, cartItem)
                              }
                            >
                              <img src={icon_remove} alt="Remove item" />
                            </Button>
                          </div>
                        </div>
                        <Separator />
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between mb-6 items-center">
                  <div>Order Total</div>
                  <div className=" text-2xl font-bold">
                    $
                    {cartItems
                      ?.reduce(
                        (acc, curr) => acc + curr.price * curr.quantity,
                        0
                      )
                      .toFixed(2)}
                  </div>
                </div>
                <div className="bg-background flex justify-center text-sm py-4 mb-6">
                  <img src={icon_carbon_neutral} />
                  <div>
                    {" "}
                    This is a{" "}
                    <span className="font-bold"> carbon-neutral </span> delivery
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger className="w-full">
                    <Button
                      variant="ghost"
                      className="rounded-full w-full bg-secondary-foreground p-6 text-secondary"
                    >
                      Confirm Order
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white">
                    <DialogHeader>
                      <div className="w-">
                        <img src={icon_order_confirmed} />
                      </div>
                      <DialogTitle className="text-4xl">
                        Order Confirmed
                      </DialogTitle>
                      <DialogDescription>
                        We hope you enjoyed your desserts!
                      </DialogDescription>
                      <div className="bg-background px-4 py-2 rounded-md">
                        <div className="mb-6">
                          {cartItems?.map((cartItem) => {
                            return (
                              <div key={cartItem.id} className="">
                                {/* <img
                        className="w-10 h-10 rounded-md"
                        src={cartItem.image.thumbnail}
                        alt={cartItem.name}
                      /> */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    <div>
                                      <img
                                        className="w-10 h-10 rounded-md"
                                        src={cartItem.image.thumbnail}
                                        alt={cartItem.name}
                                      />
                                    </div>
                                    <div className="flex flex-col text-sm gap-2 py-2">
                                      <div className="font-bold">
                                        {cartItem.name}
                                      </div>
                                      <div className="flex gap-2 ">
                                        <div className="text-secondary-foreground font-bold">
                                          {cartItem.quantity}x
                                        </div>
                                        <div className="text-gray-400 flex gap-0.5">
                                          <div>@</div>{" "}
                                          <div>
                                            ${cartItem.price.toFixed(2)}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="font-bold">
                                    $
                                    {(
                                      cartItem.price * cartItem.quantity
                                    ).toFixed(2)}
                                  </div>
                                </div>
                                <Separator />
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex justify-between mb-6 items-center">
                          <div>Order Total</div>
                          <div className=" text-2xl font-bold">
                            $
                            {cartItems
                              ?.reduce(
                                (acc, curr) => acc + curr.price * curr.quantity,
                                0
                              )
                              .toFixed(2)}
                          </div>
                        </div>
                      </div>
                      <div>
                        <DialogPrimitive.Close className="w-full">
                          <Button
                            className="rounded-full w-full bg-secondary-foreground p-6 text-secondary"
                            onClick={clearCart}
                          >
                            Start New Order
                          </Button>
                        </DialogPrimitive.Close>
                      </div>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
